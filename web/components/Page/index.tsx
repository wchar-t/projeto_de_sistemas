import { ReactNode } from 'react';
import styles from '@/styles/components/Page.module.css';

export default function Page({
  padding = 30,
  center = false,
  children,
}: {
  padding?: number;
  center?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div
          className={`${styles.content} ${
            center ? styles['center-content'] : ''
          }`}
          style={{ padding }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
