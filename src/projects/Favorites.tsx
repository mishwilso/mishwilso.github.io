import React, { useState, useEffect } from 'react';
import Banner from '../components/general/Banner';

const projects = [
  {
    name: "Roommease",
    description: "Built with React, TypeScript, and Firebase — this matchmaking app pairs compatible roommates using tagged lifestyle preferences. Think Tinder, but for dishes and laundry.",
    images: [
      "/images/roommease1.png",
      "/images/roommease2.png",
      "/images/roommease3.png"
    ],
    github: "https://github.com/yourusername/roommease",
    route: "roommease"
  },
];

const Favorites: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = projects[0].images;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="site-page-content">
      <div className="page-background" style={styles.container}>
      <h1 style={styles.header}>Favorites</h1>
      <p style={styles.subtitle}>
        These are a few of my favorite projects with a brief description about them. 
        Feel free to check out my GitHub page or read more about each one!
      </p>

      <Banner text="Remember my resume? It’s still here!" />

      <h2 style={styles.projectTitle}>{projects[0].name}</h2>
      <p style={styles.description}>{projects[0].description}</p>

      <div style={styles.featuredImageWrapper}>
        <img
          src={images[currentImageIndex]}
          alt="Featured Project Screenshot"
          style={styles.featuredImage}
        />
      </div>

      <div style={styles.thumbnailRow}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            onClick={() => setCurrentImageIndex(index)}
            style={{
              ...styles.thumbnailImage,
              border: currentImageIndex === index ? '2px solid #0077cc' : '2px solid transparent',
            }}
          />
        ))}
      </div>

      <div style={styles.linkRow}>
        <a href={projects[0].github} target="_blank" rel="noreferrer" style={styles.link}>
          GitHub
        </a>
        <a href={`/projects/${projects[0].route}`} style={styles.readMore}>
          Read More →
        </a>
      </div>
    </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Millennium',
  },
  header: {
    // fontSize: '40px',
    marginBottom: 8,
    fontFamily: 'Pixelout'
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: 24,
    maxWidth: 700,
  },
  projectTitle: {
    fontSize: 28,
    marginBottom: 8,
    marginTop: 32,
    fontFamily: 'Millennium',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 1.5,
  },
  featuredImageWrapper: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuredImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  thumbnailRow: {
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    marginBottom: 20,
  },
  thumbnailImage: {
    height: 80,
    cursor: 'pointer',
    borderRadius: 8,
  },
  linkRow: {
    marginTop: 12,
    display: 'flex',
    gap: 16,
  },
  link: {
    color: '#0077cc',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  readMore: {
    color: '#333',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
};

export default Favorites;
