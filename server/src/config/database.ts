import { Sequelize } from "sequelize";

const db = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const port = parseInt(process.env.PORT as string, 10);
const sequelize = new Sequelize('journals','postgres','becca254', {
    host:'localhost',
    dialect:'postgres',
    port:5000
});

export default sequelize