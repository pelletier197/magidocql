import{S as h,i as P,s as w,a as u,v as d,ac as q,h as f,c,w as _,b as $,x as g,f as v,t as y,y as Q}from"../../../../chunks/paths-41ac4801.js";import{F as x,Q as E}from"../../../../chunks/FieldDetails-56f7095d.js";import{P as F}from"../../../../chunks/PreviousNextPage-4907c97f.js";import"../../../../chunks/index-085493d0.js";import"../../../../chunks/_commonjsHelpers-8cd52b67.js";import"../../../../chunks/definition-bc5da332.js";import"../../../../chunks/variables-d68cab06.js";import"../../../../chunks/prism-json-f6ca42ec.js";import"../../../../chunks/Button-713228c1.js";import"../../../../chunks/ArgsList-3c616263.js";import"../../../../chunks/ChevronDown-d2a6bc43.js";function S(r){let s,o,t,n,i,m;return document.title=s="Query - "+r[0].field.name,t=new x({props:{field:r[0].field,type:E.QUERY}}),i=new F({props:{page:r[0].page}}),{c(){o=u(),d(t.$$.fragment),n=u(),d(i.$$.fragment)},l(e){q('[data-svelte="svelte-19yffit"]',document.head).forEach(f),o=c(e),_(t.$$.fragment,e),n=c(e),_(i.$$.fragment,e)},m(e,a){$(e,o,a),g(t,e,a),$(e,n,a),g(i,e,a),m=!0},p(e,[a]){(!m||a&1)&&s!==(s="Query - "+e[0].field.name)&&(document.title=s);const p={};a&1&&(p.field=e[0].field),t.$set(p);const l={};a&1&&(l.page=e[0].page),i.$set(l)},i(e){m||(v(t.$$.fragment,e),v(i.$$.fragment,e),m=!0)},o(e){y(t.$$.fragment,e),y(i.$$.fragment,e),m=!1},d(e){e&&f(o),Q(t,e),e&&f(n),Q(i,e)}}}function b(r,s,o){let{data:t}=s;return r.$$set=n=>{"data"in n&&o(0,t=n.data)},[t]}class B extends h{constructor(s){super(),P(this,s,b,S,w,{data:0})}}export{B as default};