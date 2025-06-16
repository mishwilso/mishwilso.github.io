import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

export interface LinkProps {
    text: string;
    to: string;
    containerStyle?: React.CSSProperties;
    outsideTo?: string;
}

declare interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

const Link: React.FC<LinkProps> = (props) => {
    const navigate = useNavigate();

    // get current location of react router
    const location = useLocation();
    const [isHere, setIsHere] = useState(false);

    // if current path is the same as the link path
    useEffect(() => {
        if (location.pathname === `/${props.to}`) {
            setIsHere(true);
        } else {
            setIsHere(false);
        }
        return () => {};
    }, [location, props.to]);

    const [active, setActive] = useState(false);

    const handleClick = (e: any) => {
        let isMounted = true;
        e.preventDefault();
        setActive(true);
        if (location.pathname !== `/${props.to}`) {
            setTimeout(() => {
                if (isMounted) navigate(`/${props.to}`);
            }, 100);
        }
        let t = setTimeout(() => {
            if (isMounted) setActive(false);
        }, 100);

        return () => {
            isMounted = false;
            clearTimeout(t);
        };
    };

    return (
        <RouterLink
            to={`/${props.to}`}
            onMouseDown={handleClick}
            style={props.containerStyle ?? styles.link}
        >
            <h4
                className="router-link"
                style={{
                    ...(props.containerStyle ?? styles.link),
                    ...(active ? { color: 'white' } : {}),
                }}
            >
                {props.text}
            </h4>
        </RouterLink>
    );
};

const styles: StyleSheetCSS = {
    link: {
        cursor: 'pointer',
        fontWeight: 'bolder',
        textDecoration: 'underline',
        fontFamily: 'MillenniumBold',
        color: '#566728'
    },
    hereIndicator: {
        width: 4,
        height: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: 'rgb(85, 26, 139)',
        alignSelf: 'center',
        borderRadius: '50%',
        marginRight: 6,
        textDecoration: 'none',
    },
};

export default Link;