import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./Components/RootLayout";
import Home from "./Components/Home";
import UserList from "./Components/UserList";
import AddUser from "./Components/AddUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "users", element: <UserList /> },
      { path: "add-user", element: <AddUser /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;