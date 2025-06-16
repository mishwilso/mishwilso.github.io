import React from 'react';

const PixelSpeechBubble: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={styles.resumeContainer}>
            <img style={styles.resumePrinter} src={"/printer.gif"} />
    <div className="speech-bubble-container">
    <div className="pixel-speech-bubble-arrow"></div>

        <div className="pixel-speech-bubble">
            <div className="bub-part-a"></div>
            <div className="bub-part-b"></div>
            <div className="bub-part-c"></div>
            <div className="speech-txt">
                <div style={styles.resumeContainerText}>
                    <h3 style={styles.h3}>'Looking for my resume?'</h3>
                    <a rel="noreferrer" target="_blank" href='./Henry_Heffernan_S22_Resume.pdf'>
                        <p style={styles.p}>Click here to download it!</p>
                    </a>
                </div>
            </div>
            <div className="bub-part-c"></div>
            <div className="bub-part-b"></div>
            <div className="bub-part-a"></div>
        </div>
    </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
    resumeContainerText: {
        flexDirection: 'column',
    },
    h3: {
    fontFamily: 'MillenniumBold',
    margin: 0,
    fontSize: 20,
    },
    p: {
    fontFamily: 'Millennium',
    fontSize: 12,
    margin: 0,
    },
    resumeContainer: {
        display: 'flex',
        flexDirection:'row',
        backgroundColor: 'white',
        padding: 12,
        boxSizing: 'border-box',
        // border: '2px solid black',
        // borderLeftWidth: 0,
        // borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
    },
    resumePrinter: {
        width: 60,
        height: 48,
        paddingRight: 24,
    },
}

export default PixelSpeechBubble;
