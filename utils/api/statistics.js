import {apiRoot} from "./api";
import https from "../axios";

//post
// 新增
const SAVESERVICEADMIN = apiRoot+"/serviceUser/saveServiceUser";  //请求的地址
export const saveServiceAdmin = function (params) {
    return https(SAVESERVICEADMIN , params,"post");
};
// 编辑
const EDITSERVICEADMIN = apiRoot+"/serviceUser/editServiceUser";  //请求的地址
export const editServiceAdmin = function (params) {
    return https(EDITSERVICEADMIN , params,"post");
};
//get
// 列表
const GETSERVICELIST = apiRoot+"/serviceUser/ServiceUserData";  //请求的地址
export const getServiceList = function (params) {
    return https(GETSERVICELIST , params);
};
// 详情
const GETSERVICEDETAIL = apiRoot+"/serviceUser/ServiceUsergetById";  //请求的地址
export const getServiceDetail = function (params) {
    return https(GETSERVICEDETAIL , params);
};
// 删除
const DELETESERVICEBYID = apiRoot+"/serviceUser/deleteServiceUser";  //请求的地址
export const deleteServiceById = function (params) {
    return https(DELETESERVICEBYID , params);
};
//获取公司列表
const GETCOMPANYOPTIONS = apiRoot+"/company/findCompanyAll";  //请求的地址
export const getCompanyOptions = function (params) {
    return https(GETCOMPANYOPTIONS , params);
};
