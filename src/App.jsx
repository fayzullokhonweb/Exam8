// react-router-dom
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// pages
import {
  CreateRecipe,
  FoodStore,
  Home,
  Login,
  ResetPassword,
  Signup,
  SingleRecipe,
} from "./pages";

// layout
import MainLayout from "./layout/MainLayout";

// components
import { ProtectedRoutes } from "./components/ProtectedRoutes";

// redux
import { useSelector, useDispatch } from "react-redux";
import { isAuthChange } from "./features/userSlice";

// action
import { action as SignupAction } from "./pages/Signup";
import { action as LoginAction } from "./pages/Login";
import { action as CreateAction } from "./pages/CreateRecipe";
import Stats from "./pages/Stats";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <CreateRecipe />,
          action: CreateAction,
        },
        {
          path: "/recipe/:id",
          element: <SingleRecipe />,
        },
        {
          path: "/store",
          element: <FoodStore />,
        },
        {
          path: "/stats",
          element: <Stats />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
      errorElement: <Error />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
      action: SignupAction,
      errorElement: <Error />,
    },
    {
      path: "/reset",
      element: user ? <Navigate to="/" /> : <ResetPassword />,
      errorElement: <Error />,
    },
  ]);

  return <> {isAuthChange && <RouterProvider router={routes} />}</>;
}

export default App;
