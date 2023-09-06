import {NextResponse} from 'next/server';

function url(lat: number, lng: number) {
  let r = Math.trunc((90 - lat) * 12) + 1;
  let c = Math.trunc((lng + 180) * 12) + 1;
  let url = 'https://worldclim.org/maps/wapi/' + r + '/' + c + '.json';
  return url;
}
export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  if (!lat || !lng) return NextResponse.json({error: 'Bad Request'}, {status: 400});

  const res = await fetch(url(parseInt(lat), parseInt(lng)), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return NextResponse.json({data});
}
