import { TIngredient, TResponseBody } from "../../utils/types";

export const apiConfig = {
  passwordResetUrl: `https://norma.nomoreparties.space/api/password-reset`,
  ingredientsUrl: `https://norma.nomoreparties.space/api/ingredients`,
  ordersUrl: `https://norma.nomoreparties.space/api/orders`,
  headers: {
    "Content-Type": "application/json",
  },
};
const getResponse = (res: Response) => {
  if (res.ok) {
    console.log(res)
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
  const res = await fetch(apiConfig.passwordResetUrl, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      email,
    }),
  });
  return getResponse(res);
};
