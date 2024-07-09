"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journal_1 = __importDefault(require("../models/journal"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content, category, date } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const journal = yield journal_1.default.create({ title, content, category, date, userId });
        res.status(201).json({ success: true, journal });
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.get('/', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const journals = yield journal_1.default.findAll({ where: { userId } });
        res.status(200).json(journals);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.put('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { title, content, category, date } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const journal = yield journal_1.default.findOne({ where: { id, userId } });
        if (journal) {
            journal.update({ title, content, category, date }).then(() => {
                res.status(200).json({ success: true });
            });
        }
        else {
            res.status(404).json({ error: 'Journal entry not found' });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
router.delete('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const journal = yield journal_1.default.findOne({ where: { id: id, userId: userId } });
        if (journal) {
            journal.destroy();
            res.status(200).json({ success: true, message: "Journal entry deleted" });
        }
        else {
            res.status(404).json({ error: "Journal entry not found" });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
exports.default = router;
