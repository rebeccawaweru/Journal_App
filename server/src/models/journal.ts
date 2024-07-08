import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from './user';

class Journal extends Model {
    public id!:number;
    public title!:number;
    public content!:string;
    public category!:string;
    public date!:Date;
}

Journal.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName:'journals'
});



Journal.belongsTo(User, { foreignKey:'userId', as:'user'});

Journal.sync({ force: false }); 

export default Journal;