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
    let total = cart.length * 50; // $50 per boot
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
    const exchangeRate = 89; // Adjust as needed
    const kgsAmount = (usdTotal * exchangeRate).toFixed(2); // e.g. "4450.00"

    // Start with base EMV string up to amount
    const baseQR =
        "000201" + // Payload format
        "010211" + // Static QR
        "3259" + // Tag 32 starts here
            "0015qr.demirbank.kg" +
            "0104" + "06" + "BRAYAN" + // TEMP short name to fix mismatch (adjust as needed)
            "0116" + "1180000284115533" +
        "52044812" + // Merchant category
        "5303417" +  // KGS
        "54" + kgsAmount.length.toString().padStart(2, '0') + kgsAmount + // Tag 54: amount
        "5802KG" +
        "5909DEMIRBANK" +
        "6304"; // CRC placeholder

    const crc = calculateCRC(baseQR);
    const fullQR = baseQR + crc;

    // Generate QR code
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: fullQR,
        width: 256,
        height: 256
    });

    alert(`QR Code generated for ${kgsAmount} KGS.`);
}

// EMV CRC-16/CCITT-FALSE (XModem)
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
