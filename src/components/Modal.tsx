import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { CartItem } from '../interface/CartItem';

interface IProps {
  show: boolean,
  onHide: () => void,
}
function MyVerticallyCenteredModal(props: IProps): JSX.Element {
  const cartItems = useSelector((state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems)
  console.log(cartItems, "cartItems")
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Character Shopping Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className=''>
          <Row className='d-flex px-4'>
            {cartItems ? (
              cartItems.map((item, index) => (
                <div key={index} className='d-flex justify-content-between align-items-center gap-5'>
                  <div>
                    <img src={item.image} className="mb-3" style={{ width: "5rem", height: "auto" }} />
                  </div>
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <div className="btn-group d-inline" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary">-</button>
                    <button type="button" className="btn btn-outline-primary">{item.quantity}</button>
                    <button type="button" className="btn btn-outline-primary">+</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
          </Row>
          <Row className='px-4'>
            <div className='text-end'>
              <h6>Total Characters:</h6>
              {
                cartItems ? (
                    <h5>
                      {cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)}
                    </h5>
                  ) : (<p>No items in the cart</p>)
              }
            </div>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default MyVerticallyCenteredModal