import AddRent from "../addRent/AddRent";
import RentItem from "../rentItem/RentItem";
import './RentsList.css';

function RentsList({ items, onSelectRent, onAddRent }) {
  const handleRentClick = (rent) => {
    onSelectRent(rent);
  };

  const handleAddRent = () => {
    onAddRent();
  };

  return (
    <div className="scrollable-list">
      <AddRent onAddRent={handleAddRent}/>
      {items.map((item) => (
        <RentItem
          rent={item}
          onHandleClick={handleRentClick}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default RentsList;
