jsconst SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZmGimtG6DI-5sNffTVqP4Ah0xG4ghTTC-VrieujlvyhPYdwGofCDujk4eTzYEx0K9/exec';

const productGrid = document.getElementById('product-grid');
const openFormBtn = document.getElementById('open-form-btn');
const registerModal = document.getElementById('register-modal');
const closeRegBtn = document.getElementById('close-reg-btn');
const productForm = document.getElementById('product-form');
const resultsCount = document.getElementById('results-count');

const successModal = document.getElementById('success-modal');
const successOkBtn = document.getElementById('success-ok-btn');

const tipsBtn = document.getElementById('tips-btn');
const tipsModal = document.getElementById('tips-modal');
const closeTipsBtn = document.getElementById('close-tips-btn');
const tipsAmountInput = document.getElementById('tips-amount');
const payerNameInput = document.getElementById('payer-name');
const upiPayLink = document.getElementById('upi-pay-link');

const searchBtn = document.getElementById('search-btn');
const areaSearch = document.getElementById('area-search');
const productFilter = document.getElementById('product-filter');
const chips = document.querySelectorAll('.chip');

const phone = document.getElementById('login-phone').value;
const password = document.getElementById('login-pass').value;

// UPI Settings
const MY_UPI_ID = "8939717405@ybl";
const MERCHANT_NAME = "Namma Ooru 360"; 

let dataList = [];
let currentFilter = 'all';

// 2. கூகுள் ஷீட்டில் இருந்து தகவல்களை எடுத்தல்
async function loadDataFromSheet() {
    productGrid.innerHTML = `
        <div style="text-align:center; padding:40px; grid-column: 1/-1; color:#cda12c;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:28px; margin-bottom:10px;"></i>
            <p>விபரங்கள் லோடு ஆகிறது...</p>
        </div>`;
        
    try {
        const response = await fetch(SCRIPT_URL, { method: "GET" });
        dataList = await response.json();
        
        if (dataList.error) {
            console.error("Apps Script Error:", dataList.error);
            productGrid.innerHTML = '<div style="text-align:center; padding:40px; grid-column: 1/-1; color:red;"><p>Apps Script பிழை ஏற்பட்டுள்ளது!</p></div>';
        } else {
            handleSearch(); 
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        productGrid.innerHTML = '<div style="text-align:center; padding:40px; grid-column: 1/-1; color:red;"><p>டேட்டா லோடு செய்வதில் பிழை ஏற்பட்டுள்ளது!</p></div>';
    }
}

// 3. கார்டுகளை உருவாக்குதல்
function renderCards(dataToRender = dataList) {
    productGrid.innerHTML = '';
    if (!Array.isArray(dataToRender)) return;
    
    resultsCount.textContent = `${dataToRender.length} பதிவுகள் உள்ளன`;

    if(dataToRender.length === 0) {
        productGrid.innerHTML = `
            <div style="text-align:center; padding:40px; color:#6B7280; grid-column: 1/-1;">
                <i class="fa-solid fa-folder-open" style="font-size:36px; margin-bottom:10px; color:#cbd5e1;"></i>
                <p>தற்சமயம் பதிவுகள் எதுவும் இல்லை!</p>      ithula register la phone numberku aduthu otp verification aduthu password venum aduthu left side top cornerla login oru button athula phone number and password pottathuku apparam antha phone number password ithula forget password option venum atha click panna register panna number ku otp send aganu otp pottathukku appara change passward option venum entha cardku set agutho antha antha card edite and delete option venum     send otp const data = '{
  

