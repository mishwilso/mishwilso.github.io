import React from 'react';
import { useEffect } from 'react';
import Link from '../components/general/Link';
import { initMarkerCircle } from '../components/general/CircleEffect';
import $ from 'jquery';


import { useNavigate } from 'react-router';

export interface HomeProps {}



declare interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate();

    const goToContact = () => {
        navigate('/contact');
    };

    useEffect(() => {
        initMarkerCircle();
        }, []);

    return (
        <div className="site-page-content" style={styles.window}>
            <div style={styles.page}>
                <div style={styles.contentWrapper}>
                    {/* <img src="../art/star1.png" style={{ ...styles.asset, top: '10%', left: '5%' }} alt="star" />
                    <img src="../art/swirl.png" style={{ ...styles.asset, top: '0%', right: '5%' }} alt="swirl" />
                    <img src="../art/arrow.png" style={{ ...styles.asset, top: '60%', left: '8%' }} alt="arrow" />
                    <img src="../art/handstar1.png" style={{ ...styles.asset, top: '30%', left: '40%' }} alt="handstar1" />
                    <img src="../art/handstar2.png" style={{ ...styles.asset, top: '35%', right: '30%' }} alt="handstar2" />
                    <img src="../art/handstar3.png" style={{ ...styles.asset, top: '45%', left: '50%' }} alt="handstar3" />
                    <img src="../art/emphasis.png" style={{ ...styles.asset, top: '42%', left: '30%' }} alt="emphasis" /> */}
                    
                    <div style={styles.header}>
                        <h1 style={styles.firstname}>Mish</h1>
                        <h1 style={styles.lastname}>Wilson</h1>
                        <h2 style={styles.subhead}>
                        <span className="marker" style={{zIndex:1, display: '-webkit-inline-box',}}>Software</span>
                        <span> Developer </span>
                        </h2>
                    </div>
                    <div style={styles.buttons}>
                        <Link containerStyle={styles.link} to="about" text="ABOUT" />
                        <Link containerStyle={styles.link} to="experience" text="EXPERIENCE" />
                        <Link containerStyle={styles.link} to="projects" text="PROJECTS" />
                        <Link containerStyle={styles.link} to="contact" text="CONTACT" />
                        
                    </div>

                    <div style={styles.footer}>
                        <img src="../art/foliage.png" style={styles.foliage} alt="foliage" />

                        <img src="../art/stickynote.png" style={styles.stickynote} alt="note" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    
    window: {
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        // overflow: 'hidden'
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    contentWrapper: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 55,
    },
    header: {
        display: 'flex',
        flexDirection: 'column',

        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',

        gap: 4,
    },
    footer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
    buttons: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        width: 800,
    },
    link: {
        padding: 16,
        cursor: 'pointer',
        fontWeight: 'bolder',
        textDecoration: 'underline',
        fontFamily: 'MillenniumBold',
        color: '#566728',
        zIndex: 10
    },
    nowHiring: {
        backgroundColor: 'red',
        padding: 16,
    },
    forHireContainer: {
        marginTop: 64,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    firstname: {
        fontSize: 'clamp(36px, 8vw, 72px)',
        marginBottom: 16,
        lineHeight: 0,
        fontFamily: 'Pixelout',
    },
    lastname: {
        fontSize: 'clamp(36px, 8vw, 72px)',
        marginBottom: 16,
        lineHeight: 0,
        fontFamily: 'Pixelout',
    },
    subhead: {
        fontFamily: 'MillenniumBold',
        marginTop: 20,
    },
    
    textChunk: {
    display: 'inline-block',
    position: 'relative', // Needed so SVG inside marker is absolutely positioned correctly
    },
    foliage: {
        position: 'absolute',
        bottom: -20,
        width: '100%',
        zIndex: 0,
    },
    stickynote: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 200,
        zIndex: 2,
    },
    asset: {
        position: 'absolute',
        width: 80,
        zIndex: 1,
        pointerEvents: 'none'
    }
};

export default Home;