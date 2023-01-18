import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import FleetItem from './FleetItem'
import './Fleet.css'

function Fleet(){

  const [fleetItems, setFleetItems] = useState([]);
  //const [listItems, setListItems] = useState([]);
  let listItems = [];


  useEffect(() => {
    getFleet()
      .catch(err => console.log(err));
  }, []);

  async function getFleet() {
    const result = await window.db.getFleet();
    console.log(result);
    setFleetItems(result);


  }

  listItems = (fleetItems.map((item) =>
    <li className="item-fleet">
      <FleetItem {...item}/>
    </li>
  ));

  console.log(listItems);


    return (
      <motion.ul className="list-fleet"
                 initial={{opacity: 0}}
                 animate={{opacity: 1}}
                 exit={{opacity: 0}}
                 transition={{duration: 0.8, delay: 0.1}}
      >
        {listItems}
      </motion.ul>

    );
}

export default Fleet