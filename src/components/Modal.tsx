import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../interface/CartItem';
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart, increaseAmount, decreaseAmount } from '../store/cart-slice';

interface IProps {
  show: boolean,
  onHide: () => void,
}
//function MyVerticallyCenteredModal(props: IProps): JSX.Element { bu yapıyı eğer componentin içine children koyarsak kullanamayız
function MyVerticallyCenteredModal(props: IProps): JSX.Element {
  //CartItems a yazılan verileri çekiyorum.
  const cartItems = useSelector((state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems)
  console.log(cartItems, "cartItems")
  const dispatch=useDispatch();

  const handleDelete=(item:CartItem)=>{
    dispatch(removeFromCart(item));
  }
  const handleDecrease=(item:CartItem)=> {
    dispatch(decreaseAmount(item))
  }
  const handleIncrease=(item:CartItem)=>{
    dispatch(increaseAmount(item))
  }
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
            {/*CartItems daki verileri yazdırdım*/}
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
                    <button type="button" className="btn btn-outline-primary" onClick={()=>handleDecrease(item)}>-</button>
                    <button type="button" className="btn btn-outline-primary">{item.quantity}</button>
                    <button type="button" className="btn btn-outline-primary" onClick={()=>handleIncrease(item)}>+</button>
                  </div>
                  <div className='fs-3 d-flex justify-content-center align-items-center text-danger'>
                    <RiDeleteBin5Line onClick={()=>handleDelete(item)}/>
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
              {/*CartItems daki verilerin toplamını hesaplayıp yazdırdım*/}
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
        <Button onClick={props.onHide} className=''>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}


export default MyVerticallyCenteredModal