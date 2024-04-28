import Title from "../title/Title";
import './rentDetail.css';

export default function RentDetail({rent, onClose}) {
  return <div className="detail-container">
    <Title>
      <div className="row">
        <div>{rent.title}</div>
        <div onClick={onClose}>Close</div>
      </div>
    </Title>
    <div className="row">
      <img
        className="detail-image"
        src={`https://rent-test-task3.s3.eu-north-1.amazonaws.com/${rent.image}`}
        alt={rent.title}
      />
      <p className="rent-detail-info">{rent.description}</p>
    </div>
    <div>
      <p className="rent-detail-info">Ціна: {rent.price} грн/доба</p>
      <p className="rent-detail-info">Контакт: {rent.contact}</p>
      <p className="rent-detail-info">Дата: {rent.dateCreate.slice(0, 10)}</p>
    </div>
  </div>
}