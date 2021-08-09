import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import cx from 'classnames'
import { motion } from "framer-motion";

export default function Home() {
  
  const showLoginSignup=()=>{
      
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Aagman</title>
      </Head>
     
      <motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: 0.2,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 1
    }
  },
}}>
        <h1 className={styles.heading}  onMouseOver={showLoginSignup}>AAGMAN</h1><br/>
        </motion.div>
         
      <motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: 2,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 5
    }
  },
}}>
     
      <Link href="/form"><a className={styles.button}>Sign Up !</a></Link>
   
     </motion.div>
    </div>
  )
}
