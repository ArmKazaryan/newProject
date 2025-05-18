function RightPanelOrder({ onBackClick }) {
  return (
    <div>
      <div className="Shadow"></div>
      <div className="Right-panel">
        <div className="full-h">
          <div className="Shoping-cart">
            <div className="EmptyBox">
              <div className="EmptyBoxImg">
                <img className="BoxImg" src="/imgs/ordered.svg"></img>
              </div>
              <div className="TextandButton">
                <div className="EmptyBoxText">
                  <h3>Заказ оформлен!</h3>
                </div>
                <div className="EmptyBoxText">
                  <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
                </div>
                <div>
                  <button className="EmptyBoxButton" onClick={onBackClick}>
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
export default RightPanelOrder;
