import { Box, Text } from '@chakra-ui/react';
import styles from '@/styles/components/RoomSpotCard.module.css';

interface RoomSpotOptions {
  label: string;
  type: 'location-pin' | 'heat' | 'canyon' | 'mountains' | 'water';
  img: string;
  onClick?: () => void;
}

export default function RoomSpotCard({
  label,
  type,
  img,
  onClick,
}: RoomSpotOptions) {
  return (
    <Box className={styles.card} onClick={onClick}>
      <Box className={styles.background} data-type={type}>
        {' '}
      </Box>
      <Box className={styles.label}>
        <Text>{label}</Text>
      </Box>
      <img src={img} />
    </Box>
  );
}
