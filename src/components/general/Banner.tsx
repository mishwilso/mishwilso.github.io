    import React from 'react';
      
    const Banner: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div style={styles.bannerWrapper}>
        <hr style={styles.fadedLine} />

        <div style={styles.bannerContent}>
          <img src="/images/resume-icon.png" alt="Resume Icon" style={styles.bannerImage} />
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={styles.bannerLink}>
            {text}
          </a>
        </div>

        <hr style={styles.fadedLine} />
      </div>

  );
};

const styles: { [key: string]: React.CSSProperties } = {
    bannerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '15px 0',
    gap: '12px',
    },

    bannerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    // backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '1px 2px',
    borderRadius: '8px',
    // boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
    },

    bannerImage: {
    width: '32px',
    height: '32px',
    objectFit: 'cover',
    borderRadius: '4px',
    },

    bannerLink: {
    fontFamily: 'MillenniumBold',
    fontSize: '14px',
    color: '#2f6c9f',
    textDecoration: 'none',
    },

    fadedLine: {
    width: '100%',
    height: '1px',
    background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3), transparent)',
    border: 'none',
    },
};

export default Banner;