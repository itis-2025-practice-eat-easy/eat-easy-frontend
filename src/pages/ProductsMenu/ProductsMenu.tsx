import { useState } from "react";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
import "./ProductsMenu.css";
import CategoriesList from "../../components/Category/CategoryList.tsx";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";

export default function ProductsMenu() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <>
            <Header/>
            <section className="menuPage">
                <CategoriesList selected={selectedCategory} setSelected={setSelectedCategory} />
                <div className="catalogSection">
                    <div className="breadcrumbs">
                        <span className="breadcrumb">Home</span> / <span className="breadcrumb active">{selectedCategory}</span>
                    </div>
                    <h2 className="menuTitle">Our Menu</h2>
                    <ProductCatalog category={selectedCategory} />
                </div>
            </section>
            <Footer/>
        </>
    );
}
