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
    let exchangeRate = 89; // Estimate: 1 USD ≈ 89 KGS
    let amountKGS = (amountUSD * exchangeRate).toFixed(2);

    // Your verified DemirBank QR string (up to the amount section)
    let baseURL = "https://retail.demirbank.kg/#00020101021132590015qr.demirbank.kg01047001101611800002841155331202111302125204482953034175909DEMIRBANK6304";

    // You can regenerate the CRC (last part), but for now we'll just encode a simplified dynamic version.
    let dynamicQRString = `00020101021132590015qr.demirbank.kg0104700110161180000284115533120211130212520448` +
                          `2953034175909DEMIRBANK5408${amountKGS}5802KG6304`;

    // For security: hash the string for a valid CRC (optional). For demo: leave as-is.

    // Clear previous QR
    document.getElementById("qrcode").innerHTML = "";

    // Generate QR
    new QRCode(document.getElementById("qrcode"), {
        text: dynamicQRString,
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
