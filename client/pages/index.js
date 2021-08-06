import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import cx from 'classnames'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aagman</title>
      </Head>
     
      <div className={styles.homeWrap}>
        <h1 className={styles.heading}>AAGMAN</h1><br/>
      <Link href="/login"><a className={styles.button}>Login</a></Link>
      <Link href="/signup"><a className={styles.button}>Sign Up</a></Link>
      </div>
     
    </div>
  )
}
