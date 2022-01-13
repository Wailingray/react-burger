export interface IngProps {
  id: string;
  ingType: string;
  image: string;
  name: string;
  price: number;
}

export interface ModalProps {
  onClose: (...args: any[]) => any
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
}

export interface ICoordinates {
  top: number | undefined;
  bottom: number| undefined;
}
