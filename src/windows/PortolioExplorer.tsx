import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import type { WindowProps } from '../components/Desktop/Window98';


import Home from '../portfolio/Home';
import HorizontalNavbar from '../portfolio/HorizontalNavbar';
import About from '../portfolio/About';
import Project from '../portfolio/Projects';
import Favorites from '../projects/Favorites';
import Catalogue from '../projects/Catalogue';
import Experience from '../portfolio/Experience';
import Contact from '../portfolio/Contact';

// import Window from '../os/Window';
// import Experience from '../showcase/Experience';
// import Projects from '../showcase/Projects';
// import Contact from '../showcase/Contact';

// import ArtProjects from '../showcase/projects/Art';
// import useInitialWindowSize from '../../hooks/useInitialWindowSize';


// type PortfolioExplorerProps = Pick<WindowProps, 'onClose' | 'onMinimize' | 'onClick'>;

interface PortfolioExplorerProps {
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
  launchWindow: (appKey: string) => void;   // ← add this
}

const PortfolioExplorer: React.FC<PortfolioExplorerProps> = ({ onClose, onMinimize, onClick, launchWindow }) => {
    
    // Setup Initial Window Size
    //const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

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

                        {/* <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                             path="/projects/software"
                             element={<SoftwareProjects />}
                         />
                        <Route
                            path="/projects/music"
                            element={<MusicProjects />}
                        />
                        <Route path="/projects/art" element={<ArtProjects />} /> */}
                    </Routes>
                </div>
            </Router>
    );
};

export default PortfolioExplorer;