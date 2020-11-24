const storage = {
  // 设置
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //获得
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  //移除
  remove(key) {
    localstorage.removeItem(key);
  },

  // 设置 session
  session_set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  //获得 session
  session_get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  //移除 session
  session_remove(key) {
    sessionStorage.removeItem(key);
  }
};
export default storage;
