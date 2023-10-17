import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Location from '@/interfaces/client/Location';
import CheckoutDrawer from '../CheckoutDrawer';

interface LocationPopupModalOptions {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationPopupModal({
  location,
  isOpen,
  onClose,
}: LocationPopupModalOptions) {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [imageIndex, setImageIndex] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const bannerRef = useRef<HTMLImageElement>(null);

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      setImageIndex(
        imageIndex + 1 === location!.images.length ? 0 : imageIndex + 1,
      );
    }
    if (e.key === 'ArrowLeft') {
      setImageIndex(
        imageIndex - 1 < 0 ? location!.images.length - 1 : imageIndex - 1,
      );
    }
  }

  function dispose() {
    window.removeEventListener('keydown', onKeyDown);
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      dispose();
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (!bannerRef.current) {
      return;
    }

    bannerRef.current.style.opacity = '0';

    setTimeout(() => {
      bannerRef.current!.src = location!.images[imageIndex];
      setTimeout(() => {
        bannerRef.current!.style.opacity = '1';
      }, 300);
    }, 200);
  }, [imageIndex]);

  if (!location) {
    return null;
  }

  return (
    <>
      <CheckoutDrawer
        timestamp={timestamp}
        spotId={location.id}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      />
      <Modal
        onClose={() => {
          dispose();
          onClose();
        }}
        isOpen={isOpen}
        isCentered
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <Box
              position="absolute"
              width="100%"
              height="100px"
              marginTop="100px"
              background="linear-gradient(#121212 33%, #ffffff00);"
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              opacity={0.5}
            >
              {' '}
            </Box>
            <ModalCloseButton />
          </HStack>
          <ModalBody padding={0}>
            <Box width="100%" height="480px" display="flex">
              <Img
                ref={bannerRef}
                src={location.images[0]}
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                transition="all 0.2s ease"
              />
            </Box>
            <Box
              background="linear-gradient(#ffffff00 33%, #121212);"
              width="100%"
              height="100px"
              position="absolute"
              marginTop="-100px"
            >
              {' '}
            </Box>
            <VStack padding={15} alignItems="flex-start">
              <HStack width="100%" justifyContent="space-between">
                <HStack>
                  <Text fontSize={35} fontWeight={200}>
                    {location.title}
                  </Text>
                  <Text opacity={0.6} fontSize={16}>
                    ({location.subtitle})
                  </Text>
                </HStack>
                {location.price === 0 ? null : (
                  <HStack alignItems="baseline">
                    <HStack gap={0}>
                      <Text fontWeight={600} fontSize={20}>
                        R$
                      </Text>
                      <Text fontSize={20}>
                        {(location.price / 100).toFixed(2).replace('.', ',')}
                      </Text>
                    </HStack>
                    <Text fontSize={16}>
                      /{' '}
                      {location.priceFormat === 'entrada'
                        ? 'Entrada'
                        : 'Diária'}
                    </Text>
                  </HStack>
                )}
              </HStack>
              <Text textIndent="25px">{location.description}</Text>
              <Button
                colorScheme="purple"
                paddingX={45}
                w="100%"
                onClick={() => {
                  setTimestamp(new Date().getTime());
                  onDrawerOpen();
                  onClose();
                }}
                mt={35}
              >
                Comprar
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
