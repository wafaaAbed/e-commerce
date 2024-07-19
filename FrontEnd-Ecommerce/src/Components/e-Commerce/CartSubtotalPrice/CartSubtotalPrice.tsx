import { TProduct } from "@types";
import style from "./style.module.css"
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import {  actPlaceOrder } from "@store/orders/ordersSlice";
import { clearCartAfterPlaceOrder } from "@store/cart/cartSlice";
const {totalPrice,placeOrderBtn} = style;

function CartSubtotalPrice({productsFull,userAccessToken}:{productsFull :TProduct[],userAccessToken:string | null}){ 
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = productsFull.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

const ModelHandler=()=>{
  setShow(!show)
  setError(null)
}
const placOrderHandler = () => {
  dispatch(actPlaceOrder(subtotal)).unwrap()
    .then(() => {
      dispatch(clearCartAfterPlaceOrder())
      setShow(!show)
    })
    .catch((error) => (setError(error)))
    .finally(() => setLoading(false))
}
  return (
    <><Modal show={show} onHide={ModelHandler} backdrop="static">
      <Modal.Header closeButton onClick={ModelHandler}>
        <Modal.Title>Place Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      Are You sure want to place order with Subtotal:{subtotal.toFixed(2)} Dr
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ModelHandler}>
          Close
        </Button>
        <Button variant="primary" onClick={placOrderHandler}>
        {loading ? (
              <>
                <Spinner animation="border" size="sm" ></Spinner>Loading...
              </>
            ) : "Confirm"}
        
        </Button>
      </Modal.Footer>
    </Modal><div>
        <div className={totalPrice}>
          <h2>SubTotal</h2>
          <h2>{subtotal} Dr</h2>
        </div>
        {userAccessToken && 
        <Button className={placeOrderBtn} onClick={ModelHandler}>Place Order</Button>
         }
      </div></>
  
  )
}

export default CartSubtotalPrice;
