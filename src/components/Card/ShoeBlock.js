import React, { useState } from "react";

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
    if (readOnly) return;
    onAddToCart({ id, title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  const onLike = () => {
    if (readOnly) return;
    setIsLiked(!isLiked);
    liked({ id, title, imgUrl, price });
  };

  return (
    <div className="ShoeBlock">
      <img className="ShoeOptions" src={imgUrl} alt={title} />

      <div
        onClick={onLike}
        className={!isLiked ? "likeBorder" : "likeBorderPink"}
      >
        <img
          className="like"
          src={isLiked ? "/imgs/Vector.svg" : "/imgs/like.png"}
          alt={isLiked ? "Не лайкнуто" : "Лайкнуто"}
        />
      </div>

      <div className="description">
        <p className="shoeName">{title}</p>
        <div className="price">
          <div>
            <p className="ShoePrice">ЦЕНА: </p>
            <b>{price} руб.</b>
          </div>

          {!readOnly && (
            <div onClick={onPlus} className="PlusBorder">
              <img
                src={isAdded ? "/imgs/fav.svg" : "/imgs/plus.png"}
                alt="Добавить"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoeBlock;
