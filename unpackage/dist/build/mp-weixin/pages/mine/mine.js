(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{2437:function(t,e,n){"use strict";(function(t){n("ebc2");o(n("66fd"));var e=o(n("343b"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"343b":function(t,e,n){"use strict";n.r(e);var o=n("549b"),a=n("ea63");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("efa5");var i,s=n("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=c.exports},"3f73":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("4d9f")),a=n("89a7");function r(t){return t&&t.__esModule?t:{default:t}}var i=function(){n.e("components/defaultComponent/defaultComponent").then(function(){return resolve(n("c550"))}.bind(null,n)).catch(n.oe)},s={components:{defaultComponent:i},data:function(){return{paddingBottom:o.default.paddingBottom,baseInfoLit:[{id:1,iconUrl:o.default.imgbaseUrl+"/my/about.png",text:"关于我们"},{id:2,iconUrl:o.default.imgbaseUrl+"/my/versions.png",text:"版本信息"},{id:3,iconUrl:o.default.imgbaseUrl+"/my/feedback.png",text:"意见反馈"}],historyList:[],avatarUrl:t.getStorageSync("avatarUrl"),nickName:t.getStorageSync("nickName"),watchCount:"",collectCount:"",eleId:"",courseId:"",lessonId:""}},methods:{getHistoryList:function(t){var e=this;(0,a.getHistoryList)(t).then((function(t){e.historyList=t.data.records.slice(0,10)}))},screenchange:function(e){var n=this,o=t.createVideoContext(this.eleId,this);if(e.detail.fullScreen)o.play();else{var r={courseId:this.courseId,lessonId:this.lessonId,wxUserId:t.getStorageSync("wxUserId")};(0,a.addUserWatch)(r).then((function(e){0==e.code&&(console.log("添加成功"),n.userWatchCount(t.getStorageSync("wxUserId")))})),o.pause()}},play:function(e){this.courseId=e.courseId,this.lessonId=e.id,this.eleId="myVideo"+e.id,console.log(this.eleId),this.videoContext=t.createVideoContext(this.eleId,this),this.videoContext.requestFullScreen({direction:90})},refreshUser:function(){var e=this;t.getUserProfile({desc:"用于完善会员资料",success:function(n){var o={encryptedData:n.encryptedData,iv:n.iv,sessionKey:t.getStorageSync("sessionKey")};(0,a.refreshUser)(o).then((function(n){e.avatarUrl=n.data.avatarUrl,e.nickName=n.data.nickName,t.setStorageSync("avatarUrl",n.data.avatarUrl),t.setStorageSync("nickName",n.data.nickName)}))}})},userWatchCount:function(t){var e=this;(0,a.userWatchCount)(t).then((function(t){e.watchCount=t.data}))},userCollectCount:function(t){var e=this;(0,a.userCollectCount)(t).then((function(t){e.collectCount=t.data}))},moreHistory:function(){t.navigateTo({url:"/pages/more/more?flag=history&headTitle=历史记录"})},showModel:function(e){"关于我们"==e?t.showModal({title:"苏e学堂",content:"2022年8月，江苏省电化教育馆推出的非学科类公益直播“苏e直播”上线啦!美术、音乐、书法、舞蹈、表演、手工、甜品制作、主持、体育……。“苏e直播”坚持公益属性，通过一节节超嗨直播，一门门好玩的课程，结合“双减”、课后服务、城乡义务教育均衡，以新媒体、新技术为小朋友们提供优质数字教育资源。",showCancel:!1}):"意见反馈"==e?t.showModal({title:"如您有任何意见请反馈至",content:"suezhibojs@163.com",showCancel:!1}):t.showModal({title:"苏e学堂小程序",content:"1.0",showCancel:!1})}},onShow:function(){this.setTabBarIndex(3)},onLoad:function(){console.log(this.avatarUrl),console.log(this.nickName);var e=t.getStorageSync("wxUserId");this.getHistoryList(e),this.userWatchCount(e),this.userCollectCount(e)}};e.default=s}).call(this,n("543d")["default"])},"549b":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var a=function(){var t=this,e=t.$createElement;t._self._c},r=[]},8962:function(t,e,n){},ea63:function(t,e,n){"use strict";n.r(e);var o=n("3f73"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},efa5:function(t,e,n){"use strict";var o=n("8962"),a=n.n(o);a.a}},[["2437","common/runtime","common/vendor"]]]);