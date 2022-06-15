import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { Form, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import moment from 'moment';
import styles from './styles.module.css';
import api from '../../services/api';

export default class Agenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            horario: "",
            date: "",
            dateGet: moment(new Date()).format("YYYY-MM-DD"),
            nomePet: "",
            servicoPet: "",
            agendamentoId: "",
            servico: [],
            pet: [],
            agenda: [],
            agendaDois: [],
            modalAberto: false,
            valite: false,
            modalAbertoDois: false,
        }
    }

    atualizaData = (e) => { this.setState({ date: e.target.value }) }
    atualizaNomePet = (e) => { this.setState({ nomePet: e.target.value }) }
    atalizaServicoPet = (e) => { this.setState({ servicoPet: e.target.value }) }
    atualizaHorario = (e) => { this.setState({ horario: e.target.value }) }
    atualizaDateGet = (e) => { this.setState({ dateGet: e.target.value }) }


    componentDidMount() {
        // this.getAgendamento();
        this.getPets();
        this.getServicos();
        this.getAgendamentoDate();

    }

    getAgendamentoId = (id) => {
        api.get('/api/v1/id/' + id).then(response => response.data[0])
        .then(agendamento => {
            this.setState({
                horario: agendamento.horario,
                date: agendamento.data,
                servicoPet: agendamento.servicos,
                nomePet: agendamento.nome_pet,
                agendamentoId: agendamento.agendamento_id
            })
            this.abrirModalPatch()
        })
    }

