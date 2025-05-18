function EmptyRightPanel({ onBackClick }) {
  return (
    <div>
      <div className="Right-panel">
        <div className="full-h">
          <div className="Shoping-cart">
            <div className="EmptyBox">
              <div className="EmptyBoxImg">
                <img className="BoxImg" src="/imgs/box.png"></img>
              </div>
              <div className="TextandButton">
                <div className="EmptyBoxText">
                  <h3>Корзина пустая</h3>
                </div>
                <div className="EmptyBoxText">
                  <p>
                    Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
                  </p>
                </div>
                <div>
                  <button onClick={onBackClick} className="EmptyBoxButton">
                    <img src="/imgs/left-arrow.svg"></img>
                    Вернуться назад
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmptyRightPanel;
