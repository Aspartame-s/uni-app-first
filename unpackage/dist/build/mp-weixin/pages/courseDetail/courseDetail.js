(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/courseDetail/courseDetail"],{"2a12":function(t,e,n){"use strict";var o=n("aba9"),i=n.n(o);i.a},"4d97":function(t,e,n){"use strict";n.r(e);var o=n("bd6a"),i=n("536e");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("2a12");var c,r=n("f0c5"),s=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=s.exports},"536e":function(t,e,n){"use strict";n.r(e);var o=n("75a9"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"75a9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("a34a")),i=n("a9fe"),a=n("89a7"),c=r(n("4d9f"));function r(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,o,i,a,c){try{var r=t[a](c),s=r.value}catch(u){return void n(u)}r.done?e(s):Promise.resolve(s).then(o,i)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){s(a,o,i,c,r,"next",t)}function r(t){s(a,o,i,c,r,"throw",t)}c(void 0)}))}}var l=function(){Promise.all([n.e("common/vendor"),n.e("components/colList/colList")]).then(function(){return resolve(n("c2fc"))}.bind(null,n)).catch(n.oe)},d={components:{colList:l},data:function(){return{imgbaseUrl:c.default.imgbaseUrl,noTabbarPaddingBottom:c.default.noTabbarPaddingBottom,iStatusBarHeight:null,tabList:[{id:1,name:"课时介绍",iconUrl:"https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",active:1,path:"course"},{id:2,name:"老师介绍",iconUrl:"https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",active:0,path:"teacher"}],active:1,courseId:null,lessonList:[],courseDetail:{},teacherId:"",teacherIntroduction:"",tabFlag:"course",isCollected:!1}},methods:{selectTab:function(t,e){this.tabFlag=e,this.tabList.forEach((function(e){e.id==t?e.active=1:e.active=0}))},getLessonList:function(t,e){var n=this;(0,i.getLessonList)(t,e).then((function(t){n.lessonList=t.data}))},getCourseDetailWithCourseId:function(t){var e=this;return u(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,i.getCourseDetailWithCourseId)(t).then((function(t){e.courseDetail=t.data,e.teacherId=t.data.teacherId}));case 2:e.getTeacherDetailWithId(e.teacherId);case 3:case"end":return n.stop()}}),n)})))()},getTeacherDetailWithId:function(t){var e=this;(0,i.getTeacherDetailWithId)(t).then((function(t){e.teacherIntroduction=t.data.teacherIntroduction}))},screenchange:function(e){var n=t.createVideoContext("myVideo",this);e.detail.fullScreen?n.play():n.pause()},play:function(){this.videoContext=t.createVideoContext("myVideo",this),this.videoContext.requestFullScreen({direction:90})},back:function(){t.navigateBack()},userCollectList:function(t){var e=this;(0,a.userCollectList)(t).then((function(t){t.data.indexOf(e.courseId)>-1&&(e.isCollected=!0)}))},collect:function(){var e=this,n={courseId:this.courseId,wxUserId:t.getStorageSync("wxUserId")};this.isCollected?(0,a.cancelUserCollect)(n).then((function(t){console.log(t),0==t.code&&(e.isCollected=!1)})):(0,a.saveUserCollect)(n).then((function(t){console.log(t),0==t.code&&(e.isCollected=!0)}))}},onShareAppMessage:function(t){if(console.log(t),"button"==t.from)return{title:"微信小程序测试分享",path:"/pages/courseDetail/courseDetail?courseId=".concat(this.courseId)}},onLoad:function(e){this.courseId=e.courseId,this.iStatusBarHeight=t.getSystemInfoSync().statusBarHeight,this.getLessonList("",this.courseId),this.getCourseDetailWithCourseId(this.courseId),this.userCollectList(t.getStorageSync("wxUserId"))}};e.default=d}).call(this,n("543d")["default"])},aba9:function(t,e,n){},bd6a:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},d7db:function(t,e,n){"use strict";(function(t){n("ebc2");o(n("66fd"));var e=o(n("4d97"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["d7db","common/runtime","common/vendor"]]]);