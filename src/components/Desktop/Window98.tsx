import '../../assets/css/98.css'
import '../../assets/css/index.css';
import '../../assets/css/prog.css';

import React, { useEffect, useRef, useState } from 'react';

interface WindowProps {
  id: string;
  title: string;
  width?: number;
  height?: number;
  zIndex: number;
  icon?: string;
  children: React.ReactNode;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onClose: () => void;
  onClick: () => void;
  maximized?: boolean; 
  bottomLeftText: string;
}

// export interface WindowProps {
//     closeWindow: () => void;
//     minimizeWindow: () => void;
//     onInteract: () => void;
//     width: number;
//     height: number;
//     top: number;
//     left: number;
//     windowTitle?: string;
//     bottomLeftText?: string;
//     rainbow?: boolean;
//     windowBarColor?: string;
//     windowBarIcon?: IconName;
//     onWidthChange?: (width: number) => void;
//     onHeightChange?: (height: number) => void;
// }

declare interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

const Window98: React.FC<WindowProps> = (props) => {

  const [zIndex] = useState(props.zIndex);
  const windowRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: props.width ?? 320, height: props.height ?? 240 });
  const prevSize = useRef(size);
  const prevPosition = useRef(position);

  const offset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDownDrag = (e: React.MouseEvent) => {
    if (props.maximized) return;
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    props.onClick();
    e.stopPropagation();
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    if (props.maximized) return;
    setResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    props.onClick();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
    if (resizing) {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      setSize({
        width: Math.max(200, resizeStart.current.width + dx),
        height: Math.max(120, resizeStart.current.height + dy),
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing]);

  return (
    <div
      ref={windowRef}
      className="window"
      data-window
      data-_wm_id={props.id}
      style={{
        ...styles.window,
        top: props.maximized ? 0 : position.y,
        left: props.maximized ? 0 : position.x,
        width: props.maximized ? 'calc(100vw - 11px)' : size.width,
        height: props.maximized ? 'calc(100vh - 39px)' : size.height,
        zIndex: props.zIndex,
      }}
      onMouseDown={props.onClick}
    >
      <div className="title-bar" style={styles.titleBar} onMouseDown={handleMouseDownDrag}>
        <div style={styles.titleBarLeft}>
          {props.icon && <img src={props.icon} alt="" style={styles.icon} />}
          <span className="title-bar-text" style={styles.titleText}>{props.title}</span>
        </div>
        <div className="title-bar-controls" style={styles.titleBarControls}>
            
          {props.onMinimize && (
            <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); props.onMinimize(); }} />
          )}
          {props.onMaximize && (
            <button
                aria-label={props.maximized ? "Restore" : "Maximize"}
                onClick={(e) => {
                e.stopPropagation();
                if (!props.maximized) {
                    prevSize.current = size;
                    prevPosition.current = position;
                } else {
                    setSize(prevSize.current);
                    setPosition(prevPosition.current);
                }
                props.onMaximize();
                }}
            />
            )}
          <button aria-label="Close" onClick={(e) => { e.stopPropagation(); props.onClose(); }} />
        </div>
      </div>
      <div className="contentOuter" style={styles.contentOuter}>
        <div className="contentInner" style={styles.contentInner}>
      <div className="window-body" style={styles.body}>
        {props.children}
      </div>
      <div className="window-bottom-text" style={styles.bottomText}>
            {props.bottomLeftText}
        </div>
        </div>
      </div>
        

      <div
        className="window-resize-handle"
        style={styles.resizeHandle}
        onMouseDown={handleMouseDownResize}
      />
    </div>
  );
};

export default Window98;
export type { WindowProps };


// ✅ Henry-inspired inline style object
const styles: StyleSheetCSS = {
  window: {
    position: 'absolute',
    border: '2px solid black',
    backgroundColor: '#C0C0C0',
    boxShadow: 'inset -1px -1px #808080, inset 1px 1px white',
    overflow: 'hidden',
  },
  titleBar: {
    background: 'linear-gradient(to right, navy, #0000CD)',
    color: 'white',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 4px',
    userSelect: 'none',
    fontFamily: 'var(--font-ui)',
    fontSize: '13px',
  },
  titleBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  titleText: {
    fontWeight: 'bold',
  },
  titleBarControls: {
    display: 'flex',
    gap: '4px',
  },
  icon: {
    width: 16,
    height: 16,
  },
  contentOuter: {
    padding: 3,
    height: 'calc(100% - 20px)',
    boxSizing: 'border-box',
    border: `1px solid white`,
    borderTopColor: 'darkgray',
    borderLeftColor: 'darkgray',
    // flexGrow: 1,

    // marginTop: 8,
    // marginBottom: 8,
    // overflow: 'hidden',

  },
  contentInner: {
    width: '100%',
    height: '100%',
    // boxShadow: 'inset 1px 1px #fff, inset -1px -1px #808080',
    padding: 0,
    boxSizing: 'border-box',

    border: `1px solid lightgray`,
    borderTopColor: 'black',
    borderLeftColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    // height: 'calc(100% - 30px)',
    overflow: 'auto',
    padding: 0,
    margin: 1,
    // padding: '1px'
  },
  resizeHandle: {
    position: 'absolute',
    right: '2px',
    bottom: '2px',
    width: '14px',
    height: '14px',
    cursor: 'nwse-resize',
    backgroundImage: 'url(/img/resize-handle.png)',
    backgroundSize: 'cover',
  },

  bottomText: {
  backgroundColor: '#C0C0C0',
  borderTop: '1px solid #808080',
  padding: '1px 8px',
  fontSize: '11px',
  fontFamily: 'var(--font-ui)',
  lineHeight: '12px',
  color: '#000',
}
};
