import { useState } from 'react';
import InputSection from '../components/InputSection';
import ResultsTable from '../components/ResultsTable';
import { flattenEmvFields, parseEmvTlv } from '../utils/parser';

export default function EmvParserPage() {
  const [payload, setPayload] = useState('');
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState('Waiting for input…');
  const [isError, setIsError] = useState(false);

  const handleParse = () => {
    const raw = payload.trim().replace(/\s+/g, '');

    if (!raw.length) {
      setStatus('Please paste a payload first.');
      setIsError(true);
      setRows([]);
      return;
    }

    const tlvs = parseEmvTlv(raw);
    if (!tlvs.length) {
      setStatus('Failed to parse TLV structure.');
      setIsError(true);
      setRows([]);
      return;
    }

    const parsedRows = flattenEmvFields(tlvs);
    setRows(parsedRows);
    setStatus(`Parsed ${parsedRows.length} field(s).`);
    setIsError(false);
  };

  const handleClear = () => {
    setPayload('');
    setRows([]);
    setStatus('Waiting for input…');
    setIsError(false);
  };

  return (
    <div className="content-grid">
      <div className="left-col">
        <InputSection
          payload={payload}
          onPayloadChange={setPayload}
          onParse={handleParse}
          onClear={handleClear}
          status={status}
          isError={isError}
        />
      </div>

      <div className="right-col">
        <section className="card">
          <h2>2. Parsed Fields</h2>
          <div id="results-container">
            {rows.length > 0 ? (
              <ResultsTable rows={rows} />
            ) : (
              <p className="status">No data yet. Paste a payload and click Parse.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

