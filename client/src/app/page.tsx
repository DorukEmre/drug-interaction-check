import Image from 'next/image'
import styles from '../styles/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Hello</p>
      <p>
        "This product uses publicly available data from the U.S. National
        Library of Medicine (NLM), National Institutes of Health, Department of
        Health and Human Services; NLM is not responsible for the product and
        does not endorse or recommend this or any other product."
      </p>
    </main>
  )
}
