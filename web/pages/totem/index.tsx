import { createRef, useEffect, useRef, useState } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import Page from '@/components/Page';
import Api from '@/lib/api';
import Location from '@/interfaces/client/Location';
import LocationPopupModal from '@/components/LocationPopupModal';

declare const window: any;

export default function Home() {
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const map = useRef<any | null>(null); // window.google.maps.Map
  const mapsWrapperRef = createRef<HTMLDivElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line no-unused-vars
  function addMarker(location: Location, onClick?: (loc: Location) => void) {
    const marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(
        location.coords.lat,
        location.coords.lng,
      ),
      map: map.current!,
      icon: `/static/img/maps/${location.icon}.png`,
      optimized: false,
    });

    marker.addListener('click', () => {
      (onClick || (() => {}))(location);
    });
  }

  async function setupMap() {
    // TODO: get from API
    const response = fetch('/static/geojson/tocantins.json');
    const data = await response.then((e) => e.json());
    const { result: locations } = await Api.getLocations();
    const { geojson } = data[0];

    const statePolygon = geojson.coordinates[0].map((e: any) => ({
      lat: e[1],
      lng: e[0],
    }));
    const everythingElse = [
      new window.google.maps.LatLng(-60.728709604882134, -104.00315654464303),
      new window.google.maps.LatLng(20.031895140215774, -105.05784421973577),
      new window.google.maps.LatLng(18.205047927112716, -18.221912898007993),
      new window.google.maps.LatLng(-65.70500424424893, -10.663319135501373),
    ]; // poor crop of Brazil

    // eslint-disable-next-line no-new
    new window.google.maps.Polygon({
      paths: [everythingElse, statePolygon],
      map: map.current,
      strokeColor: '#121212aa', // Customize polygon appearance
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#121212aa',
      fillOpacity: 1,
    });

    if (locations) {
      locations.forEach((location) => {
        addMarker(location, (l) => {
          console.log(l);
          setSelectedLocation(l);
          onOpen();
        });
      });
    }
  }

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

    map.current = new window.google.maps.Map(mapsWrapperRef.current, {
      center: bounds.getCenter(),
      zoom: 0,
      mapTypeId: 'terrain',
      restriction: {
        latLngBounds: bounds,
        strictBounds: false,
      },
    });

    (async () => {
      // reference: https://nominatim.openstreetmap.org/search.php?q=Tocantins,%20Região%20Norte,%20Brasil&polygon_geojson=1&format=jsonv2
      await setupMap();
    })();
  }, [isMapsLoaded]);

  return (
    <Page padding={0}>
      <LocationPopupModal
        location={selectedLocation}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Box ref={mapsWrapperRef} height="100vh" width="100vw" />
    </Page>
  );
}
