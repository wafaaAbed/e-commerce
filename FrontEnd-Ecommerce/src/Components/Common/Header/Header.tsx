import { Nav, Navbar, Container, Modal, Button, NavDropdown, DropdownButton } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from "./styles.module.css"
import Iconformat from '@Components/feedback/IconFormat/Iconformat';
import Registration from './Registration/Registration';

import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { authLogout } from '@store/auth/authSlice';
import { useState } from 'react';
const { bgNavHeader, NavHead, asBtn,droplistFormat } = styles
export default function Header() {
  const dispatch = useAppDispatch();
  const { accessToken ,loading ,user} = useAppSelector((state) => state.auth)
  const [showModal, setShowModal] = useState(false);
  const modalHandler = () => {
    setShowModal(!showModal)
  }
  const logoutHandler = async()=>{
    dispatch(authLogout())
    modalHandler();
  }
  return (
    <><Modal show={showModal} onHide={modalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>LogOut</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you to logout?
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="info" className="text-light" onClick={logoutHandler }>
          {loading === "pending" ? "Loading..." : "Logout"}
          
          </Button>
        </Modal.Footer>
    </Modal>
    
    <Navbar expand="lg" className={bgNavHeader}>
        <Container>
          <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`me-auto ${NavHead}`}>
              <Nav.Link as={NavLink} to="/" end><Iconformat icon='faHouse' />
                Home</Nav.Link>
              <Nav.Link as={NavLink} to="categories"><Iconformat icon='faList' />Categories</Nav.Link>
              <Nav.Link as={NavLink} to="aboutUs"><Iconformat icon='faAddressCard' />
                About Us</Nav.Link>
            </Nav>
            <Nav>
              {accessToken ? <>
                <HeaderLeftBar />
                <DropdownButton variant="light" title={`Welcome: ${user?.firstName} ${user?.lastName}`} className={droplistFormat} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to={"profile"} end>Profile</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={"profile/order"}>Order</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
                    as={NavLink}
                    to="/"
                  onClick={modalHandler}>Logout</NavDropdown.Item>
                  </DropdownButton>
                                
                  </>
                :
                <>
                  <Registration title='Login' classStyle={asBtn} navigation='login' iconName={"faUser"} />

                  <Registration title='Register' navigation="register" classStyle={asBtn} iconName={'faUserPlus'} />
                </>
                
                }



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar></>
  )
}
