// ฟังก์ชันแสดงป็อปอัป
function showPopup(message) {
    const popupContainer = document.getElementById("popup-container");
    const popupMessage = document.getElementById("popup-message");

    // ตั้งข้อความในป็อปอัป
    popupMessage.textContent = message;

    // แสดงป็อปอัป
    popupContainer.classList.add("visible");

    // ซ่อนป็อปอัปอัตโนมัติหลัง 3 วินาที
    setTimeout(() => {
        popupContainer.classList.remove("visible");
    }, 3000);
}

// ฟังก์ชันซ่อนป็อปอัป
function hidePopup() {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.classList.remove("visible");
}

// จับปุ่ม "ปิด" ในป็อปอัป
document.getElementById("close-popup").addEventListener("click", hidePopup);

// เชื่อมปุ่ม "เพิ่มลงตะกร้า"
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            showPopup(`เพิ่ม "${productName}" ลงในตะกร้าเรียบร้อยแล้ว!`);
        });
    });
});
