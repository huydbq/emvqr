import { useState } from 'react';
import '../styles/JsonTree.css';

function getTypeLabel(value) {
  if (Array.isArray(value)) {
    return `Array(${value.length})`;
  }
  if (value === null) {
    return 'null';
  }
  return typeof value;
}

function getEntries(value) {
  if (value === null || typeof value !== 'object') {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => ({ key: `[${index}]`, val: item }));
  }

  return Object.entries(value).map(([key, val]) => ({ key, val }));
}

function JsonTreeNode({ label, value, path }) {
  const nodePath = path ? `${path}.${label}` : label;
  const typeLabel = getTypeLabel(value);
  const entries = getEntries(value);
  const isBranch = entries.length > 0;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <li className="json-tree-node" key={nodePath}>
      <div className="json-tree-row">
        {isBranch ? (
          <button
            type="button"
            className={`tree-toggle ${isCollapsed ? 'collapsed' : 'expanded'}`}
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${label ?? 'node'}`}
          />
        ) : (
          <span className="tree-toggle placeholder" />
        )}

        <div className="json-tree-label">
          {label !== undefined && <span className="json-tree-key">{label}</span>}
          <span className="json-tree-type">{typeLabel}</span>
        </div>
        {!isBranch && (
          <div className="json-tree-value">
            {typeof value === 'string' ? `"${value}"` : String(value)}
          </div>
        )}
      </div>
      {isBranch && !isCollapsed && (
        <ul className="json-tree-children">
          {entries.map(({ key, val }) => (
            <JsonTreeNode key={`${nodePath}.${key}`} label={key} value={val} path={nodePath} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function JsonTree({ data }) {
  if (data === null || data === undefined) {
    return <p className="status">Tree view will appear after formatting valid JSON.</p>;
  }

  return (
    <ul className="json-tree">
      <JsonTreeNode label="root" value={data} path="" />
    </ul>
  );
}

