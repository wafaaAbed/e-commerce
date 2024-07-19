
import { Heading } from '@Components/Common'
import Loading from '@Components/feedback/Loading/Loading'
import { Modal, Table } from 'react-bootstrap'
import useOrders from './useOrders'
import { Product } from '@Components/e-Commerce'

function Order() {
  const {loading,error,viewDetailsHandler,handleCloseModal,selectedProduct,showModal,orderList}=useOrders()

  return (
    <>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Products Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct.map((el) => (
          <Product
            id={el.id}
            key={el.id}
            title={el.title}
            img={el.img}
            price={el.price}
            quantity={el.quantity}
          />
          
        ))}
      </Modal.Body>
    </Modal>
    <Heading title="My Order" />
    <Loading status={loading} error={error} type="table" >
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Items</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((el) => (
          <tr key={el.id}>
            <td>#{el.id}</td>
            <td>
              {el.items.length} Item(s){" / "}
              <span
                onClick={() => viewDetailsHandler(el.id)}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Product Details
              </span>
            </td>
            <td>{el.subtotal.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Loading>
  </>
  )
}

export default Order
