import './Menu.css'
import ProductCard from '../ProductCard/ProductCard.tsx'

function Menu() {
    return (
        <div className="menu__content">
            <div className="menu__title-wrapper">
                <span className="menu__top-title">Explore</span>
                <h2 className="menu__title">Our Delicious Menu</h2>
            </div>
            <div className="menu__product-grid">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default Menu