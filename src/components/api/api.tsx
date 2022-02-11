import {
  TIngredient,
  TRegisterBody,
  TResetPwdBody,
  TResponseBody,
  TSignInBody,
} from "../../services/utils/types";
import { getCookie } from "../../services/utils/utils";

const baseUrl = `https://norma.nomoreparties.space/api`;

export const apiConfig = {
  logoutUrl: `${baseUrl}/auth/logout`,
  updateTokenUrl: `${baseUrl}/auth/token`,
  getUserUrl: `${baseUrl}/auth/user`,
  signInUrl: `${baseUrl}/auth/login`,
  registerUrl: `${baseUrl}/auth/register`,
  passwordResetUrlStep2: `${baseUrl}/password-reset/reset`,
  passwordResetUrlStep1: `${baseUrl}/password-reset`,
  ingredientsUrl: `${baseUrl}/ingredients`,
  ordersUrl: `${baseUrl}/orders`,
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

export const submitOrder = async (userOrder: string[], accessToken: string) => {
  const res = await fetch(apiConfig.ordersUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + accessToken,
    },
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

export const getUserOrders = async () => {
  let accessToken = getCookie("accessToken");
  const res = await fetch(apiConfig.ordersUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + accessToken,
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
