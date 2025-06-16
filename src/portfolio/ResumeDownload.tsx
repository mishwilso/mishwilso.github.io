import React from 'react';
import PixelSpeechBubble from './PixelSpeechBubble';

export interface ResumeDownloadProps {
    altText?: string;
}

declare interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    return (
        <div style={styles.resumeContainer}>
            <img style={styles.resumePrinter} src={"/printer.gif"} />
            {/* <div style={styles.resumeContainerText}>
                <h3 style={styles.h3}>{altText ? altText : 'Looking for my resume?'}</h3>
                <a rel="noreferrer" target="_blank" href='./Henry_Heffernan_S22_Resume.pdf'>
                    <p style={styles.p}>Click here to download it!</p>
                </a>
                
            </div> */}
            <PixelSpeechBubble text="Wanna see my!" />
        </div>
    );
};

const styles: StyleSheetCSS = {

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
        border: '2px solid black',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        width: '100%',
        alignItems: 'center',
    },
    resumeContainerText: {
        flexDirection: 'column',
    },
    resumePrinter: {
        width: 60,
        height: 48,
        paddingRight: 24,
    },
};

export default ResumeDownload;