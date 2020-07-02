import axios from "../config/axios";
import { baseUrl } from "../config/env";

/**
 **************************微信*****************************/
/**
 */
export const confirmData = data =>
  axios(baseUrl + "/ErpForAppServer.asmx/EntryApplication", data);

/**
 * 获取职务列表
 */
export const GetDutyList = data =>
  axios(baseUrl + "/ERPForWeixinServer.asmx/GetDuty", data);
/**
 * 应聘部门
 */
export const GetDepartment = data =>
  axios(baseUrl + "/ERPForWeixinServer.asmx/GetDepartment", data);

/**
 * 职务级别
 */
export const GetFunction = data =>
  axios(baseUrl + "/ERPForWeixinServer.asmx/GetFunction", data);

/**
 * 证件识别
 */
export const Idcard = data =>
  axios(baseUrl + "/ERPForWeixinServer.asmx/Idcard", data);

/**
 * 获取基础信息
 */
export const GetBasicInformation = data =>
  axios(baseUrl + "/ERPForWeixinServer.asmx/GetBasicInformation", data);
