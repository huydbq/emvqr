import { TAG_LABELS } from './tags';

/**
 * Parse EMVCo QR payload into TLV fields
 */
export function parseEmvTlv(payload) {
  const result = [];
  let i = 0;

  while (i + 4 <= payload.length) {
    const id = payload.substring(i, i + 2);
    const lenStr = payload.substring(i + 2, i + 4);

    if (!/^\d{2}$/.test(lenStr)) {
      break;
    }

    const len = parseInt(lenStr, 10);
    const valueStart = i + 4;
    const valueEnd = valueStart + len;

    if (valueEnd > payload.length) {
      break;
    }

    const value = payload.substring(valueStart, valueEnd);
    result.push({ id, length: len, value });
    i = valueEnd;
  }

  return result;
}

/**
 * Flatten EMV fields including nested templates
 */
export function flattenEmvFields(tlvs, parentPath = '') {
  const rows = [];

  for (const tlv of tlvs) {
    const path = parentPath ? parentPath + '-' + tlv.id : tlv.id;
    const baseRow = {
      path,
      id: tlv.id,
      length: tlv.length,
      value: tlv.value,
      meaning: TAG_LABELS[tlv.id] || '',
    };

    // Check if we should parse nested TLV (templates)
    const isTemplate =
      (parseInt(tlv.id, 10) >= 26 && parseInt(tlv.id, 10) <= 51) ||
      tlv.id === '62';

    rows.push(baseRow);

    if (isTemplate) {
      const nested = parseEmvTlv(tlv.value);
      for (const n of nested) {
        const nestedRow = {
          path: path + '-' + n.id,
          id: n.id,
          length: n.length,
          value: n.value,
          meaning:
            TAG_LABELS['sub_' + n.id] ||
            TAG_LABELS[n.id] ||
            '(Sub-field)',
        };
        rows.push(nestedRow);
      }
    }
  }

  return rows;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
