const addToFav = ( id, name, price, rating, image, brand,handleAdded, handleNotAdded) => {
  let favs = JSON.parse(localStorage.getItem('favList'))
  if (favs) {
    if (favs.length >= 30) {
      handleNotAdded()
      return
    }
    if (!favs.some(item => item.id === id)) {
      favs.push({ id, name, price, rating, image, brand })
    }
  } else {
    favs = [{ id, name, price, rating, image, brand }]
  }
  localStorage.setItem('favList', JSON.stringify(favs))
  handleAdded()
}

const addToCart = ( id, name, price, rating, image, brand, color, handleAdded, handleNotAdded) => {
  let cart = JSON.parse(localStorage.getItem('cartList'))
  if (cart) {
    if (cart.length >= 30) {
      handleNotAdded()
      return
    }
    if (!cart.some(item => item.id === id)) {
      cart.push({ id, name, price, rating, image, brand, color })
    }
  } else {
    cart = [{ id, name, price, rating, image, brand, color }]
  }
  localStorage.setItem('totalPrice', JSON.stringify(price + JSON.parse(localStorage.getItem('totalPrice'))))
  localStorage.setItem('cartList', JSON.stringify(cart))
  handleAdded()
}


module.exports = {
  addToFav,
  addToCart
}