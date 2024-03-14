import { useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from '../components/Header';
import { ToastContainer} from 'react-toastify';

const CommonLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div>
            <ToastContainer/>
            <Header />
            <Outlet />
        </div>
    )
}

export default CommonLayout