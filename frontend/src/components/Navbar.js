import React, {useState, Fragment} from 'react'
import '../styles/Navbar.css'
import { Link, useHistory, useLocation, NavLink} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../img/takapetextandlogo.svg'
import logoicon from '../img/takapelogo.svg'

import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import { HashLink } from 'react-router-hash-link';
defineLordIconElement(loadAnimation);

const navigation = [
    { name: 'Home', href: '/', hashlink: false },
    { name: 'Cafe', href: '/cafes', hashlink: false },
    { name: 'About', href: 'about', hashlink: true },
    { name: 'Contact Us', href: 'contactus', hashlink: true },
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
    
    let location = useLocation();
    const [isActive, setActive] = useState(false);
    const [error, setError] = useState('')
    const {logout, currentUser, userIMG, setUserIMG} = useAuth()
    const history = useHistory()

    const HandleClick = (e) => {
        e.preventDefault()
        console.log(location.pathname);
        setActive(!isActive);
    };

    async function handleLogout(){
        setError('')

        try{
            setUserIMG("")
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }

    return (

        <div>
                    
            <Disclosure as="nav" className="w-full bg-white pt-1">
            {({ open }) => (
                <>
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-2">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XIcon className="block h-6 w-6 text-brown" aria-hidden="true" />
                                ) : (
                                    <MenuIcon className="block h-6 w-6 text-brown" aria-hidden="true" />
                                )}
                                </Disclosure.Button>
                        </div>

                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                            {/* takape logo */}
                            <div className="flex-shrink-0 flex items-center">
                                {/* code for different logos */}
                                {/* <picture>
                                    <source srcset={logo} media="(min-width: 1024px)" />
                                    <source srcset={logo} media="(min-width: 768px)" />
                                    <img src={logoicon} alt="takape.ph" className="lg:block h-10 w-auto"/>
                                </picture> */}
                                <img src={logo} alt="takape.ph" className="lg:block h-10 w-auto"/>
                            </div>

                            {/* menus */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-6 justify-items-end">
                                    {navigation.map((item) => (
                                        <div className="pt-2">
                                            {!item.hashlink ? 
                                            <NavLink
                                            key={item.name}
                                            to={item.href}
                                            exact 
                                            activeStyle={{
                                                borderRadius: "none",
                                                backgroundColor: "#FFF5E1",
                                                color: "#C9593F",
                                            }}
                                            className='px-3 rounded-lg text-brown transition-all hover:bg-lightaccent hover:text-accent py-2 text-sm font-bold'
                                            >
                                                {item.name}
                                            </NavLink> : 
                                            <HashLink 
                                            smooth
                                            key={item.name}
                                            to={`/#${item.href}`}
                                            exact 
                                            activeStyle={{
                                                borderRadius: "none",
                                                backgroundColor: "#FFF5E1",
                                                color: "#C9593F",
                                            }}
                                            className='px-3 rounded-lg text-brown transition-all hover:bg-lightaccent hover:text-accent py-2 text-sm font-bold'
                                            >
                                                {item.name}
                                            </HashLink> 
                                            }
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        
                        {/* Profile dropdown */}
                        <Menu as="div" className={!currentUser ? "hidden": "inline ml-3 relative z-10"}>
                        <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                {currentUser && currentUser.photoURL ? (
                                <div>
                                    <img
                                        className="h-8 w-8 rounded-full "
                                        src={userIMG}
                                        alt=""
                                    />
                                </div>) :
                                (<lord-icon
                                    src="https://cdn.lordicon.com/dxjqoygy.json"
                                    stroke="100"
                                    trigger="hover"
                                    colors="primary:#C9593F,secondary:#C9593F"
                                    style={{ width:40, height:40, backgroundColor: "#FFF5E1", borderRadius: 100, padding: 4}}
                                >
                                </lord-icon>)}
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className=" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="/update-profile"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Your Profile: {currentUser.displayName}
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item onClick={handleLogout}>
                                {({ active }) => (
                                <div
                                    className={classNames(active ? 'bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Sign out
                                </div>
                                )}
                            </Menu.Item>
                            </Menu.Items>
                        </Transition>
                        </Menu>

                        {/* SIGN UP BUTTON */}
                        <button className={currentUser ? "hidden" : 
                        "bg-bggradient shadow-light transition-all hover:border-bggradient hover:bg-none hover:text-white text-white font-semibold px-3 py-2 rounded-lg text-sm font-medium border border-transparent rounded"}>
                            Sign In
                        </button>         
                    </div>
                    </div>
                </div>


                {/* mobile menus */}
                <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <div className="pt-2">
                        {!item.hashlink ? 
                        <NavLink
                        key={item.name}
                        to={item.href}
                        exact
                        className='text-brown hover:bg-fadedbrown hover:text-white block px-3 py-2 rounded-md text-base w-full font-medium'
                        >
                        {item.name}
                        </NavLink> : 
                        <HashLink 
                        smooth
                        key={item.name}
                        to={`/#${item.href}`}
                        exact 
                        activeStyle={{
                            borderRadius: "none",
                            backgroundColor: "#FFF5E1",
                            color: "#C9593F",
                        }}
                        className='text-brown hover:bg-fadedbrown hover:text-white block px-3 py-2 rounded-md text-base w-full font-medium'
                        >
                            {item.name}
                        </HashLink> 
                        }
                    </div>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        
        </div>
    )
}
