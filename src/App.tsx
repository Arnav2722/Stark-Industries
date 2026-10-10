import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StarkProvider } from './context/StarkContext';
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
import { JarvisTerminal } from './components/JarvisTerminal';
import { StarkSpecialFX } from './components/StarkSpecialFX';

function App() {
  return (
    <StarkProvider>
      <Router>
        <div className="min-h-screen bg-stark-darkest text-white relative selection:bg-stark-gold selection:text-black overflow-x-hidden">
          {/* Top Glassmorphic Navigation Bar */}
          <Navigation className="z-[50]" />

          {/* Dynamic Page Router */}
          <main className="pt-[80px] min-h-[calc(100vh-80px)] relative z-10">
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

          {/* Interactive J.A.R.V.I.S. Floating AI Terminal */}
          <JarvisTerminal />

          {/* Fullscreen Special FX (House Party, Veronica, Gauntlet Snap, Suit Compare) */}
          <StarkSpecialFX />

          {/* Global Stark HUD Telemetry Overlay */}
          <HUDOverlay className="z-[40]" />

          {/* Custom Spring-Damped Reticle Cursor */}
          <HUDCursor className="z-[60]" />
        </div>
      </Router>
    </StarkProvider>
  );
}

export default App;
