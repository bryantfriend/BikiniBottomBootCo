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
    const exchangeRate = 89;
    const amountKGS = (usdTotal * exchangeRate).toFixed(2); // Must be x.xx

    const payloadFormat = "000201";
    const pointOfInitiation = "010211";

    const gui = "0015qr.demirbank.kg";
    const accountName = "BRAYANT RONALD FREND";
    const nameLength = accountName.length.toString().padStart(2, '0');
    const accountNumber = "1180000284115533";

    const merchantAccountInfo = "32" +
        (59 + nameLength).toString().padStart(2, '0') +
        gui +
        "0104" + nameLength + accountName +
        "0116" + accountNumber;

    const merchantCategory = "52044812";
    const currency = "5303417";
    const amountTag = "54" + amountKGS.length.toString().padStart(2, '0') + amountKGS;
    const countryCode = "5802KG";
    const merchantName = "5909DEMIRBANK";

    let dataWithoutCRC =
        payloadFormat +
        pointOfInitiation +
        merchantAccountInfo +
        merchantCategory +
        currency +
        amountTag +
        countryCode +
        merchantName +
        "6304"; // CRC placeholder

    const crc = calculateCRC(dataWithoutCRC);
    const fullData = dataWithoutCRC + crc;

    // Generate QR
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: fullData,
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

