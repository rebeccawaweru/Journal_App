"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = parseInt(process.env.PORT, 10);
const sequelize = new sequelize_1.Sequelize('journals', 'postgres', 'becca254', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5000
});
exports.default = sequelize;
