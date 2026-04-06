'use client'

import { api } from '@/services/api';
import styles from './Products.module.css'
import { sportsItemType } from '@/types/sportsItem'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard'
import { error } from 'console';


export default function Products() {

    const [products, setProducts] = useState<sportsItemType[]>([]);
    
    useEffect(() => {
        async function getProducts() {
            const { response, error } = await api('GET', '/artigosEsportivos')

            if (response) {
                setProducts(response as sportsItemType[])
            } else {
                console.error(error?.message)
            }
        }   

    getProducts()
    }, [])

    console.log(products);

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