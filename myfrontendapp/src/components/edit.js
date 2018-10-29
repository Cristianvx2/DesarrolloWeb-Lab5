import React from 'react';
import {Modal, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';

export class EditApartment extends React.Component{
    constructor(props){
        super(props);
        this.state = {name:"", price: "", address:"", size:"", parts:""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePriceChange=this.handlePriceChange.bind(this);
        this.handleAddressChange=this.handleAddressChange.bind(this);
        this.handleSizeChange=this.handleSizeChange.bind(this);
        this.handlePartsChange = this.handlePartsChange.bind(this);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        const prevName = state.prevName;
        const prevPrice = state.prevPrice;
        const prevAddress = state.prevAddress;
        const prevSize = state.prevSize;
        const prevParts = state.prevParts;
        
        const name = prevName !== props.apartment.name ? props.apartment.name : state.name;
        const price = prevPrice !== props.apartment.price ? props.apartment.price : state.price;
        const address = prevAddress !== props.apartment.address ? props.apartment.address : state.address;
        const size = prevSize !== props.apartment.size ? props.apartment.size : state.size;
        const parts = prevParts !== props.apartment.parts.join(",") ? props.apartment.parts.join(",") : state.parts;

        return{
            prevName: props.apartment.name, name,
            prevPrice: props.apartment.price, price,
            prevAddress: props.apartment.address, address,
            prevSize: props.apartment.size, size,
            prevParts: props.apartment.parts.join(","), parts,
        }
    }

    handleNameChange(e){
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
    handlePartsChange(e){
        this.setState({parts: e.target.value});
    }
    handleEdit(e){
        e.preventDefault();
        const onEdit = this.props.onEdit;
        const currentlyEditing = this.props.currentlyEditing;
        const regExp = /\s*,\s*/;

        var name = this.state.name;
        var price = this.state.price;
        var address = this.state.address;
        var size = this.state.size;
        var parts = this.state.parts.split(regExp);

        onEdit(name, price, address, size, parts, currentlyEditing);
    }
    handleCancel(){
        const onEditModal = this.props.onEditModal;
        this.setState({
            name: this.props.apartment.name,
            price: this.props.apartment.price,
            address: this.props.apartment.address,
            size: this.props.apartment.size, 
            parts: this.props.apartment.parts.join(",")
        });
        onEditModal();
    }

    render(){
        const onShow = this.props.onShow;
        var regex1 = /^\S/;
        var regex2 = /^[^,\s]/;
        var regex3 = /[^,\s]$/;
        const validApartment = regex1.test(this.state.name) && regex2.test(this.state.parts) && regex3.test(this.state.parts);

        return(
            <Modal show={onShow} onHide={this.handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Apartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlName">
                        <ControlLabel>Apartment Name</ControlLabel>
                        <FormControl type="text" required onChange={this.handleNameChange} value={this.state.name}
                        placeholder="Enter name"/>
                    </FormGroup>
                    <FormGroup controlId="formControlPrice">
                        <ControlLabel>Apartment Price</ControlLabel>
                        <FormControl type="text" required onChange={this.handlePriceChange} value={this.state.price}
                        placeholder="Enter Price"/>
                    </FormGroup>
                    <FormGroup controlId="formControlAddress">
                        <ControlLabel>Apartment Address</ControlLabel>
                        <FormControl type="text" required onChange={this.handleAddressChange} value={this.state.address}
                        placeholder="Enter Address"/>
                    </FormGroup>
                    <FormGroup controlId="formControlSize">
                        <ControlLabel>Apartment Size</ControlLabel>
                        <FormControl type="text" required onChange={this.handleSizeChange} value={this.state.size}
                        placeholder="Enter Size"/>
                    </FormGroup>
                    <FormGroup controlId="formControlParts">
                        <ControlLabel>Aparment Parts</ControlLabel>
                        <FormControl componentClass="textarea" type="text" required onChange={this.handlePartsChange}
                            value={this.state.parts} placeholder="Enter Parts(separate by commas"/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!validApartment} bsStyle="success" onClick={this.handleEdit}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};