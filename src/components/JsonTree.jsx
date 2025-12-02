import { useEffect, useRef, useState } from 'react';
import '../styles/JsonTree.css';

const formatPrimitive = (value) => {
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return String(value);
};

const getTypeLabel = (value) => {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (value === null) {
    return 'null';
  }
  return typeof value;
};

const describeBranch = (value, count) => {
  if (Array.isArray(value)) {
    return `array [${count}]`;
  }
  return `object {${count}}`;
};

const getEntries = (value) => {
  if (value === null || typeof value !== 'object') {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => ({ key: `[${index}]`, val: item }));
  }

  return Object.entries(value).map(([key, val]) => ({ key, val }));
};

const pathsEqual = (a, b) => a.length === b.length && a.every((segment, index) => segment === b[index]);

function JsonTreeNode({ label, value, pathSegments, level, onSelect, selectedPath }) {
  const entries = getEntries(value);
  const isBranch = entries.length > 0;
  const [collapsed, setCollapsed] = useState(false);
  const nodeKey = pathSegments.join('.');
  const isSelected = pathsEqual(pathSegments, selectedPath);
  const rowRef = useRef(null);

  useEffect(() => {
    if (isSelected && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [isSelected]);

  const handleSelect = () => onSelect(pathSegments);

  return (
    <li className="json-tree-node" key={nodeKey}>
      <div
        ref={rowRef}
        className={`json-tree-row ${isSelected ? 'is-selected' : ''}`}
        style={{ marginLeft: `${level * 1.25}rem` }}
      >
        {isBranch ? (
          <button
            type="button"
            className={`tree-caret ${collapsed ? 'collapsed' : ''}`}
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${label ?? 'node'}`}
          />
        ) : (
          <span className="tree-caret placeholder" />
        )}

        <button
          type="button"
          className="json-tree-content"
          onClick={handleSelect}
          aria-pressed={isSelected}
        >
          <span className="json-tree-key">{label}</span>
          <span className="json-tree-sep">:</span>
          {isBranch ? (
            <span className="json-tree-summary">{describeBranch(value, entries.length)}</span>
          ) : (
            <span className="json-tree-value">{formatPrimitive(value)}</span>
          )}
          <span className="json-tree-type">{getTypeLabel(value)}</span>
        </button>
      </div>

      {isBranch && !collapsed && (
        <ul className="json-tree-children">
          {entries.map(({ key, val }) => (
            <JsonTreeNode
              key={`${nodeKey}.${key}`}
              label={key}
              value={val}
              pathSegments={[...pathSegments, key]}
              level={level + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function JsonTree({ data }) {
  const rootLabel = Array.isArray(data) ? 'array' : 'object';
  const [selectedPath, setSelectedPath] = useState([rootLabel]);
  const activePath =
    selectedPath.length && selectedPath[0] === rootLabel
      ? selectedPath
      : [rootLabel];

  if (data === null || data === undefined) {
    return <p className="status">Tree view will appear after formatting valid JSON.</p>;
  }

  return (
    <div className="json-tree-shell">
      <div className="json-tree-toolbar">
        <span className="toolbar-label">JSON path</span>
        <div className="json-tree-breadcrumb" aria-live="polite">
          {activePath.map((segment, index) => (
            <span key={`${segment}-${index}`} className="crumb">
              {segment}
              {index < activePath.length - 1 && <span className="crumb-sep">›</span>}
            </span>
          ))}
        </div>
      </div>

      <ul className="json-tree">
        <JsonTreeNode
          label={rootLabel}
          value={data}
          pathSegments={[rootLabel]}
          level={0}
          onSelect={setSelectedPath}
          selectedPath={activePath}
        />
      </ul>
    </div>
  );
}

