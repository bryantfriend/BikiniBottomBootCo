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
    const exchangeRate = 89; // Approx. USD to KGS
    const amountKGS = (usdTotal * exchangeRate).toFixed(2);
    
    const accountNumber = "1180000284115533";
    const accountName = "BRAYANT RONALD FREND";

    // EMV QR segments
    let emv =
        "000201" + // Payload format indicator
        "010211" + // Point of initiation method (static)
        "3259" +   // Merchant Account Info (starts)
            "0015qr.demirbank.kg" + // GUI
            "0104" + accountName.length.toString().padStart(2, '0') + accountName + // Account Name
            "0116" + accountNumber + // Account Number
        "5204" + "4812" + // Merchant Category Code (generic)
        "5303" + "417" + // Currency Code (417 = KGS)
        "5408" + amountKGS + // Transaction amount
        "5802" + "KG" + // Country Code
        "5909" + "DEMIRBANK" + // Merchant name
        "6304"; // CRC placeholder

    // Calculate CRC-16/CCITT-FALSE (XModem)
    const crc = calculateCRC(emv);
    const fullEMV = emv + crc;

    // Generate QR
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: fullEMV,
        width: 220,
        height: 220
    });

    alert(`QR Code generated for ${amountKGS} KGS.`);
}

// CRC-16/CCITT-FALSE algorithm (XModem)
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
