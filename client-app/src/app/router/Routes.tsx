import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App";
import AboutPage from "../../features/about/AboutPage";
import UrlDashboard from "../../features/urls/dashboard/UrlDashboard";
import MyShortcuts from "../../features/my shortcuts/MyShortcuts";
import LoginPage from "../../features/users/LoginPage";
import UrlDetails from "../../features/urls/details/UrlDetails";
import TestErrors from "../../errors/TestError";
import NotFound from "../../errors/NotFound";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'about', element: <AboutPage />},
            {path: 'urls', element: <UrlDashboard />},
            // {path: 'urls/:id', element: <UrlDetails />}, // TODO
            {path: 'MyShortcuts', element: <MyShortcuts />},
            {path: 'login', element: <LoginPage />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
];

export const router = createBrowserRouter(routes);