import style from "./style.module.css";
const { product, productImg, productInfo } = style;
import { Button, Form } from "react-bootstrap"

import { TProduct } from "@types";


type TCartItemProps = TProduct & {
  changeQuantityHandler:(id:number,quantity:number)=>void;
  removeItemHandler:(id:number)=>void;
}



function CartItem({ id, title, img, price, max, quantity,changeQuantityHandler,removeItemHandler }: TCartItemProps) {
  const renderOption = Array(max).fill(0).map((_, idx) => {
    const quantity = ++idx;
    return <option value={quantity} key={quantity}>
      {quantity}
    </option>
  })
  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuantityHandler(id, quantity);
  }
  return (
    <><div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <div className={productInfo}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} DR</h3>
        <Button onClick={() => removeItemHandler(id)}>Remove</Button>

      </div>
      <div>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select value={quantity} onChange={changeQuantity}>
          {renderOption}
        </Form.Select>
      </div>

    </div>
    <hr />
    
  </>
  )
}

export default CartItem
