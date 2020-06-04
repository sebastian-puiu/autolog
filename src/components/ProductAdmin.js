import React, { Component, Fragment } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./utility/FormValidation";
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newvehicle: { 
      "make": "", 
      "model": "",
      "year": "",
      "registration": "",
      "insurance_exp": "",
      "road_tax_exp": "",
      "technical_inspection_exp": "",
      "id": ""
    },
    vehicles: [],
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

  handleAddVehicle = async (id, event) => {
    event.preventDefault();
    try {
      // Form validation
      this.clearErrorState();
      const error = Validate(event, this.state.newvehicle);
      if (error) {
        this.setState({
          errors: { ...this.state.errors, ...error }
        });
      }
      else {
        const params = {
          "id": id,
          "username": this.props.auth.user.username,
          "make": this.state.newvehicle.make, 
          "model": this.state.newvehicle.model,
          "year": this.state.newvehicle.year,
          "registration": this.state.newvehicle.registration,
          "insurance_exp": this.state.newvehicle.insurance_exp,
          "road_tax_exp": this.state.newvehicle.road_tax_exp,
          "technical_inspection_exp": this.state.newvehicle.technical_inspection_exp
        };

        axios.defaults.headers.common['Authorization'] = this.props.auth.user.signInUserSession.idToken.jwtToken;
        await axios.post(`${config.api.invokeUrl}/vehicles`, params);
        console.log(this.state);
        window.location.reload();
        // this.setState({ vehicles: [...this.state.vehicles, this.state.newvehicle] });
        // this.setState({ newvehicle: { 
        //   "make": "", 
        //   "model": "",
        //   "year": "",
        //   "registration": "",
        //   "insurance_exp": "",
        //   "road_tax_exp": "",
        //   "technical_inspection_exp": "",
        //   "id": ""
        // }});
      }
    }
    catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateVehicle = async (id, updatedvehicle) => {
    try {
      const params = {
        "id": id,
        "username": this.props.auth.user.username,
        "make": updatedvehicle.updatedvehiclemake, 
        "model": updatedvehicle.updatedvehiclemodel,
        "year": updatedvehicle.updatedvehicleyear,
        "registration": updatedvehicle.updatedvehicleregistration,
        "insurance_exp": updatedvehicle.updatedvehicleinsuranceexp,
        "road_tax_exp": updatedvehicle.updatedvehicleroadtaxexp,
        "technical_inspection_exp": updatedvehicle.updatedvehicletechnicalinspectionexp
      };
      
      axios.defaults.headers.common['Authorization'] = this.props.auth.user.signInUserSession.idToken.jwtToken;
      await axios.patch(`${config.api.invokeUrl}/vehicles/${id}`, params);
      const vehicleToUpdate = [...this.state.vehicles].find(vehicle => vehicle.id === id);
      const updatedVehicles = [...this.state.vehicles].filter(vehicle => vehicle.id !== id);
      vehicleToUpdate.make = updatedvehicle.updatedvehiclemake;
      vehicleToUpdate.model = updatedvehicle.updatedvehiclemodel;
      vehicleToUpdate.year = updatedvehicle.updatedvehicleyear;
      vehicleToUpdate.registration = updatedvehicle.updatedvehicleregistration;
      vehicleToUpdate.insurance_exp = updatedvehicle.updatedvehicleinsuranceexp;
      vehicleToUpdate.road_tax_exp = updatedvehicle.updatedvehicleroadtaxexp;
      vehicleToUpdate.technical_inspection_exp = updatedvehicle.updatedvehicletechnicalinspectionexp;
      updatedVehicles.push(vehicleToUpdate);
      this.setState({vehicles: updatedVehicles});
    }catch (err) {
      console.log(`Error updating vehicle: ${err}`);
    }
  }

  handleDeleteVehicle = async (id, event) => {
    event.preventDefault();
    try {
      axios.defaults.headers.common['Authorization'] = this.props.auth.user.signInUserSession.idToken.jwtToken;
      await axios.delete(`${config.api.invokeUrl}/vehicles/${id}`);
      const updatedVehicles = [...this.state.vehicles].filter(vehicle => vehicle.id !== id);
      this.setState({vehicles: updatedVehicles});
    }catch (err) {
      console.log(`Unable to delete vehicle: ${err}`);
    }
  }

  fetchVehicles = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = this.props.auth.user.signInUserSession.idToken.jwtToken;
      const res = await axios.get(`${config.api.invokeUrl}/vehicles`);
      this.setState({ vehicles: res.data.Items });
    }
    catch(err) {
      console.log(`An error has occured: ${err}`);
    }
  }

  onAddProductIdChange = event => this.setState({ newvehicle: { ...this.state.newvehicle, "id": event.target.value } });
  onAddVehicleMakeChange = event => {
    this.setState({ newvehicle: { ...this.state.newvehicle, "make": event.target.value } });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }
  onAddVehicleModelChange = event => {
    this.setState({ newvehicle: { ...this.state.newvehicle, "model": event.target.value } });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }
  onAddVehicleYearChange = event => {
    this.setState({ newvehicle: { ...this.state.newvehicle, "year": event.target.value } });
    this.setState({ [event.target.id]: event.target.value });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }
  onAddVehicleRegistrationChange = event => this.setState({ newvehicle: { ...this.state.newvehicle, "registration": event.target.value } });
  onAddVehicleInsuranceExpChange = event => this.setState({ newvehicle: { ...this.state.newvehicle, "insurance_exp": event.target.value } });
  onAddVehicleRoadTaxExpChange = event => this.setState({ newvehicle: { ...this.state.newvehicle, "road_tax_exp": event.target.value } });
  onAddVehicleTechnicalInspectionExpChange = event => this.setState({ newvehicle: { ...this.state.newvehicle, "technical_inspection_exp": event.target.value } });

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated && this.props.auth.user) {
      this.fetchVehicles();
    }
    else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Vehicles</h1>
            <p className="subtitle is-5">Here is the list of your vehicles. You can add, update and remove vehicles using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <FormErrors formerrors={this.state.errors} />

                <form onSubmit={event => this.handleAddVehicle(this.state.newvehicle.id, event)}>
                  <div className="field" style={{display: "none"}}>
                    <div className="control">
                      <input 
                        className="input"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newvehicle.id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        id="make"
                        placeholder="Enter make*"
                        value={this.state.newvehicle.make}
                        onChange={this.onAddVehicleMakeChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        id="model"
                        placeholder="Enter model*"
                        value={this.state.newvehicle.model}
                        onChange={this.onAddVehicleModelChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input"
                        type="text"
                        id="year"
                        placeholder="Enter production year*"
                        value={this.state.newvehicle.year}
                        onChange={this.onAddVehicleYearChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        className="input"
                        type="text" 
                        placeholder="Enter registration"
                        value={this.state.newvehicle.registration}
                        onChange={this.onAddVehicleRegistrationChange}
                      />
                    </div>
                  </div><hr/>
                  <div className="field">
                    <div className="control">
                      <p>Insurace expiration date</p>
                      <input 
                        className="input"
                        type="date" 
                        placeholder="Enter insurance expiration date"
                        value={this.state.newvehicle.insurance_exp}
                        onChange={this.onAddVehicleInsuranceExpChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <p>Road tax expiration date</p>
                      <input 
                        className="input"
                        type="date" 
                        placeholder="Enter road tax expiration date"
                        value={this.state.newvehicle.road_tax_exp}
                        onChange={this.onAddVehicleRoadTaxExpChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <p>Technical inspection expiration date</p>
                      <input 
                        className="input"
                        type="date" 
                        placeholder="Enter technical inspection expiration date"
                        value={this.state.newvehicle.technical_inspection_exp}
                        onChange={this.onAddVehicleTechnicalInspectionExpChange}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button type="submit" className="button is-primary">
                        Add vehicle
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-12 is-parent  is-vertical">
                    {
                      this.state.vehicles && this.state.vehicles.length > 0 ?
                        this.state.vehicles.map((vehicle, index) => 
                          <Product 
                            isAdmin={true}
                            handleUpdateVehicle={this.handleUpdateVehicle}
                            handleDeleteVehicle={this.handleDeleteVehicle} 
                            make={vehicle.make}
                            model={vehicle.model}
                            year={vehicle.year}
                            registration={vehicle.registration}
                            insurance_exp={vehicle.insurance_exp}
                            road_tax_exp={vehicle.road_tax_exp}
                            technical_inspection_exp={vehicle.technical_inspection_exp}
                            id={vehicle.id}
                            key={vehicle.id}
                          />)
                      : <div className="tile notification is-warning">No vehicles available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
