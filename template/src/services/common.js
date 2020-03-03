export function AddToCart(bubbleId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems === null) { cartItems = {} }
    
    if (cartItems[bubbleId] === undefined) {
        cartItems[bubbleId] = 1;
    } else {
        cartItems[bubbleId] += 1;
    }    
    cartItems = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", cartItems);
}

export function AddBundleToCart(bubbles) {
    for (let i = 0; i < bubbles.length; i++) {
        AddToCart(bubbles[i].id);
    }
}

export function ClearCart() {
    localStorage.removeItem("cartItems");
    alert("Cart cleared successfully");
}

export function GetCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems === null) { cartItems = {} }

    let cartItemIds = [];
    for (let key in cartItems) {
        cartItemIds.push([key, cartItems[key]]);
    }
    return cartItemIds;
}
