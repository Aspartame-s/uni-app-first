(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/colList/colList"],{1182:function(e,t,n){"use strict";var o=n("a9a5"),s=n.n(o);s.a},"92e8":function(e,t,n){"use strict";n.r(t);var o=n("df30"),s=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=s.a},a9a5:function(e,t,n){},ac8f:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var s=function(){var e=this,t=e.$createElement,n=(e._self._c,e.hasLeftTopTip?e.lessonInfo.startTime.substring(11,16):null);e.$mp.data=Object.assign({},{$root:{g0:n}})},a=[]},c2fc:function(e,t,n){"use strict";n.r(t);var o=n("ac8f"),s=n("92e8");for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("1182");var i,r=n("f0c5"),l=Object(r["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=l.exports},df30:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("4d9f")),s=n("89a7");function a(e){return e&&e.__esModule?e:{default:e}}var i={name:"col-list",props:{lessonInfo:{type:Object,default:{}},hasMargin:{type:Boolean,default:!1},hasVideo:{type:Boolean,default:!0},hasLeftTopTip:{type:Boolean,default:!0},isHandle:{type:Boolean,default:!0}},data:function(){return{imgbaseUrl:o.default.imgbaseUrl,isShowModel:!0}},computed:{isStart:function(){var e,t=new Date(this.lessonInfo.startTime&&this.lessonInfo.startTime.replace(/-/g,"/")).getTime(),n=(new Date).getTime();return e=!(t>n),e},isPlayOrSkip:function(){var e;return e=!!this.lessonInfo.lessonUrl,e}},mounted:function(){var t=e.getStorageSync("phone");this.isShowModel=!t},methods:{screenchange:function(t){var n=e.createVideoContext("myVideo",this);if(t.detail.fullScreen)n.play();else{var o={courseId:this.lessonInfo.courseId,lessonId:this.lessonInfo.id,wxUserId:e.getStorageSync("wxUserId")};(0,s.addUserWatch)(o).then((function(e){console.log("添加一次直播",e)})),n.pause()}},play:function(){var t=this;this.isHandle&&(this.isStart?this.isPlayOrSkip?(this.videoContext=e.createVideoContext("myVideo",this),this.videoContext.requestFullScreen({direction:90})):e.openChannelsLive({finderUserName:"sphfYruhmZYLxXt",success:function(n){var o={courseId:t.lessonInfo.courseId,lessonId:t.lessonInfo.id,wxUserId:e.getStorageSync("wxUserId")};(0,s.addUserWatch)(o).then((function(e){console.log("添加一次直播",e)})),console.log("成功打开",n)},fail:function(e){console.log("打开失败",e)}}):console.log("未开始"))},getPhoneNumber:function(t){var n=this;if(this.isHandle&&t.detail.cloudID){var o={encryptedData:t.detail.encryptedData,iv:t.detail.iv,sessionKey:e.getStorageSync("sessionKey")};(0,s.refreshUserPhone)(o).then((function(t){e.setStorageSync("phone",t.data.phoneNumber),n.isShowModel=!1,n.play()}))}}}};t.default=i}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/colList/colList-create-component',
    {
        'components/colList/colList-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c2fc"))
        })
    },
    [['components/colList/colList-create-component']]
]);
