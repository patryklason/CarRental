import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import RentsItem from "./RentsItem";


function Rents() {

  let listItems;
  const [rentItems, setRentItems] = useState([]);
  const [showNoRents, setShowNoRents] = useState(false);


  useEffect(() => {
    getRents().catch(err => {
      console.log(err);
    })
  }, []);

  async function getRents() {
    const clientID = window.sessionStorage.getItem('clientID');
    const userData = {
      clientID: clientID,
    }
    const result = await window.db.getRents(userData);

    if (result.length < 1) {
      setShowNoRents(true);
    }

    for (let i = 0; i < result.length; i++) {
      let dt = result[i].validFrom;
      dt = dt.getDate() + '.' + (dt.getMonth() + 1) + '.' + dt.getFullYear();
      result[i].validFrom = dt;

      dt = result[i].validTo;
      dt = dt.getDate() + '.' + (dt.getMonth() + 1) + '.' + dt.getFullYear();
      result[i].validTo = dt;
    }

    setRentItems(result);
  }

  listItems = (rentItems.map((item) =>
      <RentsItem {...item}/>
  ));

  return (
    <motion.div className="rents-container"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.8, delay: 0.1}}
    >
      {showNoRents && (
        <div className="no-rents">
          <div>
            <h1>Ups... Trochę tu pusto!</h1>
            <p>Wybierz swoje ulubione auto z naszej floty.</p>
          </div>
        </div>
      )}
      {listItems}
    </motion.div>
  );
}

export default Rents