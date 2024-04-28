import React, {useEffect, useRef, useState} from 'react';
import RequiredField from "../components/requiredField/RequiredField";
import {API} from "../const/consts";
import {storeRent} from "../const/http";
import './AddRentScreen.css';

let marker = null;

function AddRentScreen({onSave, onCancel}) {
  const [pickedImage, setPickedImage] = useState();
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const [values, setValues] = useState({})
  const today = new Date();

  useEffect(() => {
    if (ref.current) {
      let map = new window.google.maps.Map(ref.current, {
        center: API.defaultMapCenter,
        zoom: API.defaultMapZoom,
        mapId: API.selectMapID
      });

      map.setOptions({
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false
      });

      window.google.maps.event.addListener(map, 'click', function (event) {
        let location = event.latLng;
        placeMarker(location, map);
      });
    }
  }, [ref]);

  function handleMapClick(ev) {
    if (marker) {
      let lng = marker.getPosition().lng();
      let lat = marker.getPosition().lat();

      let obj = {};
      obj["lng"] = lng;
      obj["lat"] = lat;

      setValues((prev) => {
        return {...prev, ...obj};
      })
    }
  }

  const handleOnSave = () => {
    setProgress(0);
    const isNotEmptyField = (value) => {
      return (value && value.toString().length > 0);
    }
    if (isNotEmptyField(values['title'])
      && isNotEmptyField(values['description'])
      && isNotEmptyField(values['price'])
      && isNotEmptyField(values['contact'])
      && isNotEmptyField(values['lng'])
      && isNotEmptyField(values['lat'])) {
      const rentData = {
        title: values['title'],
        description: values['description'],
        price: values['price'],
        contact: values['contact'],
        lng: values['lng'] * 1,
        lat: values['lat'] * 1,
        dateCreate: today,
        image: pickedImage,
      }

      storeRent(rentData, onUpdateProgress, onFinished).then()
    } else {
      alert('Please fill in all fields')
    }
  };

  function onUpdateProgress(percentage) {
    setProgress(percentage)
  }

  function onFinished() {
    onSave();
  }

  function handleOnChange(event) {
    const name = event.target.name;
    const value = event.target.value.toString();
    let obj = {};
    obj[name] = value;

    setValues((prev) => {
      return {...prev, ...obj};
    })
  }

  function setSelectedImage(file) {
    if (!file) {
      console.log("Please, select photo for this Ads");
      return;
    }

    setPickedImage(file)
  }

  return (
    <div className="rent-modal">
      <div className="rent-modal-title">
        <h3>Create rent ads</h3>
        <button onClick={onCancel} type="button">
          <img src={`${API.imagesPath}close.png`} alt="Add trip" className="plus-icon"/>
        </button>
      </div>
      <div className="parts-container">
        <div className="fields-container">
          <div>
            <RequiredField title="Title"/>
            <input name="title" value={values["title"] ? values["title"] : ''} onChange={handleOnChange}/>
          </div>
          <div>
            <RequiredField title="Description"/>
            <textarea name="description" rows={4} value={values["description"] ? values["description"] : ''}
                      onChange={handleOnChange}/>
          </div>
          <div>
            <RequiredField title="Price"/>
            <input name="price" value={values["price"] ? values["price"] : ''} onChange={handleOnChange}/>
          </div>
          <div>
            <RequiredField title="Contact"/>
            <input name="contact" value={values["contact"] ? values["contact"] : ''} onChange={handleOnChange}/>
          </div>
          <div>
            <RequiredField title="Location"/>
            <input name="lat" value={values["lat"] ? values["lat"] : ''} onChange={handleOnChange}/>
            <input name="lng" value={values["lng"] ? values["lng"] : ''} onChange={handleOnChange}/>
          </div>
          <div>
            {progress > 0 && <div>uploading progress {progress}%</div>}
            <input
              type="file"
              name="photo"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
            {/*{pickedImage && <img*/}
            {/*  src={`https://rent-test-task3.s3.eu-north-1.amazonaws.com/${"jpg"}`}*/}
            {/*  alt="Preview"*/}
            {/*/>}*/}
          </div>
        </div>
        <div className="map-container">
          <div
            ref={ref}
            style={{width: "250px", height: "270px"}}
            onClick={handleMapClick}
          />
        </div>
      </div>
      <div className="buttons-container">
        <button title="Cancel" onClick={onCancel} className="button-cancel" type="button">Cancel</button>
        <button title="Save" onClick={handleOnSave} className="button-save" type="button">Save</button>
      </div>
    </div>
  );
}

export default AddRentScreen;

function placeMarker(location, map) {
  if (marker) {
    marker.setMap(null)
  }

  marker = new window.google.maps.Marker({
    position: location,
    map: map
  });
}