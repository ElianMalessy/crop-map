import {useMapEvents} from 'react-leaflet';
import {useStateStore} from '@/store/useStateStore';

const AnchorPoint = () => {
  const {markerLocations, clicked, setMarkerLocations, setMarkerNumber, setClicked} = useStateStore((state) => state);

  const map = useMapEvents({
    click(e) {
      if (clicked) {
        markerLocations.push([e.latlng.lat, e.latlng.lng]);
        setMarkerLocations(markerLocations);
        setMarkerNumber(markerLocations.length);
        setClicked(false);
        return;
      }
      setMarkerLocations([[e.latlng.lat, e.latlng.lng]]);
      // map.flyTo(e.latlng);
    },
  });
  return <div className='hidden' />;
};
export default AnchorPoint;
