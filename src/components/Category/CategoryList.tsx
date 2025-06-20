import styles from "./Categories.module.css";
import CategoryItem from "./CategoryItem.tsx";

const categories = [
    { name: "All", count: 200, icon: "/src/assets/Menu/52.png" },
    { name: "Cakes", count: 24, icon: "/src/assets/Menu/52.png" },
    { name: "Cupcakes", count: 25, icon: "/src/assets/Menu/52.png" },
    { name: "Donuts", count: 35, icon: "/src/assets/Menu/52.png" },
    { name: "Cookies", count: 24, icon: "/src/assets/Menu/52.png" },
    { name: "Macarons", count: 25, icon: "/src/assets/Menu/52.png" },
    { name: "Drinks", count: 22, icon: "/src/assets/Menu/52.png" },
];

export default function CategoriesList({ selected, setSelected }: {
    selected: string;
    setSelected: (name: string) => void;
}) {
    return (
        <aside className={styles.categoriesWrapper}>
            <h3 className={styles.title}>Categories</h3>
            {categories.map((cat) => (
                <CategoryItem
                    key={cat.name}
                    name={cat.name}
                    count={cat.count}
                    icon={cat.icon}
                    active={selected === cat.name}
                    onClick={() => setSelected(cat.name)}
                />
            ))}
        </aside>
    );
}
