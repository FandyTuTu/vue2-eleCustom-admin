module.exports = {
  root: true,
  //　添加插件
  plugins: [
  "vue"
  ],
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "indent": [2, 4],//缩进风格
    // 添加⾃定义规则
    'prettier/prettier': [
      // eslint校验不成功后，error或2则报错，warn或1则警告，off或0则⽆提示
      'error',
      {
        // singleQuote: true,
        semi: false, //结束是否加分号
        printWidth: 160//每行最长字符
      }
    ]
  }
};
