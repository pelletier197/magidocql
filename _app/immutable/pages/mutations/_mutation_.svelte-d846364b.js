import{S as M,i as P,s as T,k as p,w as d,a4 as q,d as m,m as c,x as g,g as _,y as $,q as y,o as v,B as h}from"../../chunks/index-6b1b561b.js";import{F as w,Q as B}from"../../chunks/FieldDetails-9ea9268d.js";import{f as F}from"../../chunks/pages-37089f3b.js";import{P as x}from"../../chunks/PreviousNextPage-799072ea.js";import"../../chunks/paths-da16296a.js";import"../../chunks/ChevronDown-d88c769f.js";import"../../chunks/ArgsList-277c769f.js";function D(r){let n,s,a,i,t,f;return document.title=n="Mutation - "+r[0].name,a=new w({props:{field:r[0],type:B.MUTATION}}),t=new x({props:{page:r[1]}}),{c(){s=p(),d(a.$$.fragment),i=p(),d(t.$$.fragment)},l(e){q('[data-svelte="svelte-1m825ru"]',document.head).forEach(m),s=c(e),g(a.$$.fragment,e),i=c(e),g(t.$$.fragment,e)},m(e,o){_(e,s,o),$(a,e,o),_(e,i,o),$(t,e,o),f=!0},p(e,[o]){(!f||o&1)&&n!==(n="Mutation - "+e[0].name)&&(document.title=n);const u={};o&1&&(u.field=e[0]),a.$set(u);const l={};o&2&&(l.page=e[1]),t.$set(l)},i(e){f||(y(a.$$.fragment,e),y(t.$$.fragment,e),f=!0)},o(e){v(a.$$.fragment,e),v(t.$$.fragment,e),f=!1},d(e){e&&m(s),h(a,e),e&&m(i),h(t,e)}}}function H({stuff:r,params:n,url:s}){var t,f;const a=(f=(t=r.schema)==null?void 0:t.getMutationType())==null?void 0:f.getFields()[n.mutation],i=F(s.pathname);return!a||!i?{status:404,error:`Mutation ${n.mutation} not found`}:{props:{field:a,page:i}}}function N(r,n,s){let{field:a}=n,{page:i}=n;return r.$$set=t=>{"field"in t&&s(0,a=t.field),"page"in t&&s(1,i=t.page)},[a,i]}class I extends M{constructor(n){super(),P(this,n,N,D,T,{field:0,page:1})}}export{I as default,H as load};