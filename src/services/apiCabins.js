import { PAGE_SIZE } from "../utils/constants";
import { supabase, SUPABASE_URL } from "./subabase";

export async function getCabins({ page }) {
  const from = (page - 1) * PAGE_SIZE || 0;
  const to = from + PAGE_SIZE - 1 || PAGE_SIZE - 1;
  let {
    data: cabins,
    error,
    count,
  } = await supabase
    .from("cabins")
    .select("*", { count: "exact" })
    .range(from, to);
  if (error) throw new Error(error.message);
  return { cabins, count };
}
export async function addCabin(newCabin) {
  // HANDLE THE IMG PATH
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabins/${newCabin.image.name}`;
  // UPLOAD IMAGE
  await supabase.storage
    .from("cabins")
    .upload(newCabin.image.name, newCabin.image);
  // ADD NEW CABIN
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) throw new Error(error.message);

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return data;
}

export async function editCabin({ id, updatedData }) {
  if (updatedData.image) {
    // HANDLE THE IMG PATH
    const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabins/${updatedData.image[0].name}`;
    // UPLOAD IMAGE
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(updatedData.image[0].name, updatedData.image[0]);
    if (storageError) throw new Error(storageError.message);

    updatedData = { ...updatedData, image: imagePath };
  }

  const { data, error } = await supabase
    .from("cabins")
    .update(updatedData)
    .eq("id", id);
  if (error) throw new Error(error.message);

  return data;
}
