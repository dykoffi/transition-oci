"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[317],{9317:function(e,t,a){a.r(t);var s=a(2791),c=a(2981),l=a(2228),r=a(6196),n=a(8358),o=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(s=Object.getOwnPropertySymbols(e);c<s.length;c++)t.indexOf(s[c])<0&&Object.prototype.propertyIsEnumerable.call(e,s[c])&&(a[s[c]]=e[s[c]])}return a},i=(0,s.memo)((function(e){var t=e.kcContext,a=e.i18n,i=e.doFetchDefaultThemeResources,m=void 0===i||i,u=e.Template,p=void 0===u?c.Z:u,d=o(e,["kcContext","i18n","doFetchDefaultThemeResources","Template"]),k=t.otpLogin,f=t.url,C=a.msg,v=a.msgStr;return(0,s.useEffect)((function(){var e=!1;return(0,l.t)({type:"javascript",src:(0,r.pathJoin)(t.url.resourcesCommonPath,"node_modules/jquery/dist/jquery.min.js")}).then((function(){e||$(document).ready((function(){$(".card-pf-view-single-select").click((function(){$(this).hasClass("active")?($(this).removeClass("active"),$(this).children().removeAttr("name")):($(".card-pf-view-single-select").removeClass("active"),$(".card-pf-view-single-select").children().removeAttr("name"),$(this).addClass("active"),$(this).children().attr("name","selectedCredentialId"))}));var e=$(".card-pf-view-single-select")[0];e&&e.click()}))})),function(){e=!0}}),[]),s.createElement(p,Object.assign({},Object.assign({kcContext:t,i18n:a,doFetchDefaultThemeResources:m},d),{headerNode:C("doLogIn"),formNode:s.createElement("form",{id:"kc-otp-login-form",className:(0,n.W)(d.kcFormClass),action:f.loginAction,method:"post"},k.userOtpCredentials.length>1&&s.createElement("div",{className:(0,n.W)(d.kcFormGroupClass)},s.createElement("div",{className:(0,n.W)(d.kcInputWrapperClass)},k.userOtpCredentials.map((function(e){return s.createElement("div",{key:e.id,className:(0,n.W)(d.kcSelectOTPListClass)},s.createElement("input",{type:"hidden",value:"${otpCredential.id}"}),s.createElement("div",{className:(0,n.W)(d.kcSelectOTPListItemClass)},s.createElement("span",{className:(0,n.W)(d.kcAuthenticatorOtpCircleClass)}),s.createElement("h2",{className:(0,n.W)(d.kcSelectOTPItemHeadingClass)},e.userLabel)))})))),s.createElement("div",{className:(0,n.W)(d.kcFormGroupClass)},s.createElement("div",{className:(0,n.W)(d.kcLabelWrapperClass)},s.createElement("label",{htmlFor:"otp",className:(0,n.W)(d.kcLabelClass)},C("loginOtpOneTime"))),s.createElement("div",{className:(0,n.W)(d.kcInputWrapperClass)},s.createElement("input",{id:"otp",name:"otp",autoComplete:"off",type:"text",className:(0,n.W)(d.kcInputClass),autoFocus:!0}))),s.createElement("div",{className:(0,n.W)(d.kcFormGroupClass)},s.createElement("div",{id:"kc-form-options",className:(0,n.W)(d.kcFormOptionsClass)},s.createElement("div",{className:(0,n.W)(d.kcFormOptionsWrapperClass)})),s.createElement("div",{id:"kc-form-buttons",className:(0,n.W)(d.kcFormButtonsClass)},s.createElement("input",{className:(0,n.W)(d.kcButtonClass,d.kcButtonPrimaryClass,d.kcButtonBlockClass,d.kcButtonLargeClass),name:"login",id:"kc-login",type:"submit",value:v("doLogIn")}))))}))}));t.default=i}}]);
//# sourceMappingURL=317.d444f650.chunk.js.map