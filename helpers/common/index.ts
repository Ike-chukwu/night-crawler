import dayjs from "dayjs";

// export const openSidebar = () => {
//   document.getElementById("sidebar")?.classList.add("expanded");
// };

// export const closeSidebar = () => {
//   document.getElementById("sidebar")?.classList.remove("expanded");
// };

// export const toggleSidebar = () => {
//   if (document.getElementById("sidebar")?.classList.contains("expanded")) {
//     closeSidebar();
//   } else {
//     openSidebar();
//   }
// };

// this is for search select dropdown
export const getSelectedItemFromSearchSelect = (
  items: Array<any>,
  value: string,
  objPropt: string,
) => {
  if (!items?.length) {
    return undefined;
  }
  if (Array.isArray(items)) {
    return items.find((item) => item[objPropt] === value);
  } else {
    return [];
  }
};

// this is for multiselect dropdown
export const getSelectedItem = (
  items: Array<any>,
  value: string,
  objPropt: string,
) => {
  if (Array.isArray(items)) {
    return items?.filter((item) =>
      value?.includes(objPropt ? item[objPropt] : item),
    );
  } else {
    return [];
  }
};

export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const formatDateToString = (date: Date) => {
  return formatDate(date, "YYYY-MM-DD");
};

export const formatDateTimeToString = (date: Date) => {
  return formatDate(date, "YYYY-mm-dd hh:mm:ss");
};
