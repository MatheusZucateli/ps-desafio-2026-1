import { ProductCard } from "@/components/product-card";
import styles from './Products.module.css';
import { sportsItemType } from "@/types/sportsItem";


export default function Products() {
  
    const products : sportsItemType[] = [
        {
            id: '1',
            name: 'Chuteira Predator Elite',
            brand: 'Adidas',
            price: 749.99,
            year: 2024,
            image: 'https://picsum.photos/seed/shoes1/500/400',
            category: 'Calçados',
            amount: 2,
        },
        {
            id: '2',
            name: 'Bola Official Match Pro',
            brand: 'Nike',
            price: 299.99,
            year: 2024,
            image: 'https://picsum.photos/seed/ball2/500/400',
            category: 'Bolas',
            amount: 12,
        },
        {
            id: '3',
            name: 'Raquete Blade 98 V9',
            brand: 'Wilson',
            price: 1299.99,
            year: 2024,
            image: 'https://picsum.photos/seed/gear1/500/400',
            category: 'Equipamentos',
            amount: 3,
        },
        {
            id: '4',
            name: 'Kit Uniforme Pro Team',
            brand: 'Puma',
            price: 349.99,
            year: 2024,
            image: 'https://picsum.photos/seed/clothes1/500/400',
            category: 'Roupas',
            amount: 15,
        }
    ]

    return (
    <section className={styles.products} id="products">
        <div className={styles.container}>
            <h1 className={styles.title}>Nossos Produtos</h1>
                <div className={styles.productsList}>
                    {products.map((products) => (
                        <ProductCard key={products.id} {...products} />
                    ))}
                </div>
        </div>
    </section>
    )
}