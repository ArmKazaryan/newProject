import { useState } from "react";
import Card from "./components/Card";
import EmptyRightPanel from "./Empty-right-panel";
import RightPanelOrder from "./RightPanelOrder";

function Rightpanel({
  cartProducts,
  onClose,
  onDeleteFromCart,
  handleOrder,
  purchased,
  setPurchased,
}) {
  const onBackClick = () => {
    onClose();
    setPurchased(false);
  };
  const total = cartProducts.reduce((sum, item) => {
    const price = Number(item.price);

    return sum + price;
  }, 0);

  const tax = () => total * 0.05;
  const totalWithTax = total + tax();

  return (
    <div>
      <div onClick={onClose} className="Shadow"></div>
      <div className="Right-panel">
        <div style={{ maxWidth: 385 }} className="Shoping-cart">
          <div className="Korzina">
            <p>Корзина</p>
            <img onClick={onClose} src="/imgs/krestik.png" />
          </div>
        </div>
        {purchased ? (
          <RightPanelOrder onBackClick={onBackClick} />
        ) : cartProducts.length > 0 ? (
          <>
            <div className="KorzinaCards">
              <div style={{ marginTop: "20px" }} className="cards-container">
                {cartProducts.map((obj) => (
                  <Card
                    key={obj.id}
                    id={obj.id}
                    title={obj.title}
                    imgUrl={obj.imgUrl}
                    price={obj.price}
                    onDeleteFromCart={() => onDeleteFromCart(obj.id)}
                  />
                ))}
              </div>
            </div>
            <div className="Total-sum">
              <div className="Total">
                <p>Товаров набрано всего на:</p>
                <div className="Total-line"></div>
                <p>{total.toFixed(2)} руб.</p>
              </div>
              <div className="Total">
                <p>Налог 5%:</p>
                <div className="Total-line"></div>
                <p>{tax().toFixed(2)} руб.</p>
              </div>
              <div className="Total">
                <p>Итого:</p>
                <div className="Total-line"></div>
                <p>{totalWithTax.toFixed(2)} руб.</p>
              </div>

              <button onClick={handleOrder} className="OrderButton">
                Оформить заказ
                <img src="/imgs/left-arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <EmptyRightPanel onBackClick={onClose} />
        )}
      </div>
    </div>
  );
}

export default Rightpanel;
