import React, {useState, Fragment} from 'react'
import '../styles/Navbar.css'
import { Link, useHistory} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../img/takapetextandlogo.svg'

const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Cafe', href: '#', current: false },
    { name: 'About', href: '#', current: false },
    { name: 'Contact Us', href: '#', current: false },
]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navbar() {
    
    const [isActive, setActive] = useState(false);
    const [error, setError] = useState('')
    const {logout, currentUser} = useAuth()
    const history = useHistory()

    const handleClick = () => {
        setActive(!isActive);
    };

    async function handleLogout(){
        setError('')

        try{
            await logout()
            history.push('/login')
        }catch{
            setError('Failed to logout')
        }
    }

    return (

        <div>
                    
            <Disclosure as="nav" className="py-4 mb-0 sm:mb-20">
            {({ open }) => (
                <>
                <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
                    {/* MOBILE */}
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
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="hidden lg:block h-10 w-auto "
                                    src={logo}
                                    alt="takape.ph"
                                    
                                />
                            </div>

                            {/* menus */}
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4 justify-items-end">
                                    {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                        item.current ? 'rounded-none text-medbrown transition-all hover:text-brown border-medbrown border-b-2 px-2' : ' px-3 rounded-lg text-brown transition-all hover:bg-medbrown hover:text-white',
                                        'py-2 text-sm font-bold'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}  
                                    >
                                        {item.name}
                                    </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        
                        {/* Profile dropdown */}
                        <Menu as="div" className={!currentUser ? "hidden": "inline ml-3 relative z-10"}>
                        <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">

                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://i.ibb.co/VpScCK3/Toy-Faces-Colored-BG-29.jpg"
                                    alt=""
                                />
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
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Your Profile
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Settings
                                </a>
                                )}
                            </Menu.Item>
                            <Menu.Item onClick={handleLogout}>
                                {({ active }) => (
                                <a
                                    href="/update-profile"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                    Sign out
                                </a>
                                )}
                            </Menu.Item>
                            </Menu.Items>
                        </Transition>
                        </Menu>
                        <button class={currentUser ? "hidden" : "bg-brown hover:bg-transparent text-white font-semibold hover:text-brown px-3 py-2 rounded-lg text-sm font-medium border border-transparent hover:border-brown rounded"}>
                            Sign Up
                        </button>         
                    </div>
                    </div>
                </div>


                {/* mobile menus */}
                <Disclosure.Panel className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-fadedbrown text-white' : 'text-brown hover:bg-fadedbrown hover:text-white',
                            'block px-3 py-2 rounded-md text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </a>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
        
        </div>
    )
}
