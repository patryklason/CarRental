const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const mysql = require('mysql2');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: true,
      //enableRemoteModule: true,
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)


const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'admin',
  database: 'bd2-car_rental'
});

db.connect(function (err){
  if (err)
    throw err;
  console.log('Connected to DB!');
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    db.close();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})








ipcMain.handle('say-hello', (event, args) => {
  console.log(args);

  return 'Hello from main process!';
});

ipcMain.handle('validate-login', (event, args) => {
  return validateLogin(args);
});

ipcMain.handle('get-client-info', (event, args) => {
  return getClientInfo(args);
});

ipcMain.handle('get-fleet', (event, args) => {
  return getFleet(args);
});

ipcMain.handle('create-account', (event, args) => {
  return createAccount(args);
});

ipcMain.handle('check-account-exists', (event, args) => {
  return checkAccountExists(args);
});

ipcMain.handle('check-car-availability', (event, args) => {
  return checkCarAvailability(args);
});

ipcMain.handle('rent-car', (event, args) => {
  return rentCar(args);
});

ipcMain.handle('get-rents', (event, args) => {
  return getRents(args);
});

ipcMain.handle('cancel-rent', (event, args) => {
  return cancelRent(args);
});



/**
 *
 *
 *
 * @param args - expected object with 2 string elements: email and password
 * @returns {Promise<[(RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader), FieldPacket[]]>}
 *
 * returns promised object
 *  {
 *   email: undefined (if didn't find the user in DB)   |   string email from DB (if found in DB)
 *   password: undefined (if passwords doesn't match)   |   string 'correct' (if the user password is correct)
 *   clientID: undefined (if didn't find the user or password is wrong)   |   string clientID (if email and password are correct)
 *  }
 */
async function validateLogin(args) {
  const uLogin = args.email;
  const uPassword = args.password;

  return db.promise().query(`SELECT email, password, clientID FROM customer WHERE email = '${uLogin}';`)
    .then(([ result ]) => {

      if( typeof result !== 'undefined' && result.length > 0) {
        if(result[0].password === uPassword){
          return {
            email: result[0].email,
            password: 'correct',
            clientID: result[0].clientID,
          };
        }
        return {
          email: result[0].email,
          password: undefined,
          clientID: undefined,
        };
      }

      return {
        email: undefined,
        password: undefined,
        clientID: undefined,
      };
    })
    .catch(err => {
      throw err;
    })

}

async function getClientInfo(clientID) {

  const sql = `SELECT clientID, firstName, surname, driverLicenseNumber, dateOfJoining, country, city, streetAndHouseNumber, email, phone 
   FROM customer WHERE clientID = '${clientID}';`;

  return db.promise().query(sql)
    .then(([result]) => {
      console.log(result[0]);
      return {
        clientID: result[0].clientID,
        firstName: result[0].firstName,
        surname: result[0].surname,
        driverLicenseNumber: result[0].driverLicenseNumber,
        dateOfJoining: result[0].dateOfJoining,
        country: result[0].country,
        city: result[0].city,
        streetAndHouseNumber: result[0].streetAndHouseNumber,
        phone: result[0].phone,
        email: result[0].email,
      };
      })
    .catch(err => {
      throw err;
    })
}

