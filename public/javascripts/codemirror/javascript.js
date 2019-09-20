!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){var n,a,i=t.indentUnit,o=r.statementIndent,c=r.jsonld,s=r.json||c,u=r.typescript,f=r.wordCharacters||/[\w$\xa1-\uffff]/,l=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("keyword d"),i=e("operator"),o={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:a,break:a,continue:a,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:i,typeof:i,instanceof:i,true:o,false:o,null:o,undefined:o,NaN:o,Infinity:o,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),d=/[+\-*&%=<>!?|~^@]/,p=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function m(e,t,r){return n=e,a=r,t}function v(e,t){var r,n=e.next();if('"'==n||"'"==n)return t.tokenize=(r=n,function(e,t){var n,a=!1;if(c&&"@"==e.peek()&&e.match(p))return t.tokenize=v,m("jsonld-keyword","meta");for(;null!=(n=e.next())&&(n!=r||a);)a=!a&&"\\"==n;return a||(t.tokenize=v),m("string","string")}),t.tokenize(e,t);if("."==n&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return m("number","number");if("."==n&&e.match(".."))return m("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(n))return m(n);if("="==n&&e.eat(">"))return m("=>","operator");if("0"==n&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return m("number","number");if(/\d/.test(n))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),m("number","number");if("/"==n)return e.eat("*")?(t.tokenize=k,k(e,t)):e.eat("/")?(e.skipToEnd(),m("comment","comment")):Le(e,t,1)?(function(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),m("regexp","string-2")):(e.eat("="),m("operator","operator",e.current()));if("`"==n)return t.tokenize=y,y(e,t);if("#"==n)return e.skipToEnd(),m("error","error");if(d.test(n))return">"==n&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=n&&"="!=n||e.eat("="):/[<>*+\-]/.test(n)&&(e.eat(n),">"==n&&e.eat(n))),m("operator","operator",e.current());if(f.test(n)){e.eatWhile(f);var a=e.current();if("."!=t.lastType){if(l.propertyIsEnumerable(a)){var i=l[a];return m(i.type,i.style,a)}if("async"==a&&e.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/,!1))return m("async","keyword",a)}return m("variable","variable",a)}}function k(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=v;break}n="*"==r}return m("comment","comment")}function y(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=v;break}n=!n&&"\\"==r}return m("quasi","string-2",e.current())}var w="([{}])";function b(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(u){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,i=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),s=w.indexOf(c);if(s>=0&&s<3){if(!a){++o;break}if(0==--a){"("==c&&(i=!0);break}}else if(s>=3&&s<6)++a;else if(f.test(c))i=!0;else if(/["'\/`]/.test(c))for(;;--o){if(0==o)return;if(e.string.charAt(o-1)==c&&"\\"!=e.string.charAt(o-2)){o--;break}}else if(i&&!a){++o;break}}i&&!a&&(t.fatArrowAt=o)}}var x={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,"jsonld-keyword":!0};function h(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function g(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}var j={state:null,column:null,marked:null,cc:null};function M(){for(var e=arguments.length-1;e>=0;e--)j.cc.push(arguments[e])}function A(){return M.apply(null,arguments),!0}function V(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function E(e){var t=j.state;if(j.marked="def",t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=function e(t,r){if(r){if(r.block){var n=e(t,r.prev);return n?n==r.prev?r:new I(n,r.vars,!0):null}return V(t,r.vars)?r:new I(r.prev,new T(t,r.vars),!1)}return null}(e,t.context);if(null!=n)return void(t.context=n)}else if(!V(e,t.localVars))return void(t.localVars=new T(e,t.localVars));r.globalVars&&!V(e,t.globalVars)&&(t.globalVars=new T(e,t.globalVars))}function z(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function I(e,t,r){this.prev=e,this.vars=t,this.block=r}function T(e,t){this.name=e,this.next=t}var $=new T("this",new T("arguments",null));function C(){j.state.context=new I(j.state.context,j.state.localVars,!1),j.state.localVars=$}function _(){j.state.context=new I(j.state.context,j.state.localVars,!0),j.state.localVars=null}function O(){j.state.localVars=j.state.context.vars,j.state.context=j.state.context.prev}function q(e,t){var r=function(){var r=j.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new h(n,j.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function P(){var e=j.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function S(e){return function t(r){return r==e?A():";"==e||"}"==r||")"==r||"]"==r?M():A(t)}}function N(e,t){return"var"==e?A(q("vardef",t),be,S(";"),P):"keyword a"==e?A(q("form"),H,N,P):"keyword b"==e?A(q("form"),N,P):"keyword d"==e?j.stream.match(/^\s*$/,!1)?A():A(q("stat"),D,S(";"),P):"debugger"==e?A(S(";")):"{"==e?A(q("}"),_,oe,P,O):";"==e?A():"if"==e?("else"==j.state.lexical.info&&j.state.cc[j.state.cc.length-1]==P&&j.state.cc.pop()(),A(q("form"),H,N,P,Ae)):"function"==e?A(Ie):"for"==e?A(q("form"),Ve,N,P):"class"==e||u&&"interface"==t?(j.marked="keyword",A(q("form","class"==e?e:t),Oe,P)):"variable"==e?u&&"declare"==t?(j.marked="keyword",A(N)):u&&("module"==t||"enum"==t||"type"==t)&&j.stream.match(/^\s*\w/,!1)?(j.marked="keyword","enum"==t?A(Je):"type"==t?A($e,S("operator"),le,S(";")):A(q("form"),xe,S("{"),q("}"),oe,P,P)):u&&"namespace"==t?(j.marked="keyword",A(q("form"),B,N,P)):u&&"abstract"==t?(j.marked="keyword",A(N)):A(q("stat"),Z):"switch"==e?A(q("form"),H,S("{"),q("}","switch"),_,oe,P,P,O):"case"==e?A(B,S(":")):"default"==e?A(S(":")):"catch"==e?A(q("form"),C,U,N,P,O):"export"==e?A(q("stat"),Ne,P):"import"==e?A(q("stat"),Be,P):"async"==e?A(N):"@"==t?A(B,N):M(q("stat"),B,S(";"),P)}function U(e){if("("==e)return A(Ce,S(")"))}function B(e,t){return W(e,t,!1)}function F(e,t){return W(e,t,!0)}function H(e){return"("!=e?M():A(q(")"),B,S(")"),P)}function W(e,t,r){if(j.state.fatArrowAt==j.stream.start){var n=r?R:Q;if("("==e)return A(C,q(")"),ae(Ce,")"),P,S("=>"),n,O);if("variable"==e)return M(C,xe,S("=>"),n,O)}var a=r?J:G;return x.hasOwnProperty(e)?A(a):"function"==e?A(Ie,a):"class"==e||u&&"interface"==t?(j.marked="keyword",A(q("form"),_e,P)):"keyword c"==e||"async"==e?A(r?F:B):"("==e?A(q(")"),D,S(")"),P,a):"operator"==e||"spread"==e?A(r?F:B):"["==e?A(q("]"),Ge,P,a):"{"==e?ie(te,"}",null,a):"quasi"==e?M(K,a):"new"==e?A(function(e){return function(t){return"."==t?A(e?Y:X):"variable"==t&&u?A(ke,e?J:G):M(e?F:B)}}(r)):"import"==e?A(B):A()}function D(e){return e.match(/[;\}\)\],]/)?M():M(B)}function G(e,t){return","==e?A(B):J(e,t,!1)}function J(e,t,r){var n=0==r?G:J,a=0==r?B:F;return"=>"==e?A(C,r?R:Q,O):"operator"==e?/\+\+|--/.test(t)||u&&"!"==t?A(n):u&&"<"==t&&j.stream.match(/^([^>]|<.*?>)*>\s*\(/,!1)?A(q(">"),ae(le,">"),P,n):"?"==t?A(B,S(":"),a):A(a):"quasi"==e?M(K,n):";"!=e?"("==e?ie(F,")","call",n):"."==e?A(ee,n):"["==e?A(q("]"),D,S("]"),P,n):u&&"as"==t?(j.marked="keyword",A(le,n)):"regexp"==e?(j.state.lastType=j.marked="operator",j.stream.backUp(j.stream.pos-j.stream.start-1),A(a)):void 0:void 0}function K(e,t){return"quasi"!=e?M():"${"!=t.slice(t.length-2)?A(K):A(B,L)}function L(e){if("}"==e)return j.marked="string-2",j.state.tokenize=y,A(K)}function Q(e){return b(j.stream,j.state),M("{"==e?N:B)}function R(e){return b(j.stream,j.state),M("{"==e?N:F)}function X(e,t){if("target"==t)return j.marked="keyword",A(G)}function Y(e,t){if("target"==t)return j.marked="keyword",A(J)}function Z(e){return":"==e?A(P,N):M(G,S(";"),P)}function ee(e){if("variable"==e)return j.marked="property",A()}function te(e,t){return"async"==e?(j.marked="property",A(te)):"variable"==e||"keyword"==j.style?(j.marked="property","get"==t||"set"==t?A(re):(u&&j.state.fatArrowAt==j.stream.start&&(r=j.stream.match(/^\s*:\s*/,!1))&&(j.state.fatArrowAt=j.stream.pos+r[0].length),A(ne))):"number"==e||"string"==e?(j.marked=c?"property":j.style+" property",A(ne)):"jsonld-keyword"==e?A(ne):u&&z(t)?(j.marked="keyword",A(te)):"["==e?A(B,ce,S("]"),ne):"spread"==e?A(F,ne):"*"==t?(j.marked="keyword",A(te)):":"==e?M(ne):void 0;var r}function re(e){return"variable"!=e?M(ne):(j.marked="property",A(Ie))}function ne(e){return":"==e?A(F):"("==e?M(Ie):void 0}function ae(e,t,r){function n(a,i){if(r?r.indexOf(a)>-1:","==a){var o=j.state.lexical;return"call"==o.info&&(o.pos=(o.pos||0)+1),A(function(r,n){return r==t||n==t?M():M(e)},n)}return a==t||i==t?A():r&&r.indexOf(";")>-1?M(e):A(S(t))}return function(r,a){return r==t||a==t?A():M(e,n)}}function ie(e,t,r){for(var n=3;n<arguments.length;n++)j.cc.push(arguments[n]);return A(q(t,r),ae(e,t),P)}function oe(e){return"}"==e?A():M(N,oe)}function ce(e,t){if(u){if(":"==e)return A(le);if("?"==t)return A(ce)}}function se(e,t){if(u&&(":"==e||"in"==t))return A(le)}function ue(e){if(u&&":"==e)return j.stream.match(/^\s*\w+\s+is\b/,!1)?A(B,fe,le):A(le)}function fe(e,t){if("is"==t)return j.marked="keyword",A()}function le(e,t){return"keyof"==t||"typeof"==t||"infer"==t?(j.marked="keyword",A("typeof"==t?F:le)):"variable"==e||"void"==t?(j.marked="type",A(ve)):"|"==t||"&"==t?A(le):"string"==e||"number"==e||"atom"==e?A(ve):"["==e?A(q("]"),ae(le,"]",","),P,ve):"{"==e?A(q("}"),ae(pe,"}",",;"),P,ve):"("==e?A(ae(me,")"),de,ve):"<"==e?A(ae(le,">"),le):void 0}function de(e){if("=>"==e)return A(le)}function pe(e,t){return"variable"==e||"keyword"==j.style?(j.marked="property",A(pe)):"?"==t||"number"==e||"string"==e?A(pe):":"==e?A(le):"["==e?A(S("variable"),se,S("]"),pe):"("==e?M(Te,pe):void 0}function me(e,t){return"variable"==e&&j.stream.match(/^\s*[?:]/,!1)||"?"==t?A(me):":"==e?A(le):"spread"==e?A(me):M(le)}function ve(e,t){return"<"==t?A(q(">"),ae(le,">"),P,ve):"|"==t||"."==e||"&"==t?A(le):"["==e?A(le,S("]"),ve):"extends"==t||"implements"==t?(j.marked="keyword",A(le)):"?"==t?A(le,S(":"),le):void 0}function ke(e,t){if("<"==t)return A(q(">"),ae(le,">"),P,ve)}function ye(){return M(le,we)}function we(e,t){if("="==t)return A(le)}function be(e,t){return"enum"==t?(j.marked="keyword",A(Je)):M(xe,ce,je,Me)}function xe(e,t){return u&&z(t)?(j.marked="keyword",A(xe)):"variable"==e?(E(t),A()):"spread"==e?A(xe):"["==e?ie(ge,"]"):"{"==e?ie(he,"}"):void 0}function he(e,t){return"variable"!=e||j.stream.match(/^\s*:/,!1)?("variable"==e&&(j.marked="property"),"spread"==e?A(xe):"}"==e?M():"["==e?A(B,S("]"),S(":"),he):A(S(":"),xe,je)):(E(t),A(je))}function ge(){return M(xe,je)}function je(e,t){if("="==t)return A(F)}function Me(e){if(","==e)return A(be)}function Ae(e,t){if("keyword b"==e&&"else"==t)return A(q("form","else"),N,P)}function Ve(e,t){return"await"==t?A(Ve):"("==e?A(q(")"),Ee,P):void 0}function Ee(e){return"var"==e?A(be,ze):"variable"==e?A(ze):M(ze)}function ze(e,t){return")"==e?A():";"==e?A(ze):"in"==t||"of"==t?(j.marked="keyword",A(B,ze)):M(B,ze)}function Ie(e,t){return"*"==t?(j.marked="keyword",A(Ie)):"variable"==e?(E(t),A(Ie)):"("==e?A(C,q(")"),ae(Ce,")"),P,ue,N,O):u&&"<"==t?A(q(">"),ae(ye,">"),P,Ie):void 0}function Te(e,t){return"*"==t?(j.marked="keyword",A(Te)):"variable"==e?(E(t),A(Te)):"("==e?A(C,q(")"),ae(Ce,")"),P,ue,O):u&&"<"==t?A(q(">"),ae(ye,">"),P,Te):void 0}function $e(e,t){return"keyword"==e||"variable"==e?(j.marked="type",A($e)):"<"==t?A(q(">"),ae(ye,">"),P):void 0}function Ce(e,t){return"@"==t&&A(B,Ce),"spread"==e?A(Ce):u&&z(t)?(j.marked="keyword",A(Ce)):u&&"this"==e?A(ce,je):M(xe,ce,je)}function _e(e,t){return"variable"==e?Oe(e,t):qe(e,t)}function Oe(e,t){if("variable"==e)return E(t),A(qe)}function qe(e,t){return"<"==t?A(q(">"),ae(ye,">"),P,qe):"extends"==t||"implements"==t||u&&","==e?("implements"==t&&(j.marked="keyword"),A(u?le:B,qe)):"{"==e?A(q("}"),Pe,P):void 0}function Pe(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||u&&z(t))&&j.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(j.marked="keyword",A(Pe)):"variable"==e||"keyword"==j.style?(j.marked="property",A(u?Se:Ie,Pe)):"number"==e||"string"==e?A(u?Se:Ie,Pe):"["==e?A(B,ce,S("]"),u?Se:Ie,Pe):"*"==t?(j.marked="keyword",A(Pe)):u&&"("==e?M(Te,Pe):";"==e||","==e?A(Pe):"}"==e?A():"@"==t?A(B,Pe):void 0}function Se(e,t){if("?"==t)return A(Se);if(":"==e)return A(le,je);if("="==t)return A(F);var r=j.state.lexical.prev;return M(r&&"interface"==r.info?Te:Ie)}function Ne(e,t){return"*"==t?(j.marked="keyword",A(De,S(";"))):"default"==t?(j.marked="keyword",A(B,S(";"))):"{"==e?A(ae(Ue,"}"),De,S(";")):M(N)}function Ue(e,t){return"as"==t?(j.marked="keyword",A(S("variable"))):"variable"==e?M(F,Ue):void 0}function Be(e){return"string"==e?A():"("==e?M(B):M(Fe,He,De)}function Fe(e,t){return"{"==e?ie(Fe,"}"):("variable"==e&&E(t),"*"==t&&(j.marked="keyword"),A(We))}function He(e){if(","==e)return A(Fe,He)}function We(e,t){if("as"==t)return j.marked="keyword",A(Fe)}function De(e,t){if("from"==t)return j.marked="keyword",A(B)}function Ge(e){return"]"==e?A():M(ae(F,"]"))}function Je(){return M(q("form"),xe,S("{"),q("}"),ae(Ke,"}"),P,P)}function Ke(){return M(xe,je)}function Le(e,t,r){return t.tokenize==v&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return O.lex=!0,P.lex=!0,{startState:function(e){var t={tokenize:v,lastType:"sof",cc:[],lexical:new h((e||0)-i,0,"block",!1),localVars:r.localVars,context:r.localVars&&new I(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),b(e,t)),t.tokenize!=k&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==n?r:(t.lastType="operator"!=n||"++"!=a&&"--"!=a?n:"incdec",function(e,t,r,n,a){var i=e.cc;for(j.state=e,j.stream=a,j.marked=null,j.cc=i,j.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((i.length?i.pop():s?B:N)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return j.marked?j.marked:"variable"==r&&g(e,n)?"variable-2":t}}(t,r,n,a,e))},indent:function(t,n){if(t.tokenize==k)return e.Pass;if(t.tokenize!=v)return 0;var a,c=n&&n.charAt(0),s=t.lexical;if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var f=t.cc[u];if(f==P)s=s.prev;else if(f!=Ae)break}for(;("stat"==s.type||"form"==s.type)&&("}"==c||(a=t.cc[t.cc.length-1])&&(a==G||a==J)&&!/^[,\.=+\-*:?[\(]/.test(n));)s=s.prev;o&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev);var l=s.type,p=c==l;return"vardef"==l?s.indented+("operator"==t.lastType||","==t.lastType?s.info.length+1:0):"form"==l&&"{"==c?s.indented:"form"==l?s.indented+i:"stat"==l?s.indented+(function(e,t){return"operator"==e.lastType||","==e.lastType||d.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}(t,n)?o||i:0):"switch"!=s.info||p||0==r.doubleIndentSwitch?s.align?s.column+(p?0:1):s.indented+(p?0:i):s.indented+(/^(?:case|default)\b/.test(n)?i:2*i)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:s?null:"/*",blockCommentEnd:s?null:"*/",blockCommentContinue:s?null:" * ",lineComment:s?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:s?"json":"javascript",jsonldMode:c,jsonMode:s,expressionAllowed:Le,skipExpression:function(e){var t=e.cc[e.cc.length-1];t!=B&&t!=F||e.cc.pop()}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});
