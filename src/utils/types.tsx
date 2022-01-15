export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  __v: number;
}

export type TOrder = {
  type: string;
  order: {
    success: boolean,
    name: string,
    order: {
      number: number
    }
  }
}

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};
