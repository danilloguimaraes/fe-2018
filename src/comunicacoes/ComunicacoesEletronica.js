import React from "react";
import ReactDOM from "react-dom";
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class WriteField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meioDeComunicacao: 1,
            preferenciaContato: "A",
            detalhes: '',
            codigoUtilizacao: "Comercial"
        };
        this.handleMeioChange = this.handleMeioChange.bind(this);
        this.handleDetalheChange = this.handleDetalheChange.bind(this);
        this.handlePreferenciaChange = this.handlePreferenciaChange.bind(this);
        this.handleUtilizacaoChange = this.handleUtilizacaoChange.bind(this);
        this.remove = this.remove.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState(JSON.parse(sessionStorage.getItem('comunicacoesEletronica'))[newProps.count]);
    };
    handleMeioChange(e) {
        console.log(e.target.value);
        this.state['meioDeComunicacao'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleDetalheChange(e) {
        console.log(e.target.value);
        this.state['detalhes'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handlePreferenciaChange(e) {
        console.log(e.target.value);
        this.state['preferenciaContato'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleUtilizacaoChange(e) {
        console.log(e.target.value);
        this.state['codigoUtilizacao'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    remove() {
        this.props.onRemove(this.props.count);
    }
    render() {
        const meios = ['Telefone', 'Celular', 'Fax', 'Pager', 'Email', 'URL', 'Outro'];
        return (
            <FormGroup controlId={this.props.id + this.props.count}>
                <ControlLabel>Meio</ControlLabel><br />
                <FormControl componentClass="select" onChange={this.handleMeioChange} value={this.state.meioDeComunicacao}>
                    <option value={1}>Telefone</option>
                    <option value={2}>Celular</option>
                    <option value={3}>Fax</option>
                    <option value={3}>Pager</option>
                    <option value={4}>Email</option>
                    <option value={5}>URL</option>
                    <option value={6}>Outro</option>
                </FormControl>

                <ControlLabel>{meios[this.state.meioDeComunicacao - 1]}</ControlLabel><br />
                <FormControl
                    type="text"
                    placeholder="(xx) xxxx-xxxx"
                    onChange={this.handleDetalheChange}
                    value={this.state.detalhes}
                />

                <ControlLabel>Preferência</ControlLabel><br />
                <FormControl componentClass="select"
                    onChange={this.handlePreferenciaChange} value={this.state.preferenciaContato}>
                    <option value="A">Horário comercial</option>
                    <option value="B">Durante o dia</option>
                    <option value="C">Finais de semana</option>
                    <option value="D">Qualquer hora</option>
                    <option value="E">Peíodo noturno</option>
                </FormControl>

                <ControlLabel>Utilização</ControlLabel><br />
                <FormControl componentClass="select"
                    onChange={this.handleUtilizacaoChange} value={this.state.codigoUtilizacao}>
                    <option value="Comercial">Comercial</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Comercial e Pessoal">Comercial e Pessoal</option>
                </FormControl>
                <Button onClick={this.remove}>delete</Button>
            </FormGroup>
        );
    };
}
class ComunicacoesEletronica extends React.Component {
    constructor(props) {
        super(props);
        this.skull = {
            meioDeComunicacao: 1,
            preferenciaContato: '',
            detalhes: '',
            codigoUtilizacao: ''
        };
        this.state = {
            data: []
        };
        this.setState({ data: JSON.parse(sessionStorage.getItem('comunicacoesEletronica')) });
        this.addFields = this.addFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    componentDidMount() {
        console.log("Comunicaçoẽs Eletronicas getState");
        this.setState({ data: JSON.parse(sessionStorage.getItem('comunicacoesEletronica')) });
        window.addEventListener('storage', this.onSubmit);
    }
    addFields() {
        this.setState({ data: this.state.data.concat([this.skull]) });
        sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(this.state.data));
    }
    onSubmit() {
        sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(this.state.data));
    }
    onRemove(index) {
        this.state.data.splice(index, 1);
        this.setState(this.state);
    }
    updateList(count, data) {
        this.state.data[count] = data;
        console.log(this.state.data[count]);
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <h2>Comunicações Eletronica</h2>
                <Form >
                    {
                        this.state.data.map((comunicacoesEletronica, count) => (
                            <WriteField
                                id="comunicacoesEletronica"
                                count={count}
                                onRemove={this.onRemove}
                                onDataChange={this.updateList}
                            />
                        ))
                    }
                    <Button onClick={this.onSubmit}>save</Button>
                    <Button onClick={() => { this.addFields() }}>add</Button>
                </Form>
            </div>
        );
    }
}
module.exports = ComunicacoesEletronica;"A"