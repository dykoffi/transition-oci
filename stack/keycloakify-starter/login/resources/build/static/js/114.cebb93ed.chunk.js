"use strict";(self.webpackChunkkeycloakify_starter=self.webpackChunkkeycloakify_starter||[]).push([[114],{9896:function(e,t,l){l.r(t);var a=l(2791),n=l(2981),r=l(8358),o=function(e,t){var l={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(l[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(l[a[n]]=e[a[n]])}return l},c=(0,a.memo)((function(e){var t,l=e.kcContext,c=e.i18n,i=e.doFetchDefaultThemeResources,s=void 0===i||i,p=e.Template,m=void 0===p?n.Z:p,u=o(e,["kcContext","i18n","doFetchDefaultThemeResources","Template"]),d=l.url,E=l.isAppInitiatedAction,g=l.totp,k=l.mode,C=l.messagesPerField,y=c.msg,b=c.msgStr,v={HmacSHA1:"SHA1",HmacSHA256:"SHA256",HmacSHA512:"SHA512"};return a.createElement(m,Object.assign({},Object.assign({kcContext:l,i18n:c,doFetchDefaultThemeResources:s},u),{headerNode:y("loginTotpTitle"),formNode:a.createElement(a.Fragment,null,a.createElement("ol",{id:"kc-totp-settings"},a.createElement("li",null,a.createElement("p",null,y("loginTotpStep1")),a.createElement("ul",{id:"kc-totp-supported-apps"},g.policy.supportedApplications.map((function(e){return a.createElement("li",null,e)})))),k&&"manual"==k?a.createElement(a.Fragment,null,a.createElement("li",null,a.createElement("p",null,y("loginTotpManualStep2")),a.createElement("p",null,a.createElement("span",{id:"kc-totp-secret-key"},g.totpSecretEncoded)),a.createElement("p",null,a.createElement("a",{href:g.qrUrl,id:"mode-barcode"},y("loginTotpScanBarcode")))),a.createElement("li",null,a.createElement("p",null,y("loginTotpManualStep3")),a.createElement("p",null,a.createElement("ul",null,a.createElement("li",{id:"kc-totp-type"},y("loginTotpType"),": ",y("loginTotp.".concat(g.policy.type))),a.createElement("li",{id:"kc-totp-algorithm"},y("loginTotpAlgorithm"),": ",null!==(t=null===v||void 0===v?void 0:v[g.policy.algorithm])&&void 0!==t?t:g.policy.algorithm),a.createElement("li",{id:"kc-totp-digits"},y("loginTotpDigits"),": ",g.policy.digits),"totp"===g.policy.type?a.createElement("li",{id:"kc-totp-period"},y("loginTotpInterval"),": ",g.policy.period):a.createElement("li",{id:"kc-totp-counter"},y("loginTotpCounter"),": ",g.policy.initialCounter))))):a.createElement("li",null,a.createElement("p",null,y("loginTotpStep2")),a.createElement("img",{id:"kc-totp-secret-qr-code",src:"data:image/png;base64, ".concat(g.totpSecretQrCode),alt:"Figure: Barcode"}),a.createElement("br",null),a.createElement("p",null,a.createElement("a",{href:g.manualUrl,id:"mode-manual"},y("loginTotpUnableToScan")))),a.createElement("li",null,a.createElement("p",null,y("loginTotpStep3")),a.createElement("p",null,y("loginTotpStep3DeviceName")))),a.createElement("form",{action:d.loginAction,className:(0,r.W)(u.kcFormClass),id:"kc-totp-settings-form",method:"post"},a.createElement("div",{className:(0,r.W)(u.kcFormGroupClass)},a.createElement("div",{className:(0,r.W)(u.kcInputWrapperClass)},a.createElement("label",{htmlFor:"totp",className:(0,r.W)(u.kcLabelClass)},y("authenticatorCode"))," ",a.createElement("span",{className:"required"},"*")),a.createElement("div",{className:(0,r.W)(u.kcInputWrapperClass)},a.createElement("input",{type:"text",id:"totp",name:"totp",autoComplete:"off",className:(0,r.W)(u.kcInputClass),"aria-invalid":C.existsError("totp")}),C.existsError("totp")&&a.createElement("span",{id:"input-error-otp-code",className:(0,r.W)(u.kcInputErrorMessageClass),"aria-live":"polite"},C.get("totp"))),a.createElement("input",{type:"hidden",id:"totpSecret",name:"totpSecret",value:g.totpSecret}),k&&a.createElement("input",{type:"hidden",id:"mode",value:k})),a.createElement("div",{className:(0,r.W)(u.kcFormGroupClass)},a.createElement("div",{className:(0,r.W)(u.kcInputWrapperClass)},a.createElement("label",{htmlFor:"userLabel",className:(0,r.W)(u.kcLabelClass)},y("loginTotpDeviceName"))," ",g.otpCredentials.length>=1&&a.createElement("span",{className:"required"},"*")),a.createElement("div",{className:(0,r.W)(u.kcInputWrapperClass)},a.createElement("input",{type:"text",id:"userLabel",name:"userLabel",autoComplete:"off",className:(0,r.W)(u.kcInputClass),"aria-invalid":C.existsError("userLabel")}),C.existsError("userLabel")&&a.createElement("span",{id:"input-error-otp-label",className:(0,r.W)(u.kcInputErrorMessageClass),"aria-live":"polite"},C.get("userLabel")))),E?a.createElement(a.Fragment,null,a.createElement("input",{type:"submit",className:(0,r.W)(u.kcButtonClass,u.kcButtonPrimaryClass,u.kcButtonLargeClass),id:"saveTOTPBtn",value:b("doSubmit")}),a.createElement("button",{type:"submit",className:(0,r.W)(u.kcButtonClass,u.kcButtonDefaultClass,u.kcButtonLargeClass,u.kcButtonLargeClass),id:"cancelTOTPBtn",name:"cancel-aia",value:"true"},"$",y("doCancel"))):a.createElement("input",{type:"submit",className:(0,r.W)(u.kcButtonClass,u.kcButtonPrimaryClass,u.kcButtonLargeClass),id:"saveTOTPBtn",value:b("doSubmit")})))}))}));t.default=c}}]);
//# sourceMappingURL=114.cebb93ed.chunk.js.map