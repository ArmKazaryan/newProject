function Card({ imgUrl, title, price, onDeleteFromCart }) {
  return (
    <div className="Cards">
      <div className="CardsImg">
        <img width={70} height={70} src={imgUrl} />
      </div>
      <div className="CardsDescription">
        <p>{title}</p>
        <h4>{price} руб.</h4>
      </div>
      <div>
        <div className="DeleteBorder" onClick={onDeleteFromCart}>
          <img src="/imgs/plus.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
