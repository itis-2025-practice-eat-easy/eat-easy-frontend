import './App.css'
import Homepage from "./pages/Homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import RegistrationForm from "./pages/RegistrationForm/RegistrationForm.tsx";
import LoginForm from "./pages/LoginForm/LoginForm.tsx";
import CartPage from "./pages/CartPage/CartPage.tsx";
import ProductsMenu from "./pages/ProductsMenu/ProductsMenu.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/"  element={<Homepage/>} />
            <Route path="/registration" element={<RegistrationForm/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/menu" element={<ProductsMenu/>}/>
            <Route path="/product/:name" element={<ProductPage />} />
        </Routes>
    </>
  )
}

export default App
