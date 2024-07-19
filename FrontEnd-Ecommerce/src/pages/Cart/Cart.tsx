import { Heading } from '@Components/Common'
import Loading from '@Components/feedback/Loading/Loading';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import CartItemList from '@Components/e-Commerce/CartItemList/CartItemList';
import LottieHandler from '@Components/feedback/LottieHandler/LottieHandler';
import { useCallback, useEffect } from 'react';
import { actGetProductsByItems, cartItemChangeQuantity, cartItemRemove, productsFullInCleanUp } from '@store/cart/cartSlice';
import CartSubtotalPrice from '@Components/e-Commerce/CartSubtotalPrice/CartSubtotalPrice';


function Cart() {
const dispatch = useAppDispatch()
  const {loading,error,productFullinfo,items} = useAppSelector((state)=>state.cart)
  const userAccessToken= useAppSelector((state)=>state.auth.accessToken)
  const placeOrderStstus= useAppSelector((state)=>state.orders.loading)

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );
  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  useEffect(() => {
    const promies = dispatch(actGetProductsByItems());
    return () => {
      promies.abort();
      dispatch(productsFullInCleanUp());
      // dispatch(resetOrderSatus())
    };
  }, [dispatch]);
  const productsFull = productFullinfo.map((el)=>({
    ...el,
    quantity:items[el.id],
  }

  ))

  return (
    <>
    <Heading title="Cart"/>
      <Loading status={loading} error={error} type="cart">
        {productsFull.length ? (
          <><CartItemList productsFull={productsFull} changeQuantityHandler={changeQuantityHandler}
            removeItemHandler={removeItemHandler} />
            <CartSubtotalPrice productsFull={productsFull} userAccessToken={userAccessToken} /></>
        ) : (
          placeOrderStstus === "succeeded" ?(
            <LottieHandler type="success"  message= "Your Order has been placed successfully"/> 
          ):
          <LottieHandler type="empty"  message= "Your Cart has been empty"/>  )
        }


      </Loading>
    </>
  )
}

export default Cart
