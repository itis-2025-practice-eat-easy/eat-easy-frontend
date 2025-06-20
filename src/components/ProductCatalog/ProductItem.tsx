import "./ProductCatalog.css"
import { Link } from "react-router-dom";

export interface ProductItemProps {
    link: string;
    name: string;
    price: string;
}

export default function ProductItem({ link, name, price }: ProductItemProps) {
    return (
        <Link to={`/product/${name}`} className="productItem">
            <div className="productItem_card">
                <img src={link} alt="Product image" />
            </div>
            <div className="productItem_info">
                <div className="productItem_text">
                    <h3 className="productItem_name">{name}</h3>
                    <h3 className="productItem_price">${price}</h3>
                </div>
            </div>
        </Link>
    );
}