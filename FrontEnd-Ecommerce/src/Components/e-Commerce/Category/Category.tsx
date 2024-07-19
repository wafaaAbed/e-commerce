
import { Link } from "react-router-dom";
import style from "./style.module.css"
const {imgContainer,categoryContainer,categoryName}= style;

import { TCategory } from "@types";




function Category({title,img,prefix}:TCategory ){
// console.log(records.split(' ')[0] as string)
// const prefix = records.split(' ')[0] ;

  return (
    <div className={categoryContainer}>
        <Link to={`/categories/products/${prefix}`}>
      <div className={imgContainer}>
        <img src={img} alt="men" />
      </div>
      <h4 className={categoryName}>{title}</h4> 
       </Link>
    </div>
  )
}

export default Category
