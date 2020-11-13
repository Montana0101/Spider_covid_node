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
        this.url = 'https://www.lagou.com/zhaopin/Node.js/?labelWords=label';
        this.cookie = 'user_trace_token=20201012170657-983c40af-9023-421d-8c64-92c7447df0b8; _ga=GA1.2.700225282.1602493618; LGUID=20201012170658-102cf365-7c51-4d5a-a32e-616284c18958; RECOMMEND_TIP=true; _gid=GA1.2.691311988.1602493631; index_location_city=%E5%85%A8%E5%9B%BD; gate_login_token=c61185354de3e38287a4f6a4b3ef0dcc584d8f8e07aef554feece8c9451f1174; LG_HAS_LOGIN=1; _putrc=EC2E1C9A80332EDC123F89F2B170EADC; JSESSIONID=ABAAAECABIEACCA567FB66F06A43A595B7E51719FF590AB; login=true; hasDeliver=0; privacyPolicyPopup=false; WEBTJ-ID=20201013143351-17520aa47c63a1-085ce4780f753a-6701b35-1024000-17520aa47c7ca9; Hm_lvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1602493618,1602493631,1602570766,1602570953; TG-TRACK-CODE=index_navigation; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217520adbe651f4-0b10b19d1d6eb-6701b35-1024000-17520adbe66cdd%22%2C%22%24device_id%22%3A%2217520adbe651f4-0b10b19d1d6eb-6701b35-1024000-17520adbe66cdd%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; LGSID=20201013153807-e0bd1dce-75b5-4ed3-ad3b-6aabc9b8449c; _gat=1; unick=%E7%94%A8%E6%88%B78783; SEARCH_ID=e8c807ce06434ee4a3a5210f3f8ac10f; X_HTTP_TOKEN=5e89e0a97454eb0f53467520614f75320f58d788c0; Hm_lpvt_4233e74dff0ae5bd0a3d81c6ccf756e6=1602576436; LGRID=20201013160715-040fb061-993a-4692-8188-de5c8da91dd6';
        this.getHTMLInfo = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, superagent_1.default.get(this.url).set('cookie', this.cookie)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.text];
                }
            });
        }); };
        //
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
        this.getTargetEventJson = function (html) { return __awaiter(_this, void 0, void 0, function () {
            var $, professionInfos, list;
            return __generator(this, function (_a) {
                $ = cheerio_1.default.load(html, {
                    ignoreWhitespace: true,
                    xmlMode: true,
                });
                professionInfos = [];
                list = $('.default_list');
                list.map(function (index, element) {
                    var post = $(element).find('h3');
                    var wage = $(element).find('.money');
                    var company = $(element).find('.company_name');
                    var welfare = $(element).find('.li_b_r');
                    professionInfos.push({
                        Post: post.text(),
                        Wage: wage.text(),
                        company: company.eq(0).text(),
                        welfare: welfare.text(),
                    });
                });
                professionInfos.pop();
                return [2 /*return*/, professionInfos];
            });
        }); };
        this.generateJSON = function (dataJSON) {
            var fileName = path_1.default.resolve(__dirname, '../data/lagou.json');
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
                        console.log('dasdsa', dataJSON);
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
exports.default = Spider;
