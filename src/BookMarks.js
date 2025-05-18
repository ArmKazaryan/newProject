function BookMarks({ closeBookmarks }) {
  return (
    <div className="MyPurchasesList">
      <div className="MyPurchases">
        <div onClick={closeBookmarks} className="BackFromPurchases">
          <img src="/imgs/back.png"></img>
        </div>
        <div>
          <h2>Мои закладки</h2>
        </div>
      </div>
      <div className="MyPurchasesBlock">
        <div className="PurchasedCards"></div>
      </div>
    </div>
  );
}

export default BookMarks;
