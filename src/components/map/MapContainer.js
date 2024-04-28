import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "../mapComponent/MapComponent";

export default function MapContainer({children}){
  const apiKey = "AIzaSyCZk_EPVq4DxVNKwjBA7OcCLwZKKJb1HOk";
  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }
  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
}

// import React, { useRef, useEffect, useCallback } from 'react';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
//
// const MapContainer = ({ onMarkerClick }) => {
//   const ref = useRef(null);
//   const map = useRef(null);
//
//   useEffect(() => {
//     if (ref.current && !map.current) {
//       map.current = new window.google.maps.Map(ref.current, {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//       });
//     }
//   }, []);
//
//   useEffect(() => {
//     if (map.current) {
//       const marker = new window.google.maps.Marker({
//         position: { lat: -34.397, lng: 150.644 },
//         map: map.current,
//         title: "Hello World!"
//       });
//
//       marker.addListener("click", (event) => {
//         console.log(event.latLng.lat())
//         onMarkerClick("Marker was clicked!");
//       });
//     }
//   }, [onMarkerClick]);
//
//   return <div ref={ref} style={{ width: "100%", height: "400px" }} />;
// };
//
// // const MyMapApp = () => {
// //   const handleMarkerClick = useCallback((message) => {
// //     alert(message);
// //   }, []);
// //
// //   return (
// //     <Wrapper apiKey={"YOUR_API_KEY"} render={status => {
// //       if (status === Status.LOADING) return <div>Loading...</div>;
// //       if (status === Status.FAILURE) return <div>Error loading maps</div>;
// //       return <MapContainer onMarkerClick={handleMarkerClick} />;
// //     }} />
// //   );
// // }
//
// export default MapContainer;
//
