import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormErrors from "./FormErrors";
import Validate from "./utility/FormValidation";

export default class ProductAdmin extends Component {

  state = {
    isEditMode: false,
    updatedvehiclemake: this.props.make,
    updatedvehiclemodel: this.props.model,
    updatedvehicleyear: this.props.year,
    updatedvehicleregistration: this.props.registration,
    updatedvehicleinsuranceexp: this.props.insurance_exp,
    updatedvehicleroadtaxexp: this.props.road_tax_exp,
    updatedvehicletechnicalinspectionexp: this.props.technical_inspection_exp,
    errors: {
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        blankfield: false
      }
    });
  }

  handleVehicleEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }
    else {
      this.setState({ isEditMode: false });
      this.props.handleUpdateVehicle(this.props.id, this.state);
    }
  }

  handleEditCancel = event => {
    this.setState({ isEditMode: false });
  }

  onUpdateVehicleMakeChange = event => {
    this.setState({ "updatedvehiclemake": event.target.value });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };
  onUpdateVehicleModelChange = event => {
    this.setState({ "updatedvehiclemodel": event.target.value });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };
  onUpdateVehicleYearChange = event => {
    this.setState({ "updatedvehicleyear": event.target.value });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };
  onUpdateVehicleRegistrationChange = event => this.setState({ "updatedvehicleregistration": event.target.value });
  onUpdateVehicleInsuranceExpChange = event => this.setState({ "updatedvehicleinsuranceexp": event.target.value });
  onUpdateVehicleRoadTaxExpChange = event => this.setState({ "updatedvehicleroadtaxexp": event.target.value });
  onUpdateVehicleTechnicalInspectionExpChange = event => this.setState({ "updatedvehicletechnicalinspectionexp": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleVehicleEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteVehicle(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <FormErrors formerrors={this.state.errors} />

              <p>Edit vehicle make*</p>
              <input 
                className="input"
                type="text" 
                id="updatedmake"
                placeholder="Enter make"
                value={this.state.updatedvehiclemake}
                onChange={this.onUpdateVehicleMakeChange}
              />
              <p>Edit vehicle model*</p>
              <input 
                className="input"
                type="text" 
                id="updatedmodel"
                placeholder="Enter model"
                value={this.state.updatedvehiclemodel}
                onChange={this.onUpdateVehicleModelChange}
              />
              <p>Edit vehicle production year*</p>
              <input 
                className="input"
                type="text" 
                id="updatedyear"
                placeholder="Enter production year"
                value={this.state.updatedvehicleyear}
                onChange={this.onUpdateVehicleYearChange}
              />
              <p>Edit vehicle registration</p>
              <input 
                className="input"
                type="text" 
                placeholder="Enter registration"
                value={this.state.updatedvehicleregistration}
                onChange={this.onUpdateVehicleRegistrationChange}
              />
              <p>Edit vehicle insurance expiration date</p>
              <input 
                className="input"
                type="date" 
                placeholder="Enter insurance expiration date"
                value={this.state.updatedvehicleinsuranceexp}
                onChange={this.onUpdateVehicleInsuranceExpChange}
              />
              <p>Edit vehicle road tax expiration date</p>
              <input 
                className="input"
                type="date" 
                placeholder="Enter road tax expiration date"
                value={this.state.updatedvehicleroadtaxexp}
                onChange={this.onUpdateVehicleRoadTaxExpChange}
              />
              <p>Edit vehicle technical inspection expiration date</p>
              <input 
                className="input"
                type="date" 
                placeholder="Enter technical inspection expiration date"
                value={this.state.updatedvehicletechnicalinspectionexp}
                onChange={this.onUpdateVehicleTechnicalInspectionExpChange}
              />
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >Save</button>&nbsp;&nbsp;&nbsp;
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditCancel }
              >Cancel</button>
            </div>
          : <div>
              <p className="product-title">{ this.props.make + " " + this.props.model }</p>
              <p className="product-id">Production year: { this.props.year }</p>
              <p className="product-id">Registration: { this.props.registration }</p>
              <p className="product-id">Insurance expires at: { this.props.insurance_exp }</p>
              <p className="product-id">Road tax expires at: { this.props.road_tax_exp }</p>
              <p className="product-id">Technical inspection expires at: { this.props.technical_inspection_exp }</p>
            </div>
        }
      </div>
    )
  }
}
