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
        alert("Your cart is empty.");
        return;
    }

    // Calculate total
    const usdTotal = cart.length * 50;
    const exchangeRate = 89; // 1 USD ≈ 89 KGS
    const kgsTotal = (usdTotal * exchangeRate).toFixed(2);

    // Your original working QR string from DemirBank (with hardcoded amount)
    const baseQR = "00020101021132590015qr.demirbank.kg01047001101611800002841155331202111302125204482953034175909DEMIRBANK54081234.565802KG6304XXXX";

    // Replace the amount (tag 54, 8 digits)
    const updatedQR = baseQR.replace(/5408\d{1,8}\.\d{2}/, `5408${kgsTotal}`);

    // Generate the QR code
    document.getElementById("qrcode").innerHTML = ""; // Clear previous
    new QRCode(document.getElementById("qrcode"), {
        text: updatedQR,
        width: 220,
        height: 220
    });

    alert(`QR Code generated for payment of ${kgsTotal} KGS.`);
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
