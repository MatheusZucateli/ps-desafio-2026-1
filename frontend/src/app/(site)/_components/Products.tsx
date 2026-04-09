'use client'

import { api } from '@/services/api';
import styles from './Products.module.css'
import { sportsItemType } from '@/types/sportsItem'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard'

const ITEMS_PER_PAGE = 8;

export default function Products() {
    const [products, setProducts] = useState<sportsItemType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const categorias = Array.from(
        new Map(products.map((p) => [p.category.id, p.category])).values()
    );

    const produtosFiltrados = categoriaSelecionada
        ? products.filter((p) => p.category.id === categoriaSelecionada)
        : products;

    const totalPages = Math.ceil(produtosFiltrados.length / ITEMS_PER_PAGE);

    const paginated = produtosFiltrados.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goTo = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    const selecionarCategoria = (id: string | null) => {
        setCategoriaSelecionada(id);
        setCurrentPage(1); 
        setIsMenuOpen(false);
    };

    const getPageNumbers = (): (number | '...')[] => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages: (number | '...')[] = [1];
        if (currentPage > 3) pages.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
        return pages;
    };

    return (
    <section className={styles.products} id="products">
        <h1 className={styles.title}>Nosso Inventário </h1>

        <div className={styles.filterContainer}>
            
            <button
                className={styles.mobileFilterBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '✕ Fechar Categorias' : '☰ Filtrar Categorias'}
            </button>

            <div className={`${styles.categoriasList} ${isMenuOpen ? styles.open : ''}`}>
                <button
                    className={`${styles.categoriaCard} ${categoriaSelecionada === null ? styles.categoriaAtiva : ''}`}
                    onClick={() => selecionarCategoria(null)}
                >
                    Todos
                </button>
                {categorias.map((cat) => (
                    <button
                        key={cat.id}
                        className={`${styles.categoriaCard} ${categoriaSelecionada === cat.id ? styles.categoriaAtiva : ''}`}
                        onClick={() => selecionarCategoria(cat.id)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>

        <div className={styles.container}>
            <div className={styles.productsList}>
                {paginated.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>

            <p className={styles.paginationInfo}>
                Mostrando {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, produtosFiltrados.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, produtosFiltrados.length)} de {produtosFiltrados.length} produtos
            </p>

            <div className={styles.paginationContainer}>
                <button
                    className={styles.paginationButton}
                    onClick={() => goTo(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>

                {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                        <span key={idx} className={styles.paginationDots}>…</span>
                    ) : (
                        <button
                            key={idx}
                            className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
                            onClick={() => goTo(page as number)}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className={styles.paginationButton}
                    onClick={() => goTo(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    ›
                </button>
            </div>
        </div>
    </section>
)
}