if(!self.define){let e,i={};const s=(s,a)=>(s=new URL(s+".js",a).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,d)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let c={};const l=e=>s(e,r),t={module:{uri:r},exports:c,require:l};i[r]=Promise.all(a.map((e=>t[e]||l(e)))).then((e=>(d(...e),c)))}}define(["./workbox-afb8f5db"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"about/index.html",revision:"b5ff91f21799d844a5b455bfce7668ab"},{url:"archives/2020/05/index.html",revision:"ca63701d2aa4611b514bd6792081d464"},{url:"archives/2020/09/index.html",revision:"d97bda56fe297ad93c2b78fbd7ae506a"},{url:"archives/2020/index.html",revision:"449eaebb7dacc6a81b4cc83d11571a78"},{url:"archives/2022/02/index.html",revision:"96348c0a1b683af2b3e9fa2efb1d6cda"},{url:"archives/2022/11/index.html",revision:"d2abb640055af30c2d8a5828ce75408c"},{url:"archives/2022/index.html",revision:"c167a11c7823904539ad5b824ef7c05e"},{url:"archives/2023/08/index.html",revision:"584872b9f6324e4bfec1dc564d082c8d"},{url:"archives/2023/index.html",revision:"8212622aa421f87f9a4d744919e2d1f3"},{url:"archives/index.html",revision:"5f8fea0065f4a0292de614b77f47cb56"},{url:"categories/index.html",revision:"7c4d804333da399e97eeb2ae9102daf3"},{url:"css/insight.css",revision:"843218d1ea4e6ffe1cd9579adc3151ed"},{url:"css/style.css",revision:"0879b58daad0f8675e2e21d0319541a2"},{url:"gallery/index.html",revision:"9526d80550ed5a4ecbd26195b1f5f4e0"},{url:"googleceee8729d9b76e32.html",revision:"e05df00e90d9b8e1d63dd63a23bcfb05"},{url:"images/2022-11-22-GSM-alphabet.jpg",revision:"fb3baf47690d33463f7bb6666e72994d"},{url:"images/check.svg",revision:"187eebb73566f943f0ecfd69d719d9cd"},{url:"images/exclamation.svg",revision:"956144288533fd92a2f86a119a3489c6"},{url:"images/info.svg",revision:"855fb51e1d183211eca3f3383e46f0d4"},{url:"images/question.svg",revision:"3d7889573812152e2edbb4fd8d7fc6e6"},{url:"images/quote-left.svg",revision:"a2015d7d8325ae4924bdfea582bef687"},{url:"images/test_results/lighthouse_accessibility.svg",revision:"ad7da920d3ca4757322db6bab4764c64"},{url:"images/test_results/lighthouse_best-practices.svg",revision:"beacc832180345038c30a8e5a45879a4"},{url:"images/test_results/lighthouse_performance.svg",revision:"a0387ecd2a5b8dbe957d6263ac4424ea"},{url:"images/test_results/lighthouse_pwa.svg",revision:"196e6da51d3a1da67aff85a242a202fa"},{url:"images/test_results/lighthouse_seo.svg",revision:"5a0a3fa5b510e238ad91e022d389bcd2"},{url:"index.html",revision:"c6cd3dc9569cc2607b633178dfe48b87"},{url:"js/insight.js",revision:"17eafb6bba4b66084e667c762a7f231e"},{url:"js/script.js",revision:"c5672a326a446dc60e35f05133525146"},{url:"posts/2020-05-27.html",revision:"bc4cd5b7a0efd035e561690a2dfcce00"},{url:"posts/2020-09-04.html",revision:"5a56746c7ce3cf3589c6ac7920f08eff"},{url:"posts/2022-02-10.html",revision:"51d365b18200e9c0c9e8fe26f16d43c5"},{url:"posts/2022-11-22.html",revision:"3f2f388f66b52b5a59133746df9ebf92"},{url:"posts/2023-08-27.html",revision:"d9255a8509b2e567196ac3c7d519b7ba"},{url:"posts/2023-08-29.html",revision:"216fc01642c8551e5ff8ccf726125d86"},{url:"tags/Hexo/index.html",revision:"d584ef43e196e9797290f72ce15ba886"},{url:"tags/index.html",revision:"2aaaa4609b497e844aa617e4d897477a"},{url:"tags/miui/index.html",revision:"a814d75ff444e1a6ed966e6a290d93b3"},{url:"tags/Obsidian/index.html",revision:"a2007d1fa271d6fbb2fe88a0827dd181"},{url:"tags/Omnivore/index.html",revision:"b7c4bb0d5ca8792402baab1491d7dd8c"},{url:"tags/数码/index.html",revision:"e59991f86247fa04bd86eaa1fd6c8a27"},{url:"tags/流媒体/index.html",revision:"fc717a263a106205081c8096e731f764"},{url:"tags/知识管理/index.html",revision:"3a4875809b4cb51946bb808dd943666a"},{url:"tags/笔电/index.html",revision:"6dcce20c670d156bb9a8c9ab477915f5"},{url:"tags/静态博客/index.html",revision:"a2bc4c6a6626f1e1d97e84f2e4f969b1"}],{})}));
//# sourceMappingURL=service-worker.js.map
