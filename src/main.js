const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path");
const mysql = require('mysql2');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
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
    })
}

async function createAccount(userData) {

  const sql = `START TRANSACTION; 
  INSERT INTO  \`BD2-car_rental\`.\`Customer\` (\`ClientID\`, \`Password\`, \`FirstName\`, \`Surname\`, \`DriverLicenseNumber\`, \`DateOfJoining\`, \`Country\`, \`City\`, \`StreetAndHouseNumber\`, \`Email\`, \`Phone\`) VALUES (\`${userData.clientID}\`, \`${userData.password}\`, \`${userData.firstName}\`, \`${userData.surname}\`, \`${userData.driverLicenseNumber}\`, CURDATE(), \`${userData.country}\`, \`${userData.city}\`, \`${userData.streetAndHouseNumber}\`, \`${userData.email}\`, \`${userData.phone}\`); 
  COMMIT;`;

  const sql0 = `START transaction;`

  const sql1 = `INSERT INTO \`BD2-car_rental\`.\`Customer\` (\`ClientID\`, \`Password\`, \`FirstName\`, \`Surname\`, \`DriverLicenseNumber\`, \`DateOfJoining\`, \`Country\`, \`City\`, \`StreetAndHouseNumber\`, \`Email\`, \`Phone\`) VALUES ('${userData.clientID}', '${userData.password}', '${userData.firstName}', '${userData.surname}', '${userData.driverLicenseNumber}', CURDATE(), '${userData.country}', '${userData.city}', '${userData.streetAndHouseNumber}', '${userData.email}', '${userData.phone}');`

  const sql2 = `COMMIT;`

  const sql3 = sql0 + ` ` + sql1 + ` ` + sql2;

  return db.promise().query(sql3)
    .then(([result]) => {
      db.promise().query(`COMMIT;`)
        .then()
        .catch()
      console.log(result);
      return result;
    })
    .catch(err => {
      if (err.message.toLowerCase().includes('duplicate'))
        return 'user-exists';
      //throw err;
    });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
