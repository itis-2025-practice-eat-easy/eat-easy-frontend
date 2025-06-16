import './App.css'
import Homepage from "./pages/Homepage/Homepage.tsx";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/Profile/ProfilePage.tsx";
import RegistrationForm from "./pages/RegistrationForm/RegistrationForm.tsx";
import LoginForm from "./pages/LoginForm/LoginForm.tsx";
import {Cart} from "./components/Cart/Cart.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/"  element={<Homepage/>} />
            <Route path="/registration" element={<RegistrationForm/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/cart" element={<Cart/>} />
        </Routes>
    </>
  )
}

export default App
