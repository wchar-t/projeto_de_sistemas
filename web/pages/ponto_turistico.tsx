import React from 'react';
import styles from '@/styles/PontoTuristico.module.css';
import Page from '@/components/Page';

export default function PontoTuristico() {
  return (
    <Page>
      <body className={styles.body}>
        <header className={styles.header}>
          <div className={styles['header-content']}>
            <h1 className={styles['h1']}>Teste aqui</h1>
            <p>Tentando algo e falhando seriamente</p>
            <button className={styles.button}><a>Saiba mais</a></button>
          </div>
        </header>
    </body>
   </Page>
  );
}
