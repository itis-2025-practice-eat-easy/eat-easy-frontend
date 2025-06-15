import './ProductCard.css'

function ProductCard() {
    return (
        <article className="menu__product-card">
            <img src="src\assets\Menu\52.png" alt="product" className="menu__product-img" />
            <div className="menu__product-desc">
                <h3 className="menu__product-title">Cakes</h3>
                <span className="menu__product-price">24 Menu</span>
            </div>
        </article>
    )
}

export default ProductCard