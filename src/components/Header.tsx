import { Link } from 'react-router-dom';
import { MdFavoriteBorder } from "react-icons/md";
import { TiLocationOutline } from "react-icons/ti";
import { GoPeople } from "react-icons/go";
import { useSelector } from 'react-redux';
import { Favorite } from '../interface';

const links = [
  { id: 1, path: '/location', text: "Location", icon: TiLocationOutline },
  { id: 2, path: '/character', text: "Characters", icon: GoPeople },
]

const Header = () => {
  const favorite = useSelector((state: { favorite: Favorite }) => state.favorite);
 
  return (
    <header>
      <nav className='container-nav'>
        <div className='logo'>
          Rick&Morty
        </div>
        <div>
        </div>
        <ul className='linkler'>
          <li>
            <Link to='/favorites' style={{ color: "white", display: "flex", alignItems: "center", paddingLeft: "15px",position:"relative" }}>
            <span style={{position:"absolute",top:7,left:30}}>{favorite.favoriteItems.length}</span>
            <MdFavoriteBorder style={{ fontSize: "50px",color:"red" }} />
              Favorites
            </Link>
          </li>
          {
            links.map((link) => (
              <li key={link.id}>
                <Link to={link.path} style={{ color: "white", display: "flex", alignItems: "center", paddingLeft: "15px" }}>
                  <link.icon style={{ fontSize: "30px" }} />
                  {link.text}
                </Link>
              </li>))
          }
        </ul>
      </nav>
    </header>
  )
}

export default Header
