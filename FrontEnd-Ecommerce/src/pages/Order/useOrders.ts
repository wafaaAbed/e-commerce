import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetOrders , resetOrderSatus } from "@store/orders/ordersSlice";
import { TProduct } from "@types";
import { useEffect, useState } from "react"

function useOrders() {
  const dispatch= useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
  const{orderList,loading,error} = useAppSelector((state)=>state.orders)

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };
  const viewDetailsHandler = (id: number) => {
    const productDetails = orderList.find((order) => order.id === id);
    const newItems = productDetails?.items ?? [];
    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  
  useEffect(()=>{
  const promise=  dispatch(actGetOrders())
  return () => {
        promise.abort();
        dispatch(resetOrderSatus())
        
      };
  },[dispatch])
  return{loading,error,orderList,viewDetailsHandler,handleCloseModal,selectedProduct,showModal}
}

export default useOrders
