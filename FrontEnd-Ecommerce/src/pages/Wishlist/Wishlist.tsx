import { GridList, Heading } from '@Components/Common'
import { Product } from '@Components/e-Commerce'
import Loading from '@Components/feedback/Loading/Loading'
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actGetWishlist, productsFullInfoCleanUp } from '@store/wishlist/wishlistSlice';
import { TProduct } from '@types'
import { useEffect } from 'react';

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const {loading,error,productFullinfo} = useAppSelector((state)=>state.wishlist)
  
  const cartItems= useAppSelector((state)=> state.cart.items)
 
  const records= productFullinfo.map((el)=> ({
    ...el,
    quantity:cartItems[el.id] || 0,
    isLiked : true,
    isAuthenticated:true,
  }))
  useEffect(()=>{
    const promies= dispatch(actGetWishlist())
        return () => {
         promies.abort()
         dispatch(productsFullInfoCleanUp());
       };
     },[dispatch])
  return (
    <>
    <Heading title="Your Wishlist" />
      <Loading status={loading} error={error}>

        <GridList<TProduct>
          emptyMessage="Your Wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  )
}
