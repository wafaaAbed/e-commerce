import { Col, ListGroup, Row } from "react-bootstrap"
import { NavLink, Outlet } from "react-router-dom"
import style from "./style.module.css";
const {profileNav}= style;

function ProfileLayout() {
  return (
    <Row>
    <Col md={3}>
      <ListGroup className={profileNav}>
      <ListGroup.Item as={NavLink} to="" end>Account Info</ListGroup.Item>
      <ListGroup.Item as={NavLink} to="order">Orders</ListGroup.Item>
      </ListGroup>
    </Col>
    <Col>
    <Outlet/></Col>
  </Row>
  )
}

export default ProfileLayout
