import ShopCard from "./ShopCard";
import './Card.css'

export default function ShoopingCart() {
  const cart = JSON.parse(localStorage.getItem('cartList'))

  function renderInstruments() {
    if (!cart) {
      return (
        <h4>
          The Cart list is empty.
        </h4>
      );
    }

    let cartMap = cart.map((instrument, idx) => <ShopCard // usar fav card
      key={idx}
      id={instrument.id}
      name={instrument.name}
      price={instrument.price}
      brand={instrument.brand}
      rating={instrument.rating}
      image={instrument.image} />);
    return (
      <div className="favoriteCards">
        {cartMap}
      </div>
    );
  }

  return (
    <div className="containerHome cartContainer">
      <h1>Cart</h1>
      {renderInstruments()}
    </div>
  );
}
