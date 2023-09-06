'use client';
import dynamic from 'next/dynamic';
import {useMemo} from 'react';
import {Loader2} from 'lucide-react';

import {useStateStore} from '@/store/useStateStore';
// import DynamicMap from './DynamicMap';
// import ClickMarker from './ClickMarker';
import AnchorPoint from './AnchorPoint';

export default function Map({center}: {center: number[]}) {
  const {markerLocations} = useStateStore((state) => state);
  const DynamicMap = useMemo(
    () =>
      dynamic(() => import('./DynamicMap'), {
        ssr: false,
        loading: () => <Loader2 className='h-[10%] w-[10%] animate-spin' />,
      }),
    []
  );
  const ClickMarker = useMemo(
    () =>
      dynamic(() => import('./ClickMarker'), {
        ssr: false,
      }),
    []
  );
  return (
    <DynamicMap center={center}>
      <AnchorPoint />
      {markerLocations.map((markerLocation: number[], i: number) => (
        <ClickMarker key={i} markerLocation={markerLocation} />
      ))}
    </DynamicMap>
  );
}
