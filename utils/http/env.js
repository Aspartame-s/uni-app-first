//设置公共访问的url，即环境变量
module.exports = {
  // 开发环境
  dev: {
    baseUrl: 'http://192.168.1.100:8989'
  },
  // 测试环境
  test: {
    baseUrl: 'http://192.168.1.218:8081'
  },
  // 生产环境
  prod: {
    baseUrl: 'https://sezb.jse.edu.cn/web-api'
  },
  test2:{
    baseUrl:'http://ch6esd.natappfree.cc'
  }
}
