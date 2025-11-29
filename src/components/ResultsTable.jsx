import '../styles/ResultsTable.css';

export default function ResultsTable({ rows }) {
  if (!rows.length) {
    return <p className="status">No fields decoded.</p>;
  }

  return (
    <table className="results-table">
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
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="path" data-label="Path">{row.path}</td>
            <td data-label="Tag">
              <span className="tag-badge">{row.id}</span>
            </td>
            <td data-label="Len">{row.length}</td>
            <td className="code" data-label="Value">{row.value}</td>
            <td data-label="Meaning">
              {row.meaning ? (
                row.meaning
              ) : (
                <span className="meaning-muted">Unknown / custom</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
