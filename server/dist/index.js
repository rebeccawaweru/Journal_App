"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const journal_1 = __importDefault(require("./routes/journal"));
//configure dotenv to load variables from the .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/auth', auth_1.default);
app.use('/journals', journal_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
