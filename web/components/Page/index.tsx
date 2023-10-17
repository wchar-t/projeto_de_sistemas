import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import styles from '@/styles/components/Page.module.css';
import TopBar from '../TopBar';
import Api from '@/lib/api';

export default function Page({
  padding = 30,
  center = false,
  hcenter = false,
  hasTopBar = true,
  children,
}: {
  padding?: number;
  center?: boolean;
  hcenter?: boolean;
  hasTopBar?: boolean;
  children: ReactNode;
}) {
  function getClasses() {
    let classes = styles.content;
    if (center) {
      classes += ` ${styles['center-content']}`;
    }
    if (hcenter) {
      classes += ` ${styles['center-hcontent']}`;
    }
    return classes;
  }

  return (
    <div className={styles.page}>
      {hasTopBar ? <TopBar /> : null}
      <Box
        className={styles.main}
        marginTop={Api.getSession() && hasTopBar ? '60px' : 0}
      >
        <div className={`${getClasses()}`} style={{ padding }}>
          {children}
        </div>
      </Box>
    </div>
  );
}
