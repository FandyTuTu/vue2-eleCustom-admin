/**
 * article模块接口列表
 */

import base from "./base"; // 导入接口域名列表
import axios from "@/axios/request"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const article = {
  // 新闻列表
  articleList() {
    return axios.get(`${base.sq}/topics`);
  },
  // 新闻详情,演示
  articleDetail(id, params) {
    return axios.get(`${base.sq}/topic/${id}`, {
      params: params
    });
  },
  // post提交
  login(params) {
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  },

  // 获取自测题目列表

  problemItems_list(params) {
    // return axios.post(`${base.sq}api/open/problemItems/list`, qs.stringify(params));
    return axios.get(
      `${base.sq}measuringscale-center/api/open/problemItems/list`,
      {
        params: params
      }
    );
  },

  // 获取产品系列列表
  productLine_list(params) {
    // return axios.post(`${base.sq}api/open/problemItems/list`, qs.stringify(params));
    return axios.get(
      `${base.sq}measuringscale-center/api/open/productLine/list`,
      {
        params: params
      }
    );
  },

  // 获取测试结果接口
  problemItems_result(params) {
    // let parmas = JSON.stringify(params)
    // // 转换params
    // let str = parmas.substr(1)
    // str = str.substr(0, str.length - 1)

    //post
    return axios.post(
      `${base.sq}measuringscale-center/api/open/problemItems/result`,
      qs.stringify(params)
    );

    // //get
    // return axios.get(`${base.sq}api/open/problemItems/result`, {
    //     params: params
    // });
  },

  // 获取推荐产品列表
  productcommend_listByIds(params) {
    return axios.post(
      `${base.sq}measuringscale-center/api/open/productcommend/listByIds`,
      qs.stringify(params)
    );
    // return axios.get(`${base.sq}api/open/productcommend/listByIds`, {
    //     params: params
    // });
  },

  // 保存用户信息
  register(params) {
    // return axios.post(`${base.sq}api/open/user/register`, qs.stringify(params));
    return axios.get(`${base.sq}measuringscale-center/api/open/user/register`, {
      params: params
    });
  },

  // 根据ID查询业务员
  findById(params) {
    // return axios.post(`${base.sq}api/open/salesman/findById`, qs.stringify(params));
    return axios.get(
      `${base.sq}measuringscale-center/api/open/salesman/findById`,
      {
        params: params
      }
    );
  },
  // 数据字典列表
  queryByType(params) {
    // return axios.post(`${base.sq}api/open/salesman/findById`, qs.stringify(params));
    return axios.get(`${base.sq}system-center/api/dic/api/open/queryByType`, {
      params: params
    });
  },

  // 新增线索跟进记录
  insertCluesFollowUp(params) {
    return axios.post(
      `${base.sq}measuringscale-center/api/open/cluesFollowUpBusiness/insertCluesFollowUp`,
      qs.stringify(params)
    );
  }

  // 其他接口…………
};

export default article;
