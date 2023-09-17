import { Box } from '@chakra-ui/react';
import { createRef, useEffect, useRef, useState } from 'react';

declare const window: any;

interface MapMarkableOptions {
  onChange?: (lat: number, lng: number) => void;
  height?: number;
}

export default function MapMarkable({
  onChange = () => {},
  height = 240,
}: MapMarkableOptions) {
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const map = useRef<any | null>(null); // window.google.maps.Map
  const mapsWrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    function check() {
      if (window.google && window.google.maps) {
        setIsMapsLoaded(true);
      } else {
        setTimeout(check, 500);
      }
    }

    check();
  }, []);

  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(-12.986415299965508, -50.93348386989304),
      new window.google.maps.LatLng(-5.165528466496444, -45.57523299801729),
    );

    const marker = new window.google.maps.Marker({
      position: { lat: 0, lng: 0 },
    });

    map.current = new window.google.maps.Map(mapsWrapperRef.current, {
      center: bounds.getCenter(),
      zoom: 0,
      mapTypeId: 'terrain',
      mapTypeControlOptions: {
        mapTypeIds: [],
      },
      streetViewControl: false,
      restriction: {
        latLngBounds: bounds,
        strictBounds: false,
      },
    });

    map.current!.addListener('click', (e: any) => {
      const { latLng } = e;
      const lat = latLng.lat();
      const lng = latLng.lng();

      marker.setMap(null);
      marker.setPosition({ lat, lng });
      marker.setMap(map.current);
      onChange(lat, lng);
    });
  }, [isMapsLoaded]);

  return (
    <Box width="100%" height={height}>
      <Box ref={mapsWrapperRef} width="100%" height={height} borderRadius={5}>
        {' '}
      </Box>
    </Box>
  );
}
