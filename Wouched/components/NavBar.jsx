import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BiLogOut } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import { setUserData } from '@/Utils/UserSlice';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import Image from 'next/image';
import { useAuth } from '@/Services/authContext';


export default function NavBar() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, authLoading } = useAuth();
    const ref = useRef();

    const [openJobs, setOpenJobs] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lastToken, setLastToken] = useState(null);

    useEffect(() => {
        setLastToken(localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        const checkTokenChange = () => {
            const currentToken = localStorage.getItem('token');
            if (currentToken !== lastToken) {
                setLastToken(currentToken);
                dispatch(setUserData(currentToken));
            }
        };

        const intervalId = setInterval(checkTokenChange, 1000);
        return () => clearInterval(intervalId);
    }, [lastToken, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.removeItem('token');
        setLastToken(null);
        router.reload();
        dispatch(setUserData(null));
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return (
        <>
            <div className={`w-full ${scrolled ? "bg-white" : "bg-white"} px-6 h-20 bg-orange-600 text-black flex items-center justify-between fixed top-0 left-0 z-50`}>
                <div className='px-2 h-full flex items-center justify-center'>
                <Image src='/wouched.png' width={100} height={100} alt='Logo Wouched' />
                </div>
                <div className='px-2 h-full hidden items-center justify-center lg:flex'>
                    <Link href={'/'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Home</Link>
                    <Link href={'/User/postAJob'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Post Jobs</Link>
                    <Link href={'/User/displayJobs'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >View Jobs</Link>
                    <Link href={'/User/postedJob'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Posted Jobs</Link>
                    <Link href={'/User/contact'} className="px-3 mx-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Contact</Link>
                </div>
                <div className='px-2 h-full hidden items-center justify-center lg:flex ' >
                    {
                        user !== null ? (
                            <>

                                <BiLogOut onClick={handleLogout} className=' cursor-pointer text-3xl hover:text-red-500 transition-all duration-700' />
                                <p className='text-lg px-4 font-semibold'>{user?.name}</p>
                            </>
                        ) : (
                            <>
                                <Link href={'/auth/login'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-orange-600'>Login</Link>
                                <Link href={'/auth/register'} className='px-4 py-2 border border-orange-600 rounded uppercase tracking-widest mx-4   text-orange-600 bg-white transition-all duration-700 hover:bg-orange-600 font-semibold text-base hover:text-white'>REGISTER</Link>
                            </>
                        )
                    }

                </div>

                <div className='flex lg:hidden  px-2 py-2 '>
                    <GiHamburgerMenu className='text-4xl' onClick={() => setIsOpen(state => !state)} />
                </div>

                {
                    isOpen && (
                        <div ref={ref} className='flex w-full py-2 animate-fade-in-down  bg-white transition-all fade duration-1000 absolute top-20 left-0  items-center justify-center flex-col '>
                            <div className='px-2 h-full flex items-center justify-center flex-col py-2 '>
                                <Link href={'/'} onClick={() => setIsOpen(false)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Home</Link>
                                <button  onClick={() => setOpenJobs(state => !state)} className="px-3  m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase flex items-center justify-center" >Jobs {openJobs ? <AiFillCaretUp/>  : <AiFillCaretDown />} </button>

                                {
                                    openJobs &&
                                    <>
                                        <Link href={'/User/displayJobs'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >View Jobs</Link>
                                        <Link href={'/User/postAJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Post Jobs</Link>
                                        <Link href={'/User/postedJob'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Posted Jobs</Link>
                                    </>
                                }
                                <Link href={'/User/contact'} onClick={() => setIsOpen(false)} className="px-3 m-4 text-base font-medium transition-all duration-700 hover:translate-y-2 uppercase" >Contact</Link>
                            </div>
                            <div className='px-2 h-full  items-center justify-center flex' >
                                {
                                    user !== null ? (
                                        <>

                                            <BiLogOut onClick={handleLogout} className=' cursor-pointer text-3xl hover:text-red-500 transition-all duration-700' />
                                            <p className='text-lg px-4 font-semibold'>{user?.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <Link href={'/auth/login'} className='px-4 py-2 border border-white rounded uppercase tracking-widest mx-4   transition-all duration-700 hover:bg-white font-semibold text-base hover:text-orange-600'>Login</Link>
                                            <Link href={'/auth/register'} className='px-4 py-2 border border-orange-600 rounded uppercase tracking-widest mx-4   text-orange-600 bg-white transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-orange-800'>REGISTER</Link>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    )
                }

            </div>
        </>
    )
}
