"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = __importStar(require("xlsx")); // 数据导出导入所需要的依赖
var lagouData = require('../../data/lagou.json');
var lagouExcel = [];
JSON.parse(JSON.stringify(lagouData)).map(function (item) {
    lagouExcel.push({ name: '创建时间' + item.createTime });
    lagouExcel = lagouExcel.concat(item.data);
    lagouExcel.push({ name: '' });
});
console.log('lagouExcel', lagouExcel);
var excleData = [
    { name: 'Java开发工程师', money: '20k-30k·13薪' },
    { name: '测试leader（ToC Group）', money: '30k-50k' },
    { name: '前端开发工程师', money: '15k-25k·15薪' },
    { name: '广告销售-点评广告业务部', money: '15k-25k' },
    { name: '测试工程师', money: '8k-15k·13薪' },
    { name: '英语老师（教师资格考试培训方向）', money: '10k-15k' },
    { name: 'Java开发工程师', money: '12k-16k' },
    { name: '资深前端开发工程师', money: '25k-40k' },
    { name: '客服专员', money: '25k-50k' },
];
// 设置表格样式，!cols为列宽
var options = {
    '!cols': [{ wpx: 200 }, { wpx: 100 }],
};
// 制作工作表的方式有很多种，以数组和对象为例
// const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excleData);
var worksheet = XLSX.utils.json_to_sheet(lagouExcel);
// 使用指定的单元格作为起点插入数据，r：行， c：列，详情看官网文档
// XLSX.utils.sheet_add_aoa(worksheet, [[“数学”，“语文”], [“政治”，“语文”], [“历史”，“政治”], ], {origin: {r: 2, c: 5}});
worksheet['!cols'] = options['!cols'];
// 新建一个工作簿
var workbook = XLSX.utils.book_new();
/* 将工作表添加到工作簿*/
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
/* 输出工作表， 由文件名决定的输出格式*/
XLSX.writeFile(workbook, "\u6392\u5EAD\u88683" + new Date().getTime() + ".xlsx");
