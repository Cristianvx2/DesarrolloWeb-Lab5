import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {PanelGroup, Panel, Button, ButtonToolbar,ListGroup,ListGroupItem, Col, Row, Grid} from 'react-bootstrap';
import {AddApartment} from './components/addApartment';
import {EditApartment} from './components/edit';
import './css/index.css';

//main class
class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apartments:[],
            showAdd: false,
            showEdit: false,
            currentlyEditing: 0
        };
        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.addApartments = this.addApartments.bind(this);
        this.editApartment = this.editApartment.bind(this);
        this.deleteApartment = this.deleteApartment.bind(this);
    }

    componentDidMount(){

        /*var apartments = (typeof localStorage["apartments"] !== "undefined") ? JSON.parse(localStorage.getItem("apartments")):[
            { name: "TRIBECA", price: "Q.600,000", address: "zona 11", size: "61mts", parts: ["pool", "Gym", "Garden", "BBQ"]},
            { name: "BARI", price: "Q.1,100,000", address: "zona 10", size: "80mts", parts: ["2 parking spots", "2 bathrooms", "1 living room"]}
        ];*/
        //this.setState({apartments: apartments});
        /*fetch('/get-data')
            .then(res => res.json())
            .then(apartments => this.setState({apartments}));*/

        axios.get('http://localhost:3001/get-data')
            .then(res => {
                console.log(res.status);
                const apartments = res.data;
                this.setState({apartments: apartments});
            })

    }
    //Show Modals
    showAddModal(){
        this.setState({showAdd: !this.state.showAdd});
    }
    showEditModal(index){ //show the edit modal
        this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
    }

    //create new apartment
    addApartments(apartment){
        let apartments = this.state.apartments;
        apartments.push(apartment);
        //localStorage.setItem('apartments', JSON.stringify(apartments));
        axios.post('http://localhost:3001/insert', apartment)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });


        this.setState({apartments: apartments});
        this.showAddModal();
    }
    editApartment(newName, newPrice, newAddress, newSize, newParts, currentlyEditing){//edit an exist apartment
        let apartment = this.state.apartments;
        apartment[currentlyEditing] = {name: newName, price: newPrice, address: newAddress, size: newSize, parts: newParts};
        //localStorage.setItem('apartments', JSON.stringify(apartment));
        axios.post('http://localhost:3001/update', apartment)
            .then(res =>{
                console.log(res);
                console.log(res.data);
            });
        this.setState({apartments: apartment});
        this.showEditModal(currentlyEditing);
    }
    deleteApartment(index){
        let apartment = this.state.apartments.slice();
        apartment.splice(index, 1);

        axios.post('http://localhost:3001/delete', apartment)
            .then(res =>{
                console.log(res);
                console.log(res.data);
            });

        //localStorage.setItem('apartments', JSON.stringify(apartment));
        this.setState({apartments: apartment, currentlyEditing: 0});
    }

    render(){
        const apartments = this.state.apartments;
        var currentlyEditing = this.state.currentlyEditing;
        return(
            <div className="jumbotron">
                <h1 className="text-primary">APARTMENTS FOR RENT</h1>
                <PanelGroup accordion id="recipes">
                    {apartments.map((apartment, index) =>(
                        <Panel eventKey={index} key={index}>
                            <Panel.Heading className="title text-center"><h3>{apartment.name}</h3></Panel.Heading>
                            <Panel.Title  toggle><h5>Caracteristicas:</h5></Panel.Title>
                            <Panel.Body collapsible>

                                <Grid>
                                    <Row className="show-grid">
                                        <Col md={8}>
                                            <Row className="well">
                                                <Col md={2}><label>Precio: </label></Col>
                                                <Col md={2}><h6>{apartment.price}</h6></Col>
                                            </Row>
                                            <Row className="well">
                                                <Col md={2}><label>Direccion: </label></Col>
                                                <Col md={2}><h6>{apartment.address}</h6></Col>
                                            </Row>
                                            <Row className="well">
                                                <Col md={2}><label>Tamaño: </label></Col>
                                                <Col md={2}><h6>{apartment.size}</h6></Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}> 
                                            <h5>Espacios:</h5>
                                            <ListGroup>
                                                {
                                                    apartment.parts.map((parts, index) => (
                                                        <ListGroupItem key = {index}>{parts}</ListGroupItem>
                                                    ))
                                                    
                                                }
                                            </ListGroup>
                                        </Col>
                                    </Row>
                                </Grid>
                                <ButtonToolbar>
                                    <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                                    <Button bsStyle="danger" onClick={()=> { 
                                        if(window.confirm('Seguro que desea eliminar este item?'))                                             
                                            this.deleteApartment(index)
                                        }}>Delete</Button>
                                </ButtonToolbar>
                            </Panel.Body>
                            <EditApartment onShow = {this.state.showEdit} onEdit = {this.editApartment} 
                            onEditModal={()=>{this.showEditModal(this.state.currentlyEditing)}} 
                            currentlyEditing={this.state.currentlyEditing}
                                apartment = {apartments[this.state.currentlyEditing]} />
                        </Panel>
                    ))}
                </PanelGroup>
                <Button bsStyle="primary" onClick={this.showAddModal}>Add Apartment</Button>
                <AddApartment onShow={this.state.showAdd} onAdd={this.addApartments} onAddModal={this.showAddModal} />
            </div>
        );
    }
};


ReactDOM.render(<Recipe />, document.getElementById('app'));
//registerServiceWorker();
