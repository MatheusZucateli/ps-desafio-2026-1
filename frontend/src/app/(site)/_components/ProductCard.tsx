'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css"
import { sportsItemType } from "@/types/sportsItem";
import { buySportsItem } from "@/actions/sportsItem";
import { useToast } from "@/components/use-toast";
import { useEffect, useState } from "react";

export default function ProductCard(sportsItem: sportsItemType) {
    const [estoqueExibido, setEstoqueExibido] = useState(sportsItem.amount);
    const [quantidade, setQuantidade] = useState(1);
    const { toast } = useToast();

    useEffect(() => {
        setEstoqueExibido(sportsItem.amount);
    }, [sportsItem.amount]);

    const clickBuy = async () => {
      for (let i = 0; i < quantidade; i++) {
        const { error } = await JSON.parse(await buySportsItem(sportsItem.id));

        if (error) {
            toast({ title: 'Não foi possível completar a compra.' });
            return;
        }
      }

      setEstoqueExibido((valorAtual) => valorAtual - quantidade);
      setQuantidade(1);
      toast({ title: 'Compra realizada com Sucesso.' });
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.productTopInfo}>
                <p className={styles.productStock}>{estoqueExibido} em estoque</p>

                <Link href={`/product/${sportsItem.id}`} className={styles.productLink}>
                    <Image
                        className={styles.productImage}
                        src={sportsItem.image}
                        alt={sportsItem.name}
                        width={300}
                        height={200}
                    />
                </Link>

                <h1 className={styles.productName}>{sportsItem.name}</h1>

                <div className={styles.productDetails}>
                    <p className={styles.productCategory}>Categoria: {sportsItem.category.name}</p>
                    <p className={styles.productBrand}>Marca: {sportsItem.brand}</p>
                    <p className={styles.productYear}>Lançamento: {sportsItem.year}</p>
                </div>
            </div>

            <div className={styles.productBottom}>
                <p className={styles.productPrice}>R$ {sportsItem.price}</p>

                {estoqueExibido > 0 ? (
                    <div className={styles.buyRow}>
                        <div className={styles.qtySelector}>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                                disabled={quantidade <= 1}
                            >
                                ‹
                            </button>
                            <span className={styles.qtyValue}>{quantidade}</span>
                            <button
                                className={styles.qtyBtn}
                                onClick={() => setQuantidade((q) => Math.min(estoqueExibido, q + 1))}
                                disabled={quantidade >= estoqueExibido}
                            >
                                ›
                            </button>
                        </div>
                        <button className={styles.productButton} onClick={clickBuy}>
                            Comprar
                        </button>
                    </div>
                ) : (
                    <button className={styles.productButton} disabled>
                        Esgotado
                    </button>
                )}
            </div>
        </div>
    );
}