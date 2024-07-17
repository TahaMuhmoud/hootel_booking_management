import { createClient } from "@supabase/supabase-js";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZidHhkaW91bG5zbG1ib3l2dXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNjU2NTQsImV4cCI6MjAzNTc0MTY1NH0.pA7gg_DRGM0XfzypbneY2AjZPDvOtDQqAe3yk5aH9yo";

export const SUPABASE_URL = "https://fbtxdioulnslmboyvuyd.supabase.co";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const SUPABASE_Avatar_URL = `${SUPABASE_URL}/storage/v1/object/public/avatars/`;
