function NoBookMarks({ closeBookmarks }) {
  return (
    <div className="NoOrders">
      <div className="NoOrdersBlock">
        <img src="/imgs/sad smile.png"></img>
        <div className="TextBlock">
          <div className="TextBlockText">
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
          </div>
          <button onClick={closeBookmarks}>
            <img src="/imgs/left-arrow.svg"></img>
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoBookMarks;
