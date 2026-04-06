import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css"
import { sportsItemType } from "@/types/sportsItem";

export default function ProductCard(sportsItem : sportsItemType) {


  
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
        <p className={styles.productStock}>{sportsItem.amount} em estoque</p>
        {sportsItem.amount > 0 ? (
          <button className={styles.productButton}>Comprar</button>
        ) : (
          <button className={styles.productButton} disabled >Esgotado</button>
        )}
      
    </div>
  )
}