import { NextApiRequest, NextApiResponse } from 'next';

async function get(url: string) {
  return fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // defaults to maps
  const url = `https://maps.googleapis.com/${req.url!.substring(5)}`;
  let content = await get(url).then((e) => e.text());

  if (url.includes('js?key=')) {
    // hint: search for maps-api-v3
    // the base addr will be prepended to routes like common.js, util.js, etc
    content = content.replace('https://maps.googleapis.com/maps-api-v3/api/js/54/5', `${process.env.SELF_HOST}/api/maps-api-v3/api/js/54/5`);
  }

  if (url.includes('common.js')) {
    // check maps_projeto_de_sistema.txt for instructions
    content = content.replace('document.location&&document.location.href||window.location.href', '"https://geo-devrel-javascript-samples.web.app/samples/polygon-simple/app/dist/"');
  }

  return res.status(200).setHeader('Content-Type', 'text/javascript; charset=UTF-8').send(content);
}
