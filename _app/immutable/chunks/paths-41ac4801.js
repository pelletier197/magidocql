function A(){}const ht=t=>t;function mt(t,e){for(const n in e)t[n]=e[n];return t}function X(t){return t()}function W(){return Object.create(null)}function x(t){t.forEach(X)}function Y(t){return typeof t=="function"}function It(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let N;function Wt(t,e){return N||(N=document.createElement("a")),N.href=e,t===N.href}function pt(t){return Object.keys(t).length===0}function Z(t,...e){if(t==null)return A;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Jt(t){let e;return Z(t,n=>e=n)(),e}function Kt(t,e,n){t.$$.on_destroy.push(Z(e,n))}function Qt(t,e,n,i){if(t){const r=tt(t,e,n,i);return t[0](r)}}function tt(t,e,n,i){return t[1]&&i?mt(n.ctx.slice(),t[1](i(e))):n.ctx}function Ut(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],s=Math.max(e.dirty.length,r.length);for(let c=0;c<s;c+=1)o[c]=e.dirty[c]|r[c];return o}return e.dirty|r}return e.dirty}function Vt(t,e,n,i,r,o){if(r){const s=tt(e,n,i,o);t.p(s,r)}}function Xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Yt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Zt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function te(t){const e={};for(const n in t)e[n]=!0;return e}function ee(t,e,n){return t.set(n),e}const et=typeof window<"u";let gt=et?()=>window.performance.now():()=>Date.now(),F=et?t=>requestAnimationFrame(t):A;const b=new Set;function nt(t){b.forEach(e=>{e.c(t)||(b.delete(e),e.f())}),b.size!==0&&F(nt)}function yt(t){let e;return b.size===0&&F(nt),{promise:new Promise(n=>{b.add(e={c:t,f:n})}),abort(){b.delete(e)}}}let L=!1;function bt(){L=!0}function xt(){L=!1}function $t(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function wt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let a=0;a<e.length;a++){const _=e[a];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const a=e[l].claim_order,_=(r>0&&e[n[r]].claim_order<=a?r+1:$t(1,r,u=>e[n[u]].claim_order,a))-1;i[l]=n[_]+1;const f=_+1;n[f]=l,r=Math.max(f,r)}const o=[],s=[];let c=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(o.push(e[l-1]);c>=l;c--)s.push(e[c]);c--}for(;c>=0;c--)s.push(e[c]);o.reverse(),s.sort((l,a)=>l.claim_order-a.claim_order);for(let l=0,a=0;l<s.length;l++){for(;a<o.length&&s[l].claim_order>=o[a].claim_order;)a++;const _=a<o.length?o[a]:null;t.insertBefore(s[l],_)}}function vt(t,e){t.appendChild(e)}function it(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Et(t){const e=G("style");return kt(it(t),e),e.sheet}function kt(t,e){vt(t.head||t,e)}function At(t,e){if(L){for(wt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Tt(t,e,n){t.insertBefore(e,n||null)}function Nt(t,e,n){L&&!n?At(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function M(t){t.parentNode.removeChild(t)}function ne(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function G(t){return document.createElement(t)}function st(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function I(t){return document.createTextNode(t)}function ie(){return I(" ")}function se(){return I("")}function re(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function le(t){return function(e){return e.preventDefault(),t.call(this,e)}}function oe(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function rt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ce(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:rt(t,i,e[i])}function ae(t,e){for(const n in e)rt(t,n,e[n])}function St(t){return Array.from(t.childNodes)}function lt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ot(t,e,n,i,r=!1){lt(t);const o=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),c}}for(let s=t.claim_info.last_index-1;s>=0;s--){const c=t[s];if(e(c)){const l=n(c);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,c}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function ct(t,e,n,i){return ot(t,r=>r.nodeName===e,r=>{const o=[];for(let s=0;s<r.attributes.length;s++){const c=r.attributes[s];n[c.name]||o.push(c.name)}o.forEach(s=>r.removeAttribute(s))},()=>i(e))}function ue(t,e,n){return ct(t,e,n,G)}function fe(t,e,n){return ct(t,e,n,st)}function Ct(t,e){return ot(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>I(e),!0)}function _e(t){return Ct(t," ")}function J(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function de(t,e){const n=J(t,"HTML_TAG_START",0),i=J(t,"HTML_TAG_END",n);if(n===i)return new K(void 0,e);lt(t);const r=t.splice(n,i-n+1);M(r[0]),M(r[r.length-1]);const o=r.slice(1,r.length-1);for(const s of o)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new K(o,e)}function he(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function me(t,e){t.value=e==null?"":e}function pe(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ge(t,e,n){t.classList[n?"add":"remove"](e)}function at(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ye(t,e=document.body){return Array.from(e.querySelectorAll(t))}class jt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=st(n.nodeName):this.e=G(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Tt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(M)}}class K extends jt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Nt(this.t,this.n[n],e)}}const D=new Map;let P=0;function Mt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Dt(t,e){const n={stylesheet:Et(e),rules:{}};return D.set(t,n),n}function Q(t,e,n,i,r,o,s,c=0){const l=16.666/i;let a=`{
`;for(let p=0;p<=1;p+=l){const y=e+(n-e)*o(p);a+=p*100+`%{${s(y,1-y)}}
`}const _=a+`100% {${s(n,1-n)}}
}`,f=`__svelte_${Mt(_)}_${c}`,u=it(t),{stylesheet:d,rules:h}=D.get(u)||Dt(u,t);h[f]||(h[f]=!0,d.insertRule(`@keyframes ${f} ${_}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${i}ms linear ${r}ms 1 both`,P+=1,f}function Pt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),P-=r,P||Ht())}function Ht(){F(()=>{P||(D.forEach(t=>{const{stylesheet:e}=t;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.rules={}}),D.clear())})}let k;function E(t){k=t}function $(){if(!k)throw new Error("Function called outside component initialization");return k}function be(t){$().$$.on_mount.push(t)}function xe(t){$().$$.after_update.push(t)}function $e(t){$().$$.on_destroy.push(t)}function we(){const t=$();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=at(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,o)}),!o.defaultPrevented}return!0}}function ve(t,e){return $().$$.context.set(t,e),e}function Ee(t){return $().$$.context.get(t)}function ke(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const v=[],U=[],C=[],B=[],ut=Promise.resolve();let z=!1;function ft(){z||(z=!0,ut.then(_t))}function Ae(){return ft(),ut}function H(t){C.push(t)}function Te(t){B.push(t)}const R=new Set;let S=0;function _t(){const t=k;do{for(;S<v.length;){const e=v[S];S++,E(e),Lt(e.$$)}for(E(null),v.length=0,S=0;U.length;)U.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];R.has(n)||(R.add(n),n())}C.length=0}while(v.length);for(;B.length;)B.pop()();z=!1,R.clear(),E(t)}function Lt(t){if(t.fragment!==null){t.update(),x(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let w;function Ot(){return w||(w=Promise.resolve(),w.then(()=>{w=null})),w}function q(t,e,n){t.dispatchEvent(at(`${e?"intro":"outro"}${n}`))}const j=new Set;let m;function Ne(){m={r:0,c:[],p:m}}function Se(){m.r||x(m.c),m=m.p}function Rt(t,e){t&&t.i&&(j.delete(t),t.i(e))}function Ce(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),m.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const qt={duration:0};function je(t,e,n,i){let r=e(t,n),o=i?0:1,s=null,c=null,l=null;function a(){l&&Pt(t,l)}function _(u,d){const h=u.b-o;return d*=Math.abs(h),{a:o,b:u.b,d:h,duration:d,start:u.start,end:u.start+d,group:u.group}}function f(u){const{delay:d=0,duration:h=300,easing:g=ht,tick:p=A,css:y}=r||qt,O={start:gt()+d,b:u};u||(O.group=m,m.r+=1),s||c?c=O:(y&&(a(),l=Q(t,o,u,h,d,g,y)),u&&p(0,1),s=_(O,h),H(()=>q(t,u,"start")),yt(T=>{if(c&&T>c.start&&(s=_(c,h),c=null,q(t,s.b,"start"),y&&(a(),l=Q(t,o,s.b,s.duration,0,g,r.css))),s){if(T>=s.end)p(o=s.b,1-o),q(t,s.b,"end"),c||(s.b?a():--s.group.r||x(s.group.c)),s=null;else if(T>=s.start){const dt=T-s.start;o=s.a+s.d*g(dt/s.duration),p(o,1-o)}}return!!(s||c)}))}return{run(u){Y(r)?Ot().then(()=>{r=r(),f(u)}):f(u)},end(){a(),s=c=null}}}const Me=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function De(t,e){const n={},i={},r={$$scope:1};let o=t.length;for(;o--;){const s=t[o],c=e[o];if(c){for(const l in s)l in c||(i[l]=1);for(const l in c)r[l]||(n[l]=c[l],r[l]=1);t[o]=c}else for(const l in s)r[l]=1}for(const s in i)s in n||(n[s]=void 0);return n}function Pe(t){return typeof t=="object"&&t!==null?t:{}}function He(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Le(t){t&&t.c()}function Oe(t,e){t&&t.l(e)}function Bt(t,e,n,i){const{fragment:r,on_mount:o,on_destroy:s,after_update:c}=t.$$;r&&r.m(e,n),i||H(()=>{const l=o.map(X).filter(Y);s?s.push(...l):x(l),t.$$.on_mount=[]}),c.forEach(H)}function zt(t,e){const n=t.$$;n.fragment!==null&&(x(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ft(t,e){t.$$.dirty[0]===-1&&(v.push(t),ft(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Re(t,e,n,i,r,o,s,c=[-1]){const l=k;E(t);const a=t.$$={fragment:null,ctx:null,props:o,update:A,not_equal:r,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:W(),dirty:c,skip_bound:!1,root:e.target||l.$$.root};s&&s(a.root);let _=!1;if(a.ctx=n?n(t,e.props||{},(f,u,...d)=>{const h=d.length?d[0]:u;return a.ctx&&r(a.ctx[f],a.ctx[f]=h)&&(!a.skip_bound&&a.bound[f]&&a.bound[f](h),_&&Ft(t,f)),u}):[],a.update(),_=!0,x(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){bt();const f=St(e.target);a.fragment&&a.fragment.l(f),f.forEach(M)}else a.fragment&&a.fragment.c();e.intro&&Rt(t.$$.fragment),Bt(t,e.target,e.anchor,e.customElement),xt(),_t()}E(l)}class qe{$destroy(){zt(this,1),this.$destroy=A}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!pt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}let V="",Gt="";function Be(t){V=t.base,Gt=t.assets||V}export{Te as $,Be as A,Gt as B,A as C,Z as D,x as E,Y as F,Qt as G,mt as H,ce as I,ge as J,Vt as K,Xt as L,Ut as M,De as N,Zt as O,Kt as P,Yt as Q,st as R,qe as S,fe as T,ae as U,At as V,re as W,ke as X,U as Y,H as Z,He as _,ie as a,we as a0,me as a1,Pe as a2,oe as a3,je as a4,te as a5,ne as a6,Jt as a7,ee as a8,K as a9,de as aa,V as ab,ye as ac,$e as ad,Me as ae,Wt as af,Ee as ag,ve as ah,le as ai,Nt as b,_e as c,Se as d,se as e,Rt as f,Ne as g,M as h,Re as i,xe as j,G as k,ue as l,St as m,rt as n,be as o,pe as p,I as q,Ct as r,It as s,Ce as t,he as u,Le as v,Oe as w,Bt as x,zt as y,Ae as z};