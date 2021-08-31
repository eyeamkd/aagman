import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { motion } from "framer-motion";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "20px",
    backgroundColor: "#0596f5",
    color: "#ffffff",
    padding: "20px",
    borderRadius: "40px",
    textAlign: "center"
  },
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
  },
}));

export default function Home() {

  const classes = useStyles();

  const variantHeading = {
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
  const variantButton = {
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
    <div className={classes.root}>
      <Head>
        <title>Aagman</title>
      </Head>

      <motion.div animate={{
        y: 50, y: -50,
        transition: { yoyo: Infinity, duration: 1.5, },

      }}>
        <Image
          src="/images/logo.png"
          alt="App Logo"
          width={250}
          height={250}
        />
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={variantHeading}>
        <Image
          src="/images/aagmanRoboto.png"
          alt="App Name"
          width={280}
          height={55}
        />
      </motion.div>
      <Toolbar className={classes.tagline}>
        ORDER WITHOUT Hassle
      </Toolbar>
      <motion.div initial="hidden" animate="visible" variants={variantButton}>
        <div className={classes.buttons}>
          <Link href="/form" passHref><Button variant="contained" color="secondary" className={classes.button}>Sign Up</Button></Link>
          <Link href="/qrscanner" passHref><Button variant="contained" color="secondary" className={classes.button}>Scan QR Code</Button></Link>
        </div>
      </motion.div>
    </div>
  )
}