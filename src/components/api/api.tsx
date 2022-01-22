import {
  TIngredient,
  TRegisterBody,
  TResetPwdBody,
  TResponseBody,
} from "../../services/utils/types";

export const apiConfig = {
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
    console.log(res);
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
