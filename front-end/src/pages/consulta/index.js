import React from 'react';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import { Header } from '../../components/Header'
import styles from './styles.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api'

export default class Clientes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cpf: "",
            telefone: "",
            nome: "",
            numero: "",
            cidade: "",
            bairro: "",
            cep: "",
            rua: "",
            estado: "",
            email: "",
            complemento: "",
            id_cliente: "",
            raca_pet: "",
            nome_pet: "",
            clientes: [],
            raca: [],
            modalAberto: false,
            valite: false
        }
    }

    componentDidMount() {
        this.getCliente();
        this.getRaca();
    }

    getCliente = () => {
        api.get('/api/v1/Cliente').then(({ data }) => {
            this.setState({ clientes: data });
        })
    }

    getRaca = () => {
        api.get('/api/v1/raca').then(({ data }) => {
            this.setState({ raca: data });
        })
    }

    deleteCliente = (cpf) => {
        api.delete('/api/v1/cliente/' + cpf).then(res => {
            toast.success('Cliente deletado com sucesso!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getCliente();

        }).catch(err => {
            toast.error('Algo deu errado!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getCliente();
        })
    }

    getClienteCpf = (cpf) => {
        api.get('/api/v1/cliente/' + cpf).then(response => response.data[0])
            .then(cliente => {
                this.setState({
                    cpf: cliente.cpf,
                    telefone: cliente.telefone,
                    nome: cliente.nome,
                    numero: cliente.numero,
                    cidade: cliente.cidade,
                    bairro: cliente.bairro,
                    cep: cliente.cep,
                    rua: cliente.rua,
                    estado: cliente.estado,
                    email: cliente.email,
                    complemento: cliente.complemento,
                    id_cliente: cliente.id_cliente,
                    nome_pet: cliente.nome_pet,
                    raca_pet: cliente.raca_pet,
                    pet_id: cliente.pet_id,
                    modalAberto: true

                })
                this.abrirModal();
            })
    }

    atualizaCpf = (e) => { this.setState({ cpf: e.target.value }) }
    atualizaTelefone = (e) => { this.setState({ telefone: e.target.value }) }
    atualizaNome = (e) => { this.setState({ nome: e.target.value }) }
    atualizaNumero = (e) => { this.setState({ numero: e.target.value }) }
    atualizaCidade = (e) => { this.setState({ cidade: e.target.value }) }
    atualizaBairro = (e) => { this.setState({ bairro: e.target.value }) }
    atualizaCep = (e) => { this.setState({ cep: e.target.value }) }
    atualizaRua = (e) => { this.setState({ rua: e.target.value }) }
    atualizaEstado = (e) => { this.setState({ estado: e.target.value }) }
    atualizaEmail = (e) => { this.setState({ email: e.target.value }) }
    atualizaComplemento = (e) => { this.setState({ complemento: e.target.value }) }
    atualizaNomePet = (e) => { this.setState({ nome_pet: e.target.value }) }
    atualizaRacaPet = (e) => { this.setState({ raca_pet: e.target.value }) }


    editarCliente = (event) => {
        const body = {
            cpf: this.state.cpf,
            telefone: this.state.telefone,
            nome: this.state.nome,
            numero: this.state.numero,
            cidade: this.state.cidade,
            bairro: this.state.bairro,
            cep: this.state.cep,
            rua: this.state.rua,
            estado: this.state.estado,
            email: this.state.email,
            complemento: this.state.complemento,
            raca_pet: this.state.raca_pet,
            nome_pet: this.state.nome_pet,
            id_cliente: this.state.id_cliente,
        }

        api.put('/api/v1/cliente/' + this.state.cpf, body).then(response => {
            toast.success('Cliente Alterado com Suscesso!!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getCliente();
        }).catch(err => {
            toast.error('Não foi possivel cadastrar o cliente!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })

        })

    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.editarCliente(event);
        this.setState({ validated: true });
        this.fecharModal();
    };

    fecharModal = () => {
        this.setState({
            modalAberto: false
        })
    }

    abrirModal = () => {
        this.setState({
            modalAberto: true
        })
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Produtos | Pet Shop Manager</title>
                </Head>
                <div>
                    <Header />
                    <Modal size="xxl-down" show={this.state.modalAberto} onHide={this.fecharModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Cliente</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form noValidate validated={this.validated} onSubmit={this.handleSubmit} autoComplete="off">
                                <Row>
                                    <Col xs={8}>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control className={styles.formControl} name="nome" type="text" value={this.state.nome} onChange={this.atualizaNome} required />
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="CPF" type="text" value={this.state.cpf} onChange={this.atualizaCpf} required />
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Email" type="text" value={this.state.email} onChange={this.atualizaEmail} />
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Telefone" type="text" value={this.state.telefone} onChange={this.atualizaTelefone} required />
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Label>CEP</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="CEP" type="text" value={this.state.cep} onChange={this.atualizaCep} required />
                                    </Col>
                                    <Col xs={3}>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Estado" type="text" value={this.state.estado} onChange={this.atualizaEstado} />
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Cidade" type="text" value={this.state.cidade} onChange={this.atualizaCidade} />
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Label>Rua</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Rua" type="text" value={this.state.rua} onChange={this.atualizaRua} />
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Label>Bairro</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Bairro" type="text" value={this.state.bairro} onChange={this.atualizaBairro} />
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Label>Nome Pet</Form.Label>
                                        <Form.Control className={styles.formControl} placeholder="Nome Pet" type="text" value={this.state.nome_pet} onChange={this.atualizaNomePet} />
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Label>Raça</Form.Label>
                                        <Form.Select className={styles.inputForm} onChange={this.atualizaRacaPet} >
                                            <option>{this.state.raca_pet}</option>
                                            {
                                                this.state.raca.map((raca) =>
                                                    <option key={raca.raca_id} value={raca.raca_pet} >{raca.raca_pet}</option>
                                                )
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className={styles.btnControl}>
                                    <Button className={styles.btn} variant="secondary" onClick={this.fecharModal}>
                                        Cancelar
                                    </Button>
                                    <Button className={styles.btn} variant="primary" type="submit">
                                        Salvar
                                    </Button>
                                </Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>

                    <h1 className={styles.title}>Clientes</h1>
                    <div className={styles.tabela}>
                        <Table>
                            <thead className={styles.tableHead}>
                                <tr className={styles.controlTr}>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.clientes.map((cliente) =>
                                        <tr className={styles.controlTr} key={cliente.id_cliente}>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.cpf}</td>
                                            <td className={styles.buttonsControl}>
                                                <Button className={styles.buttonsControl} onClick={() => this.getClienteCpf(cliente.cpf)} variant="primary">Editar</Button>
                                                <Button className={styles.buttonsControl} onClick={() => this.deleteCliente(cliente.cpf)} variant="danger">Deletar</Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                    <ToastContainer />
                </div>

            </div>
        )
    }
}

