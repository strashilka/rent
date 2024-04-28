import { useState } from 'react';
import RentsList from "../rentsList/RentsList";
import Title from "../title/Title";
import Modal from "../modal/Modal";
import RentDetail from "../rentDetail/rentDetail";
import './Rents.css';

function Rents({ rents, onSelectRent, onAddRent }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentRent, setCurrentRent] = useState(null);

  const toggleModal = () => {
    setIsDetailOpen(!isDetailOpen);
  };

  if (rents && rents.length > 0){
    rents.sort((a, b) => {
      return a.createdDate - b.createdDate;
    });

    if (!currentRent) {
      const rent = rents[0];
      setCurrentRent(rent);
      onSelectRent(rent);
    }
  }

  const handleOnSelectRent = (rent) => {
    onSelectRent(rent);
    setCurrentRent(rent);
    setIsDetailOpen(true);
  };

  const handeOnAddRent = () =>{
    onAddRent();
  }

  return (
    <div>
      <Title>Rents list</Title>
      <RentsList items={rents} selectedItem={currentRent} onAddRent={handeOnAddRent} onSelectRent={handleOnSelectRent}/>
      {isDetailOpen && (
        <Modal>
          <RentDetail rent={currentRent} onClose={toggleModal}/>
        </Modal>
      )}
    </div>
  );
}

export default Rents;