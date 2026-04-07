import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/assets/images/rocket-sports-logo.png" 
              alt="Logo Rocket Sports" 
              width={180} 
              height={50} 
              priority 
            />
          </Link>
        </div>

        <nav className={styles.navLinks}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/decolagem" className={styles.headerLink}>DECOLAGEM</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/inventario" className={styles.headerLink}>INVENTÁRIO</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/tripulacao" className={styles.headerLink}>TRIPULAÇÃO</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/comando" className={styles.headerLink}>CENTRAL DE COMANDO</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.cartContainer}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.badge}>2</span>
          </div>

          <div className={styles.darkModeWrapper}>
            <span className={styles.darkModeText}>Dark Mode</span>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}