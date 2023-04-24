const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
require("dotenv").config();


let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
// const createDatabase = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST || "localhost",
//       user: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//     });

//     await connection.query(
//       `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
//     );
//     console.log(`Database '${process.env.DB_NAME}' created or already exists.`);
//   } catch (error) {
//     console.error("Unable to create the database:", error);
//   }
// };

// const sequelizeConnection = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: "mysql",
//   }
// );

// (async () => {
//   await createDatabase();
//   try {
//     await sequelizeConnection.authenticate();
//     console.log(
//       "Connection to the database has been established successfully."
//     );
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

module.exports = sequelize;
