import { Location } from "history";

export interface IngProps {
  id: string;
  ingType: string;
  image: string;
  name: string;
  price: number;
}

export interface OrderCardProps {
  number: number,
  time: Date,
  name: string,
  ingredients: string[]
  status?: "created" | "pending" | "done" | "cancelled"
}

export interface ModalProps {
  onClose: (...args: any[]) => any;
}

export interface ProtectedRouteProps {
  path: string;
  exact: boolean;
}

export interface ConstructorDraggableEl {
  id: string;
  ingType: string;
}

export interface ConstructorEL {
  _id: string;
  image: string;
  name: string;
  price: number;
  index?: number;
}

export interface TLocationState extends Location {
  from: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: object;
  };
  background?: Location;
}

