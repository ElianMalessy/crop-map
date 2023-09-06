'use client';
import {Marker, Popup} from 'react-leaflet';

import {Button} from '@/components/ui/button';
import {useStateStore} from '@/store/useStateStore';

const ClickMarker = ({markerLocation}: {markerLocation: number[]}) => {
  const {markerLocations, setMarkerLocations, setMarkerNumber} = useStateStore((state) => state);

  return (
    <Marker position={markerLocation as L.LatLngExpression}>
      <Popup>
        <div className='flex justify-center items-center flex-col text-sm'>
          <div>{`lat: ${markerLocation[0]}`}</div>
          <div className='leaflet-popup-content-wrapper'>{`lng: ${markerLocation[1]}`}</div>
          <div className='leaflet-popup-tip hidden' />
          <Button
            variant={'destructive'}
            onClick={(e) => {
              for (let i = 0; i < markerLocations.length; i++) {
                if (markerLocations[i][0] === markerLocation[0] && markerLocations[i][1] === markerLocation[1]) {
                  markerLocations.splice(i, 1);
                  break;
                }
              }
              setMarkerLocations(markerLocations);
              setMarkerNumber(markerLocations.length);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};
export default ClickMarker;
