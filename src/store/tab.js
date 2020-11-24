export default {
  state: {
    isCollapse: false,
    menu: [],
    currentMenu: {},
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name === "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let result = state.tabsList.findIndex(item => item.name === val.name);
        result === -1 ? state.tabsList.push(val) : "";
      }
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name);
      state.tabsList.splice(result, 1);
    },
    // 收缩左侧导航
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {
    semenu({ commit }, val) {
      commit("selectMenu", val);
    }
  }
};
