import '../styles/Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-center">© {year} • Built with React + Vite.</div>
      </div>
    </footer>
  );
}
