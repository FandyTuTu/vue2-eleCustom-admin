/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import router from "../router/index";
import store from "@/store/index";
import storage from "@/common/storage";

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// instance.defaults.headers.post['authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPdUdOWFhzMGJEMFU3UkZfZko0eHhBemVOZENjVnlhdGQ1NjdpMDU3Wkp3In0.eyJqdGkiOiIyYWUyMDA4Mi03MDM1LTRlNTMtODIxZi1iODA3ZmJkMmU5YmQiLCJleHAiOjE1OTE1MDEzNjAsIm5iZiI6MCwiaWF0IjoxNTg4OTA5MzYwLCJpc3MiOiJodHRwczovL2hzcmhkZXZrZXkuZWZvdGlsZS5jb20vYXV0aC9yZWFsbXMvZmNsb3VkIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjczNjY4YzdiLWEyOTAtNGYyMS04NjNmLWU2Yjg0NDNmNzBlNiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZjbG91ZC1kZW1vIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZTUyMTMwM2YtNjY2ZC00ZDVkLThmMmUtMDE4ZjJmZGY1OWUxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImZjbG91ZC1kZW1vIjp7InJvbGVzIjpbIkZTU-euoeeQhuWRmCIsIue6v-e0ouWvvOWHuueuoeeQhuWRmCIsIue6v-e0ouiEseaVj-WvvOWHuueuoeeQhuWRmCIsIui2hee6p-euoeeQhuWRmCIsIuW5v-WRiuS9jeeuoeeQhuWRmCIsIuS6pOS6kuW5s-WPsOeuoeeQhuWRmCIsIuWFrOWPuOenr-WIhueuoeeQhiIsIuWIhuWFrOWPuOWutuijhee7j-eQhiIsIuaAu-mDqOWutuijheeuoeeQhiIsIuW5uOemj-Wutl_lkITkvZPpqozppobnrqHnkIblkZgiLCLlubjnpo_lrrbov5DokKXnrqHnkIYiLCLljqjnlLXpob7pl64iLCLotKblj7fnrqHnkIbmnYPpmZAiLCLmlbDmja7nrqHnkIblkZgiLCLnp6_liIbllYbln47nrqHnkIYiLCJkZXZvcHMiLCLliIblhazlj7jnur_ntKLnrqHnkIblkZgiLCLlubjnpo_lrrZf5Lqn5ZOB566h55CG5ZGYIiwi5oC76YOo57q_57Si566h55CG5ZGYIiwi5a626KOF5Lia5Yqh5ZGYIiwi57uP6ZSA5ZWGIiwi5Lqk5LqS5bmz5Y-w5YiG56uZ566h55CG5ZGYIiwi5a626KOF5Yy65Z-f57uP55CGIiwi6Zeo5bqX56eY6ZKl566h55CG5ZGYIl19';
// instance.defaults.headers.get['authorization'] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJPdUdOWFhzMGJEMFU3UkZfZko0eHhBemVOZENjVnlhdGQ1NjdpMDU3Wkp3In0.eyJqdGkiOiIyYWUyMDA4Mi03MDM1LTRlNTMtODIxZi1iODA3ZmJkMmU5YmQiLCJleHAiOjE1OTE1MDEzNjAsIm5iZiI6MCwiaWF0IjoxNTg4OTA5MzYwLCJpc3MiOiJodHRwczovL2hzcmhkZXZrZXkuZWZvdGlsZS5jb20vYXV0aC9yZWFsbXMvZmNsb3VkIiwiYXVkIjpbInJlYWxtLW1hbmFnZW1lbnQiLCJhY2NvdW50Il0sInN1YiI6IjczNjY4YzdiLWEyOTAtNGYyMS04NjNmLWU2Yjg0NDNmNzBlNiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZjbG91ZC1kZW1vIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiZTUyMTMwM2YtNjY2ZC00ZDVkLThmMmUtMDE4ZjJmZGY1OWUxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImZjbG91ZC1kZW1vIjp7InJvbGVzIjpbIkZTU-euoeeQhuWRmCIsIue6v-e0ouWvvOWHuueuoeeQhuWRmCIsIue6v-e0ouiEseaVj-WvvOWHuueuoeeQhuWRmCIsIui2hee6p-euoeeQhuWRmCIsIuW5v-WRiuS9jeeuoeeQhuWRmCIsIuS6pOS6kuW5s-WPsOeuoeeQhuWRmCIsIuWFrOWPuOenr-WIhueuoeeQhiIsIuWIhuWFrOWPuOWutuijhee7j-eQhiIsIuaAu-mDqOWutuijheeuoeeQhiIsIuW5uOemj-Wutl_lkITkvZPpqozppobnrqHnkIblkZgiLCLlubjnpo_lrrbov5DokKXnrqHnkIYiLCLljqjnlLXpob7pl64iLCLotKblj7fnrqHnkIbmnYPpmZAiLCLmlbDmja7nrqHnkIblkZgiLCLnp6_liIbllYbln47nrqHnkIYiLCJkZXZvcHMiLCLliIblhazlj7jnur_ntKLnrqHnkIblkZgiLCLlubjnpo_lrrZf5Lqn5ZOB566h55CG5ZGYIiwi5oC76YOo57q_57Si566h55CG5ZGYIiwi5a626KOF5Lia5Yqh5ZGYIiwi57uP6ZSA5ZWGIiwi5Lqk5LqS5bmz5Y-w5YiG56uZ566h55CG5ZGYIiwi5a626KOF5Yy65Z-f57uP55CGIiwi6Zeo5bqX56eY6ZKl566h55CG5ZGYIl19';

// 设置get请求头
instance.defaults.headers.get["Content-Type"] =
  "application/json;charset=UTF-8";

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */

instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // res => res.status === 200 && (res.data.header && res.data.header.returnCode == 1) || (res.data.data && res.data.data.status == 0) ? Promise.resolve(res) : Promise.reject(res),

  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        store.commit("changeNetwork", false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
