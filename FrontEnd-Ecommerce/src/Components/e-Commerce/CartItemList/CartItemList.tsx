import { TProduct } from "@types";
import CartItem from "../CartItem/CartItem";



type TCartItemListProps = {
  productsFull:TProduct[];
  changeQuantityHandler:(id:number,quantity:number)=>void;
  removeItemHandler:(id:number)=>void;
}
function CartItemList({productsFull,changeQuantityHandler,removeItemHandler}:TCartItemListProps) {
  const renderList = productsFull.map((el)=>
    <CartItem key={el.id} {...el} 
  changeQuantityHandler={changeQuantityHandler}
  removeItemHandler={removeItemHandler}
  />
  )
  return (
    <div>
      {renderList}
    </div>
  )
}

export default CartItemList
