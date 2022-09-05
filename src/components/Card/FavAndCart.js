const addToFav = (id, name, price, rating, image, brand) => {
    let favs = JSON.parse(localStorage.getItem('favList'))
    if (!favs) {
        favs = [{ id, name, price, rating, image, brand }]
        localStorage.setItem('favList', JSON.stringify(favs))
        return
    }
    if (favs.length < 10 && favs.every(item => item.id !== id)) {
        favs.push({ id, name, price, rating, image, brand })
        localStorage.setItem('favList', JSON.stringify(favs))
        return
    }
    alert("Can't add the item, is already in the FavList or you have 10 Favorites.")
}

const addToCart = (id, name, price, rating, image, brand) => {
    let cart = JSON.parse(localStorage.getItem('cartList'))
    if (cart) {
        if (cart.length <= 10 && cart.every(item => item.id !== id)) {
            cart.push({ id, name, price, rating, image, brand })
        }
    } else {
        cart = [{ id, name, price, rating, image, brand }]
    }
    localStorage.setItem('totalPrice', JSON.stringify(price + JSON.parse(localStorage.getItem('totalPrice'))))
    localStorage.setItem('cartList', JSON.stringify(cart))
}

module.exports = {
    addToFav,
    addToCart
}