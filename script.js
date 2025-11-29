/**
 * Parse EMVCo QR payload into TLV fields
 */
function parseEmvTlv(payload) {
  const result = [];
  let i = 0;

  while (i + 4 <= payload.length) {
    const id = payload.substring(i, i + 2);
    const lenStr = payload.substring(i + 2, i + 4);

    if (!/^\d{2}$/.test(lenStr)) {
      // Probably hit garbage, break.
      break;
    }

    const len = parseInt(lenStr, 10);
    const valueStart = i + 4;
    const valueEnd = valueStart + len;

    if (valueEnd > payload.length) {
      // Length exceeds available data — invalid TLV, stop.
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
function flattenEmvFields(tlvs, parentPath = "") {
  const rows = [];

  for (const tlv of tlvs) {
    const path = parentPath ? parentPath + "-" + tlv.id : tlv.id;
    const baseRow = {
      path,
      id: tlv.id,
      length: tlv.length,
      value: tlv.value,
      meaning: TAG_LABELS[tlv.id] || "",
    };

    // Check if we should parse nested TLV (templates)
    const isTemplate =
      (parseInt(tlv.id, 10) >= 26 && parseInt(tlv.id, 10) <= 51) ||
      tlv.id === "62";

    rows.push(baseRow);

    if (isTemplate) {
      const nested = parseEmvTlv(tlv.value);
      for (const n of nested) {
        const nestedRow = {
          path: path + "-" + n.id,
          id: n.id,
          length: n.length,
          value: n.value,
          meaning:
            TAG_LABELS["sub_" + n.id] ||
            TAG_LABELS[n.id] ||
            "(Sub-field)",
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
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Render TLV fields as HTML table
 */
function renderTable(rows) {
  if (!rows.length) {
    return '<p class="status">No fields decoded.</p>';
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Path</th>
          <th>Tag</th>
          <th>Len</th>
          <th>Value</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const row of rows) {
    const meaning =
      row.meaning && row.meaning.length
        ? row.meaning
        : '<span class="meaning-muted">Unknown / custom</span>';

    html += `
      <tr>
        <td class="path">${row.path}</td>
        <td>
          <span class="tag-badge">${row.id}</span>
        </td>
        <td>${row.length}</td>
        <td class="code">${escapeHtml(row.value)}</td>
        <td>${meaning}</td>
      </tr>
    `;
  }

  html += "</tbody></table>";
  return html;
}

/**
 * Handle parse button click
 */
function handleParse() {
  const payloadEl = document.getElementById("payload");
  const statusEl = document.getElementById("status");
  const resultsContainer = document.getElementById("results-container");

  let raw = payloadEl.value || "";
  raw = raw.replace(/\s+/g, ""); // remove spaces / newlines

  if (!raw.length) {
    statusEl.textContent = "Please paste a payload first.";
    statusEl.className = "status error";
    resultsContainer.innerHTML =
      '<p class="status error">No input provided.</p>';
    return;
  }

  const tlvs = parseEmvTlv(raw);
  if (!tlvs.length) {
    statusEl.textContent = "Failed to parse TLV structure.";
    statusEl.className = "status error";
    resultsContainer.innerHTML =
      '<p class="status error">Cannot decode payload. Check that it is a valid EMV QR string.</p>';
    return;
  }

  const rows = flattenEmvFields(tlvs);
  const tableHtml = renderTable(rows);

  resultsContainer.innerHTML = tableHtml;
  statusEl.textContent = `Parsed ${rows.length} field(s).`;
  statusEl.className = "status";
}
