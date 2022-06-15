import styles from './styles.module.css';
import { useState } from 'react'

import Link from 'next/link'


export function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(!isOpen)

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                <Link href="/agenda">
                    <a className={styles.navlogo}>Pet Shop Manager</a>
                </Link>
                <ul className={isOpen === false ? styles.navmenu : styles.navmenu + ' ' + styles.active}>

                    <li className={styles.navitem}>
                        <Link href="/agenda">
                            Agenda
                        </Link>
                    </li>

                    <li className={styles.navitem}>

                        <Link href="/cadastro">
                            Cadastro
                        </Link>

                    </li>

                    <li className={styles.navitem}>

                        <Link href="/consulta">
                            Consulta
                        </Link>

                    </li>
                    <li className={styles.navitem}>

                        <Link href="/dashboard">
                            Dashboard
                        </Link>

                    </li>

                    <li className={styles.logout}>

                        <Link href="/">
                            Logout
                        </Link>

                    </li>
                </ul>
                <button className={isOpen === false ? styles.hamburger : styles.hamburger + ' ' + styles.active}
                    onClick={openMenu}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </nav>
        </header>

















        // <header className={styles.header}>
        //     <nav className={styles.nav}>
        //         <Link href="/dashboard">
        //         <a className={styles.logo}>Pet Shop<br/>Manager</a>
        //         </Link>
        //         <div className={styles.mobileMenu}>
        //             <div className={styles.line1}></div>
        //             <div className={styles.line2}></div>
        //             <div className={styles.line3}></div>
        //         </div>
        //         <ul className={styles.navlist}>

        //             <li data-cy="dashboard">
        //             <Link href="/dashboard">
        //                 Dashboard
        //             </Link>
        //             </li>

        //             <li data-cy="cadastro">
        //             <Link href="/cadastro">
        //                 Cadastro
        //             </Link>
        //             </li>

        //             <li data-cy="consulta">
        //             <Link href="/consulta">
        //                 Consulta
        //             </Link>
        //             </li>

        //             <li data-cy="logout">
        //             <Link href="/">
        //                 Logout
        //             </Link>
        //             </li>

        //         </ul>
        //     </nav>
        // </header>


    )
}
