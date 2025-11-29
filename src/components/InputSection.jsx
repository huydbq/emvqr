import '../styles/InputSection.css';

export default function InputSection({ payload, onPayloadChange, onParse, onClear, status, isError }) {
  return (
    <section className="card input-card">
      <h2>1. Input EMVCo QR Payload</h2>
      <label htmlFor="payload">Raw EMV String</label>
      <textarea
        id="payload"
        placeholder="Example: 00020101021226...6304ABCD"
        value={payload}
        onChange={(e) => onPayloadChange(e.target.value)}
      />

      <div className="btn-row">
        <button type="button" onClick={onParse}>
          <span>▶</span> Parse
        </button>
        <button type="button" className="secondary" onClick={onClear}>
          Clear
        </button>
        <span className={`status ${isError ? 'error' : ''}`}>{status}</span>
      </div>
    </section>
  );
}
