import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    username: "",
    avatar: "",
    // 用户的基本信息
    userInfo:{}
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USERINFO:(state,userInfo) =>{
    state.userInfo = userInfo
  }
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { account, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        account: account.trim(),
        password: password,
      })
        .then((response) => {
          if (response.success) {
            // 登录成功
            commit("SET_TOKEN", response.token);
            setToken(response.token);
            resolve();
          } else {
            // 登录失败
            reject(new Error(response.message));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  // 通过token去获取
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("验证失败，请重新登录！");
          }

          const { username, avatar } = data;

          commit("SET_USERNAME", username);
          commit("SET_AVATAR", avatar);
          commit("SET_USERINFO", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 首先移除token
      removeToken();
      resetRouter();
      commit("RESET_STATE");
      resolve();
      // logout(state.token)
      //   .then(() => {
      //     // 首先移除token
      //     removeToken();
      //     resetRouter();
      //     commit("RESET_STATE");
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
