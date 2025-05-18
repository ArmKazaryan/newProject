import ShoeBlock from "./components/Card/ShoeBlock";
import React, { useState } from "react";

function Home({
  items,
  cartProducts,
  onAddToCart,
  liked,
  isLikedItem,
  likedItems,
}) {
  const [searchItem, setSearchItem] = useState("");

  const onChangeInputValue = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <div className="Items">
      <div className="ItemsList">
        <div className="ItemListsFinder">
          <h1>
            {searchItem ? `Поиск по запросу:${searchItem}` : "Все кроссовки"}
          </h1>
          <div className="inputDiv">
            <img className="inputImg" src="/imgs/lupa.svg" alt="input"></img>
            <input
              className="input"
              placeholder=" Поиск:"
              onChange={onChangeInputValue}
              value={searchItem}
            />

            {searchItem ? (
              <div
                onClick={() => {
                  setSearchItem("");
                }}
              >
                <img
                  className="inpClear"
                  src="/imgs/plus.png"
                  alt="clear"
                ></img>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="ItemsBlock">
          {items
            .filter((obj) =>
              obj.title.toLowerCase().includes(searchItem.toLocaleLowerCase())
            )
            .map((obj) => (
              <ShoeBlock
                key={obj.id}
                {...obj}
                isInCart={cartProducts.some(
                  (item) => Number(item.id) === Number(obj.id)
                )}
                isLikedItem={likedItems.some(
                  (item) => Number(item.id) === Number(obj.id)
                )}
                onAddToCart={onAddToCart}
                liked={liked}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
