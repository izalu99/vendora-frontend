import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { CartContext } from '../plugin/Context';

const StoreHeader = () => {

    const isLoggedIn = useAuthStore(state => state.isLoggedIn)
    const user = useAuthStore(state => state.user)

    const [search, setSearch] = useState('')
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useContext(CartContext);

    useEffect(() => {
        console.log('isLoggedIn: ', isLoggedIn())
        console.log('user: ', user())
    }, [isLoggedIn, user])

    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const accountDropdownRef = useRef(null);
    const vendorDropdownRef = useRef(null);
    const navbarRef = useRef(null);

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
        setIsVendorDropdownOpen(false);
    };

    const toggleVendorDropdown = () => {
        setIsVendorDropdownOpen(!isVendorDropdownOpen);
        setIsAccountDropdownOpen(false);
    };

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleClickOutside = (event) => {
        if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
            setIsAccountDropdownOpen(false);
        }
        if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(event.target)) {
            setIsVendorDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSearchChange = (event) =>{
        event.preventDefault();
        setSearch(event.target.value)
        console.log('search: ', search)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/?query=${search}`)
    }


    return (
        <header className="bg-primary-bg text-primary-text">
            <nav className="container mx-auto flex items-center justify-between py-4 relative z-50" aria-label="Main Navigation">
                <Link className="text-2xl font-bold text-accent" to="/">Vendora</Link>
                <button onClick={toggleNavbar} className="lg:hidden py-1 px-2 bg-gray-800 rounded-md hover:bg-gray-600" aria-label={isNavbarOpen ? "Close Menu" : "Open Menu"}>
                    <i className={`fas ${isNavbarOpen ? `fa-times` : `fa-bars`}`}></i>
                </button>
                <div
                    id="navbar-menu"
                    ref={navbarRef}
                    className={`fixed inset-x-0 top-20 bottom-0 bg-white bg-opacity-75 z-40 transition-transform transform ${isNavbarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:top-0 lg:translate-x-0 lg:flex lg:items-center lg:space-x-4`}
                >
                    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:space-x-4 p-4 lg:p-0">
                        <div className="relative" ref={accountDropdownRef}>
                            <button onClick={toggleAccountDropdown} className="flex items-center space-x-2" aria-expanded={isAccountDropdownOpen} aria-haspopup="true">
                                <span className='text-accent'>Account</span>
                                <i className="fas fa-caret-down text-accent"></i>
                            </button>
                            {isAccountDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50" role="menu">
                                    <li><Link to={'/customer/account/'} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-user'></i> Account</Link></li>
                                    <li><Link to={`/customer/orders/`} className="block px-4 py-2 hover:bg-gray-200"  role="menuitem"><i className='fas fa-shopping-cart'></i> Orders</Link></li>
                                    <li><Link to={`/customer/wishlist/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-heart'></i> Wishlist</Link></li>
                                    <li><Link to={`/customer/notifications/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-bell fa-shake'></i> Notifications</Link></li>
                                    <li><Link to={`/customer/settings/`} className="block px-4 py-2 hover:bg-gray-200" role="menuitem"><i className='fas fa-gear fa-spin'></i> Settings</Link></li>
                                </ul>
                            )}
                        </div>
                        <div className="relative" ref={vendorDropdownRef}>
                            <button onClick={toggleVendorDropdown} className="flex items-center space-x-2" aria-expanded={isVendorDropdownOpen} aria-haspopup="true">
                                <span className='text-accent'>Vendor</span>
                                <i className="fas fa-caret-down text-accent"></i>
                            </button>
                            {isVendorDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50" role="menu">
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/dashboard/" role="menuitem"><i className='fas fa-user'></i> Dashboard</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/products/" role="menuitem"><i className='bi bi-grid-fill'></i> Products</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/product/new/" role="menuitem"><i className='fas fa-plus-circle'></i> Add Products</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/orders/" role="menuitem"><i className='fas fa-shopping-cart'></i> Orders</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/earning/" role="menuitem"><i className='fas fa-dollar-sign'></i> Earning</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/reviews/" role="menuitem"><i className='fas fa-star'></i> Reviews</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/coupon/" role="menuitem"><i className='fas fa-tag'></i> Coupon</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/notifications/" role="menuitem"><i className='fas fa-bell fa-shake'></i> Notifications</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-200" to="/vendor/settings/" role="menuitem"><i className='fas fa-gear fa-spin'></i> Settings</Link></li>
                                </ul>
                            )}
                        </div>
                        <div className="flex items-start space-x-2">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input 
                            id="search" 
                            name="search" 
                            className="px-4 py-2 rounded-full text-primary-text bg-secondary-bg focus:font-bold focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
                            type="text" 
                            placeholder="Search" 
                            aria-label="Search"
                            value={search}
                            onChange={(event) => handleSearchChange(event)}
                            />
                            <button 
                            className="bg-button-bg text-white px-4 py-2 rounded-full hover:bg-accent hover:text-secondary-text" 
                            type="button"
                            onClick={(event) => handleSearchSubmit(event)}
                            >Search</button>
                        </div>
                        {isLoggedIn() ? (
                            <>
                                <Link className="text-center bg-link text-white px-4 py-2 rounded-full hover:bg-link-hover" to="/dashboard">Dashboard</Link>
                                <Link className="text-center bg-link text-white px-4 py-2 rounded-full hover:bg-link-hover" to="/logout">Logout</Link>
                            </>
                        ) : (
                            <>
                            <Link className="text-center bg-link text-white px-4 py-2 rounded-full hover:bg-link-hover" to="/login">Login</Link>
                            <Link className="text-center bg-link text-white px-4 py-2 rounded-full hover:bg-link-hover" to="/register">Register</Link>
                            </>
                        )}
                        <Link className="text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" to="/cart/"><i className='fas fa-shopping-cart'></i> <span id='cart-total-items'>{cartCount}</span></Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default StoreHeader;