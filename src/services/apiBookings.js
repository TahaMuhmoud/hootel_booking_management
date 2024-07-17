import { PAGE_SIZE } from "../utils/constants";
import { getToDay } from "../utils/helpers";
import { supabase, SUPABASE_Avatar_URL, SUPABASE_URL } from "./subabase";

export async function getBookings({ page }) {
  const from = (page - 1) * PAGE_SIZE || 0;
  const to = from + PAGE_SIZE - 1 || PAGE_SIZE - 1;
  let {
    data: bookings,
    error,
    count,
  } = await supabase
    .from("bookings")
    .select(
      `
    *,
    cabins (
      *
    ),
    guests (
      *
    )
  `,
      { count: "exact" }
    )
    .range(from, to);
  if (error) throw new Error(error.message);

  return { bookings, count };
}
export async function addGuest(newGuest) {
  // HANDLE THE Avatar PATH
  const avatarPath = `${SUPABASE_Avatar_URL}${newGuest.avatar.name}`;
  const flagPath = `${SUPABASE_URL}/storage/v1/object/public/flags/${newGuest.countryFlag.name}`;
  // ADD NEW CABIN
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest, avatar: avatarPath, countryFlag: flagPath }]);

  if (error) throw new Error(error.message);

  // UPLOAD IMAGE
  const { error: storageError1 } = await supabase.storage
    .from("avatars")
    .upload(newGuest.avatar.name, newGuest.avatar);
  const { error: storageError2 } = await supabase.storage
    .from("flags")
    .upload(newGuest.countryFlag.name, newGuest.countryFlag);
  if (storageError1 || storageError2)
    throw new Error(storageError1.message || storageError2.message);

  return data;
}
export async function getGuests() {
  let { data: guests, error } = await supabase.from("guests").select("*");
  if (error) throw new Error(error.message);

  return guests;
}
export async function addBooking(newBook) {
  let { data, error } = await supabase.from("bookings").insert([newBook]);
  if (error) throw new Error(error.message);

  return data;
}
export async function editBook({ id, updatedData }) {
  let { data, error } = await supabase
    .from("bookings")
    .update(updatedData)
    .eq("id", id);
  if (error) throw new Error(error.message);

  return data;
}
export async function deleteBook(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}
let x = new Date();
x.toISOString();

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("created_at", date)
    .lte("created_at", getToDay({ end: true }));

  if (error) throw new Error(error.message);
  return data;
}
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("startDate", date)
    .lte("endDate", getToDay({ end: true }));

  if (error) throw new Error(error.message);
  return data;
}
