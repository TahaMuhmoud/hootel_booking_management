export const LOGO = "eL3WAMy";

export const PRIMARY_COLOR = "#006A6A";

export const SECONDARY_COLOR = "#FFFCF6";

export const PAGE_SIZE = 5;

export const CABIN_SORT_OPTIONS = [
  { value: "no-sort", name: "No Sort" },
  { value: "name-asc", name: "Name Ascending" },
  { value: "name-desc", name: "Name Descending" },
  { value: "price-asc", name: "Price Ascending" },
  { value: "price-desc", name: "Price Descending" },
  { value: "discount-asc", name: "Discount Ascending" },
  { value: "discount-desc", name: "Discount Descending" },
  { value: "capacity-asc", name: "Capacity Ascending" },
  { value: "capacity-desc", name: "Capacity Descending" },
];

export const CABIN_FILTER_OPTIONS = [
  { value: "no-filter", name: "No filter" },
  { value: "hasDiscount", name: "Has Discount" },
  { value: "noDiscount", name: "No Discount" },
];

export const BOOKING_FILTER_OPTIONS = [
  { value: "no-filter", name: "No filter" },
  { name: "confirmed", value: "confirmed" },
  { name: "checked-in", value: "checked-in" },
  { name: "checked-out", value: "checked-out" },
];

export const BOOKING_RECENT_OPTIONS = [
  { name: "7 Days", value: "7" },
  { name: "1 Month", value: "30" },
  { name: "3 Month", value: "90" },
];
