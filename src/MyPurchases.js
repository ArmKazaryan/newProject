import React from "react";
import ShoeBlock from "./components/Card/ShoeBlock";

function MyPurchases({ closeProfile, orderedItems = [] }) {
  return (
    <div className="MyPurchasesList">
      <div className="MyPurchases">
        <div
          className="BackFromPurchases"
          onClick={closeProfile}
          style={{ cursor: "pointer" }}
        >
          <img src="/imgs/back.png" alt="Назад" />
        </div>
        <div>
          <h2>Мои покупки</h2>
        </div>
      </div>
      <div className="MyPurchasesBlock">
        {orderedItems.length === 0 ? (
          <div className="NoOrders">
            <div className="NoOrdersBlock">
              <img src="/imgs/sad smile.png"></img>
              <div className="TextBlock">
                <div className="TextBlockText">
                  <h2> У вас нет заказов :(</h2>
                  <p>
                    Вы нищеброд? <span>Оформите хотя бы один заказ.</span>
                  </p>
                </div>
                <button onClick={closeProfile}>
                  <img src="/imgs/left-arrow.svg"></img>
                  Вернуться назад
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="PurchasedCards">
            {orderedItems.map((item) => (
              <ShoeBlock
                key={item.id}
                {...item}
                isInCart={false}
                onAddToCart={() => {}}
                liked={() => {}}
                readOnly={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPurchases;
