(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{182:function(e,t,n){var content=n(230);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(76).default)("56b15182",content,!0,{sourceMap:!1})},202:function(e,t,n){"use strict";n(229);var r=n(65),component=Object(r.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("Nuxt")],1)}),[],!1,null,null,null);t.a=component.exports},203:function(e,t,n){n(204),e.exports=n(205)},229:function(e,t,n){"use strict";n(182)},230:function(e,t,n){(t=n(75)(!1)).push([e.i,'html{font-family:"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box}*,:after,:before{box-sizing:border-box;margin:0}.button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}',""]),e.exports=t},231:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return d})),n.d(t,"mutations",(function(){return l})),n.d(t,"actions",(function(){return f}));n(56);var r=n(15);function o(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,d=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return d=e.done,e},e:function(e){l=!0,o=e},f:function(){try{d||null==n.return||n.return()}finally{if(l)throw o}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var d=function(){return{user_questions:[],current_question:{id:"",question_data:{question:"",tags:[],id:"",advice:"",marks:0},user_data:{rich_text:[],datetime:""},raw_user_data:{}},general_advice:"",editor:void 0,saving_interval:void 0,checking_interval:void 0}},l={set_saving_interval:function(e,t){e.saving_interval=t},set_checking_interval:function(e,t){e.checking_interval=t},clear_intervals:function(e){clearInterval(e.saving_interval),clearInterval(e.checking_interval)},modify_editor:function(e,t){e.editor=t},modify_user_questions:function(e,t){e.user_questions=t},modify_current_question:function(e,t){e.current_question=t},change_one_user_question:function(e,t){for(i=0;i<e.user_questions.length;i++)if(e.user_questions[i].id===t.id){e.user_questions[i]=t;break}},upload_general_advice:function(e,t){e.general_advice=t},change_richtext_and_datetime:function(e,t){var i;for(i=0;i<e.user_questions.length;i++)if(e.user_questions[i].id===t.id&&e.current_question.id===t.id){e.user_questions[i].user_data.rich_text=t.rich_text,e.user_questions[i].user_data.datetime=t.new_date,e.current_question.user_data.rich_text=t.rich_text,e.current_question.user_data.datetime=t.new_date,e.current_question.raw_user_data=t.raw;break}}},f={get_user_questions:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,c,d,l,f,_,v,m,h,x,y,w;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(0!==e.state.user_questions.length){n.next=14;break}return n.next=3,t.$http.$get("https://z-dot.github.io/stable/questions%20v3.json");case 3:r=n.sent,console.log(r.general_advice),e.commit("upload_general_advice",r.general_advice),c=[],l=o(r.questions);try{for(l.s();!(f=l.n()).done;){for(d=f.value,_=void 0,v=[],_=0;_<d.tags.length;_++)v.push({key:_,text:d.tags[_]});c.push({question:d.question,tags:v,id:d.id,advice:d.advice,marks:d.marks})}}catch(e){l.e(e)}finally{l.f()}for(m=[],h={},x={},y=0,w=c;y<w.length;y++)d=w[y],(h={}).question_data=d,h.id=d.id,localStorage.getItem(d.question)?(x=JSON.parse(localStorage.getItem(d.question)),h.raw_user_data=x,h.user_data={rich_text:x.blocks,datetime:new Date(x.time).toDateString()}):h.user_data={rich_text:{},datetime:"Never edited"},m.push(h);e.commit("modify_user_questions",m);case 14:case"end":return n.stop()}}),n)})))()}}}},[[203,6,2,7]]]);