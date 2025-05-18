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
          <p>У вас пока нет покупок.</p>
        ) : (
          <div className="PurchasedCards">
            {orderedItems.map((item) => (
              <ShoeBlock
                key={item.id}
                {...item}
                isInCart={false}
                onAddToCart={() => {}}
                liked={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPurchases;
