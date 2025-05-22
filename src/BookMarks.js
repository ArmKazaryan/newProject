import React, { useEffect, useState } from "react";
import ShoeBlock from "./components/Card/ShoeBlock";
import NoBookMark from "./NoBookMarks";
import axios from "axios";
import NoBookMarks from "./NoBookMarks";

function BookMarks({ closeBookmarks, onAddToCart, bookmarks, setBookmarks }) {
  const handleLike = (item) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== item.id
    );
    setBookmarks(updatedBookmarks);

    axios
      .delete(`http://localhost:8000/bookmarks/${item.id}`)
      .catch(console.error);
  };

  return (
    <div className="MyPurchasesList">
      <div className="MyPurchases">
        <div onClick={closeBookmarks} className="BackFromPurchases">
          <img src="/imgs/back.png" alt="Назад" />
        </div>
        <div>
          <h2>Мои закладки</h2>
        </div>
      </div>
      <div className="MyPurchasesBlock">
        {bookmarks && bookmarks.length === 0 ? (
          <NoBookMarks closeBookmarks={closeBookmarks} />
        ) : (
          <div className="PurchasedCards">
            {bookmarks.map((obj) => (
              <ShoeBlock
                key={obj.id}
                {...obj}
                isLikedItem={true}
                liked={handleLike} // чтобы можно было убрать из закладок
                onAddToCart={onAddToCart} // чтобы добавить в корзину
                readOnly={false} // чтобы кнопки были активны
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookMarks;
