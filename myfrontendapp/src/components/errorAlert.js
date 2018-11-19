import React, {Component} from 'react';

export default class ErrorAlert extends Component{
    render(){
        return(
            <div className="alert alert-error" role="alert">
                Error No se realizo la operacion.
            </div>
        );
    }
}