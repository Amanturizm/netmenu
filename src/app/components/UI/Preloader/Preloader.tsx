import React, { useEffect, useRef } from 'react';
import styles from './Preloader.module.css';

interface Props {
  scale?: number;
  margin?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const Preloader: React.FC<Props> = ({ scale, margin, color, align }) => {
  const preloaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (color && preloaderRef.current) {
      const preloaderDots = preloaderRef.current.children as unknown as HTMLDivElement[];
      for (let i = 0; i < preloaderDots.length; i++) {
        preloaderDots[i].style.background = color;
      }
    }
  }, [color]);

  return (
    <div style={{ textAlign: align }}>
      <div className={styles.lds_ellipsis} style={{ scale, margin }} ref={preloaderRef}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
