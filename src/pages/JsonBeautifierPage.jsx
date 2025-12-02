import { useEffect, useRef, useState } from 'react';
import JsonTree from '../components/JsonTree';
import '../styles/JsonBeautifier.css';

const INITIAL_STATUS = 'Waiting for JSON input…';
const VIEW_MODES = {
  JSON: 'json',
  TREE: 'tree',
};

export default function JsonBeautifierPage() {
  const [rawJson, setRawJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [status, setStatus] = useState(INITIAL_STATUS);
  const [isError, setIsError] = useState(false);
  const [viewMode, setViewMode] = useState(VIEW_MODES.JSON);
  const [copyLabel, setCopyLabel] = useState('Copy');
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const processJson = (spacing) => {
    const trimmed = rawJson.trim();

    if (!trimmed.length) {
      setFormattedJson('');
      setParsedJson(null);
      setStatus('Please paste JSON first.');
      setIsError(true);
      return;
    }

    try {
      const parsed = JSON.parse(trimmed);
      setFormattedJson(JSON.stringify(parsed, null, spacing));
      setParsedJson(parsed);
      setStatus(spacing === 0 ? 'Minified output ready.' : 'Beautified output ready.');
      setIsError(false);
    } catch (err) {
      setFormattedJson('');
      setParsedJson(null);
      setStatus(`Invalid JSON: ${err.message}`);
      setIsError(true);
    }
  };

  const handleFormat = () => processJson(2);
  const handleMinify = () => processJson(0);

  const handleClear = () => {
    setRawJson('');
    setFormattedJson('');
    setParsedJson(null);
    setStatus(INITIAL_STATUS);
    setIsError(false);
    setCopyLabel('Copy');
  };

  const hasOutput = Boolean(formattedJson);

  const handleCopy = async () => {
    if (!hasOutput) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyLabel('Copied!');
    } catch {
      setCopyLabel('Copy failed');
    } finally {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopyLabel('Copy'), 1800);
    }
  };

  return (
    <section className="card json-beautifier-card">
      <h2>Beautify or inspect JSON</h2>

      <div className="json-beautifier-grid">
        <div className="json-panel">
          <label htmlFor="json-input">Input JSON</label>
          <textarea
            id="json-input"
            placeholder='Example: {"amount":125.75,"currency":"USD"}'
            value={rawJson}
            onChange={(event) => setRawJson(event.target.value)}
          />

          <div className="btn-row json-buttons">
            <button type="button" onClick={handleFormat}>
              Beautify
            </button>
            <button type="button" className="secondary" onClick={handleMinify}>
              Minify
            </button>
            <button type="button" className="secondary" onClick={handleClear}>
              Clear
            </button>
            <span className={`status ${isError ? 'error' : ''}`}>{status}</span>
          </div>
        </div>

        <div className="json-panel">
          <div className="output-header">
            <div>
              <label htmlFor="json-output">Output</label>
              <p className="output-hint">Switch views or copy formatted JSON.</p>
            </div>

            <div className="output-actions">
              <div className="view-toggle" role="group" aria-label="Output view">
                <button
                  type="button"
                  className={viewMode === VIEW_MODES.JSON ? 'active' : ''}
                  onClick={() => setViewMode(VIEW_MODES.JSON)}
                  disabled={!hasOutput}
                  aria-pressed={viewMode === VIEW_MODES.JSON}
                >
                  JSON
                </button>
                <button
                  type="button"
                  className={viewMode === VIEW_MODES.TREE ? 'active' : ''}
                  onClick={() => setViewMode(VIEW_MODES.TREE)}
                  disabled={!hasOutput}
                  aria-pressed={viewMode === VIEW_MODES.TREE}
                >
                  Tree
                </button>
              </div>
              <button
                type="button"
                className="ghost"
                onClick={handleCopy}
                disabled={!hasOutput || viewMode !== VIEW_MODES.JSON}
              >
                {copyLabel}
              </button>
            </div>
          </div>

          {viewMode === VIEW_MODES.JSON || !hasOutput ? (
            <pre id="json-output" className={`json-output ${hasOutput ? '' : 'empty'}`}>
              {formattedJson || 'Formatted JSON will appear here.'}
            </pre>
          ) : (
            <div className="tree-wrapper">
              <JsonTree data={parsedJson} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

