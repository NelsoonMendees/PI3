import Head from 'next/head'
import { Header } from '../../components/Header'
import Link from 'next/link'
import React, { useState } from 'react';
import styles from './styles.module.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { mask, unMask } from "remask";
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Clientes() {
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [complemento, setComplemento] = useState("");
    const [racaPet, setRacaPet] = useState({});
    const [nomePet, setNomePet] = useState("");
    const [validated, setValidated] = useState(false);
    const [raca, setRaca] = useState([]);

    const onChangeCpf = eve => {
        const originalCpf = unMask(eve.target.value);
        const maskedValue = mask(originalCpf, [
            "999.999.999-99"
        ]);
        setCpf(maskedValue);
    };

    const onChangeTel = eve => {
        const originalTel = unMask(eve.target.value);
        const maskedValue = mask(originalTel, [
            "(99) 99999-9999"
        ]);
        setTel(maskedValue);
    };

    const onChangeCep = eve => {
        const originalCep = unMask(eve.target.value);
        const maskedValue = mask(originalCep, [
            "99999-999"
        ]);
        setCep(maskedValue);
    };

    function cadastroClientePet() {
        const data = {
            cpf: cpf.replace(/[^0-9]/g, ''),
            telefone: tel.replace(/[^0-9]/g, ''),
            nome: nome,
            cidade: cidade,
            cep: cep.replace(/[^0-9]/g, ''),
            estado: estado,
            email: email,
            numero: numero,
            bairro: bairro,
            rua: rua,
            complemento: complemento,
            raca_pet: racaPet,
            nome_pet: nomePet
        }

        if (cpf === "" || nome === "" || tel === "" || cep === "") {
            toast.error('Preecha os campos obrigatórios!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            return;
        }

        api.post('/api/v1/pet', data)
            .then(response => {
                toast.success('Cliente cadastrado com sucesso!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            }).catch(err => {
                toast.error('Não foi possivel cadastrar o cliente!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            })
    }

    function cadastrarCliente(ev) {
        ev.preventDefault();
        cadastroClientePet();

    };

    api.get('/api/v1/raca').then(response => {
        setRaca(response.data)
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        cadastrarCliente(event);
        setValidated(true);
    };

    const clear = () => {
        setNome("");
        setCpf("");
        setTel("");
        setEmail("");
        setCep("");
        setEstado("");
        setCidade("");
        setRua("");
        setBairro("");
        setNumero("");
        setComplemento("");
        setValidated(false);
    }

    return (
        <>
            <Head>
                <title>Cliente | Pet Shop Manager</title>
            </Head>
            <Header />
            <div className={styles.form}>
                <h1>Cadastro de Clientes</h1>
                <Form noValidate validated={validated} className={styles.formControl} onSubmit={handleSubmit} autoComplete="off" >

                    <Row className={styles.formInput}>
                        <Col xs={7}>
                            <label htmlFor="nome">Nome</label>
                            <Form.Control className={styles.inputForm} value={nome} onChange={(ev) => setNome(ev.target.value)} name="nome" type="text" placeholder="Nome" required />
                            <Form.Control.Feedback type="invalid">Informe o Nome</Form.Control.Feedback>
                        </Col>
                        <Col xs={5}>
                            <label>CPF</label>
                            <Form.Control type="text" className={styles.inputForm} name="cpf" onChange={onChangeCpf} value={cpf} placeholder="CPF" required />
                            <Form.Control.Feedback type="invalid">Informe o CPF</Form.Control.Feedback>
                        </Col>
                    </Row>

                    <Row className={styles.formInput}>
                        <Col xs={6}>
                            <label>Telefone</label>
                            <Form.Control className={styles.inputForm} type="text" name="tel" onChange={onChangeTel} value={tel} placeholder="Telefone" required />
                            <Form.Control.Feedback type="invalid">Informe o Telefone</Form.Control.Feedback>
                        </Col>
                        <Col xs={6}>
                            <label>Email</label>
                            <Form.Control className={styles.inputForm} value={email} onChange={(ev) => setEmail(ev.target.value)} type="email" placeholder="Email" />
                        </Col>
                    </Row>

                    <Row className={styles.formInput}>
                        <Col xs={6}>
                            <label>CEP</label>
                            <Form.Control className={styles.inputForm} type="text" name="cep" onChange={onChangeCep} value={cep} placeholder="CEP" required />
                            <Form.Control.Feedback type="invalid">Informe o CEP</Form.Control.Feedback>
                        </Col>
                        <Col xs={3}>
                            <label>Estado</label>
                            <Form.Control className={styles.inputForm} value={estado} onChange={(ev) => setEstado(ev.target.value)} name="estado" type="text" placeholder="Estado" />
                        </Col>
                        <Col xs={3}>
                            <label>Cidade</label>
                            <Form.Control className={styles.inputForm} value={cidade} onChange={(ev) => setCidade(ev.target.value)} name="cidade" type="text" placeholder="Cidade" />
                        </Col>
                    </Row>

                    <Row className={styles.formInput}>
                        <Col xs={5}>
                            <label>Rua</label>
                            <Form.Control className={styles.inputForm} value={rua} onChange={(ev) => setRua(ev.target.value)} name="rua" type="text" placeholder="Rua" required />
                            <Form.Control.Feedback type="invalid">Informe a Rua</Form.Control.Feedback>
                        </Col>
                        <Col xs={4}>
                            <label>Bairro</label>
                            <Form.Control className={styles.inputForm} value={bairro} onChange={(ev) => setBairro(ev.target.value)} name="bairro" type="text" placeholder="Bairro" required />
                            <Form.Control.Feedback type="invalid">Informe o Bairro</Form.Control.Feedback>
                        </Col>
                        <Col xs={3}>
                            <label>Numero</label>
                            <Form.Control className={styles.inputForm} value={numero} onChange={(ev) => setNumero(ev.target.value)} name="numero" type="text" placeholder="Numero" />
                        </Col>
                    </Row>

                    <Row className={styles.formInput}>
                        <Col xs={5}>
                            <label>Complemento</label>
                            <Form.Control className={styles.inputForm} value={complemento} onChange={(ev) => setComplemento(ev.target.value)} name="complemento" type="text" placeholder="Complemento" />
                        </Col>

                        <Col xs={4}>
                            <label>Nome Pet</label>
                            <Form.Control className={styles.inputForm} value={nomePet} onChange={(ev) => setNomePet(ev.target.value)} name="rua" type="text" placeholder="Nome do Pet" />
                        </Col>

                        <Col xs={3}>
                            <label>Raça</label>
                            <Form.Select className={styles.inputForm} onChange={(ev) => setRacaPet(ev.target.value)} >
                                <option>Selecione a Raça</option>
                                {
                                    raca.map(raca => (
                                        <option key={raca.raca_id} value={raca.raca_pet} >{raca.raca_pet}</option>
                                    )
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Row>

                    <div className={styles.areabutton}>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                        <Button variant="warning" onClick={clear}>
                            Limpar
                        </Button>
                        <Link href="/agenda">
                            <Button variant="danger" onClick={clear}>
                                Cancelar
                            </Button>
                        </Link>
                        <ToastContainer />
                    </div>
                </Form>
            </div>
        </>
    )
}