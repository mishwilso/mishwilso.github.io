import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';



interface ProjectBoxProps {
    icon: string;
    title: string;
    subtitle: string;
    route: string;
    iconStyle: React.CSSProperties;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
    icon,
    title,
    subtitle,
    route,
    iconStyle,
}) => {
    const [, setIsHovering] = useState(false);
    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/projects/${route}`);
    };

    const onMouseEnter = () => {
        setIsHovering(true);
    };

    const onMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
          onMouseDown={handleClick}
          style={styles.projectLink}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <img
            src={icon}
            style={{ ...styles.projectLinkImage, ...iconStyle }}
            alt=""
          />
          <div style={styles.projectText}>
            <div style={styles.projectTitle}>{title}</div>
            <div style={styles.projectSubtitle}>{subtitle}</div>
          </div>
        </div>
    );
};


const Projects: React.FC = () => {
  return (
    <div className="site-page-content">
      <div className="page-background" style={styles.container}>
      {/* Upper Half */}
      <div style={styles.upper}>
        <div style={styles.upperLeft}>
            <div className="item">
                <div className="polaroid">
                    <img src="https://image.ibb.co/b8UJBc/administration_architecture_big_ben_221166.jpg"/> 
                    <div className="caption">I Miss My Wife Tails</div>
                </div>
            </div>
        </div>
        <div style={styles.verticalDivider} />
        <div style={styles.upperRight}>
            <h1 style={{fontFamily: 'Pixelout', marginBottom: 5}}>Projects</h1>
          <p style={{ fontSize: 15}}>I've worked on a lot of projects so here's a bunch of them. Sorted between my favorite which have my top 5 projects. Then I have a 
            project catelogue so you can sort through the project easily.
          </p>

              <div style={styles.projectLinksContainer}>
                <ProjectBox
                    icon={'/printer.gif'}
                    iconStyle={styles.computerIcon}
                    title="Favorites"
                    subtitle="My Top 5 Favorite Projects!"
                    route="Favorites"
                />
                <ProjectBox
                    icon={'/printer.gif'}
                    iconStyle={styles.musicIcon}
                    title="Catalogue"
                    subtitle="Organized Collection of all my projects :)"
                    route="Catalogue"
                />
            </div>

        </div>
      </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    fontFamily: 'Millennium',
  },
  upper: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  upperLeft: {
    flex: 0,
    padding: '16px',
  },
  upperRight: {
    flex: 1,
    padding: '16px',
  },
  verticalDivider: {
    width: '2px',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), transparent)',
    margin: '8px 0',
    height: '100%',
    alignSelf: 'stretch',
  },
  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // padding: '8px 0',
    width: "100%",
    // backgroundColor: '#f0f0f0',
  },
  bannerLine: {
    flex: 1,
    border: 0,
    borderTop: '1px solid gray',
    margin: '0 8px',
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: 'MillenniumBold',
  },
  lower: {
    display: 'flex',
    flex: 1,
  },
  lowerSection: {
    flex: 1,
    padding: '16px',
    borderRight: '1px solid gray',
  },
   projectLinksContainer: {
        flexDirection: 'column',
        width: '100%',
        display: 'flex',
        flex: 1,
    },
    projectLink: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 20px',
      marginBottom: '16px',
      backgroundColor: 'white',
      boxShadow: '7px 7px 2px 1px rgba(0, 15, 6, 0.2)',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      textDecoration: 'none',
      fontFamily: 'MillenniumBold',
    },
    projectText: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    projectLinkImage: {
      width: 40,
      height: 40,
      objectFit: 'contain',
    },
    projectLinkLeft: {
        marginLeft: 16,
        alignItems: 'center',
    },
    computerIcon: {
        width: 56,
        height: 56,
    },
    musicIcon: {
        width: 48,
        height: 48,
    },
    arrowIcon: {
        width: 48,
        height: 48,
    },
    artIcon: {
        width: 21 * 2,
        height: 37 * 2,
    },
    projectTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '4px',
    },

    projectSubtitle: {
      fontSize: '14px',
      color: '#555',
    },
};

export default Projects;


