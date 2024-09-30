import { Avatar, DarkThemeToggle, Dropdown, Navbar, Tooltip } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiShoppingCart, FiSettings, FiBox } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import Search from "../Search/Search";
import "./Navbar.scss";
import useCart from "../../hooks/useCart";


const Nav = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const navigate = useNavigate();
    const { cart } = useCart();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Naomi Laurence</span>
            </Navbar.Brand>

            <div className="flex md:order-2 items-center">
                <div className="">
                    <Search />
                </div>

                <Link to="/cart" className="ml-2">
                    <Tooltip
                        content="View Cart"
                        placement="top"
                        className="text-xs bg-gray-700 text-white rounded px-2 py-1"
                    >
                        <div className="relative">
                            <FiShoppingCart size={20} className={cart && cart.totalQuantity > 0 ? "text-red-500" : "text-gray-300"} />
                            {cart && cart.totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                                    {cart.totalQuantity}
                                </span>
                            )}
                        </div>
                    </Tooltip>
                </Link>


                {isLoggedIn && user?.isAdmin && (
                    <>
                        <Link to="/admin/products" className="hidden md:block ml-2">
                            <Tooltip
                                content="Manage products"
                                placement="top"
                                className="text-xs bg-gray-700 text-white rounded px-2 py-1"
                            >
                                <FiBox size={20} className="text-gray ml-2 hover:text-gray-300" />
                            </Tooltip>
                        </Link>
                        <Link to="/admin/users" className="hidden md:block ml-2">
                            <Tooltip
                                content="Manage users"
                                placement="top"
                                className="text-xs bg-gray-700 text-white rounded px-2 py-1"
                            >
                                <FiUser size={20} className="text-gray ml-2 hover:text-gray-300" />
                            </Tooltip>
                        </Link>
                    </>
                )}


                {isLoggedIn && (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name.first} {user.name.last}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => navigate(`/users/${user._id}`)}>Update Profile</Dropdown.Item>
                        
               
                        {user.isAdmin && (
                            <>
                                <Dropdown.Item onClick={() => navigate("/admin/products")}>
                                    Manage products
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/admin/users")}>
                                    Manage users
                                </Dropdown.Item>
                             
                            </>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => { logout(); navigate("/"); }}> Sign out </Dropdown.Item>
                    </Dropdown>
                )}


                {!isLoggedIn && (
                    <Tooltip content="Login" placement="bottom" className="text-xs bg-gray-700 text-white rounded px-1 py-1">
                        <Link to="/login" className="ml-3 mr-1 flex items-center">
                            <FiUser size={20} className="text-gray hover:text-gray-300" />
                        </Link>
                    </Tooltip>
                )}


                <Navbar.Toggle />
                <DarkThemeToggle/>
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" className={`text-xs custom-navbar-link ${isActive("/") ? "font-bold text-green-600" : ""}`}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/about" className={`text-xs custom-navbar-link ${isActive("/about") ? "font-bold text-green-600" : ""}`}>
                    About
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;