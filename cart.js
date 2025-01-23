// ตะกร้าสินค้า
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// อัปเดตจำนวนสินค้าในตะกร้า
function updateCartCount() {
    const cartLink = document.querySelector(".cart-link");
    if (cartLink) {
        cartLink.textContent = `ตะกร้าสินค้า (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    }
}

// เพิ่มสินค้าไปยังตะกร้า พร้อมแสดงป็อปอัพ
function addToCart(product) {
    // ตรวจสอบว่าสินค้าซ้ำหรือไม่
    const existingProduct= cart.find((item) => item.id === product.id);
    if (existingProduct) {
        // แทนที่จำนวนสินค้าในตะกร้าให้ตรงกับค่าที่เลือก
        existingProduct.quantity += product.quantity;
    } else {
        // ถ้ายังไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าใหม่
        cart.push(product);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // แสดงป็อปอัพ
    showPopup(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`);
}

// แสดงป็อปอัพ
function showPopup(message) {
    const popupContainer = document.getElementById("popup-container");
    const popupMessage = document.getElementById("popup-message");
// ตั้งข้อความในป็อปอัพ
popupMessage.textContent = message;

// แสดงป็อปอัพ
popupContainer.classList.add("visible");

// ซ่อนป็อปอัพอัตโนมัติหลัง 3 วินาที
setTimeout(() => {
    popupContainer.classList.remove("visible");
}, 3000);
}

// แสดงสินค้าตะกร้าใน cart.html
function displayCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer || !totalPriceElement) {
        console.error("Cart container or total price element not found.");
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = ""; // ล้างเนื้อหาเดิม

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>ราคา: ฿${item.price}</p>
            <p>จำนวน: ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">ลบ</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${total}`;
}


// ลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// เชื่อมโยงปุ่ม "เพิ่มลงตะกร้า"
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const product = {
                id: button.getAttribute("data-id"),
                name: button.getAttribute("data-name"),
                price: parseInt(button.getAttribute("data-price")),
                image: button.getAttribute("data-image"), // ดึง path รูปจาก data-image
            quantity: 0,
            };
            addToCart(product);
        });
    });

    // แสดงสินค้าในตะกร้า
    displayCartItems();

    // อัปเดตจำนวนสินค้าในลิงก์ตะกร้า
    updateCartCount();
});


// ฟังก์ชันซ่อนป็อปอัป
function hidePopup() {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.classList.remove("visible");
}

// จับปุ่ม "ปิด" ในป็อปอัป
document.getElementById("close-popup").addEventListener("click", hidePopup);




