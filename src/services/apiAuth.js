import { supabase, SUPABASE_Avatar_URL } from "./subabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data } = await supabase.auth.getSession();

  if (data.session === null) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

export async function signup({ data, additionalData, avatar, bgImg }) {
  data = Object.fromEntries(
    Object.entries(data).filter((item) => item[1] !== "")
  );

  additionalData = Object.fromEntries(
    Object.entries(additionalData).filter((item) => item[1] !== "")
  );

  let imgs = Object.fromEntries(
    Object.entries({ avatar, bgImg })
      .filter((item) => item[1][0] !== undefined)
      .map((item) => {
        return [item[0], SUPABASE_Avatar_URL + item[1][0]["name"]];
      })
  );

  let newdata = {
    ...data,
    options: {
      data: {
        ...additionalData,
        ...imgs,
      },
    },
  };

  const { data: d, error } = await supabase.auth.signUp(newdata);
  if (error) throw new Error(error.message);

  if (imgs.avatar) {
    let imgName = avatar[0].name;
    await supabase.storage.from("avatars").upload(imgName, avatar[0]);
  }

  if (imgs.bgImg) {
    let imgName = bgImg[0].name;
    await supabase.storage.from("avatars").upload(imgName, bgImg[0]);
  }

  return d;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateAcount({ data, additionalData, avatar, bgImg }) {
  data = Object.fromEntries(
    Object.entries(data).filter((item) => item[1] !== "")
  );
  additionalData = Object.fromEntries(
    Object.entries(additionalData).filter((item) => item[1] !== "")
  );
  let imgs = Object.fromEntries(
    Object.entries({ avatar, bgImg })
      .filter((item) => item[1][0] !== undefined)
      .map((item) => {
        return [item[0], SUPABASE_Avatar_URL + item[1][0]["name"]];
      })
  );

  let newdata = {
    ...data,
    data: {
      ...additionalData,
      ...imgs,
    },
  };

  const { data: d, error } = await supabase.auth.updateUser(newdata);
  if (error) throw new Error(error.message);

  if (imgs.avatar) {
    let imgName = avatar[0].name;
    await supabase.storage.from("avatars").upload(imgName, avatar[0]);
  }

  if (imgs.bgImg) {
    let imgName = bgImg[0].name;
    await supabase.storage.from("avatars").upload(imgName, bgImg[0]);
  }

  return d;
}
