import { useEffect, useState } from 'react';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import Page from '@/components/Page';
import RoomSpotCard from '@/components/RoomSpotCard';
import styles from '@/styles/rooms.module.css';
import Location from '@/interfaces/client/Location';
import Api from '@/lib/api';
import RoomSpotDrawer from '@/components/RoomSpotDrawer';

export default function Totems() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [spotId, setSpotId] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // TODO: fetch locations created by the user. Just add an id
    Api.getLocations(Api.getSession()?.id).then((response) => {
      setLocations(response.result ?? []);
    });
  }, []);

  return (
    <Page hcenter>
      <RoomSpotDrawer spotId={spotId} isOpen={isOpen} onClose={onClose} />
      <Box width="100%" maxWidth={1280}>
        <Text fontSize="3xl" mb={4}>
          Selecione um dos seus pontos
        </Text>
        <Box className={styles.cards}>
          {locations.map((e) => (
            <RoomSpotCard
              key={e.id}
              label={e.title}
              type={e.icon}
              img={e.images[0]}
              onClick={() => {
                setSpotId(e.id);
                onOpen();
              }}
            />
          ))}
        </Box>
      </Box>
    </Page>
  );
}
