'use client';

import dynamic from 'next/dynamic';
import {useState, useMemo, createContext, useContext, useEffect} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {useMapEvents} from 'react-leaflet';

import {Button} from '@/components/ui/button';
import Graph from '@/components/graph/Graph';
import Navbar from '@/components/navbar/Navbar';

function url(lon: number, lat: number) {
  let r = Math.trunc((90 - lat) * 12) + 1;
  let c = Math.trunc((lon + 180) * 12) + 1;
  let url = 'https://worldclim.org/maps/wapi/' + r + '/' + c + '.json';
  return url;
}
const position = [51.5074, -0.1272];
const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 800;
export const SetMarkerContext = createContext({} as any);

const ClickMarker = ({Marker, Popup, markerLocation}: {Marker: any; Popup: any; markerLocation: number[]}) => {
  const {setMarkerLocations, setMarkerNumber} = useContext(SetMarkerContext);
  const map = useMapEvents({
    click(e) {
      setMarkerLocations([[e.latlng.lat, e.latlng.lng]]);
      // map.flyTo(e.latlng);
    },
  });
  return (
    <Marker position={markerLocation as L.LatLngExpression}>
      <Popup>
        <div className='flex justify-center items-center flex-col text-sm'>
          <div>{`lat: ${markerLocation[0]}`}</div>
          <div className='leaflet-popup-content-wrapper'>{`lng: ${markerLocation[1]}`}</div>
          <div className='leaflet-popup-tip hidden' />
          <Button
            variant={'destructive'}
            onClick={(e) =>
              setMarkerLocations((markersArray: number[][]) => {
                const markersArrayFiller = [];
                for (let i = 0; i < markersArray.length; i++) {
                  if (markersArray[i][0] !== markerLocation[0] || markersArray[i][1] !== markerLocation[1])
                    markersArrayFiller.push(markersArray[i]);
                  break;
                }
                setMarkerNumber(markersArrayFiller.length);
                e.stopPropagation();
                return markersArrayFiller;
              })
            }
          >
            Delete
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/map/DynamicMap'), {
        ssr: false,
      }),
    []
  );
  const [markerLocations, setMarkerLocations] = useState([position]);
  const [markerNumber, setMarkerNumber] = useState(1);

  return (
    <SetMarkerContext.Provider value={{setMarkerLocations, setMarkerNumber}}>
      <Navbar />
      <div className='flex h-full flex-row items-center'>
        <div className='grid gap-4 grid-cols-2'>
          <div style={{aspectRatio: DEFAULT_WIDTH / DEFAULT_HEIGHT}} className='flex items-center z-0'>
            <Map center={position}>
              {({TileLayer, Marker, Popup}: any) => (
                <>
                  <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {markerNumber > 0 &&
                    markerLocations.map((markerLocation, i) => (
                      <ClickMarker key={i} Marker={Marker} Popup={Popup} markerLocation={markerLocation} />
                    ))}
                </>
              )}
            </Map>
          </div>
          <Graph />
        </div>
      </div>
    </SetMarkerContext.Provider>
  );
}
