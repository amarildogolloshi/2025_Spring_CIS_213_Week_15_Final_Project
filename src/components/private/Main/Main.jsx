import React from 'react';
import styles from "./Main.module.css";

const Main = ({children}) => {

  return (
    <main id="main" className={styles.main}> 
      <section>
        { children }
      </section>
    </main>
  )

}

export default Main;