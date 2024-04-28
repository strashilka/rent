import React, {useEffect, useRef, useState} from "react";
import {API} from "../../const/consts";
import "./GoogleMaps.css"

export default function GoogleMaps({locations, onChangeBounds, onMarkerClick}) {
  // console.log(locations)
  const ref = useRef(null);
  const [map, setMap] = React.useState();
  const [bounds, setBounds] = useState();

  useEffect(() => {
    // Display the map
    if (ref.current) {
      console.log('make map')
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

      // add markers
      /*const marker = new window.google.maps.Marker({
        position: { lat: 46, lng: 35 },
        map: map.current,
        title: "Hello World!"
      });

      marker.addListener("click", (event) => {
        console.log(event.latLng.lat())
        onMarkerClick(event.latLng);
        alert("Marker was clicked!");
      });*/


      //addSingleMarkers({locations, map});
      //const {AdvancedMarkerElement} = await window.google.maps.importLibrary("marker");

      console.log("MAKE MARKERS FOR " );
      console.log( map);
      for (let i=0; i<locations.length; i++){
        let position = locations[i];
       //
       //
       //  const image =
       //    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
       //
       //  const centerMarkerE = document.createElement("div");
       //  const path = API.imagesPath + "house.png";
       //  const centerMarkerHtml = `<div class='center_marker'>
       //      <img src="${path}" width="24"/>
       //      <p class='marker_text'>${position.price} UAH</p>
       // </div>`;
       //  centerMarkerE.innerHTML = centerMarkerHtml;

        const marker = new window.google.maps.Marker({
          position: { lat: position.lat, lng: position.lng },
          map: map,
          title: position.title,
          // content: centerMarkerE
        });

        marker.addListener("click", (event) => {
          // console.log(event.latLng.lat())
          onMarkerClick(event.latLng);
          // alert("Marker was clicked!");
        });

      }
      /*locations.map(
        position => {
          const image =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

          const centerMarkerE = document.createElement("div");
          const path = API.imagesPath + "house.png";
          const centerMarkerHtml = `<div class='center_marker'>
            <img src="${path}" width="24"/>
            <p class='marker_text'>${position.price} UAH</p>
       </div>`;
          centerMarkerE.innerHTML = centerMarkerHtml;
          let marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: {lat: position.lat, lng: position.lng},
            map,
            content: centerMarkerE,
            title: position.title,
            gmpClickable: true
          });

          // Add a click listener for each marker, and set up the info window.
          marker.addListener("click", ({domEvent, latLng}) => {
            const {target} = domEvent;
            console.log(target)
            console.log(domEvent)
            console.log(latLng.lat())
            console.log(latLng.lng())
          });
        }
      );

*/

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
    console.log("CLICK")
    console.log(ev)
    // console.log("zoom " + map.getZoom())
    // console.log("lat " + map.getCenter().lat())
    // console.log("lng " + map.getCenter().lng())
    console.log("lnBg " + map.getBounds())
    setBounds(map.getBounds());
  }

  function handleIdle(ev) {
    console.log(ev)
  }

  function handleChange(ev) {
    console.log("CHANGE")
    console.log(ev)
  }


  function _handleZoomChanged() {
    const zoomLevel = this.refs.map.getZoom();
    if (zoomLevel !== this.state.zoomLevel) {
      this.setState({zoomLevel});
    }
  }

  function _handleCenterChanged() {
    console.log(ref.map.getCenter())
    const center = this.refs.map.getCenter();
    if (!center.equals(this.state.center)) {
      this.setState({center});
    }
  }

  return (
    <>

      {/*<GoogleMap*/}
      {/*  options={{*/}
      {/*    fullscreenControl: false,*/}
      {/*    streetViewControl: false,*/}
      {/*    mapTypeControl: false*/}
      {/*  }}*/}

      {/*  mapContainerStyle={{*/}
      {/*    width: '100%',*/}
      {/*    height: '400px',*/}
      {/*  }}*/}
      {/*  center={DEFAULT_CENTER}*/}
      {/*  zoom={DEFAULT_ZOOM}*/}
      {/*  onClick={(event) => {*/}
      {/*    console.log(event)*/}
      {/*  }}*/}
      {/*>*/}

      {/*  {locations.map((point) => (*/}

      {/*    <Marker*/}
      {/*      position={{*/}
      {/*        lat: point.lat,*/}
      {/*        lng: point.lng*/}
      {/*      }}*/}
      {/*      onClick={(event) => {*/}
      {/*        console.log(event)*/}
      {/*      }}*/}

      {/*      key={point.lat}*/}

      {/*      // icon={API.imagesPath+'house.png'}*/}
      {/*      icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</GoogleMap>*/}

      <div
        ref={ref}
        style={{width: "500px", height: "400px"}}
        // defaultOptions={{fullscreenControl: false, zoomControl : true}}

        onClick={handleClick}
        // onIdle={handleIdle}
        onChange={handleChange}

        // onCenterChanged={_handleCenterChanged.bind(this)}
        // onZoomChanged={_handleZoomChanged.bind(this)}
      />
      <div>
        {/*<div>X {bounds.getSouthWest().lat()} - {bounds.getNorthEast().lat()}</div>*/}
        {/*<div>X {bounds.getSouthWest().lng()} - {bounds.getSouthWest().lng()}</div>*/}

      </div>
      {/*<Marker*/}
      {/*  position={{lat: 18.52043, lng: 73.856743}}*/}
      {/*  icon={"https://developers.google.com/mapfiles/ms/icons/green-dot.png"}*/}

      {/*/>*/}
    </>
  );
};


async function  addSingleMarkers({locations, map,}) {
  console.log('make markers')
  const {AdvancedMarkerElement} = await window.google.maps.importLibrary("marker");

  locations.map(
    position => {
      const image =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

      const centerMarkerE = document.createElement("div");
      const path = API.imagesPath + "house.png";
      const centerMarkerHtml = `<div class='center_marker'>
            <img src="${path}" width="24"/>
            <p class='marker_text'>${position.price} UAH</p>
       </div>`;
      centerMarkerE.innerHTML = centerMarkerHtml;
      let marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: {lat: position.lat, lng: position.lng},
        map,
        content: centerMarkerE,
        title: position.title,
        gmpClickable: true
      });

      // Add a click listener for each marker, and set up the info window.
      marker.addListener("click", ({domEvent, latLng}) => {
        const {target} = domEvent;
        console.log(target)
        console.log(domEvent)
        console.log(latLng.lat())
        console.log(latLng.lng())
      });
    }
  );
}
