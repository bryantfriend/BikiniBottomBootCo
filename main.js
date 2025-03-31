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
    const kgsAmount = (usdTotal * exchangeRate).toFixed(2); // Example: "2670.00"

    const name = "BRAYANT RONALD FREND";
    const gui = "qr.demirbank.kg";
    const account = "1180000284115533";

    // Merchant Account Info (Tag 32) details
    const merchantAccountInfo =
        "0015" + gui + // GUI
        "0104" + name.length.toString().padStart(2, '0') + name +
        "0116" + account;

    const tag32 = "32" + merchantAccountInfo.length.toString().padStart(2, '0') + merchantAccountInfo;

    // Build full QR payload without CRC
    let payload =
        "000201" + // Payload Format Indicator
        "010211" + // Static QR
        tag32 +
        "52044812" + // Merchant Category Code
        "5303417" +  // Currency = KGS
        "54" + kgsAmount.length.toString().padStart(2, '0') + kgsAmount + // Amount
        "5802KG" + // Country
        "5909DEMIRBANK" + // Merchant name
        "6304"; // CRC placeholder

    const crc = calculateCRC(payload);
    const fullQR = payload + crc;

    // Generate the QR code
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: fullQR,
        width: 256,
        height: 256
    });

    alert(`QR Code generated for ${kgsAmount} KGS.`);
}

// CRC-16/CCITT-FALSE (XModem)
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
