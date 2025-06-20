import { useParams } from "react-router-dom";
import { useState } from "react";
import { testProducts } from "../../components/ProductCatalog/ProductCatalog";
import heart from "../../assets/heart.svg";
import heartFilled from "../../assets/heart-filled.svg";
import styles from "./ProductPage.module.css";
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";

export default function ProductPage() {
    const { name } = useParams();
    const product = testProducts.find((p) => p.name === name);

    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);

    if (!product) {
        return <p style={{ padding: "2vw" }}>Product not found</p>;
    }

    return (
        <>
            <Header/>
            <section className={styles.wrapper}>
                <div className={styles.breadcrumbs}>
                    <span>Home</span> / <span>Menu</span> / <span className={styles.active}>{product.name}</span>
                </div>

                <div className={styles.content}>
                    <img src={product.link} alt={product.name} className={styles.image} />

                    <div className={styles.details}>
                        <h2 className={styles.name}>{product.name}</h2>
                        <div className={styles.price}>Price <span>${product.price}</span></div>

                        <h3 className={styles.subheading}>Description</h3>
                        <p className={styles.desc}>
                            From classic favorites to unique creations, our cake menu offers a delectable selection
                            of sweet treats that will satisfy your cravings...
                        </p>

                        <div className={styles.actions}>
                            <button
                                className={`${styles.add} ${added ? styles.added : ""}`}
                                onClick={() => setAdded(true)}
                            >
                                {added ? "Added!" : "Add to Cart"}
                            </button>

                            <button
                                className={styles.like}
                                onClick={() => setLiked(!liked)}
                                aria-label="Like"
                            >
                                <img src={liked ? heartFilled : heart} alt="heart icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
