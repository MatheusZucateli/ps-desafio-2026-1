import Image from 'next/image'
import styles from './Banner.module.css'

export default function Banner() {
  return (
    <div className={styles.container}>
      <Image className={styles.bannerImage} src="/assets/images/Banner.png" alt="Banner" width={4000} height={895} />
    </div>
  )
}