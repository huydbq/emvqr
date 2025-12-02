import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const ROUTE_META = {
  '/': {
    title: 'EMV QR Parser',
    description: 'Paste an EMVCo QR payload and decode it into TLV fields.',
  },
  '/json-beautifier': {
    title: 'JSON Beautifier',
    description: 'Validate JSON and switch between text or tree views.',
  },
};

export default function Header() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] || ROUTE_META['/'];

  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
        </div>

        <nav className="header-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            EMV Parser
          </NavLink>
          <NavLink
            to="/json-beautifier"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            JSON Beautifier
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
