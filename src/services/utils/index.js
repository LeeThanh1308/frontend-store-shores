export const handleConvertPrice = (price) => {
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const handleCalcPriceSale = (price, deal) =>
  price - (price / 100) * deal;

export const removeAccents = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const handleRegexSlug = (value) => {
  return value
    ?.toLowerCase()
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    ?.replace(/đ/g, "d") // Chuyển "đ" thành "d"
    ?.replace(/[^a-z0-9 -]/g, "") // Chỉ giữ lại chữ cái, số và dấu cách
    ?.replace(/\s+/g, "-") // Chuyển khoảng trắng thành "-"
    ?.replace(/-+/g, "-") // Xóa dấu "-" liên tiếp
    ?.trim(); // Xóa khoảng trắng đầu cuối
};

export const formatPrice = (value) => {
  const number = value?.replace(/\D/g, ""); // bỏ hết ký tự không phải số
  return number?.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // thêm dấu phẩy
};

export const parsePrice = (value = "") => {
  return String(value).replace(/,/g, ""); // bỏ dấu phẩy
};

export function formatCurrencyVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function parseCurrencyVND(currencyString) {
  // Loại bỏ các ký tự không phải số và dấu thập phân
  const numericString = currencyString.replace(/[^\d]/g, "");
  return parseInt(numericString, 10);
}

export function handleSetFieldForm(data = {}, setValue = () => null) {
  Object.entries(data).forEach(([field, message]) => {
    if ((field && typeof message === "boolean") || message)
      setValue(field, message);
  });
}

export async function urlToFile(url, filename) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}