editAgendamento = (event) => {
    const body = {
        horario: this.state.horario,
        data: moment(this.state.date).format('YYYY-MM-DD'),
        servicos: this.state.servicoPet,
        nome_pet: this.state.nomePet
    }

    api.put('/api/v1/id/' + this.state.agendamentoId, body).then(response => {
        toast.success('Agendamento Atualizado!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        this.getAgendamentoDate();
    }).catch(err => {
        toast.error('Algo deu errado!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
    })
}

    deleteAgendamento = (id) => {
        api.delete('/api/v1/agendamento/' + id).then(res => {
            toast.success('Agendamento exluido!!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getAgendamentoDate();
        }).catch(err => {
            toast.error('Algo deu errado!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        })
    }

    getAgendamentoDate = () => {
        api.get('/api/v1/agendamento/' + this.state.dateGet).then(({ data }) => {
            this.setState({ agendaDois: data })
            console.log(data)
        }).catch(err => {
            toast.error('Sem agendamentos para essa data!!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        })
    }

    postAgendamento = () => {
        const body = {
            horario: this.state.horario,
            data: moment(this.state.date).format('YYYY-MM-DD'),
            servicos: this.state.servicoPet,
            nome_pet: this.state.nomePet
        }
        console.log(body)
        api.post('/api/v1/agendamento', body).then(response => {
            toast.success('Agendamento Realizado!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getAgendamentoDate();
        }).catch(err => {
            toast.error('Não foi possivel realizar o agendamento!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            this.getAgendamentoDate();
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.postAgendamento(event);
        this.setState({ validated: true });
        this.fecharModal();
    };

    handleSubmitDate = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.getAgendamentoDate(event);
        this.setState({ validated: true });
    };

    handleSubmitId = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.editAgendamento(event);
        this.setState({ validated: true });
        this.fecharModal();
    };


    getServicos = () => {
        api.get('/api/v1/servicos').then(({ data }) => {
            this.setState({ servico: data })
            console.log(data)
        })
    }

    getPets = () => {
        api.get('/api/v1/nome').then(({ data }) => {
            this.setState({ pet: data })
            console.log(data)
        })
    }

    getAgendamento = () => {
        api.get('/api/v1/agendamento').then(({ data }) => {
            this.setState({ agenda: data })
            console.log(data)
        })
    }

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

    abrirModalPatch = () => {
        this.setState({
            modalAbertoDois: true
        })
    }

    fecharModalDois = () => {
        this.setState({
            modalAbertoDois: false
        })
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Agenda | PET SHOP MANAGER</title>
                </Head>
                <div>
                    <Header />

                </div>
                <h1 className={styles.title}>Agenda</h1>
                <div className={styles.formData}>
                    <Form>
                        <Row>
                            <Col sm={7} className="my-1">
                                <Form.Control className={styles.dateControl} type="date" value={this.state.dateGet} onChange={this.atualizaDateGet} />
                            </Col>
                            <Col xs={4} >
                                <Button className={styles.btn} onClick={this.getAgendamentoDate}>Filtro</Button>
                                <Button className={styles.btn} onClick={this.abrirModal}>Agendamento</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>



                <div className={styles.tabela}>

                    <Table>
                        <thead className={styles.tableHead}>
                            <tr className={styles.controlTr}>
                                <th>Data</th>
                                <th>Pet</th>
                                <th>Serviço</th>
                                <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.agendaDois.map((agendaDois) =>
                                    <tr className={styles.controlTr} key={agendaDois.agendamento_id}>
                                        <td>{moment(agendaDois.data).format("DD-MM-YYYY")}</td>
                                        <td>{agendaDois.nome_pet}</td>
                                        <td>{agendaDois.servicos}</td>
                                        <td>{agendaDois.horario}</td>
                                        <td className={styles.buttonsControl}>
                                            <Button className={styles.buttonsControl} onClick={() =>this.getAgendamentoId(agendaDois.agendamento_id)} variant="primary">Editar</Button>
                                            <Button className={styles.buttonsControl} onClick={() =>this.deleteAgendamento(agendaDois.agendamento_id)} variant="danger">Deletar</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                <Modal size="xxl-down" show={this.state.modalAberto} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agendamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.validated} onSubmit={this.handleSubmit} autoComplete="off">
                            <Row>
                                <Col xs={5}>
                                    <Form.Label>Horario</Form.Label>
                                    <Form.Control className={styles.formControl} value={this.state.horario} onChange={this.atualizaHorario} type="time" required />
                                    <p>{this.state.horario}</p>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control className={styles.formControl} value={this.state.date} onChange={this.atualizaData} type="date" required />
                                    <p>{this.state.date}</p>
                                </Col>
                                <Col xs={8}>
                                    <Form.Label>Serviço</Form.Label>
                                    <Form.Select className={styles.formControl} onChange={this.atalizaServicoPet} >
                                        <option>Selecione o serviço</option>
                                        {
                                            this.state.servico.map(servico => (
                                                <option key={servico.servico_id} value={servico.servicos_pet} >{servico.servicos_pet}</option>
                                            )
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Nome Pet</Form.Label>
                                    <Form.Select className={styles.formControl} onChange={this.atualizaNomePet} >
                                        <option>this.state</option>
                                        {
                                            this.state.pet.map((nome) =>
                                                <option key={nome.nome_pet} value={nome.nome_pet} >{nome.nome_pet}</option>
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



                <Modal size="xxl-down" show={this.state.modalAbertoDois} onHide={this.fecharModalDois}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agendamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.validated} onSubmit={this.handleSubmitId} autoComplete="off">
                            <Row>
                                <Col xs={5}>
                                    <Form.Label>Horario</Form.Label>
                                    <Form.Control className={styles.formControl} value={this.state.horario} onChange={this.atualizaHorario} type="time" required />
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control className={styles.formControl} value={this.state.date} onChange={this.atualizaData} type="date" required />
                                </Col>
                                <Col xs={8}>
                                    <Form.Label>Serviço</Form.Label>
                                    <Form.Select className={styles.formControl} onChange={this.atalizaServicoPet} >
                                        <option>{this.state.servicoPet}</option>
                                        {
                                            this.state.servico.map(servico => (
                                                <option key={servico.servico_id} value={servico.servicos_pet} >{servico.servicos_pet}</option>
                                            )
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label>Nome Pet</Form.Label>
                                    <Form.Select className={styles.formControl} onChange={this.atualizaNomePet} >
                                        <option>{this.state.nomePet}</option>
                                        {
                                            this.state.pet.map((nome) =>
                                                <option key={nome.nome_pet} value={nome.nome_pet} >{nome.nome_pet}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className={styles.btnControl}>
                                <Button className={styles.btn} variant="secondary" onClick={this.fecharModalDois}>
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
                <ToastContainer />

            </div>
        )
    }

}
