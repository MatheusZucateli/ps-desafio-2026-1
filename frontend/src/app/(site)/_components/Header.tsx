import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <Image src="/assets/images/rocket-sports-logo.png" alt="Logo Rocket Sports" width={200} height={200} />
                <div className={styles.headerLinks}>
                    <Link href="" className={styles.headerLink}>Decolagem</Link>
                    <Link href="" className={styles.headerLink}>Inventário</Link>
                    <Link href="" className={styles.headerLink}>Tripulação</Link>
                    <Link href="" className={styles.headerLink}>Central de Comando</Link>
                </div>
        </div>
    </header>
  );
}