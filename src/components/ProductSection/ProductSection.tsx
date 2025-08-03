import React from 'react';
import styles from './ProductSection.module.css';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
}

interface ProductSectionProps {
  products: Product[];
  subtitle: string;
  title: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ products, subtitle, title }) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className={styles.productName}>{product.name}</span>
                <a href={product.link} className={styles.shopButton}>Shop Now</a>
              </div>
              <p className={styles.description}>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
