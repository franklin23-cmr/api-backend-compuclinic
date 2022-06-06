import GoogleMap from './GoogleMap';

export const Maps = ({ location }) => {
  const { longitude, latitude } = location.state;
  return (
    <div style={{ maxWidth: 800 }}>
      <GoogleMap longitude={longitude} latitude={latitude} />
    </div>
  );
};
