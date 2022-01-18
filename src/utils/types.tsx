export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: 0;
};

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};
