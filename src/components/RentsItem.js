import React, {useState} from 'react'
import Collapsible from 'react-collapsible';
import './styles/Rents.css';
import Alert from "@mui/material/Alert";


function RentsItem({rentalID, validFrom, validTo, dateDiff, startedBy, endedBy, dailyRentPrice, yearOfProduction, brand, model, fuelType, transmission, engineSize, horsepower, itemID}) {


  let cancellable = false;

  const [disappear, setDisappear] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let status;

  if(startedBy && endedBy)
    status = 'zakończone'
  else if (startedBy)
    status = 'aktywne'
  else {
    status = 'zarezerwowane'
    cancellable = true;
  }

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

  const totalPrice = (dateDiff * dailyRentPrice).toFixed(2);


  async function cancelRent() {
    const rentalInfo = {
      itemID: itemID,
      rentalID: rentalID,
    }
    const dbResult = await window.db.cancelRent(rentalInfo);

    setDisappear(true);
    setShowAlert(true);
  }

  return (
    <div className="rent-item-div" >
      {showAlert && (
        <Alert className="popup-alert" severity="success" onClose={() => {setShowAlert(false)}}><strong>Rezerwacja została anulowana.</strong></Alert>
      )}
    {!disappear && (
      <Collapsible className="collapsible" openedClassName="collapsed" triggerClassName="trigger" trigger={`Wypożyczenie #${rentalID}, Status: ${status}` }>
        <div className="rent-info">
          <ul>
            <li>
              <label>Data rozpoczęcia</label>
              <div className="rent-info-content-box">
                {validFrom}
              </div>
            </li>
            <li>
              <label>Data zakończenia</label>
              <div className="rent-info-content-box">
                {validTo}
              </div>
            </li>
          </ul>
        </div>
        <div className="rent-car-info">
          <ul>
            <li>
              <label>Pojazd</label>
              <div className="car-info-content-box">
                {brand} {model} ({yearOfProduction})
              </div>
            </li>
            <li>
              <label>Paliwo</label>
              <div className="car-info-content-box">
                {fuelType}
              </div>
            </li>
            <li>
              <label>Skrzynia</label>
              <div className="car-info-content-box">
                {transmission}
              </div>
            </li>
            <li>
              <label>Silnik</label>
              <div className="car-info-content-box">
                {engineSize}L, {horsepower}KM
              </div>
            </li>
            <li>
              <label>Kwota dzienna</label>
              <div className="car-info-content-box">
                {dailyRentPrice} €
              </div>
            </li>
            <li>
              <label>Kwota całkowita</label>
              <div className="car-info-content-box">
                {totalPrice} €
              </div>
            </li>
          </ul>
        </div>
        <div className="cancel-container">
          {cancellable && (
            <button className="cancel-btn" onClick={cancelRent} >Anuluj Rezerwację</button>
          )}
        </div>
      </Collapsible>
    )}
    </div>
  );
}

export default RentsItem