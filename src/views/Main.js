import React, {useEffect, useState} from 'react';
import Title from "../components/title/Title";
import Rents from "../components/rents/Rents";
import MapContainer from "../components/map/MapContainer";
import GoogleMaps from "../components/mapComponent/GoogleMaps";
import {fetchRent} from "../const/http";
import './Main.css';

function Main() {
  const [filteredRegin, setFilteredRegin] = useState(null);
  const [selectedRentPosition, setSelectedRentPosition] = useState(null);
  const [isRentAdded, setIsRentAdded] = useState(false);
  const [rents, setRents] = useState([])

  useEffect(() => {
    if (rents.length > 0 && !isRentAdded) {
      return;
    }

    async function getRents() {
      const rents = await fetchRent();
      setRents(rents)
      setIsRentAdded(false)
    }

    getRents().then();
  }, [isRentAdded, rents.length])

  const handleSelectRent = (rent) => {
    console.log(rent)
    //todo: object of rent
  };

  let result_rents = [];
  if (filteredRegin) {
    for (let i = 0; i <= rents.length - 1; i++) {
      let rent = rents[i];
      if (filteredRegin.contains({lat: rent.lat, lng: rent.lng})) {
        if (selectedRentPosition && selectedRentPosition.lat()===rent.lat &&
        selectedRentPosition.lng() === rent.lng)
        {
          rent.isSelected = true;
          result_rents.unshift(rent);
        }
        else {
          rent.isSelected = false;
          result_rents.push(rent);
        }
      }
    }
  } else {
    result_rents = rents;
  }

  return (
    <div className="main">
      <div className="mapContainer">
        <Title>Map with rent ads</Title>
        <MapContainer>
          <GoogleMaps
            locations={result_rents}
            onChangeBounds={(bounds) => {
              setFilteredRegin(bounds)
            }}
            onMarkerClick={(data)=>{
              setSelectedRentPosition(data)
            }}/>
        </MapContainer>
      </div>
      <div className="listContainer">
        <Rents rents={result_rents} onSelectRent={handleSelectRent} onAddRent={
          () => {
            setIsRentAdded(true)
          }
        }/>
      </div>
    </div>
  );
}

export default Main;
