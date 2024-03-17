export const getHourAndDay = (date: any) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const dayOfWeek = date.getDay();

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayName = daysOfWeek[dayOfWeek];

  return {
    hours: hours,
    minutes: minutes,
    dayOfWeek: dayOfWeek,
    dayName: dayName,
  };
};
export const getHourAndMinute = (date: any) => {
  const hours = date?.getHours();
  const minutes = date?.getMinutes();

  // Sử dụng template literals để tạo chuỗi "HH:mm"
  const formattedTime = `${hours
    ?.toString()
    ?.padStart(2, "0")}:${minutes?.toString()?.padStart(2, "0")}`;

  return formattedTime;
};

export const getDayOfWeek = (date: any) => {
  const dayOfWeek = date.getDay();

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const dayName = daysOfWeek[dayOfWeek];

  return {
    dayOfWeek: dayOfWeek,
    dayName: dayName,
  };
};
export const getDateInfo = (date: any) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đổi sang tháng thực tế
  const year = date.getFullYear();

  return {
    day: day,
    month: month,
    year: year,
  };
};
export default function convertToSlug(str: string) {
  str = str.toLowerCase().trim(); // Chuyển đổi thành chữ thường và loại bỏ khoảng trắng ở đầu và cuối chuỗi
  str = str.replace(/\s+/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
  str = str.replace(/[^\w\-]+/g, ""); // Loại bỏ các ký tự đặc biệt.
  return str;
}
export async function getOptionsBrands() {
  const res = await fetch(`/api/car-model`, { method: "GET" });
  const data = await res.json();
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  const dataOption = data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return dataOption;
}
export async function getOptionsModels(brandId: number) {
  if (brandId) {
    const res = await fetch(`/api/car-model/${brandId}`, { method: "GET" });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    return dataOption;
  }
}
export async function getOptionsYearCar(modelId: number) {
  if (modelId) {
    const res = await fetch(`/api/car-model/${modelId}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data) {
      throw new Error("Failed to fetch data");
    }
    const dataOption = data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    return dataOption;
  }
}

export async function getOptionsCustomers() {
  const res = await fetch(`/api/customer`, { method: "GET" });
  const data = await res.json();
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  const dataOption = data?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.fullName,
  }));
  return dataOption;
}
