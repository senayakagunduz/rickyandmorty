import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom";
import Header from '../components/Header';

const CommonLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default CommonLayout