
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import avatar from '../assets/avatar.jpg';
import Hamburger from 'hamburger-react';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

interface MenuProps {
    name: string;
    children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ name, children }) => {
    const [visible, setVisible] = useState(false)

    const move = useNavigate(); 

    const customIcons = (
        <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
                <span className="pi pi-search" />
            </button>
        </React.Fragment>
    );

    const customHeader = (
        <div className="flex align-items-center gap-2 ">
            <Avatar image={avatar} shape="circle" />
            <span className="font-bold">{name}</span>
        </div>
    );
    return (
        <>
            <Sidebar visible={visible} header={customHeader} onHide={() => setVisible(false)} className="w-20rem md:w-20rem lg:w-30rem" icons={customIcons} >
                {children}
            </Sidebar>
            <div className="w-full flex flex-row justify-between bg-custom_black p-4">
                <div className=" flex w-fit flex-row justify-start items-center gap-2" onClick={()=>move('/')}>
                    <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
                    <div className='text-3xl font-extrabold text-light'>
                        SPARRING
                    </div>
                </div>
                <div className="border border-dark rounded-md bg-light hover:scale-110  active:scale-95 transition-all duration-200 flex flex-row justify-center items-center w-fit h-fit">
                    <Hamburger toggled={visible} toggle={() => setVisible((prev) => !prev)} />
                </div>
            </div>
        </>

    )
}


export default Menu