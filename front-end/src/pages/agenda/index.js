import Head from 'next/head';
import { Header } from '../../components/Header'
import styles from './styles.module.css';



export default function Agenda() {
    return (
        <>
            <Head>
                <title>Agenda | PET SHOP MANAGER</title>
            </Head>
            <div>
                <Header />
                <div className={styles.containerPrincipal}>
                    <h1>Pagina Principal</h1>
                </div>


            </div>
        </>
    )
}