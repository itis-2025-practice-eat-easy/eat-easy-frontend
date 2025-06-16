import './Menu.css';
import ProductCard from '../ProductCard/ProductCard';
import { useCategories } from '../../hooks/useCategories';

export default function Menu() {
    const { categories, loading, error, refetch } = useCategories();

    if (loading) return <div className="menu__loading">Loading categories…</div>;
    if (error)   return (
        <div className="menu__error">
            Error loading categories: {error}
            <button onClick={refetch}>Retry</button>
        </div>
    );

    return (
        <div className="menu__content">
            <div className="menu__title-wrapper">
                <span className="menu__top-title">Explore</span>
                <h2 className="menu__title">Our Delicious Menu</h2>
            </div>
            <div className="menu__product-grid">
                {categories.map(cat => (
                    <ProductCard key={cat.id} category={cat} />
                ))}
            </div>
        </div>
    );
}
