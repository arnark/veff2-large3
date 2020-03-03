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

export function CheckoutComplete(customerData) {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null) { userData = {} }
    
    userData[customerData.telephone] = customerData;

    userData = JSON.stringify(userData);
    localStorage.setItem("userData", userData);

    ClearCart();
    document.location.href = "/ordersuccess";
}
