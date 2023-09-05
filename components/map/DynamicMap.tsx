import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import {useEffect} from 'react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

const {MapContainer} = ReactLeaflet;

function Map({children, center}: {children: any; center: number[]}) {
  useEffect(() => {
    (async function init() {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: markerIcon.src,
        iconRetinaUrl: markerIcon2x.src,
        shadowUrl: markerShadow.src,
      });
    })();
  }, []);

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={true}
      className='h-[600px] w-[600px] rounded-lg'
    >
      {children(ReactLeaflet, L)}
    </MapContainer>
  );
}

export default Map;
