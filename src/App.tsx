import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ArmorArchive } from './pages/ArmorArchive';
import { Technology } from './pages/Technology';
import { Timeline } from './pages/Timeline';
import { Characters } from './pages/Characters';
import { Movies } from './pages/Movies';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Tower } from './pages/Tower';
import { HUDOverlay } from './components/HUDOverlay';
import { HUDCursor } from './components/HUDCursor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stark-darkest relative">
        {/* Navigation */}
        <Navigation className="z-[50]" />
        {/* Page Content */}
        <main className="pt-[100px]"> {/* Increased spacing for navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/armor" element={<ArmorArchive />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/tower" element={<Tower />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        {/* Global HUD Overlay - appears on all pages */}
        <HUDOverlay className="z-[40]" />
        {/* Custom HUD Cursor */}
        <HUDCursor className="z-[60]" />
      </div>
    </Router>
  );
}

export default App;