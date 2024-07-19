import { useAppSelector } from "@store/hooks"
import CartAndWishlist from "../CartAndWishlist/CartAndWishlist"
import { getCartTotalQuantitySelcotor } from "@store/cart/selector"
function HeaderLeftBar() {
  const cartTotlalquantity = useAppSelector(getCartTotalQuantitySelcotor)
  const {itemsId} = useAppSelector((state)=>state.wishlist)
  return (
    <>
        <CartAndWishlist to="wishlist"  iconeName={"faHeart"} totalQuantity={itemsId.length}/>
       <CartAndWishlist to="cart"  iconeName={"faCartShopping"} totalQuantity={cartTotlalquantity} />

    </>

  )
}

export default HeaderLeftBar
