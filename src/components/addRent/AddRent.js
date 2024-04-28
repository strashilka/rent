import {useState} from 'react';
import AddRentScreen from "../../views/AddRentScreen";
import Modal from "../modal/Modal";
import {API} from "../../const/consts";
import "../rentItem/RentItem.css"

function AddRent({onAddRent}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const saveRent = () => {
    onAddRent();
    toggleModal();
  };
  const showModal = () => {
    toggleModal();
  };

  return (
    <div className="rent-item-container">
      <button className="add-rent-button" onClick={showModal} type="button">
        <div className="add-rent-container">
          <img src={`${API.imagesPath}plus.png`} alt="Add rent" className="plus-icon"/>
          <p className="add-rent-text"> Add rent </p>
        </div>
      </button>
      {isOpen && (
        <Modal>
          <AddRentScreen onSave={saveRent} onCancel={toggleModal}/>
        </Modal>
      )}
    </div>
  );
}

export default AddRent;