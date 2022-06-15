import Head from 'next/head';
import Image from 'next/image'
import { Header } from '../../components/Header'
import powerBi from '../../../public/powerBi.jpeg'
import styles from './styles.module.css'


export default function Agenda() {
    return (
        <>
            <Head>
                <title>Dashboard | PET SHOP MANAGER</title>
            </Head>
            <div>
                <Header />
                <div classNam={styles.image} >
                <Image src={powerBi}  alt="logo" width={1900} height={850} />
                </div>
            </div>
        </>
    )
}