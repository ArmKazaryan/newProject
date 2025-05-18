import React, { useEffect, useState } from "react";
import ShoeBlock from "./components/Card/ShoeBlock";
import NoBookMark from "./NoBookMarks";
import axios from "axios";

function BookMarks({ closeBookmarks, onAddToCart }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/bookmarks");
        setBookmarks(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке закладок", err);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="MyPurchasesList">
      <div className="MyPurchases">
        {bookmarks.length === 0 ? (
          ""
        ) : (
          <div onClick={closeBookmarks} className="BackFromPurchases">
            <img src="/imgs/back.png" alt="Назад" />
          </div>
        )}
        <div>
          <h2>Мои закладки</h2>
        </div>
      </div>
      <div className="noBM">
        {bookmarks.length === 0 ? (
          <NoBookMark closeBookmarks={closeBookmarks} />
        ) : (
          <div className="MyPurchasesBlock">
            <div className="PurchasedCards">
              {bookmarks.map((obj) => (
                <ShoeBlock
                  key={obj.id}
                  {...obj}
                  isLikedItem={true}
                  liked={() => {}}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookMarks;
