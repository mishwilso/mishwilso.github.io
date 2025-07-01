import React from 'react';
import Banner from '../components/general/Banner';
import { initMarkerCircle } from '../components/general/CircleEffect';
import { useEffect } from 'react';
import { useDesktop } from '../components/Desktop/DesktopContext';


const About: React.FC = () => {
  const { launchWindow } = useDesktop();
  useEffect(() => {
        initMarkerCircle();
        }, []);

  return (
    <div className="site-page-content" style={styles.container}>
      <div className="page-background">
      {/* Upper Half */}
      <div style={styles.upper}>
        <div style={styles.upperLeft}>
            <div className="item">
                <div className="polaroid">
                    <img src="../me/me_master.jpg"/> 
                    <div className="caption">Photo of Me and my Master's Degree</div>
                    {/* <div className='subcaption'>After graduating I took a lot of silly photos, this is just one of many!</div> */}
                </div>
            </div>
        </div>
        <div style={styles.verticalDivider} />
        <div style={styles.upperRight}>
            <h1 style={{fontFamily: 'Pixelout', marginBottom: 20, fontSize: '4rem'}} >Hello!</h1>
            <h2 style={{fontFamily: 'MillenniumBold', marginTop: 0, marginBottom: 0, fontSize: '1.5rem'}}>I'm <span className="marker" style={{zIndex:1, display: '-webkit-inline-box', fontSize: '1.5rem'}}>Mish Wilson </span> :)</h2>
          <p style={{fontFamily: 'Millennium', marginTop: 20, fontSize: 18}} > 
            I’m a Computer Science graduate of the University of Vermont.  
          I’ve always wanted to build a website to showcase my work,  
          and was inspired by Henry Heffernan and the creators of the Window93 project.  
          This page is a work in progress, but the Portfolio section  
          is already up and running. Questions? Looking to hire me?  
          Shoot me an email at{' '}
          <a href="mailto:mishwilsonk@gmail.com" style={styles.link}>
            mishwilsonk@gmail.com </a>
          </p>
        </div>
      </div>

      {/* Divider with Banner */}
      {/* <PixelSpeechBubble text="Wanna see my!"/>  */}

      <Banner text="Want to see my resume? Click here!" onClick={() => launchWindow('resume')}/>

      {/* Lower Half */}
      <div style={styles.lower}>
        <div style={styles.lowerSection}>
          <h3 style={{ fontFamily: 'MillenniumBold', marginBottom: 8 , marginTop: 0 , textAlign: 'center'}}> About Me</h3>

          <p style={styles.paragraph}>
          I’ve loved computers since I was a kid growing up in Jamaica.  
          Back then, access was limited and I dove into every book and tutorial I could find.  
          After high school I moved to the States, dove into computer science,  
          and today I hold a Master’s in CS. It’s a dream come true:  
          I finally have the skills to build the projects my younger self  
          could only imagine.
        </p>
        <p style={styles.paragraph}>
          What really drives me now is the chance to solve real-world problems with code.  
          Whether it's writing a script to help me organize, crafting an intuitive UI, or  
          exploring new coding languages, I’m excited by every challenge. In grad school,  
          I fell in love with privacy-preserving systems that  
          let organizations collaborate without exposing sensitive data. Which drove me to write a 
          paper of DP Quantile Algorithms. When I’m not coding,  
          you’ll find me tinkering with side-projects, playing video games, or sharing  
          my knowledge with the next generation through teaching and mentorship.
        </p>
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), transparent)',
          }} />
        </div>

        <div style={styles.lowerSection}>
            <h3 style={{ fontFamily: 'MillenniumBold', marginBottom: 8 , marginTop: 0 , textAlign: 'center'}}> Education</h3>

            <div style={{ marginBottom: 12 }}>
                <div style={{  display: 'flex', flexDirection: 'row'}}>
                  <div style={styles.star}></div> 
                  <p style={{fontFamily: 'Millennium', marginTop: 5, marginBottom: 0 ,fontSize: 18, color:'#8a8f3e'}}> 2024 - 2025</p>
                </div>
                <p style={{fontFamily: 'MillenniumBold', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>University of Vermont</p><br />
                <p style={{fontFamily: 'Millennium', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>M.S. in Computer Science</p>
                <p style={{fontFamily: 'Millennium', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>GPA: 3.84 | CEMS Computer Science Student Spotlight</p>
            </div>

            <div style={{ marginBottom: 12 }}>
                <div style={{  display: 'flex', flexDirection: 'row'}}>
                  <div style={styles.star}></div> 
                  <p style={{fontFamily: 'Millennium', marginTop: 5, marginBottom: 0 ,fontSize: 18, color:'#8a8f3e'}}> 2021 - 2024</p>
                </div>
                <p style={{fontFamily: 'MillenniumBold', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>University of Vermont</p><br />
                <p style={{fontFamily: 'Millennium', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>B.S. in Computer Science</p>
                <p style={{fontFamily: 'Millennium', marginTop: 0, marginBottom: 0, marginLeft: 30, fontSize: 15}}>GPA: 3.89 | Dean’s List (All Semesters)</p>
            </div>

            <div style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3), transparent)',
            }} />
        </div>

        <div style={styles.lowerSection}>
            <h3 style={{ fontFamily: 'MillenniumBold', marginBottom: 8, marginTop: 0 , textAlign: 'center'}}> Technical Skills</h3>
            {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> */}
            <div style={{alignContent: 'center'}}>
              <div style={styles.skillsGrid}>
                <div><img src="../art/python.png" style={{ width: 48 }} /></div>
                <div><img src="../art/c++.png" style={{ width: 48 }} /></div>
                <div><img src="../art/html.png" style={{ width: 48 }} /></div>
                <div><img src="../art/sql.png" style={{ width: 48 }} /></div>
                <div><img src="../art/c_sharp.png" style={{ width: 48 }} /></div>
                <div><img src="../art/java.png" style={{ width: 48 }} /></div>
                <div><img src="../art/typescript.png" style={{ width: 48 }} /></div>
              </div>
            </div>
            <h3 style={{ fontFamily: 'MillenniumBold', marginBottom: 8, marginTop: 0, textAlign: 'center' }}>Personal Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' , justifyContent: 'center'}}>
              <span style={styles.hobbyChip}>Creative Problem Solver</span>
              <span style={styles.hobbyChip}>Detail-Oriented</span>
              <span style={styles.hobbyChip}>Strong Communicator</span>
              <span style={styles.hobbyChip}>Self-directed</span>
              <span style={styles.hobbyChip}>Adaptable</span>
              <span style={styles.hobbyChip}>Team PLayer</span>
            </div>


        </div>

      </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingTop: 64,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  banner: {
    padding: 0,
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
  background: 'linear-gradient(to bottom, transparent, rgba(149,153,90,0.7), transparent)',
  margin: '8px 0',
  height: '100%',
  alignSelf: 'stretch',
},

  // bannerContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   // padding: '8px 0',
  //   width: "100%",
  //   // backgroundColor: '#f0f0f0',
  // },
  // bannerLine: {
  //   flex: 1,
  //   border: 0,
  //   borderTop: '1px solid gray',
  //   margin: '0 8px',
  // },
  // bannerText: {
  //   fontWeight: 'bold',
  //   fontSize: '14px',
  //   fontFamily: 'MillenniumBold',
  // },
  lower: {
    display: 'flex',
    flex: 1,
  },
  lowerSection: {
    flex: 1,
    padding: '16px',
    position: 'relative', 
  },
  hobbyChip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 1)',
    borderRadius: '12px',
    padding: '6px 12px',
    fontSize: '14px',
    fontFamily: 'Millennium',
    },
  skillsGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 0fr)', // ← 4 equal columns
  columnGap: '30px', // unified row + column gap
  rowGap: '10px',
  marginBottom: 16,
  alignItems: 'center',
  justifyContent: 'center'
},

skillColumn: {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
},

skillTag: {
  fontSize: 10,
  fontFamily: 'MillenniumBold',
  backgroundColor: '#f4f4f4',
  padding: '6px 12px',
  borderRadius: '8px',
  width: '100%',
  borderLeft: '4px solid #4caf50',
},
 star: {
  width: '30px',
  height: '30px',
  backgroundColor: '#8a8f3e',
  clipPath: 'polygon(50% 5%,57% 35%,75% 25%,65% 43%,95% 50%,65% 57%,75% 75%,57% 65%,50% 95%,43% 65%,25% 75%,35% 57%,5% 50%,35% 43%,25% 25%,43% 35%)',  
},

};

export default About;


