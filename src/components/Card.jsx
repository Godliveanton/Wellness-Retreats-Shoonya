import "./card.scss";

const Card = ({ img, title, description, date, location, price, duration }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const showDate = () => {
    const data = new Date(date * 1000);
    const nextDate = new Date(date + duration * 24 * 60 * 60);
    return `${
      months[data.getMonth()]
    } ${data.getDate()} - ${nextDate.getDate()}, ${data.getFullYear()}`;
  };
  return (
    <div className="card">
      <img className="card-img" src={img} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Date: {showDate()}</p>
      <p>Location: {location}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Card;
