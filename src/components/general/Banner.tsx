import React from 'react';

interface BannerProps {
text: string;
onClick: () => void;
}
  
const Banner: React.FC<BannerProps> = ({ text, onClick  }) => {
  return (
      <div style={styles.bannerWrapper} onClick={onClick}>
      <hr style={styles.fadedLine} />
      <div style={styles.bannerContent}>
        <img
          src="../art/mish.png"
          alt="Resume Icon"
          style={styles.bannerImage}
        />
        <span style={styles.bannerLink}>{text}</span>
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
    padding: '1px 2px',
    borderRadius: '8px',
    },

    bannerImage: {
    width: '48px',
    height: '48px',
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