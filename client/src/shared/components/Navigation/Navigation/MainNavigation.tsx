import './MainNavigation.css';
import React, {useState} from "react";

import MainHeader from "../Header/MainHeader";
import NavLinks from '../NavLinks/NavLinks';
import { Link } from "react-router-dom";
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';

const MainNavigation = () =>{
    const [drawIsOpen, setDrawIsOpen] = useState(false);

    const openDrawer = () =>{
        setDrawIsOpen(true);
    }
     const closeDrawer = () =>{        
        setDrawIsOpen(false);
    }

    return (
        <>   
            {drawIsOpen && <Backdrop onClick={closeDrawer}/>}
            {drawIsOpen && 
                <SideDrawer show={drawIsOpen} onClick={closeDrawer}>
                    <nav className='main-navigation__drawer-nav'>
                        <NavLinks />
                    </nav>
                </SideDrawer>
            }
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawer}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 className="main-navigation__title">
                    <Link to={'/'}>
                        YourPlaces
                    </Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>
    )
}

export default MainNavigation;