import './product_card.css';
import type { Category } from '../../types/products';

interface ProductCardProps {
    category: Category;
}

function ProductCard({ category }: ProductCardProps) {
    return (
        <article className="menu__product-card">
            <img
                src="/images/category-placeholder.png"
                alt={category.title}
                className="menu__product-img"
            />
            <div className="menu__product-desc">
                <h3 className="menu__product-title">{category.title}</h3>
            </div>
        </article>
    );
}

export default ProductCard;
