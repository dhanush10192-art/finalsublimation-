import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppIcon from './components/WhatsAppIcon';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Home />
            <Footer />
            <WhatsAppIcon />
          </>
        } />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </div>
  );
}

export default App;
