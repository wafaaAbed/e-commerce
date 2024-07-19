import { Button, Spinner } from "react-bootstrap"
import style from "./style.module.css";
import { TProduct } from "@types";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
const { productContainer, imgContainer, productInfo, wishListBtn } = style;
import { memo, useEffect, useState } from "react";
import Iconformat from "@Components/feedback/IconFormat/Iconformat";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";




const Product = memo(({ id, title, price, img, max, quantity=1, isLiked }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
const{accessToken}= useAppSelector((state)=> state.auth)
  const[toggleIcone,settoggleIcone]=useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const currentReminimngQuantity = (max - quantity);
  const quantityReachedToMax = currentReminimngQuantity === 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {

    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  }
  const likeToggleHandler = () => {
  
      if (!isLoading) {
        setIsLoading(true);
         dispatch(actLikeToggle(id))
          .unwrap()
          .then(() =>{
            setIsLoading(false);
            settoggleIcone(!toggleIcone);
          })
            
          .catch(() => setIsLoading(false));
      }
    
  };


  return (
    <>
    
      <div className={productContainer} key={id}>
        {accessToken && (
          <div className={wishListBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) :
          isLiked ||  toggleIcone ? (
            <Iconformat icon="faHeart" />
          ) : (
          <span>♡</span>
      
                  
          )}
        </div>
        )}
        
        <div className={imgContainer}>
          <img src={img} alt="men" />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <div className="d-flex justify-content-between">
            <h3>{price.toFixed(2)} EGP</h3>

          </div>

          <small>
            {quantityReachedToMax
              ? "You reached to the limit"
              : `You can add ${currentReminimngQuantity} item(s)`}
          </small>
        </div>
        {accessToken && (
          <Button
          variant="info"
          style={{ color: "white",width: "100%"}}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
        )}
        
      </div></>
  )
});

export default Product
