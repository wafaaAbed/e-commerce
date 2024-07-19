import Iconformat from "@Components/feedback/IconFormat/Iconformat"
import { TIconTypes } from "@types";
import { Badge,Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import style from "./style.module.css";
const {IconDesgin,counter}=style;


type TCartAndWishlistProps ={
  to:string,
  iconeName:keyof typeof TIconTypes,
  totalQuantity:number,
}

export default function CartAndWishlist({to,iconeName,totalQuantity}:TCartAndWishlistProps) {
  return (
    <Nav.Link as={NavLink} to={to} className={IconDesgin}>
    <Iconformat icon={iconeName} />
    <Badge className={counter}>{totalQuantity}</Badge>
  </Nav.Link>
  )
}
