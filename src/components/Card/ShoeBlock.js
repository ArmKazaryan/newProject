import React, { useState, useEffect } from "react";

function ShoeBlock({
  id,
  imgUrl,
  title,
  price,
  onAddToCart,
  liked,
  isLikedItem,
  readOnly = false,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedItem);

  const onPlus = () => {
    if (!readOnly) {
      onAddToCart({ id, title, imgUrl, price });
      setIsAdded(!isAdded);
    }
  };

  const onLike = () => {
    if (!readOnly) {
      setIsLiked(!isLiked);
      liked({ id, title, imgUrl, price });
    }
  };

  return (
    <div className={!isLiked ? "ShoeBlockWH" : "ShoeBlock"}>
      <img className="ShoeOptions" src={imgUrl} alt=""></img>

      {/* Показываем сердечко, только если не readOnly  */}
      {!readOnly && (
        <div
          onClick={onLike}
          className={isLiked ? "likeBorder" : "likeBorderPink"}
        >
          <img
            className="like"
            src={isLiked ? "/imgs/like.png" : "/imgs/Vector.svg"}
            alt=""
          />
        </div>
      )}

      <div className="description">
        <p className="shoeName">{title}</p>
        <div className="price">
          <div>
            <p className="ShoePrice">ЦЕНА: </p>
            <b>{price} руб.</b>
          </div>

          {!readOnly && (
            <div onClick={onPlus} className="PlusBorder">
              <img src={isAdded ? "/imgs/fav.svg" : "/imgs/plus.png"} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoeBlock;
