import React, {useRef, useState} from "react";
// import { Wrapper } from "@googlemaps/react-wrapper";
export default function MapComponent(){
  // const ref = React.useRef(null);
  const ref = useRef({    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11 });
  const [map, setMap] = useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      console.log(ref)
      console.log(ref.current)
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return <div ref={ref} className="map" style={{ width: "500px", height: "400px" }}/>

  // return          <Map
  //   center={center}
  //   onIdle={onIdle}
  //   zoom={10}
  //   style={{ flexGrow: "1", height: "100%" }}
  // />

}