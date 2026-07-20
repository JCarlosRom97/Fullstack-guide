import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};


export default function Map({lat, lng}) {
    const center = {
        lat: lat,
        lng: lng,
    };
    return (
        <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
        >
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    );
}