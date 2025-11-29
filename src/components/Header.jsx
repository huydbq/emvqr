import '../styles/Header.css';

export default function Header() {
  return (
    <header>
      <h1>EMV QR Parser</h1>
      <p>Paste an EMVCo QR payload, and this tool will decode it into TLV fields.</p>
    </header>
  );
}
