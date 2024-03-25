import { Link } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Favorite } from '../interface';
import { SlBasket } from "react-icons/sl";
import Badge from 'react-bootstrap/Badge';
import { useState } from 'react';
import Modal from './Modal';
import { CartItem } from '../interface/CartItem';

const links = [
  { id: 1, path: '/location', text: "Location", icon: TiLocationOutline },
  { id: 2, path: '/character', text: "Characters", icon: GoPeople },
]

const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false)
  const favorite = useSelector((state: { favorite: Favorite }) => state.favorite);
  const cart = useSelector((state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  

  const showNavbar = () => {
   setIsMenuOpen(!isMenuOpen);

  };
  return (
    <header>
      <nav className='container-nav'>
        <div className='logo'>
          Rick&Morty
        </div>
        <div>
          {isMenuOpen && (
             <ul className={`linkler`}>

             {
               links.map((link) => (
                 <li key={link.id}>
                   <Link to={link.path} style={{ color: "white", display: "flex", alignItems: "center", paddingLeft: "15px" }}>
                     <link.icon style={{ fontSize: "30px" }} />
                     {link.text}
                   </Link>
                 </li>))
             }
             <li className='pe-5'>
               <Link to='/favorites'>
                 <FaRegHeart className='fs-2 text-light position-relative' />
                 <Badge pill bg="info" className='position-absolute'>
                   {favorite.favoriteItems.length}
                 </Badge>
               </Link>
             </li>
             <li className='pe-5'>
               <button onClick={() => setModalShow(true)} className='bg-transparent border-0'>
                 <SlBasket className='fs-2 text-light position-relative' />
                 <Badge pill bg="info" className='position-absolute'>
                   {/*cartdaki elemanların sayısını yazdım*/}
                   {cart.length}
                 </Badge>
               </button>
               <Modal show={modalShow} onHide={() => setModalShow(false)} />
             </li>
           </ul>
          )}
         
          <div className='button-group'>
            <button className="nav-btn" onClick={showNavbar}>
              <FiMenu size={24} color="#fff" />
            </button>
          </div>
        </div>
      </nav>

    </header>
  )
}

export default Header

 {/* <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes size={24} color="#fff"/>
          </button> */}
