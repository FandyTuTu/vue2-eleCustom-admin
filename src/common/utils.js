let utils = {
  /**
   * 获取url传递参数
   */
  getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
  /**
   * 存储localStorage
   */
  setlocalStorage(name, val) {
    localStorage.setItem(name, val);
  },
  /**
   * 获取localStorage
   */
  getlocalStorage(name) {
    localStorage.getItem(name);
  },
  /**
   * 移除localStorage
   */
  relocalStorage(name) {
    localStorage.getItem(name);
  }
};
export default utils;
