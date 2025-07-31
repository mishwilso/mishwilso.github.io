import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import type { WindowProps } from '../components/desktop/Window98';


import Home from '../portfolio/Home';
import HorizontalNavbar from '../portfolio/HorizontalNavbar';
import About from '../portfolio/About';
import Project from '../portfolio/Projects';
import Favorites from '../projects/Favorites';
import Catalogue from '../projects/Catalogue';
import Experience from '../portfolio/Experience';
import Contact from '../portfolio/Contact';


interface PortfolioExplorerProps {
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
  launchWindow: (appKey: string) => void;   // ← add this
}

const PortfolioExplorer: React.FC<PortfolioExplorerProps> = ({ onClose, onMinimize, onClick, launchWindow }) => {
    
    // Setup Initial Window Size
    return (
            <Router initialEntries={['/']}>
                <div className="window-site-page">
                    <HorizontalNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<Project />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects/Favorites" element={<Favorites />} />
                        <Route path="/projects/Catalogue" element={<Catalogue/>} />
                        <Route path="/contact" element={<Contact />} />

                    </Routes>
                </div>
            </Router>
    );
};

export default PortfolioExplorer;