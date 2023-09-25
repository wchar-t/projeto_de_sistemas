import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import styles from '@/styles/components/Page.module.css';
import TopBar from '../TopBar';
import Api from '@/lib/api';

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
      <TopBar />
      <Box className={styles.main} marginTop={Api.getSession() ? '60px' : 0}>
        <div
          className={`${styles.content} ${
            center ? styles['center-content'] : ''
          }`}
          style={{ padding }}
        >
          {children}
        </div>
      </Box>
    </div>
  );
}
