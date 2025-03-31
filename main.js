let cart = [];

function addToCart(model) {
    if (cart.length < 3) {
        cart.push(model);
        alert("Added to cart: " + model);
    } else {
        alert("Cart is full! Max 3 items.");
    }
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
    let total = cart.length * 50;
    alert("Total price: $" + total);
}

function clearCart() {
    cart = [];
    document.getElementById("qrcode").innerHTML = "";
    alert("Cart cleared!");
}

function generateQR() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const usdTotal = cart.length * 50;
    const exchangeRate = 89;
    const kgsAmount = (usdTotal * exchangeRate).toFixed(2); // e.g. "2670.00"

    // Your known-good working QR structure (replace amount at Tag 54)
    const beforeAmount =
        "00020101021132590015qr.demirbank.kg0104700110161180000284115533120211130212520448";

    const afterAmount =
        "2953034175909DEMIRBANK6304"; // ends before CRC

    const amountTag = "54" + kgsAmount.length.toString().padStart(2, '0') + kgsAmount;

    const payload = beforeAmount + amountTag + afterAmount;
    const crc = calculateCRC(payload);
    const fullQR = payload + crc;

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: fullQR,
        width: 256,
        height: 256
    });

    alert(`QR Code generated for ${kgsAmount} KGS.`);
}

// Calculate CRC16-CCITT (XModem)
function calculateCRC(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
            crc &= 0xFFFF;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
}
