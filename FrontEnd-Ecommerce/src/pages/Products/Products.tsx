import { GridList, Heading } from '@Components/Common'
import { Product } from '@Components/e-Commerce'
import Loading from '@Components/feedback/Loading/Loading'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { actGetProductsByCatPrefix, productCleanup } from '@store/products/productsSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Products() {
  const params = useParams();
  const productPrefix = params.prefix;

  const dispatch = useAppDispatch();
  const {loading,error,records} = useAppSelector((state)=>state.products)
  const cartItems= useAppSelector((state)=> state.cart.items)


  const record= records.map((el)=> ({
    ...el,
    quantity:cartItems[el.id] || 0,

  }))

  useEffect(()=>{
  const promise=  dispatch(actGetProductsByCatPrefix(productPrefix as string));
  return ()=>{
    dispatch(productCleanup());
    promise.abort();
  }
  },[dispatch])
  return (
    <>
    <Heading title={`${productPrefix} Products`} />
    <Loading status={loading} error={error} type="product">
    <GridList records={record} emptyMessage="There are no products " 
      renderItem={(record) => <Product {...record} />} />
    </Loading>
  </>
  )
}

export default Products
