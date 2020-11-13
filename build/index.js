"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var covid_1 = __importDefault(require("./covid"));
var app = express_1.default();
app.use(router_1.default);
app.listen(7001, function () {
    new covid_1.default();
    console.log('server is running');
});
