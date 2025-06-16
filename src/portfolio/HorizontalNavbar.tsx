import React, { useRef, useEffect, useState } from 'react';
import Link from '../components/general/Link';
import { useLocation, useNavigate } from 'react-router';

declare interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

const HorizontalNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
    const checkScrollArrows = () => {
      const el = scrollRef.current;
      if (!el) return;
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
    };

    checkScrollArrows();
    window.addEventListener('resize', checkScrollArrows);
    return () => window.removeEventListener('resize', checkScrollArrows);
  }, []);

  useEffect(() => {
    setProjectsExpanded(location.pathname.includes('/projects'));
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  if (isHome) return null;


  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
  };

  

  const navLinks = [
    { to: '', text: 'HOME' , page: '//'},
    { to: 'about', text: 'ABOUT' , page: '/about'},
    { to: 'experience', text: 'EXPERIENCE' , page: '/experience'},
    { to: 'projects', text: 'PROJECTS' , page: '/projects'},
    { to: 'contact', text: 'CONTACT' , page: '/contact'},
  ];

  return !isHome ? (
    <div style={styles.navbar}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Mish Wilson OS</h1>
      </div>

      <div style={styles.linksWrapper}>
        {showLeftArrow && (
          <div style={styles.arrow} onClick={scrollLeft}>◀</div>
        )}

        <div
          className="scrollArea"
          style={styles.scrollArea}
          ref={scrollRef}
        >
          {navLinks.map(({ to, text, page }) => (
            <Link
              key={to}
              containerStyle={{
                ...styles.link,
                ...(location.pathname.includes(page) ? styles.activeLink : {}),
              }}
              to={to}
              text={text}
            />
          ))}
        </div>

        {showRightArrow && (
          <div style={styles.arrow} onClick={scrollRight}>▶</div>
        )}
      </div>
    </div>
  ) : null;
};

const styles: StyleSheetCSS = {
  navbar: {
    position: 'absolute',
    width: '100%',
    top: 0,
    backgroundColor: '#8a8f3e',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: '2px solid black',
    boxSizing: 'border-box',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 24,
    flexShrink: 0,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Pixelout',
    color: 'white'
  },
  link: {
    cursor: 'pointer',
    fontWeight: 'bolder',
    textDecoration: 'underline',
    fontFamily: 'MillenniumBold',
    color: '#445122',
    fontSize: 14,
  },
  linksWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  scrollArea: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    gap: 24,
    padding: '4px 0',
  },
  arrow: {
    cursor: 'pointer',
    padding: '0 8px',
    fontSize: 20,
    userSelect: 'none',
    zIndex: 1,
  },
  activeLink: {
    // backgroundColor: '#e0e0e0',
    // padding: '2px 4px',
    // borderRadius: '6px',
    // margin: '6px'
    color: 'white',
  },
};

export default HorizontalNavbar;
