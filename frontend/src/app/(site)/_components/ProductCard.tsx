'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css"
import { sportsItemType } from "@/types/sportsItem";
import { buySportsItem } from "@/actions/sportsItem";
import { toast, useToast } from "@/components/use-toast";
import { useEffect, useState } from "react";

export default function ProductCard(sportsItem : sportsItemType) {
    const [estoqueExibido, setEstoqueExibido] = useState(sportsItem.amount);
    const { toast } = useToast();

    useEffect(() => {
      setEstoqueExibido(sportsItem.amount);
    }, [sportsItem.amount]);

    const clickBuy = async () => {
      const { error } = await JSON.parse(await buySportsItem(sportsItem.id))

      if (!error) {
        setEstoqueExibido((valorAtual) => valorAtual - 1);

        toast({
          title: 'Compra realizada com Sucesso.'
        });
      } else {
        toast({
          title: 'Não foi possível completar a compra.'
        });
      }
    };


    return (
    <div className={styles.productCard}>
      <Link href={`/product/${sportsItem.id}`} className={styles.productLink}>
        <Image className={styles.productImage} src={sportsItem.image} alt={sportsItem.name} width={300} height={200} />
      </Link>
        <h1 className={styles.productName}>{sportsItem.name}</h1>
        <p className={styles.productCategory}>Categoria: {sportsItem.category.name}</p>
        <p className={styles.productBrand}>Marca: {sportsItem.brand}</p>
        <p className={styles.productYear}>Lançamento: {sportsItem.year}</p>
        <p className={styles.productPrice}>R$ {sportsItem.price}</p>
        <p className={styles.productStock}>{estoqueExibido} em estoque</p>
        {estoqueExibido > 0 ? (
          <button className={styles.productButton}onClick={clickBuy}>Comprar</button>
        ) : (
          <button className={styles.productButton} disabled >Esgotado</button>
        )}
      
    </div>
  )
}