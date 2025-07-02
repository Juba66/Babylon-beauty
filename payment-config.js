
// payment-config.js

// هذا الملف مخصص لتحضير ربط بوابة الدفع لاحقاً
export const PAYMENT_GATEWAY = "ZAINCASH"; // أو SWITCH

export const API_ENDPOINTS = {
  ZAINCASH: {
    createPayment: "https://api.zaincash.iq/request",
    redirect: "https://www.zaincash.iq/transaction/pay",
  },
  SWITCH: {
    createPayment: "https://merchantapi.switch.com/payment",
    redirect: "https://switch.com/redirect"
  }
};

// النموذج الحالي وهمي فقط للتجربة
export const FAKE_PAYMENT_MODE = true;
