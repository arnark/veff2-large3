export default function AddToCart(bubbleId) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems === null) { cartItems = {} }
    
    if (cartItems[bubbleId] === undefined) {
        cartItems[bubbleId] = 1;
    } else {
        cartItems[bubbleId] += 1;
    }    
    cartItems = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", cartItems);
    
    // alert("Product " + bubbleId + " added to cart... #todo, bæta við html overlay í staðin fyrir þetta");
}