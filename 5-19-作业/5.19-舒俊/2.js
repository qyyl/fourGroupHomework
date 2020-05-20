/**
 * Created by greatwo on 2020/5/19.
 */
    //前台数据
var webData = [
        {name:"张三",age:"18",sex:"男"},
        {name:"李四",age:"18",sex:"女"},
        {name:"王二",age:"33",sex:"女"},
        {name:"二狗",age:"25",sex:"男"},
        {name:"狗蛋",age:"29",sex:"女"}
    ];
//后台数据
var javaData = [
    {stuName:"张三",stuAge:"18",stuSex:"男"},
    {stuName:"李四",stuAge:"18",stuSex:"女"},
    {stuName:"王二",stuAge:"33",stuSex:"女"},
    {stuName:"二狗",stuAge:"25",stuSex:"男"},
    {stuName:"狗蛋",stuAge:"29",stuSex:"女"}
];

var webData2= JSON.parse(JSON.stringify(webData).replace(/name/g,"stuName"));
console.log(webData2);

