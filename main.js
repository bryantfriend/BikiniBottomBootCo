let cart = [];

function addToCart(model) {
    if (cart.length < 3) {
        cart.push(model);
        alert("Added to cart: " + model);
    } else {
        alert("Cart is full! Max 3 items.");
    }
}

function generateQR() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before generating payment.");
        return;
    }

    let amountUSD = cart.length * 50;
    let exchangeRate = 89; // Estimated USD to KGS
    let amountKGS = (amountUSD * exchangeRate).toFixed(2);
    let accountNumber = "1180000284115533";
    let description = `Bikini Bottom Boots (${cart.length} items)`;

    // Build QR content string
    let qrContent = `PAYTO://KGS/${accountNumber}/${amountKGS}?desc=${encodeURIComponent(description)}`;

    // Clear existing QR
    document.getElementById("qrcode").innerHTML = "";

    // Generate new QR
    new QRCode(document.getElementById("qrcode"), {
        text: qrContent,
        width: 220,
        height: 220
    });

    alert(`QR Code generated for payment of ${amountKGS} KGS.`);
}


function viewCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        let message = "Your cart:\n";
        for (let i = 0; i < cart.length; i++) {
            message += cart[i] + "\n";
        }
        alert(message);
    }
}

function calculateTotal() {
    let total = cart.length * 50; // $50 per boot
    alert("Total price: $" + total);
}

function clearCart() {
    cart = [];
    alert("Cart cleared!");
}
