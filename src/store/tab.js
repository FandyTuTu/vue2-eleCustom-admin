import storage from "@/common/storage";

export default {
  state: {
    isCollapse: false, //是否收缩左侧菜单
    currentMenu: {}, //当前选中的菜单
    tabsList: storage.session_get('tabsList') || [{
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      }
    ] //tab打开的菜单
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name === "home") {
        state.currentMenu = null;
        let result = state.tabsList.findIndex(item => item.name === val.name);
        result === -1 ? state.tabsList.push(val) : "";
      } else {
        state.currentMenu = val;
        let result = state.tabsList.findIndex(item => item.name === val.name);
        result === -1 ? state.tabsList.push(val) : "";
      }
      //存储菜单，防止刷新丢失
      storage.session_set('tabsList',state.tabsList)
    },
    // 关闭单个标签
    closeTab(state, val) {
      console.log("关闭单个标签之前", state.tabsList, state.currentMenu);
      if (state.tabsList.length > 0) {
        let result = state.tabsList.findIndex(item => item.name === val.name);
        state.tabsList.splice(result, 1);
        state.currentMenu = state.tabsList[result]
          ? state.tabsList[result]
          : state.tabsList[result - 1];
        if (state.currentMenu && state.currentMenu.name == "home") {
          state.currentMenu = null;
        }
        if (state.tabsList.length === 0) {
          state.currentMenu = null;
          state.tabsList = [
            // {
            //   path: "/",
            //   name: "home",
            //   label: "首页",
            //   icon: "s-home"
            // }
          ];
        }
      } else {
        console.log("没有了");
      }
      storage.set('tabsList',state.tabsList)
    },
    // 收缩左侧导航
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 关闭所有标签
    closeAll(state) {
      state.tabsList = [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home"
        }
      ];
      state.currentMenu = {};
      storage.session_set('tabsList',state.tabsList)
    },
    // 关闭其他标签
    closeOther(state, val) {
      state.tabsList = val;
    }
  },
  actions: {
    semenu({ commit }, val) {
      commit("selectMenu", val);
    }
  }
};
