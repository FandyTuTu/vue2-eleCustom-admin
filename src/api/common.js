/**
 * 公共模块接口列表
 */

import base from "./base"; // 导入接口域名列表
import axios from "@/axios/request"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const common = {
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

  // 注册
  register(params) {
    return axios.post(`${base.sq}/api/admin_user/register`, qs.stringify(params));
  },
  // 登录
  login(params) {
    return axios.post(`${base.sq}/api/admin_user/login`, qs.stringify(params));
  },
  // 修改密码
  changePassword(params) {
    return axios.post(`${base.sq}/api/admin_user/changePassword`, qs.stringify(params));
  },
  // 获取用户信息
  getuserInfo(params) {
    return axios.post(
      `${base.sq}/api/admin_user/getuserInfo`,
      qs.stringify(params)
    );
  },
  // 编辑用户信息
  editUserInfo(params) {
    return axios.post(
      `${base.sq}/api/admin_user/editUserInfo`,
      qs.stringify(params)
    );
  },
  // 菜单
  getMenu(params) {
    return axios.post(
      `${base.sq}/api/admin_common/getMenu`,
      qs.stringify(params)
    );
  }

  // 其他接口…………
};

export default common;
