import {
  TIngredient,
  TOrder,
  TServerOrder,
  TSuccessfulRegisterReply,
  TSuccessfulUpdateTokensReply,
} from "./types";

export const burgerExample: TIngredient[] = [
  {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.pn",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733cc",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733d0",
    name: "Хрустящие минеральные кольца",
    type: "main",
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile:
      "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large:
      "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733d0",
    name: "Хрустящие минеральные кольца",
    type: "main",
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile:
      "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large:
      "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733d4",
    name: "Сыр с астероидной плесенью",
    type: "main",
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: "https://code.s3.yandex.net/react/code/cheese.png",
    image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
];

export const orderExample: TServerOrder = {
  ingredients: [
    "60d3b41abdacab0026a733c6",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733c9",
  ],
  _id: "",
  status: "done",
  name: 'Interstellar бургер',
  number: 342352,
  createdAt: new Date("2021-06-23T14:43:22.587Z"),
  updatedAt: new Date("2021-06-23T14:43:22.603Z"),
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", { expires: -1 });
}

export const setTokens = (res: TSuccessfulUpdateTokensReply) => {
  let accessToken, refreshToken;
  if (res.accessToken.indexOf("Bearer") === 0) {
    accessToken = res.accessToken.split("Bearer ")[1];
  }
  refreshToken = res.refreshToken;
  if (accessToken && refreshToken) {
    setCookie("accessToken", accessToken, { expires: 1200 });
    setCookie("refreshToken", refreshToken);
  }
};

type TOptions = {
  hour: "2-digit" | "numeric";
  minute: "2-digit" | "numeric";
  timeZoneName: "short" | "long";
};

const formatTime = (date: Date) => {
  const newDate = new Date(date);
  const options: TOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  return newDate.toLocaleString("ru", options);
};

const getDiff = (date: Date) => {
  var today = new Date();
  var createdOn = new Date(date);
  var msInDay = 24 * 60 * 60 * 1000;
  createdOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  var diff: number = (+today - +createdOn) / msInDay;

  let result = (diff: number): string => {
    if (diff === 0) {
      return "Сегодня";
    } else if (diff === 1) {
      return "Вчера";
    } else if (diff > 1 && diff < 5) {
      return `${diff} дня назад`;
    } else {
      return `${diff} дней назад`;
    }
  };
  return result(diff);
};

export function parseTime(date: Date): string {
  let diff = getDiff(date);
  let time = formatTime(date);

  return `${diff}, ${time}`;
}
