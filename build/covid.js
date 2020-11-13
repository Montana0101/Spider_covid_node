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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var superagent_1 = __importDefault(require("superagent"));
var cheerio_1 = __importDefault(require("cheerio"));
var Spider = /** @class */ (function () {
    function Spider() {
        var _this = this;
        this.url = 'https://www.worldometers.info/coronavirus/';
        this.titleName = '';
        this.spiderData = {};
        this.getHTMLInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.text];
                }
            });
        }); };
        this.getNowFormatDate = function () {
            var date = new Date();
            var seperator1 = '-';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = parseInt('0' + month);
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = parseInt('0' + strDate);
            }
            var currentdate = year +
                seperator1 +
                month +
                seperator1 +
                strDate +
                '  ' +
                hour +
                ':' +
                minutes +
                ':' +
                seconds;
            return currentdate;
        };
        // 根据Index返回标题
        this.getIndexToTitle = function (index) {
            switch (index) {
                case 0:
                    return (_this.titleName = '总数');
                case 1:
                    return (_this.titleName = '死亡总数');
                case 2:
                    return (_this.titleName = '治愈总数');
            }
        };
        this.getTargetEventJson = function (html) { return __awaiter(_this, void 0, void 0, function () {
            var $, professionInfos, list, fileName;
            var _this = this;
            return __generator(this, function (_a) {
                $ = cheerio_1.default.load(html, {
                    ignoreWhitespace: true,
                    xmlMode: true,
                });
                professionInfos = [];
                list = $('.maincounter-number');
                list.map(function (index, element) {
                    var _a;
                    var text = $(element).find('span');
                    _this.getIndexToTitle(index);
                    professionInfos.push((_a = {},
                        _a[_this.titleName] = text.text(),
                        _a));
                });
                professionInfos.push({
                    当前时间: this.getNowFormatDate(),
                });
                console.log('professionInfos', professionInfos);
                fileName = path_1.default.resolve(__dirname, 'current.json');
                fs_1.default.writeFileSync(fileName, JSON.stringify(professionInfos));
                return [2 /*return*/, professionInfos];
            });
        }); };
        this.generateJSON = function (dataJSON) {
            var fileName = path_1.default.resolve(__dirname, '../data/covid.json');
            var pastData = [];
            var currentData = {
                data: dataJSON,
                createTime: _this.getNowFormatDate(),
            };
            if (fs_1.default.existsSync(fileName)) {
                pastData = __spreadArrays(JSON.parse(fs_1.default.readFileSync(fileName, 'utf-8')));
                pastData.push(currentData);
            }
            fs_1.default.writeFileSync(fileName, JSON.stringify(pastData));
        };
        this.getInitSpider = function () { return __awaiter(_this, void 0, void 0, function () {
            var html, dataJSON;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getHTMLInfo()];
                    case 1:
                        html = _a.sent();
                        return [4 /*yield*/, this.getTargetEventJson(html)];
                    case 2:
                        dataJSON = _a.sent();
                        this.generateJSON(dataJSON);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getInitSpider();
    }
    return Spider;
}());
// new Spider()
// setInterval(() => {
//   new Spider()
// }, 30000)
exports.default = Spider;
