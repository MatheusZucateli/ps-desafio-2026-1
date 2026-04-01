import Image from 'next/image'
import styles from './Banner.module.css'

export default function Banner() {
  return (
    <div className={styles.container}>
      <Image className={styles.bannerImage} src="/assets/images/Banner.png" alt="Banner" width={150} height={150} />
    </div>
  )
}