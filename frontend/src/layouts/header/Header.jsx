import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { NavBar } from "../../components";

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <div className='w-full h-auto'>
            
            <div className='flex justify-between items-center px-4 py-3 bg-gray-100 shadow-md'>
                <NavBar />
                
                
                {isAuthenticated && (
                    <div className='flex items-center text-mediumGray gap-3 font-medium text-[14px]'>
                        <FontAwesomeIcon icon={faUser} className='text-[18px]' />
                        <p>{user[0].full_name.split(' ')[0]}</p>
                    </div>
                )}
            </div>

            
            
        </div>
    );
};

export default Header;
