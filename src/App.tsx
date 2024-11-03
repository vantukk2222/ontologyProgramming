import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import PageNotFound from "./Pages/404Pages/PagesNotFound";
import Authtemplate from "./Pages/AuthPages/Authtemplate";
import Dashboard from "./Pages/Home/Dashboard";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* anh em thêm route ở đây nhé, có thể lồng Route trong Route */}
        <Route path="login" element={<Authtemplate pages="login" />} />
        <Route path="register" element={<Authtemplate pages="register" />} />
        <Route path="home" element={<Dashboard/>}/>
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
};

export default App;
