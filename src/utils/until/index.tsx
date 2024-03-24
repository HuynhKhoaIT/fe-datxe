import axios from "axios";

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

// get danh sách hãng xe
export async function getOptionsBrands() {
  try {
    const res = await axios.get(`/api/car-model`);
    console.log(res);
    const dataOption = res?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}

// get danh sách dòng xe theo hãng xe
export async function getOptionsModels(brandId: number) {
  if (brandId) {
    try {
      const res = await axios.get(`/api/car-model/${brandId}`);

      const dataOption = res?.data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      return dataOption;
    } catch (error) {
      console.error("error:", error);
    }
  }
}

// get danh sách năm sx theo dòng xe
export async function getOptionsYearCar(modelId: number) {
  if (modelId) {
    try {
      const res = await axios.get(`/api/car-model/${modelId}`);
      if (!res.data) {
        throw new Error("Failed to fetch data");
      }
      const dataOption = res?.data?.map((item: any) => ({
        value: item.id.toString(),
        label: item.title,
      }));
      return dataOption;
    } catch (error) {
      console.error("error:", error);
    }
  }
}

// get danh sách options customers của chuyên gia
export async function getOptionsCustomers() {
  try {
    const res = await axios.get(`/api/customer`);
    const dataOption = res.data?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.fullName,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}

// get danh sách options danh mục của chuyên gia
export async function getOptionsCategories() {
  try {
    const res = await axios.get(`/api/product-category`);
    const dataOption = res.data?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.title,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}

// Get danh sách Tỉnh/Tp

export async function getOptionsProvince() {
  try {
    const res = await axios.get(`${process.env.apiGuest}/provinces`);
    const dataOption = res.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}
// Get danh sách Quận/ huyện

export async function getOptionsDistrict(provinceId: number) {
  try {
    const res = await axios.get(
      `${process.env.apiGuest}/get-districts/${provinceId}`
    );

    const dataOption = res.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}

// Get danh sách xã
export async function getOptionsWard(districtId: number) {
  try {
    const res = await axios.get(
      `${process.env.apiGuest}/get-wards/${districtId}`
    );
    const dataOption = res.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.name,
    }));
    return dataOption;
  } catch (error) {
    console.error("error:", error);
  }
}

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};
