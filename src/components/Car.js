import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import './styles/Car.css'
import { useHistory } from 'react-router-dom'
import * as locales from 'react-date-range/dist/locale';
import { addDays, addYears, differenceInDays } from "date-fns";
import Alert from "@mui/material/Alert";

function Car() {

  let car = global.car;

  let history = useHistory();

  function handleReturnButton() {
    history.push('/fleet');
    global.carID = undefined;
  }

  const [buttonActive, setButtonActive] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /*const [disabledDates, setDisabledDates] = useState(getDates(new Date('2023-01-24'), new Date('2023-01-28')));*/
  const [disabledDates, setDisabledDates] = useState(getDates(new Date('1971-02-02'), new Date('1971-02-04')));
  const [totalPrice, setTotalPrice] = useState('-.-');

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: new Date(''),
      key: 'selection'
    }
  ]);


  useEffect(() => {
    car = global.car;

    checkAvailability()
      .catch(err => console.log(err));
  }, []);

  async function checkAvailability() {
    const dbResults = await window.db.checkCarAvailability(car.carID);

    let dates = disabledDates;

    for (let i = 0; i < dbResults.length; i++) {

      //console.log(dbResults[i]);

      /*let validFrom = dbResults[i].validFrom;
      let validTo = dbResults[i].validTo;

      validFrom = validFrom.getFullYear() + '-' + (validFrom.getMonth() + 1) + '-' + validFrom.getDate();
      validTo = validTo.getFullYear() + '-' + (validTo.getMonth() + 1) + '-' + validTo.getDate();*/

      const datesArray = getDates(dbResults[i].validFrom, dbResults[i].validTo);


      for(let i = 0; i < datesArray.length; i++) {
        dates.push(datesArray[i]);
      }
    }

    setDisabledDates(dates);
    setState([
      {
        startDate: null,
        endDate: new Date(''),
        key: 'selection'
      }
    ]);
  }

  function getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(addDays(new Date (currentDate), 0));
      currentDate = addDays(currentDate, 1);
    }
    return dateArray;
  }

  function handleDateChange(item) {
    setState([item.selection]);

    let endDate = addDays(item.selection.endDate, 1);

    const price = differenceInDays(endDate, item.selection.startDate) * car.dailyRentPrice;

    if (price <= 0)
      setTotalPrice('-.-');
    else {
      setTotalPrice(`${price.toFixed(2)}`);
      setButtonActive(true);
    }
  }

  async function handleSubmit() {
    if (totalPrice === '-.-')
      return;


    const toDB = {
      clientID: window.sessionStorage.getItem('clientID'),
      carID: car.carID,
      validFrom: state[0].startDate,
      validTo: state[0].endDate,
    }

    const dbResult = await window.db.rentCar(toDB);


    if(!(dbResult.affectedRows !== undefined && dbResult.affectedRows > 0)) {
      setShowError(true);
    }

    await checkAvailability();

    setState([
      {
        startDate: null,
        endDate: new Date(''),
        key: 'selection'
      }
    ]);

    setTotalPrice('-.-');
    setButtonActive(false);

    setShowAlert(true);
  }




  return (
    <motion.div className="car-container"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.4}}
    >

      <button onClick={handleReturnButton}><i className="fa-regular fa-circle-left"/> Wróć</button>
      <div className="car-content-container">
        <div className="left">
          <div className="image-container">
            <img src={require(`./images/car-${car.carID}.jpg`)} alt="auto"/>
          </div>
          <div className="car-info">
            <ul className="list-car-info car-ul">
              <li>
                <h3>{car.brand} {car.model} ({car.yearOfProduction})</h3>
              </li>
              <li>
                Paliwo: {car.fuelType}
              </li>
              <li>
                Skrzynia: {car.transmission}
              </li>
              <li>
                Silnik: {car.engineSize} L, {car.horsepower} KM
              </li>
              <li>
                Kolor: {car.color}
              </li>
              <li>
                <h4>{car.dailyRentPrice}€ / dzień</h4>
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          <h4>Dostępność</h4>
          <div className="calendar-div">
            <DateRange
              startDatePlaceholder={"Początek"}
              endDatePlaceholder={"Koniec"}
              locale={locales['pl']}
              dateDisplayFormat={'dd.MM.yyyy'}
              minDate={addDays(new Date(), 1)}
              maxDate={addYears(new Date(), 1)}
              className="calendar"
              rangeColors={['#D9514EFF']}
              disabledDates={[...disabledDates]}
              moveRangeOnFirstSelection={false}
              ranges={state}
              onChange={item => handleDateChange(item)}
            />
          </div>
          <div className="rent-car">
            <span className="calendar-tip">Wybierz daty z powyższego kalendarza.</span>
            <span className="total-price">Całkowita cena: {totalPrice} €</span>
            <button disabled={!buttonActive} className="reserve-car-btn" onClick={handleSubmit} >Zarezerwuj</button>
          </div>
        </div>
        {showError && (
          <Alert className="popup-alert" severity="error" onClose={() => {setShowError(false)}}><strong>Wystąpił Błąd!</strong></Alert>
        )}
        {showAlert && (
          <Alert className="popup-alert" severity="success" onClose={() => {setShowAlert(false)}}><strong>Pojazd został zarezerwowany!</strong> - samochód możesz odebrać w siedzibie firmy od godz. 7:00 w pierwszym dniu wypożyczenia.</Alert>
        )}
      </div>
    </motion.div>
  );
}

export default Car