import './RentItem.css';

export function RentItem({ rent, onHandleClick }) {
  const handleClick = () => {
    onHandleClick(rent);
  };
  return (
    <div className={`rent-item-container rent-item-container-border ${rent.isSelected ? 'selected-rent' : ''}`}
         onClick={handleClick}>
      <p className="rent-item-title">{rent.title}</p>
      <div className="rent-image">
        <img
          src={`https://rent-test-task3.s3.eu-north-1.amazonaws.com/${rent.image}`}
          alt={rent.title}
        />
      </div>
      <div className="rent-item-text-container">
        <p className="rent-item-info">Ціна: {rent.price} грн/доба</p>
        <p className="rent-item-info">Контакт: {rent.contact}</p>
      </div>
    </div>
  );
}

export default RentItem;
