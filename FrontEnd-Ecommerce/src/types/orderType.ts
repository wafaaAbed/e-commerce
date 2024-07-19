import { TProduct } from "./proguctType";

export type TOrderItem = {
  id: number;
  items: TProduct[];
  subtotal: number;
};
