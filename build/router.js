"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var covid_1 = __importDefault(require("./covid"));
var data = require('./current.json');
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello world');
});
router.get('/getData', function (req, res) {
    new covid_1.default();
    res.send(JSON.stringify(data));
});
exports.default = router;
