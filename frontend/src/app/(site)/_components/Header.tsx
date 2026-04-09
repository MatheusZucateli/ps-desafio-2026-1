import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.hamb}>
          <span></span>
        </div>

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

        <div className={styles.navGeral}>
          <nav className={styles.navLinks}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="" className={styles.headerLink}>DECOLAGEM</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="" className={styles.headerLink}>INVENTÁRIO</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="" className={styles.headerLink}>TRIPULAÇÃO</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="" className={styles.headerLink}>CENTRAL DE COMANDO</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <div className={styles.darkModeWrapper}>
              <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}