import { Footer } from "@Components/Common";
import {Header} from "@Components/Common";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.css"
const { container, wapper } = styles;

export default function MainLayout() {
  return (
  <Container className={container}>
  <Header/>
  <div className={wapper}>
        <Outlet/>
      </div>
  
  <Footer/>
    </Container>
  )
}
