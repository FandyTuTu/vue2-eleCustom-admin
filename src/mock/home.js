import Mock from "mockjs";

export default {
  getHomeData: () => {
    return {
      code: 20000,
      data: {
        videoData: [
          {
            name: "测试1",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "测试2",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "测试3",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "测试4",
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: "测试5",
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ]
      }
    };
  }
};
