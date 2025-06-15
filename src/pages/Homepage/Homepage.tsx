import Header from "../../components/Header/Header"
import Button from "../../components/Button/Button"
import Menu from "../../components/Menu/Menu"
import './Homepage.css'
import Footer from "../../components/Footer/Footer.tsx";

function Homepage() {
    return (
        <body>
            <Header />
            <section className="welcome">
                <span className="welcome__top-title">Welcome to EatEasy</span>
                <h1 className="welcome__title">Super Delicious Food Special for You</h1>
                <p className="welcome__desc">Order your favorites food from anywhere and get delivery at your door </p>
                <Button>Create account</Button>
            </section>
            <section className="menu">
                <Menu />
            </section>
            <Footer />
        </body>
    )
}

export default Homepage