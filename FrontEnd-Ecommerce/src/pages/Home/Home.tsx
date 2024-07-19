import { NavLink } from "react-router-dom";
import style from "./style.module.css";
import {  Nav } from "react-bootstrap";
const {contanerHome,overlay,homeInfo}= style;

export default function Home() {

  return (
    <div className={contanerHome}>
      <div className={overlay}></div>
      <div className={homeInfo}>
        <h2>Export Trending Clothes for all family</h2>
        <Nav as={NavLink} to="categories">Order Now</Nav>
        {/* <button as={NavLink} to={"/category"}>Order Now</button> */}
      </div>
    </div>
  )
}
