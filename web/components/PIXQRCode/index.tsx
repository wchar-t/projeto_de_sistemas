import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import QRCode from 'qrcode';
import Api from '@/lib/api';

interface PIXQRCodeOptions {
  onSuccess?: () => void;
  seed: string;
}

export default function PIXQRCode({ onSuccess, seed }: PIXQRCodeOptions) {
  // we are just simulating sales, mr. hacker
  const [imgSrc, setImgSrc] = useState('');
  const [isDone, setIsDone] = useState(false);

  async function check() {
    const response = await Api.getPix(btoa(seed));

    if (response.error) {
      return;
    }

    onSuccess?.();
    setIsDone(true);
  }

  useEffect(() => {
    const currentSeed = ` ${seed}`.slice(1);
    const interval = setInterval(check, 5000);

    setTimeout(async () => {
      if (currentSeed !== seed) return;

      const url = `${window.location.origin}/api/pix/${btoa(seed)}/new`;
      const src = await QRCode.toDataURL(url, {
        margin: 2,
        scale: 10,
      });
      setImgSrc(src);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seed]);

  return (
    <Box w="100%" position="relative" aspectRatio={1}>
      <Box
        position="absolute"
        borderRadius={10}
        w="100%"
        h="100%"
        bg="#2ecc71"
        display="flex"
        justifyContent="center"
        alignItems="center"
        transition=".1s all"
        opacity={isDone ? 0.98 : 0}
      >
        <img
          src="/static/img/checkmark.svg"
          style={{
            borderRadius: 10,
            height: 120,
            width: 120,
            padding: 30,
            WebkitBorderRadius: '50%',
            background: '#26aa5e',
          }}
        />
      </Box>
      {imgSrc ? (
        <img src={imgSrc} alt="QR Code" style={{ borderRadius: 10 }} />
      ) : null}
    </Box>
  );
}
