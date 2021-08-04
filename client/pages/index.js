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
      <Link href="/login"><a className={cx(styles.push_button, styles.red)}>Login</a></Link> 
      <Link href="/signup"><a className={cx(styles.push_button,styles.blue)}>Sign Up</a></Link>
    </div>
  )
}
