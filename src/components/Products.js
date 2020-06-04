import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    vehicles: []
  }

  fetchVehicles = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/vehicles`);
      console.log(res.data);
      this.setState({ vehicles: res.data });
      console.log(this.state.vehicles.Count);
    }
    catch(err) {
      console.log(`An error has occured: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchVehicles();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Registered Vehicles</h1>
            <p className="subtitle is-5">Here are all your registered vehicles:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.vehicles && this.state.vehicles.Count > 0
                      ? this.state.vehicles.Items.map(vehicle => <Product
                          name={vehicle.make + ' ' + vehicle.model}
                          year={vehicle.year}
                          registration={vehicle.registration}
                          insurance_exp={vehicle.insurance_exp}
                          road_tax_exp={vehicle.road_tax_exp}
                          technical_inspection_exp={vehicle.technical_inspection_exp}
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
