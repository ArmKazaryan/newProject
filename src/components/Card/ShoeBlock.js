import React, { useState, useEffect } from "react";

function ShoeBlock({
  id,
  imgUrl,
  title,
  price,
  onAddToCart,
  liked,
  isInCart,
  isLikedItem,
}) {
  const [isAdded, setIsAdded] = useState(isInCart);
  const [isLiked, setIsLiked] = useState(isLikedItem);

  useEffect(() => {
    setIsAdded(isInCart);
  }, [isInCart]);

  useEffect(() => {
    setIsLiked(isLikedItem);
  }, [isLikedItem]);

  const onPlus = () => {
    onAddToCart({ id, title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  const onLike = () => {
    liked({ id, title, imgUrl, price });
  };

  return (
    <div className="ShoeBlock">
      <img className="ShoeOptions" src={imgUrl} alt={title} />
      <div onClick={onLike} className="likeBorder">
        <img
          className="like"
          src={isLikedItem ? "/imgs/like.png" : "/imgs/Vector.svg"}
          alt="like"
        />
      </div>

      <div className="description">
        <p className="shoeName">{title}</p>
        <div className="price">
          <div>
            <p className="ShoePrice">ЦЕНА: </p>
            <b>{price} руб.</b>
          </div>
          <div
            onClick={onPlus}
            className="PlusBorder"
            style={{ cursor: "pointer" }}
          >
            <img
              src={isAdded ? "/imgs/fav.svg" : "/imgs/plus.png"}
              alt="add-to-cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeBlock;
