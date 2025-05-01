export const handleConvertPrice = (price) => {
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const handleCalcPriceSale = (price, deal) =>
  price - (price / 100) * deal;

export const removeAccents = (text = "") =>
  text?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");

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
  const number = String(value)?.replace(/\D/g, ""); // bỏ hết ký tự không phải số
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

export function formartHouseMinutesSeconds(seconds) {
  const house = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor(seconds / 60 - house * 60);
  const second = seconds % 60;

  return `${house < 10 ? "0" + house : house}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${second < 10 ? "0" + second : second}`;
}

export function timeDifference(dateString) {
  const givenDate = moment(dateString);
  const currentDate = moment();

  const years = currentDate.diff(givenDate, "years");
  givenDate.add(years, "years"); // Cộng số năm vào để tiếp tục tính tháng

  const months = currentDate.diff(givenDate, "months");
  givenDate.add(months, "months"); // Cộng số tháng vào để tiếp tục tính ngày

  const days = currentDate.diff(givenDate, "days");

  if (years > 0) return `${years} năm trước`;
  if (months > 0) return `${months} tháng trước`;
  if (days > 0) return `${days} ngày trước`;
}

export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export const generateUrlImage = (src) => {
  return src
    ? `${process.env.NEXT_PUBLIC_DOMAIN_API}${process.env.NEXT_PUBLIC_PARAM_GET_FILE_API}${src}`
    : "";
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Bán kính Trái Đất theo km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2);
}

export function getStartAndEndOfMonth() {
  const now = new Date();

  // Thời gian đầu tháng
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  // Thời gian cuối tháng
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    start,
    end,
  };
}

export function getStartAndEndOfYear() {
  const now = new Date();

  // Thời gian đầu năm
  const start = new Date(now.getFullYear(), 0, 1); // Tháng 0 là tháng 1

  // Thời gian cuối năm
  const end = new Date(now.getFullYear(), 11, 31); // Tháng 11 là tháng 12

  return {
    start,
    end,
  };
}

export function removeEmptyObjectFields(obj = {}) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
}
