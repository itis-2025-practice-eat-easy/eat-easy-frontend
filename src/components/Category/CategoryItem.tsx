import styles from "./Categories.module.css";

interface CategoryProps {
    name: string;
    count: number;
    icon: string;
    active: boolean;
    onClick: () => void;
}

export default function CategoryItem({ name, count, icon, active, onClick }: CategoryProps) {
    return (
        <button className={`${styles.categoryItem} ${active ? styles.active : ""}`} onClick={onClick}>
            <img src={icon} alt={name} />
            <div className={styles.text}>
                <span className={styles.name}>{name}</span>
                <span className={styles.count}>{count} Menu</span>
            </div>
        </button>
    );
}
