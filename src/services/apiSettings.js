import { supabase } from "./subabase";
export async function getSettings() {
  let { data: settings, error } = await supabase.from("settings").select("*");
  if (error) throw new Error(error.message);
  return settings;
}
export async function updateSettings({ id, newSettings }) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
}
