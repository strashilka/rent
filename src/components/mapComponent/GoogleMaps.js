import React, {useEffect, useRef, useState} from "react";
import {API} from "../../const/consts";
import "./GoogleMaps.css"

export default function GoogleMaps({locations, onChangeBounds, onMarkerClick}) {
  const ref = useRef(null);
  const [map, setMap] = React.useState();
  const [bounds, setBounds] = useState();

  useEffect(() => {
    if (ref.current) {
      let map = new window.google.maps.Map(ref.current, {
        center: API.defaultMapCenter,
        zoom: API.defaultMapZoom,
        mapId: API.markersMapID
      });

      map.setOptions({
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      });

      for (let i=0; i<locations.length; i++){
        let position = locations[i];
        const marker = new window.google.maps.Marker({
          position: { lat: position.lat, lng: position.lng },
          map: map,
          title: position.title,
        });

        marker.addListener("click", (event) => {
          onMarkerClick(event.latLng);
        });
      }
      setMap(map);
    }
  }, [ref]);

  useEffect(() => {
    console.log('CHANGE BOUNDS');
    if (bounds) {
      onChangeBounds(bounds)
    }

  }, [bounds])

  function handleClick(ev) {
    setBounds(map.getBounds());
  }

  function handleChange(ev) {
    console.log("CHANGE")
    console.log(ev)
  }

  return (
    <>
      <div
        ref={ref}
        style={{width: "500px", height: "400px"}}
        onClick={handleClick}
        onChange={handleChange}
      />
    </>
  );
};

