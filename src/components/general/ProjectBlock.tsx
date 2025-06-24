import React, { useState, useEffect } from 'react';

interface ProjectImage {
  src: string;
  caption?: string;
}


interface Project {
  name: string;
  description: string;
  sub_description: string;
  images: ProjectImage[];
  github: string;
  route: string;
}

interface ProjectBlockProps {
  project: Project;
  fullscreenImage: string | null;
  setFullscreenImage: (img: string | null) => void;
}

const ProjectBlock = ({ project, fullscreenImage, setFullscreenImage }: ProjectBlockProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, project.images.length]);

  const goLeft = () => {
    setIsPaused(true);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const goRight = () => {
    setIsPaused(true);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h2 style={styles.projectTitle}>{project.name}</h2>
      <p style={styles.description}>{project.description}</p>

      <div style={styles.featuredImageWrapper}>
        <img
            src={project.images[currentImageIndex].src}
            alt={`${project.name} Screenshot`}
            style={styles.featuredImage}
            onClick={() => setFullscreenImage(project.images[currentImageIndex].src)}
        />
        {project.images[currentImageIndex].caption && (
            <div style={styles.imageCaption}>
            <em>{project.images[currentImageIndex].caption}</em>
            </div>
        )}
        <button onClick={goLeft} style={{ ...styles.arrowButton, left: 0 }}>←</button>
        <button onClick={goRight} style={{ ...styles.arrowButton, right: 0 }}>→</button>
    </div>
    <div></div>

      <div style={styles.thumbnailRow}>
        {project.images.map((img, index) => (
        <img
            key={index}
            src={img.src}
            onClick={() => setCurrentImageIndex(index)}
            style={{
            ...styles.thumbnailImage,
            border:
                currentImageIndex === index ? '2px solid #0077cc' : '2px solid transparent',
            }}
        />
        ))}
      </div>

      <p style={styles.description}>{project.sub_description}</p>

      <div style={styles.linkRow}>
        <a href={project.github} target="_blank" rel="noreferrer" style={styles.link}>
          GitHub
        </a>
        <a href={`/projects/${project.route}`} style={styles.readMore}>
          Read More →
        </a>
      </div>

      {fullscreenImage && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={() => setFullscreenImage(null)}>✕</button>
            <img src={fullscreenImage} style={styles.fullscreenImage} alt="Fullscreen View" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBlock;

const styles: { [key: string]: React.CSSProperties } = {
    
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
    position: 'relative',
    textAlign: 'center',
    marginBottom: 16,
    height: 500, // Ensures consistent height container
  },
  featuredImage: {
    maxHeight: 500,
    maxWidth: 750,
    // width: 'auto',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: 32,
    color: '#444',
    cursor: 'pointer',
    zIndex: 1,
    padding: '0 10px',
  },
  thumbnailRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    marginTop: 30,
  },
  thumbnailImage: {
    height: 80,
    width: 'auto',
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
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
  closeButton: {
    position: 'fixed',
    top: 24,
    right: 30,
    background: 'transparent',
    border: 'none',
    fontSize: 30,
    color: 'white',
    cursor: 'pointer',
    zIndex: 10000,
  },
  fullscreenImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 10,
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
  },
  imageCaption: {
  marginTop: 8,
  marginBottom: 8,
  fontSize: 14,
  fontStyle: 'italic',
  color: '#555',
    },
};
