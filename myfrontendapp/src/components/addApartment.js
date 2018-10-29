import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//import React, { Component } from 'react';

//class to display the modal for adding a new apartment and export it
export class AddApartment extends React.Component {
  constructor(props){ //create a state to handle the new apartment
    super(props);
    this.state = {name:"", price: "", address:"", size:"", parts:""};

    this.handleApartmentNameChange=this.handleApartmentNameChange.bind(this);
    this.handlePriceChange=this.handlePriceChange.bind(this);
    this.handleAddressChange=this.handleAddressChange.bind(this);
    this.handleSizeChange=this.handleSizeChange.bind(this);
    this.handleApartmentPartsChange=this.handleApartmentPartsChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  //change name
  handleApartmentNameChange(e){
    this.setState({name: e.target.value});
  }
  handlePriceChange(e){
    this.setState({price: e.target.value});
  }
  handleAddressChange(e){
    this.setState({address: e.target.value});
  }
  handleSizeChange(e){
    this.setState({size: e.target.value});
  }
  //change parts
  handleApartmentPartsChange(e){
    this.setState({parts: e.target.value});
  }
  //get the apartment data, manipulate it and call the function for creating a new apartment.
  handleSubmit(event){
    event.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newPrice = this.state.price;
    var newAddress = this.state.address;
    var newSize = this.state.size;
    var newParts = this.state.parts.split(regExp);

    var newApartment = {name: newName, price: newPrice, address: newAddress, size: newSize, parts: newParts};
    onAdd(newApartment);


    this.setState({name:"", price:"", address:"", size:"", parts:""});
  }

  handleCancel(){
    const onAddModal = this.props.onAddModal;
    this.setState({name:"", price:"", address:"", size:"", parts:""});
    onAddModal();
  }

  render() {
      const onShow = this.props.onShow;
      var regex1 = /^\S/;
      var regex2 = /^[^,\s]/;
      var regex3 = /[^,\s]$/;
      const validApartment = regex1.test(this.state.name) && regex2.test(this.state.parts) && regex3.test(this.state.parts);
      return(
        <Modal show={onShow} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>New Apartment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formControlsName">
              <ControlLabel>Name: </ControlLabel>
              <FormControl type="text" required onChange={this.handleApartmentNameChange} value={this.state.name} placeholder="Enter Name" />
            </FormGroup>
            <FormGroup controlId="formControlPrice">
              <ControlLabel>Price: </ControlLabel>
              <FormControl type="text" required onChange={this.handlePriceChange} value={this.state.price} placeholder="Enter Price" />
            </FormGroup>
            <FormGroup controlId="formControlAddress">
              <ControlLabel>Address: </ControlLabel>
              <FormControl type="text" required onChange={this.handleAddressChange} value={this.state.address} placeholder="Enter Address" />
            </FormGroup>
            <FormGroup controlId="formControlDimensions">
              <ControlLabel>Dimensions: </ControlLabel>
              <FormControl type="text" required onChange={this.handleSizeChange} value={this.state.size} placeholder="Enter Dimensions" />
            </FormGroup>
            <FormGroup controlId="formControlsParts">
              <ControlLabel>Apartment Parts</ControlLabel>
              <FormControl componentClass="textarea" type="text" required onChange={this.handleApartmentPartsChange} value={this.state.parts} placeholder="Enter Parts(separate by commas)" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={!validApartment} bsStyle="success" onClick={this.handleSubmit}>Save Apartment</Button>
          </Modal.Footer>
        </Modal>
    );
  }
};

