import{f as a,D as p,E as n}from"./model-2f9aba25.js";import{f}from"./pages-302c16a3.js";import{e as y}from"./index-dc735eee.js";const g=!a(),m=({params:t,url:r})=>{const e=p(t.type),s=n(e),o=f(r.pathname);if(!e||!o)throw y(404,`Type ${t.type} not found.`);return{type:e,usages:s,page:o}},d=Object.freeze(Object.defineProperty({__proto__:null,prerender:g,load:m},Symbol.toStringTag,{value:"Module"}));export{d as _,m as l,g as p};