async function getFleet(args) {
  const sql = `SELECT c.carID, cm.brand, cm.model, cm.engineSize, cm.horsepower, cm.fuelType, 
        cm.transmission, c.yearOfProduction, c.color, c.dailyRentPrice
    FROM car c
    JOIN carmodel cm
    ON c.CarModelCarModelID = cm.CarModelID;`

  return db.promise().query(sql)
    .then(([result]) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

async function createAccount(userData) {

  const sql = `START TRANSACTION; 
  INSERT INTO  \`BD2-car_rental\`.\`Customer\` (\`ClientID\`, \`Password\`, \`FirstName\`, \`Surname\`, \`DriverLicenseNumber\`, \`DateOfJoining\`, \`Country\`, \`City\`, \`StreetAndHouseNumber\`, \`Email\`, \`Phone\`) VALUES (\`${userData.clientID}\`, \`${userData.password}\`, \`${userData.firstName}\`, \`${userData.surname}\`, \`${userData.driverLicenseNumber}\`, CURDATE(), \`${userData.country}\`, \`${userData.city}\`, \`${userData.streetAndHouseNumber}\`, \`${userData.email}\`, \`${userData.phone}\`); 
  COMMIT;`;

  const sql0 = `START transaction;`

  const sql1 = `INSERT INTO \`BD2-car_rental\`.\`Customer\` (\`ClientID\`, \`Password\`, \`FirstName\`, \`Surname\`, \`DriverLicenseNumber\`, \`DateOfJoining\`, \`Country\`, \`City\`, \`StreetAndHouseNumber\`, \`Email\`, \`Phone\`) VALUES ('${userData.clientID}', '${userData.password}', '${userData.firstName}', '${userData.surname}', '${userData.driverLicenseNumber}', CURDATE(), '${userData.country}', '${userData.city}', '${userData.streetAndHouseNumber}', '${userData.email}', '${userData.phone}');`

  const sql2 = `COMMIT;`

  const sql3 = sql0 + ` ` + sql1 + ` ` + sql2;

  return db.promise().query(sql1)
    .then(([result]) => {

      db.promise().query(`COMMIT;`)
        .then((result) => {
          return result;
        })
        .catch(err => {
          console.log(err);
        });

      console.log(result);
      return result;
    })
    .catch(err => {
      if (err.message.toLowerCase().includes('duplicate'))
        return 'user-exists';
      //throw err;
    });
}

async function checkAccountExists(args) {
  const userData = args;

  const sql = `SELECT clientID, driverLicenseNumber, email, phone FROM Customer 
            WHERE clientID = '${userData.clientID}' OR driverLicenseNumber = '${userData.driverLicenseNumber}' 
            OR email = '${userData.email}' OR phone = '${userData.phone}';`

  return db.promise().query(sql)
    .then(([result]) => {

      // false if < 1 | true if >= 1
      return result.length >= 1;

    })
    .catch(err => {
      throw err;
    });
}

async function checkCarAvailability(args) {
  const carID = args;

  const sql = `SELECT rh.validFrom, rh.validTo FROM rentalheader as rh
JOIN
rentalItem ri
ON
rh.RentalID = ri.rentalHeaderRentalId
WHERE ri.carCarId = ${carID} AND rh.validTo > curdate();`

  return db.promise().query(sql)
    .then(([result]) => {

      return result;

    })
    .catch(err => {
      throw err;
    });
}

async function rentCar(args) {
  let validFrom = args.validFrom;
  let validTo = args.validTo;

  validFrom = validFrom.getFullYear() + '-' + (validFrom.getMonth() + 1) + '-' + validFrom.getDate();
  validTo = validTo.getFullYear() + '-' + (validTo.getMonth() + 1) + '-' + validTo.getDate();

  const sql = `INSERT INTO \`BD2-car_rental\`.\`RentalHeader\` (\`CustomerClientID\`, \`ValidFrom\`, \`ValidTo\`) VALUES ('${args.clientID}', '${validFrom}', '${validTo}');`
  const sql2 = `INSERT INTO \`BD2-car_rental\`.\`RentalItem\` (\`RentalHeaderRentalID\`, \`CarCarID\`) VALUES (last_insert_id(), '${args.carID}');`

  return db.promise().query(sql)
    .then(([result]) => {
      db.promise().query(sql2)
        .then(([result]) => {
          db.promise().query('COMMIT;')
            .then(([result]) => result)
            .catch(err => {throw err});
          return result;
        })
        .catch(err => {throw err});
      return result;
    })
    .catch(err => {
      throw err;
    });
}

async function getRents(args) {

  const sql = `SELECT rh.rentalID, rh.validFrom, rh.validTo, DATEDIFF(rh.validTo, rh.validFrom) + 1 as dateDiff, rh.startedBy, rh.endedBy, car.dailyRentPrice, car.yearOfProduction, cm.brand, cm.model, cm.fuelType, cm.transmission, cm.engineSize, cm.horsepower, ri.itemID FROM RentalHeader rh
JOIN RentalItem ri ON rh.rentalID = ri.rentalHeaderRentalID
JOIN car ON ri.carCarID = car.CarID
JOIN carmodel cm ON car.CarModelCarModelID = cm.CarModelID
WHERE 
rh.customerClientID = '${args.clientID}'
ORDER BY rh.validTo DESC;`;


  return db.promise().query(sql)
    .then(([result]) => {
      return result;
    })
    .catch(err => {
      throw err;
    });
}

async function cancelRent(args) {

  const sql = `DELETE FROM RentalItem WHERE ItemID = '${args.itemID}'`;
  const sql2 = `DELETE FROM RentalHeader WHERE RentalID = '${args.rentalID}'`;

  console.log(args);

  return db.promise().query(sql)
    .then(([result]) => {

      db.promise().query(sql2)
        .then(([result]) => {
          return result;
      }).catch(err => {throw err});

      return result;
    })
    .catch(err => {
      throw err;
    });
}



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
