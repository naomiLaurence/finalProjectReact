import { createBrowserRouter } from "react-router-dom";
import ProtectedRouteAdmin from "../components/ProtectedRouteAdmin";
import ProtectedRouteUser from "../components/ProtectedRouteUser";
import Root from "../layout/root";
import AdminProducts from "./AdminProducts";
import CreateProduct from "./CreateProduct";
import Error from "./Error";
import Login from "./Login";
import Product from "./Product";
import Products from "./Products";
import Profile from "./Profile";
import Register from "./register/Register";
import UpdateUser from "./UpdateUser";
import Users from "./Users";
import Cart from "./Cart";
import EditProduct from "./EditProduct";
import About from "./About";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Products />},
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            { path: "/profile", element: <Profile /> },
            { path: "/products/:id", element: <Product /> },

            {
                path: "/admin/create-product",
                element: (
                    <ProtectedRouteAdmin>
                        <CreateProduct />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/products", element: <Products /> },
            {
                path: "/admin/users",
                element: (
                    <ProtectedRouteAdmin>
                        <Users />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/admin/products",
                element: (
                    <ProtectedRouteAdmin>
                        <AdminProducts />
                    </ProtectedRouteAdmin>
                ),
            },
            { path: "/users/:id", element: <UpdateUser /> },
            {
                path: "/admin/products/:id",
                element: (
                    <ProtectedRouteAdmin>
                        <EditProduct />
                    </ProtectedRouteAdmin>
                ),
            },
            {
                path: "/cart",
                element: (
                    <ProtectedRouteUser>
                        <Cart />
                    </ProtectedRouteUser>
                ),
            },
            {
                path: "/admin/products", element: <AdminProducts />,
            },
            {
                path: "/admin/users", element: <Users />,
            },
            { path: "/about", element: <About /> },
        ],
    },
]);
