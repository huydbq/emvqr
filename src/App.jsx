import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EmvParserPage from './pages/EmvParserPage';
import JsonBeautifierPage from './pages/JsonBeautifierPage';

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<EmvParserPage />} />
          <Route path="/json-beautifier" element={<JsonBeautifierPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
