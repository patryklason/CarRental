import React from 'react';
import { motion } from 'framer-motion'
import './FleetItem.css'

function FleetItem({carID, brand, model, engineSize, horsepower, fuelType, transmission, yearOfProduction, color, dailyRentPrice}) {

  if (carID > 13)
    carID = 13;

  //carID = 5;

  if (fuelType === 'PB')
    fuelType = 'Benzyna';
  else if (fuelType === 'D')
    fuelType = 'Diesel';
  else if (fuelType === 'HYB')
    fuelType = 'Hybryda';

  if (transmission === 'Automatic')
    transmission = 'Automatyczna';
  else if (transmission === 'Manual')
    transmission = 'Manualna';

    return (
      <motion.div className="fleet-item-div"
                  initial={{height: 0}}
                  animate={{height: "auto"}}
                  exit={{height: 0}}
                  transition={{duration: 0.3}}
      >
        <div className="item-fleet-image">
          <img src={require(`./images/car-${carID}.jpg`)} alt="auto"/>
        </div>
        <div className="item-fleet-car-info">
          <ul className="list-car-info">
            <li>
              <h3>{brand} {model} ({yearOfProduction})</h3>
            </li>
            <li>
              Paliwo: {fuelType}
            </li>
            <li>
              Skrzynia: {transmission}
            </li>
            <li>
              Silnik: {engineSize} L, {horsepower} KM
            </li>
            <li>
              Kolor: {color}
            </li>
            <li>
              <h4>{dailyRentPrice}€ / dzień</h4>
            </li>
            <button className="btn-rent-car">Wybierz</button>
          </ul>
        </div>
      </motion.div>
    );
}

export default FleetItem