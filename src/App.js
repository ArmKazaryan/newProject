import { useState } from "react";
import React from "react";
import axios from "axios";
import "./index.scss";
import Home from "./Home";
import Rightpanel from "./Right-panel";
import EmptyShoeBlock from "./components/Card/EmptyShoeBlock";
import BookMarks from "./BookMarks";
import MyPurchases from "./MyPurchases";

function App() {
  const dbUrl = "http://localhost:8000/cart-items";
  const likedUrl = "http://localhost:8000/bookmarks";
  const profileUrl = "http://localhost:8000/profile";

  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addToBookmark, setAddToBookmark] = useState([]);
  const [goToBookmarks, setGoToBookmarks] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [likedItem, setLikedItem] = useState([]);

  const onClickToLogo = () => {
    setGoToBookmarks(false);
    setGoToProfile(false);
  };
  const onClickToCart = () => setCartOpened(true);
  const openBookmarks = () => {
    setGoToBookmarks(true);
    setGoToProfile(false);
  };

  const closeBookmarks = () => {
    setGoToBookmarks(false);
  };

  const openProfile = () => {
    setGoToProfile(true);
    setGoToBookmarks(false);
  };

  const closeProfile = () => {
    setGoToProfile(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await axios.get(dbUrl);
        setCartProducts(cartResponse.data);

        const itemsResponse = await axios.get("http://localhost:8000/items");
        setItems(itemsResponse.data);

        const bookmarksResponse = await axios.get(likedUrl); // это важно!
        setAddToBookmark(bookmarksResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  // toggle function Arm jan
  const onAddToCart = async (obj) => {
    console.log(cartProducts);
    try {
      const itemInCart = cartProducts.find(
        (item) => Number(item.id) === Number(obj.id)
      );

      if (itemInCart) {
        await axios.delete(`${dbUrl}/${obj.id}`);
        setCartProducts((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(dbUrl, obj);
        setCartProducts((prev) => [...prev, data]);
      }
    } catch (err) {
      console.error("Ошибка при изменении корзины:", err);
    }
  };

  const onDeleteFromCart = async (id) => {
    await axios.delete(`${dbUrl}/${id}`);
    setCartProducts((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const deleteMatchingItemsFromCart = async () => {
    try {
      const itemIds = items.map((item) => item.id);
      await Promise.all(
        cartProducts.map((product) => axios.post(profileUrl, product))
      );

      // Удаляем каждый товар из cart-items, если его id есть в списке items
      await Promise.all(
        cartProducts
          .filter((product) => itemIds.includes(product.id))
          .map((product) => axios.delete(`${dbUrl}/${product.id}`))
      );

      // Обновляем состояние после удаления
      setCartProducts((prev) =>
        prev.filter((product) => !itemIds.includes(product.id))
      );

      console.log("Совпадающие товары удалены из корзины");
    } catch (err) {
      console.error("Ошибка при удалении совпадающих товаров:", err);
    }
  };

  const checkProfileDb = async (obj) => {
    try {
      const response = await axios.get("http://localhost:8000/profile");
      const allItems = response.data;
      const exist = allItems.some((item) => Number(item.id) === Number(obj.id));

      if (!exist) {
        const addToProfile = await axios.post(
          "http://localhost:8000/profile",
          obj
        );
        setOrderedItems((prev) => [...prev, addToProfile.data]);
      }
    } catch {}
  };

  const handleOrder = async () => {
    try {
      const itemIds = cartProducts.map((item) => item.id);

      // Ждём пока все товары будут проверены и добавлены
      await Promise.all(cartProducts.map((item) => checkProfileDb(item)));

      console.log("ID заказанных товаров:", itemIds);

      setPurchased(true);
      setOrderedItems([...cartProducts]); // сохраняем копию купленных
      setCartProducts([]); // очищаем корзину

      await deleteMatchingItemsFromCart(); // удаляем с бэка
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
    }
  };
  const liked = async (obj) => {
    try {
      const alreadyBookmarked = addToBookmark.some(
        (item) => item.id === obj.id
      );

      if (!alreadyBookmarked) {
        const { data } = await axios.post(likedUrl, obj);
        setAddToBookmark((prev) => [...prev, data]);
      } else {
        await axios.delete(`${likedUrl}/${obj.id}`);
        setAddToBookmark((prev) => prev.filter((item) => item.id !== obj.id));
      }
    } catch (err) {
      console.error("Ошибка при изменении закладок:", err);
    }
  };

  return (
    <div className="background">
      <div className="wrapper">
        <header>
          <div className="wrap">
            <div>
              <div className="flex-container" onClick={onClickToLogo}>
                <img src="/imgs/sneakers.svg" alt="logo"></img>
                <div>
                  <h2 className="HeaderName">REACT SNEAKERS</h2>
                  <p className="UnderHeaderName">Магазин лучших кроссовок</p>
                </div>
              </div>
            </div>
            <div className="HeaderRight">
              <div onClick={onClickToCart}>
                <img src="/imgs/shop.png" alt="shop"></img>
                <p>Корзина</p>
              </div>
              <div onClick={openBookmarks}>
                <img src="/imgs/like.png" alt="like"></img>
                <p>Закладки</p>
              </div>
              <div onClick={openProfile}>
                <img src="/imgs/profile.png" alt="profile"></img>
                <p>Профиль</p>
              </div>
            </div>
          </div>
        </header>
      </div>

      {cartOpened && (
        <Rightpanel
          cartProducts={cartProducts}
          onClose={() => setCartOpened(false)}
          onDeleteFromCart={onDeleteFromCart}
          handleOrder={handleOrder}
          purchased={purchased}
          setPurchased={setPurchased}
        />
      )}
      {goToProfile ? (
        <MyPurchases
          closeProfile={closeProfile}
          orderedItems={orderedItems}
          setOrderedItems={setOrderedItems}
        />
      ) : goToBookmarks ? (
        <BookMarks closeBookmarks={closeBookmarks} onAddToCart={onAddToCart} />
      ) : loading ? (
        <div className="forSkeleton">
          {[...Array(8)].map((_, index) => (
            <EmptyShoeBlock key={index} />
          ))}
        </div>
      ) : (
        <Home
          orderedItems={orderedItems}
          items={items}
          cartProducts={cartProducts}
          onAddToCart={onAddToCart}
          liked={liked}
          likedItems={addToBookmark}
        />
      )}
    </div>
  );
}

export default App;
