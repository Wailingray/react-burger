import {
  IwsConnectionClosed,
  IwsConnectionError,
  IwsConnectionStart,
  IwsConnectionSuccess,
  IwsGetMessage,
  IwsSendMessage,
} from "../actions/wsVanillaActions";
import {
  IwsGetPrivateMessage,
  IwsPrivateConnectionClosed,
  IwsPrivateConnectionError,
  IwsPrivateConnectionStart,
  IwsPrivateConnectionSuccess,
  IwsSendPrivateMessage,
} from "../actions/wsUserActions";

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

export type TIngWithCount = {
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
  count: number;
};

export type TOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type TServerOrder = {
  ingredients: string[];
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderModalProps = {
  ingredients: TIngredient[];
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TSuccessfulUpdateTokensReply = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
export type TSuccessfulReply = {
  success: boolean;
  message: string;
};

export type TSuccessfulRegisterReply = {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TSuccessfulGetUserReply = {
  success: true;
  user: {
    email: string;
    name: string;
  };
};

export type TResetPwdBody = {
  password: string;
  token: string;
};

export type TSignInBody = {
  email: string;
  password: string;
};

export type TRegisterBody = {
  email: string;
  password: string;
  name: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUseParams = {
  id: string;
};

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
};

export type wsServerRespond = {
  success: boolean;
  orders: TServerOrder[];
  total: number;
  totalToday: number;
};

export type TActionsBook = {
  startConnectionConst: string;
  sendMessageConst: string;
  wsStartConnection: () => IwsConnectionStart | IwsPrivateConnectionStart;
  wsSendMessage: (message: any) => IwsSendMessage | IwsSendPrivateMessage;
  wsOnOpen: () => IwsConnectionSuccess | IwsPrivateConnectionSuccess;
  wsOnClose: () => IwsConnectionClosed | IwsPrivateConnectionClosed;
  wsOnError: () => IwsConnectionError | IwsPrivateConnectionError;
  wsGetMessage: (message: any) => IwsGetMessage | IwsGetPrivateMessage;
};
