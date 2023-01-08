import React from 'react';
import './FleetItem.css'

class FleetItem extends React.Component {
  render() {
    return (
      <div className="fleet-item-div">
        <div className="item-fleet-image">
          <img src={require("./images/bmw-m4.jpg")} alt="auto"/>
        </div>
        <div className="item-fleet-car-info">
          <ul className="list-car-info">
            <li>
              <h3>BMW M4</h3>
            </li>
            <li>
              Paliwo: PB
            </li>
            <li>
              Skrzynia: Automatyczna
            </li>
            <li>
              <h4>249$ / dzień</h4>
            </li>
            <button className="btn-rent-car">Zarezerwuj</button>
          </ul>
        </div>
      </div>
    );
  }
}

export default FleetItem