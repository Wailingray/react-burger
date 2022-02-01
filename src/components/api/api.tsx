import {
  TIngredient,
  TRegisterBody,
  TResetPwdBody,
  TResponseBody,
  TSignInBody,
} from "../../services/utils/types";
import { getCookie } from "../../services/utils/utils";

export const apiConfig = {
  logoutUrl: `https://norma.nomoreparties.space/api/auth/logout`,
  updateTokenUrl: `https://norma.nomoreparties.space/api/auth/token`,
  getUserUrl: `https://norma.nomoreparties.space/api/auth/user`,
  signInUrl: `https://norma.nomoreparties.space/api/auth/login`,
  registerUrl: `https://norma.nomoreparties.space/api/auth/register`,
  passwordResetUrlStep2: `https://norma.nomoreparties.space/api/password-reset/reset`,
  passwordResetUrlStep1: `https://norma.nomoreparties.space/api/password-reset`,
  ingredientsUrl: `https://norma.nomoreparties.space/api/ingredients`,
  ordersUrl: `https://norma.nomoreparties.space/api/orders`,
  headers: {
    "Content-Type": "application/json",
  },
};
const getResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const getIngredients = async (): Promise<
  TResponseBody<"data", TIngredient[]>
> => {
  const res = await fetch(apiConfig.ingredientsUrl, {
    headers: apiConfig.headers,
  });
  return getResponse(res);
};

export const submitOrder = async (userOrder: string[]) => {
  const res = await fetch(apiConfig.ordersUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      ingredients: userOrder,
    }),
  });
  return getResponse(res);
};

export const submitUserEmail = async (email: string) => {
  const res = await fetch(apiConfig.passwordResetUrlStep1, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      email,
    }),
  });
  return getResponse(res);
};

export const submitResetPwd = async (RequestBody: TResetPwdBody) => {
  const res = await fetch(apiConfig.passwordResetUrlStep2, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(RequestBody),
  });
  return getResponse(res);
};

export const registerRequest = async (RequestBody: TRegisterBody) => {
  const res = await fetch(apiConfig.registerUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(RequestBody),
  });
  return getResponse(res);
};

export const signInRequest = async (RequestBody: TSignInBody) => {
  const res = await fetch(apiConfig.signInUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(RequestBody),
  });
  return getResponse(res);
};

export const getUserRequest = async (accessToken: string) => {
  const res = await fetch(apiConfig.getUserUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  return getResponse(res);
};

export const updateTokenRequest = async (refreshToken: string) => {
  const res = await fetch(apiConfig.updateTokenUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  });
  return getResponse(res);
};

export const logoutRequest = async (accessToken: string) => {
  const res = await fetch(apiConfig.logoutUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ token: accessToken }),
  });
  return getResponse(res);
};

export const changeCredentialsRequest = async (
  accessToken: string,
  newCredentials: TRegisterBody
) => {
  const res = await fetch(apiConfig.getUserUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(newCredentials),
  });
  return getResponse(res);
};
