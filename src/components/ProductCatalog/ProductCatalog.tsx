import ProductItem, { type ProductItemProps } from "./ProductItem.tsx";
import "./ProductCatalog.css";

interface ProductCatalogProps {
    category: string;
}

export const testProducts: (ProductItemProps & { category: string })[] = [
    { link: "/src/assets/Menu/52.png", name: "Chococheese Cake", price: "2.5", category: "Cakes" },
    { link: "/src/assets/Menu/52.png", name: "Pink Donuts", price: "2.8", category: "Donuts" },
    { link: "/src/assets/Menu/52.png", name: "Choco Cookies", price: "2.8", category: "Cookies" },
    { link: "/src/assets/Menu/52.png", name: "Chococheese Cake", price: "2.5", category: "Cakes" },
    { link: "/src/assets/Menu/52.png", name: "Pink Donuts", price: "2.8", category: "Donuts" },
    { link: "/src/assets/Menu/52.png", name: "Choco Cookies", price: "2.8", category: "Cookies" },
    { link: "/src/assets/Menu/52.png", name: "Chococheese Cake", price: "2.5", category: "Cakes" },
    { link: "/src/assets/Menu/52.png", name: "Pink Donuts", price: "2.8", category: "Donuts" },
    { link: "/src/assets/Menu/52.png", name: "Choco Cookies", price: "2.8", category: "Cookies" },
];

export default function ProductCatalog({ category }: ProductCatalogProps) {
    const filtered = category === "All"
        ? testProducts
        : testProducts.filter(p => p.category === category);

    return (
        <>
            {filtered.length === 0 ? (
                <p style={{ fontSize: "1.2vw", color: "#999", marginTop: "2vw" }}>
                    No products found in this category.
                </p>
            ) : (
                <ul className="productList">
                    {filtered.map((product, index) => (
                        <li key={index}>
                            <ProductItem {...product} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

