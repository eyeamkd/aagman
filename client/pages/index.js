import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import cx from 'classnames'
import { motion } from "framer-motion";


export default function Home() {
  const variantHeading={
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
  }
 const variantButton={
  hidden: {
    scale: 2,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 3
    }
  },
}
  return (
    <div className={styles.container}>
      <Head>
        <title>Aagman</title>
      </Head>
     
      
      <motion.div animate={{
      y:50,y:-50,
      transition:{ yoyo: Infinity,duration: 1.5,},
      
    }}>
      <Image
                            src="/images/a_logo3_nobg.png"
                            alt="App Logo"
                            width={300}
                            height={240}
                        />
                         </motion.div><br/>
                         <motion.div initial="hidden" animate="visible" variants={variantHeading}>
        <h3 className={styles.heading}  >Aagman</h3><br/>
        </motion.div>
         
      <motion.div initial="hidden" animate="visible" variants={variantButton}>
     
      <Link href="/form"><a className={styles.button}>Sign Up</a></Link>
      <Link href="/qrscanner"><a className={styles.button}>Scan QR Code</a></Link>
     </motion.div>
    </div>
  )
}