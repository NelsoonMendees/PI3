import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.css'
import logoImg from '../../public/logo2.svg'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className={styles.mainlogin}>
        <div className={styles.leftlogin}>
          <h1>Pet Shop<br />Manager</h1>
          <Image src={logoImg} className={styles.loginimage} alt="logo"  width={350}/>
        </div>
        <form>
          <div className={styles.rightlogin}>
            <div className={styles.cardlogin}>
              <h1>Login</h1>

              <div className={styles.textfield}>
                <label>Usuário</label>
                <input type="email" name="usuario" data-cy="usuario" placeholder="Usuário" />
              </div>

              <div className={styles.textfield}>
                <label>Senha</label>
                <input type="password" name="senha" data-cy="senha" placeholder="Senha" />
              </div>

              <Link href="/agenda">
                <button type="submit" data-cy="entrar" className={styles.btnlogin}>Entrar</button>
              </Link>

            </div>
          </div>
        </form>
      </div>
      </>
  )
}
