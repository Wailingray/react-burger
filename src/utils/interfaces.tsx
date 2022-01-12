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

