import React from 'react';
import styles from "./Main.module.css";

const Main = ({children}) => {

  return (
    <main id="main" className={styles.main}> 
       { children }
    </main>
  )

}

export default Main;