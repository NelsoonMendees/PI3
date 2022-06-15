import React, {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.css'
import logoImg from '../../public/logo2.svg'
import Link from 'next/link'
import api from '../services/api'


export default function Home() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [route, setRoute] = useState('')
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');


//   const handleSubmit = (event) => {
//     setLogin('admin');
//     setPassword('admin');
//     const form = event.currentTarget;
//     if (userPassword === password && userlogin === login) {
//   setRoute("/agenda")
//     }
//     return;
    
// };

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
                <input type="email" name="usuario" data-cy="usuario" value={userLogin} onChange={(ev) => setUserLogin(ev.target.value)} placeholder="Usuário" required/>
              </div>

              <div className={styles.textfield}>
                <label>Senha</label>
                <input type="password" name="senha" data-cy="senha" value={userPassword} onChange={(ev) => setUserPassword(ev.target.value)} placeholder="Senha" required/>
              </div>

              <Link href='/agenda'>
                <button type="submit" data-cy="entrar" className={styles.btnlogin}>Entrar</button>
              </Link>

            </div>
          </div>
        </form>
      </div>
      </>
  )
}
