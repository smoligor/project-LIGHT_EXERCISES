import{a as lt}from"./assets/vendor-CB-nZM8b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const U=document.querySelector(".header"),y=document.querySelector(".header-menu-toggle"),we=window.matchMedia("(max-width: 767px)");if(U&&y){const e=U.querySelector(".header-navigation-list"),t=[...U.querySelectorAll(".header-navigation-link")],n=window.matchMedia("(prefers-reduced-motion: reduce)");let a;const r=window.location.pathname.endsWith("/")?`${window.location.pathname}index.html`:window.location.pathname;t.forEach(o=>{new URL(o.href).pathname===r&&o.setAttribute("aria-current","page")});const i=()=>{const o=e==null?void 0:e.querySelector('[aria-current="page"]');if(!o)return;const d=e.getBoundingClientRect(),l=o.getBoundingClientRect();e.style.setProperty("--active-link-offset",`${l.left-d.left}px`),e.style.setProperty("--active-link-width",`${l.width}px`)};i(),requestAnimationFrame(()=>e==null?void 0:e.classList.add("is-navigation-ready")),window.addEventListener("resize",i);const s=o=>{U.classList.toggle("is-menu-open",o),y.setAttribute("aria-expanded",String(o)),y.setAttribute("aria-label",o?"Close menu":"Open menu"),document.body.style.overflow=o?"hidden":""};y.addEventListener("click",()=>{s(y.getAttribute("aria-expanded")!=="true")}),t.forEach(o=>{o.addEventListener("click",()=>s(!1)),o.addEventListener("click",d=>{if(we.matches||n.matches)return;const l=e==null?void 0:e.querySelector('[aria-current="page"]');l!==o&&(d.preventDefault(),window.clearTimeout(a),l==null||l.removeAttribute("aria-current"),o.setAttribute("aria-current","page"),i(),a=window.setTimeout(()=>{window.location.assign(o.href)},250))})}),document.addEventListener("keydown",o=>{o.key==="Escape"&&y.getAttribute("aria-expanded")==="true"&&(s(!1),y.focus())}),we.addEventListener("change",o=>{o.matches||s(!1)})}const Oe="/project-LIGHT_EXERCISES/assets/sprite-BjJssYAe.svg",Q="energy-favorites",Fe="favorites:changed",He={FAVORITES:Q,QUOTE:"yourenergy:quote",QUOTE_DATE:"yourenergy:quote-date"},p={FILTER_CHANGED:"yourenergy:filter-changed",CATEGORY_SELECTED:"yourenergy:category-selected",SEARCH_SUBMITTED:"yourenergy:search-submitted",EXERCISE_OPEN:"exercise:open",FAVORITES_CHANGED:Fe},J={API_URL:"https://your-energy.b.goit.study/api/exercises/",FAVORITES_KEY:Q,FAVORITES_CHANGED_EVENT:Fe},W={CATEGORIES_DESKTOP:12,CATEGORIES_MOBILE:9,EXERCISES_DESKTOP:10,EXERCISES_MOBILE:8},Be=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,Pe=document.querySelectorAll(".filter-btn");function De(e){Pe.forEach(t=>{t.classList.remove("active"),t.setAttribute("aria-pressed","false")}),e.classList.add("active"),e.setAttribute("aria-pressed","true")}Pe.forEach(e=>{e.addEventListener("click",()=>{De(e),document.dispatchEvent(new CustomEvent(p.FILTER_CHANGED,{detail:{filter:e.dataset.filter}}))})});const Se=document.querySelector('.filter-btn[data-filter="Muscles"]');Se&&(De(Se),setTimeout(()=>{document.dispatchEvent(new CustomEvent(p.FILTER_CHANGED,{detail:{filter:"Muscles"}}))},0));const dt="https://your-energy.b.goit.study/api",B=lt.create({baseURL:dt,timeout:1e4});async function ut({filter:e,page:t=1,limit:n=12}){const{data:a}=await B.get("/filters",{params:{filter:e,page:t,limit:n}});return a}async function mt(e={}){const{page:t=1,limit:n=10,...a}=e,{data:r}=await B.get("/exercises",{params:{...a,page:t,limit:n}});return r}async function ft(e){const{data:t}=await B.get(`/exercises/${e}`);return t}async function pt(e,t){const{data:n}=await B.patch(`/exercises/${e}/rating`,t);return n}async function gt(){const{data:e}=await B.get("/quote");return e}let K=0;function Ue(){let e=document.querySelector(".js-loader");return e||(e=document.createElement("div"),e.className="js-loader loader",e.innerHTML='<div class="loader__spinner"></div>',e.style.display="none",document.body.appendChild(e)),e}function C(){K++,Ue().style.display="flex"}function T(){K=Math.max(0,K-1),K===0&&(Ue().style.display="none")}function ht(e,t){if(t<=4)return Array.from({length:t},(i,s)=>s+1);let n=Math.max(1,e-1),a=Math.min(t,n+2);n=Math.max(1,a-2);const r=[];n>1&&r.push("...");for(let i=n;i<=a;i++)r.push(i);return a<t&&r.push("..."),r}function ue({container:e,currentPage:t,totalPages:n,onPageChange:a}){if(!n||n<=1){e.innerHTML="";return}const r=t===1,i=t===n,s=ht(t,n);e.innerHTML=`
        <button class="pagination-nav-btn" type="button" data-action="first" ${r?"disabled":""} aria-label="First page">«</button>
        <button class="pagination-nav-btn" type="button" data-action="prev" ${r?"disabled":""} aria-label="Previous page">‹</button>
        ${s.map(o=>o==="..."?'<span class="pagination-ellipsis">...</span>':`<button class="pagination-btn ${o===t?"active":""}" type="button" data-page="${o}">${o}</button>`).join("")}
        <button class="pagination-nav-btn" type="button" data-action="next" ${i?"disabled":""} aria-label="Next page">›</button>
        <button class="pagination-nav-btn" type="button" data-action="last" ${i?"disabled":""} aria-label="Last page">»</button>
    `,e.querySelectorAll(".pagination-btn").forEach(o=>{o.addEventListener("click",()=>{const d=Number(o.dataset.page);d!==t&&a(d)})}),e.querySelectorAll(".pagination-nav-btn:not([disabled])").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.action;let l=t;d==="first"?l=1:d==="prev"?l=Math.max(1,t-1):d==="next"?l=Math.min(n,t+1):d==="last"&&(l=n),l!==t&&a(l)})})}const w=document.getElementById("categories-container"),F=document.querySelector(".categories-wrapper"),Le=document.querySelector(".exercises-wrapper"),Ae=document.getElementById("search-form"),x=document.getElementById("pagination-container"),M=document.getElementById("categories-status");let Ge="Muscles",H=1,N=0,Ke;const je=()=>window.innerWidth<768?W.CATEGORIES_MOBILE:W.CATEGORIES_DESKTOP;function oe(e){F.setAttribute("aria-busy",String(e)),x.classList.toggle("pagination--loading",e),x.inert=e}document.addEventListener(p.CATEGORY_SELECTED,()=>{N++,oe(!1),M.textContent="",x.innerHTML=""});document.addEventListener(p.FILTER_CHANGED,async e=>{Ge=e.detail.filter,H=1,Le&&Le.classList.add("visually-hidden"),F&&F.classList.remove("visually-hidden"),Ae&&Ae.classList.add("visually-hidden");const t=document.getElementById("category-slash"),n=document.getElementById("selected-category-name");t&&t.classList.add("visually-hidden"),n&&(n.textContent=""),await Z()});async function Z(){var r;const e=++N,t=Ge,n=H,a=je();Ke=a,oe(!0),M.textContent=`Loading ${t.toLowerCase()} categories.`,w.innerHTML=Array.from({length:a},()=>'<li class="category-item category-skeleton" aria-hidden="true"></li>').join("");try{C();const i=await ut({filter:t,page:n,limit:a});if(e!==N)return;if(!((r=i==null?void 0:i.results)!=null&&r.length)){w.innerHTML='<li class="categories-message no-results">No categories found.</li>',x.innerHTML="",M.textContent="No categories found.";return}yt(i.results),vt(i.totalPages),M.textContent=`${t} categories loaded. Page ${n}.`}catch{if(e!==N)return;x.innerHTML="",w.innerHTML=`
            <li class="categories-message">
                <p>Unable to load categories. Please try again.</p>
                <button class="categories-retry-btn" type="button">Retry</button>
            </li>
        `,w.querySelector(".categories-retry-btn").addEventListener("click",Z),M.textContent="Unable to load categories. Please try again."}finally{T(),e===N&&oe(!1)}}function yt(e){w.innerHTML=e.map(({filter:t,name:n,imgURL:a})=>{const r=re(n),i=re(t),s=Et(a);return`
            <li class="category-item">
                <button class="category-card-btn" data-filter="${i}" data-name="${r}">
                    ${s?`<img src="${re(s)}" alt="${r}" class="category-img" loading="lazy" decoding="async" />`:""}
                    <div class="category-content">
                        <h3 class="category-name">${r}</h3>
                        <p class="category-label">${i}</p>
                    </div>
                </button>
            </li>
        `}).join(""),w.querySelectorAll(".category-card-btn").forEach(t=>{t.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent(p.CATEGORY_SELECTED,{detail:{filter:t.dataset.filter,category:t.dataset.name}}))})})}function vt(e){ue({container:x,currentPage:H,totalPages:e,onPageChange:async t=>{H=t,await Z()}})}let xe;window.addEventListener("resize",()=>{clearTimeout(xe),xe=setTimeout(()=>{F&&!F.classList.contains("visually-hidden")&&je()!==Ke&&(H=1,Z())},300)});function re(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Et(e){try{const t=new URL(e);if(t.protocol==="https:"||t.protocol==="http:")return t.href}catch{return""}return""}function m(e){return`${Oe}#${e}`}const z=document.getElementById("exercises-container"),Ce=document.querySelector(".exercises-wrapper"),Te=document.querySelector(".categories-wrapper"),O=document.getElementById("search-form"),q=document.getElementById("search-input"),S=document.getElementById("search-clear-btn"),bt=document.getElementById("selected-category-name"),wt=document.getElementById("category-slash"),j=document.getElementById("pagination-container");let Ve="",ee="",te="",E=1,V=0;document.addEventListener(p.FILTER_CHANGED,()=>{V++,ee=""});const St=()=>window.innerWidth>=768?W.EXERCISES_DESKTOP:W.EXERCISES_MOBILE;document.addEventListener(p.CATEGORY_SELECTED,async e=>{const{filter:t,category:n}=e.detail;Ve=t,ee=n,E=1,te="",bt.textContent=n,wt.classList.remove("visually-hidden"),Te&&Te.classList.add("visually-hidden"),Ce&&Ce.classList.remove("visually-hidden"),O&&(O.classList.remove("visually-hidden"),O.reset(),S&&(S.hidden=!0)),await P()});async function P(){var t;const e=++V;j.innerHTML="";try{C();const n=Ve.toLowerCase().replace(/\s+/g,""),r={[n==="bodyparts"?"bodypart":n]:ee,keyword:te,page:E,limit:St()},i=await mt(r);if(e!==V)return;if(!((t=i==null?void 0:i.results)!=null&&t.length)){z.innerHTML='<li class="no-results">Sorry, no exercises found.</li>',j.innerHTML="";return}Lt(i.results),At(i.totalPages)}catch{if(e!==V)return;z.innerHTML='<li class="no-results">Something went wrong. Please try again.</li>',j.innerHTML=""}finally{T()}}function Lt(e){z.innerHTML=e.map(({_id:t,name:n,burnedCalories:a,bodyPart:r,target:i,rating:s})=>`
            <li class="exercise-card">
                <div class="ex-card-header">
                    <div class="ex-badge">WORKOUT</div>
                    <div class="ex-rating">
                        ${Number.isFinite(Number(s))?Number(s).toFixed(1):"0.0"}
                        <svg width="14" height="14" aria-hidden="true"><use href="${m("icon-star")}"></use></svg>
                    </div>
                    <button class="ex-start-btn" data-id="${I(t)}">
                        Start →
                    </button>
                </div>
                <h3 class="ex-title">
                    <span class="ex-icon-wrap">
                        <svg class="ex-icon" width="24" height="24" aria-hidden="true"><use href="${m("icon-run-circle")}"></use></svg>
                    </span>
                    ${I(n)}
                </h3>
                <div class="ex-info">
                    <p>Burned calories: <span>${I(a)} / 3 min</span></p>
                    <p>Body part: <span>${I(r)}</span></p>
                    <p>Target: <span>${I(i)}</span></p>
                </div>
            </li>
        `).join(""),z.querySelectorAll(".ex-start-btn").forEach(t=>{t.addEventListener("click",()=>{document.dispatchEvent(new CustomEvent(p.EXERCISE_OPEN,{detail:{id:t.dataset.id}}))})})}function At(e){ue({container:j,currentPage:E,totalPages:e,onPageChange:async t=>{E=t,await P()}})}let $e;window.addEventListener("resize",()=>{clearTimeout($e),$e=setTimeout(()=>{ee&&(E=1,P())},300)});q&&S&&(q.addEventListener("input",()=>{S.hidden=!q.value.trim()}),S.addEventListener("click",async()=>{q.value="",S.hidden=!0,te="",E=1,await P(),q.focus()}));O&&O.addEventListener("submit",async e=>{e.preventDefault(),te=e.target.elements.query.value.trim().toLowerCase(),E=1,await P()});function I(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const xt="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout_1-CY97zidK.png",Ct="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout@2x-Ci2PruCJ.png",Tt="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout-1_tab-DA5tgWW_.png",$t="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout-1_tab@2x-BzOtUpXX.png",qe="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout-1_mob-By5TfgcC.png",qt="/project-LIGHT_EXERCISES/assets/women-sportswear-taking-break-from-workout_1_mob@2x-ByRx5w-t.png";function Xe(){const e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${n}`}function It(){try{const e=localStorage.getItem(He.QUOTE);if(!e)return null;const t=JSON.parse(e);if((t==null?void 0:t.date)===Xe()&&t.quote)return t}catch{return null}return null}function Rt(e){localStorage.setItem(He.QUOTE,JSON.stringify({...e,date:Xe()}))}function _t(){const e=document.querySelector(".quote-wrapper");!e||e.innerHTML.trim()||(e.innerHTML=`
    <div class="quote-card">
      <div class="quote-card-top">
        <div class="quote-card-icon-wrap">
          <svg width="32" height="32" aria-hidden="true"><use href="${m("icon-quote-run")}"></use></svg>
        </div>
        <p class="quote-card-title">Quote of the day</p>
        <svg class="quote-mark" width="24" height="24" aria-hidden="true"><use href="${m("icon-quote")}"></use></svg>
      </div>
      <blockquote class="quote-text"></blockquote>
      <p class="quote-author"></p>
    </div>
    <div class="quote-photo-wrap">
      <picture>
        <source
          media="(min-width: 1280px)"
          srcset="${xt} 1x, ${Ct} 2x"
        />
        <source
          media="(min-width: 768px)"
          srcset="${Tt} 1x, ${$t} 2x"
        />
        <img
          src="${qe}"
          srcset="${qe} 1x, ${qt} 2x"
          alt="Women working out"
          class="quote-photo"
          width="290"
          height="242"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>
    <div class="daily-norm-card">
      <div class="daily-norm-header">
        <div class="daily-norm-icon-wrap">
          <svg width="20" height="20" aria-hidden="true"><use href="${m("icon-dumbbell")}"></use></svg>
        </div>
        <div>
          <p class="daily-norm-time">110 min</p>
          <p class="daily-norm-subtitle">Daily norm of sports</p>
        </div>
      </div>
      <p class="daily-norm-text">The World Health Organization recommends at least 150 minutes of moderate-intensity aerobic physical activity throughout the week for adults aged 18-64. However, what happens if we adjust that number to 110 minutes every day? While it might seem like a high number to hit, dedicating 110 minutes daily to sporting activities may offer unparalleled benefits to physical health, mental well-being, and overall quality of life.</p>
    </div>
  `)}function kt({quote:e,author:t}){document.querySelectorAll(".quote-text").forEach(n=>{n.textContent=e}),document.querySelectorAll(".quote-author").forEach(n=>{n.textContent=t})}function We(){const e=document.querySelector(".daily-norm-text");if(!e){setTimeout(We,100);return}e.dataset.originalText||(e.dataset.originalText=e.textContent.trim());const t=e.dataset.originalText;function n(){const a=window.innerWidth,r=a<768?169:a<1280?179:t.length;e.textContent=t.length>r?t.substring(0,r).trim()+"...":t}n(),window.addEventListener("resize",n)}async function Mt(){try{let e=It();if(!e){C();try{e=await gt(),Rt(e)}finally{T()}}_t(),kt(e),We()}catch{return}}Mt();const Nt="https://your-energy.b.goit.study/api/subscription",Ie="Unable to subscribe. Please try again.",Ot="Subscription successfully created";function Ft(){const e=document.querySelector(".footer-form");if(!e)return;const t=e.elements.email,n=e.querySelector(".footer-message"),a=e.querySelector(".footer-button");t.addEventListener("input",()=>{G(n,"")}),e.addEventListener("submit",async r=>{if(r.preventDefault(),t.value=t.value.trim(),!e.checkValidity()){e.reportValidity();return}a.disabled=!0,C();try{const i=await fetch(Nt,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t.value})}),s=await i.json().catch(()=>({}));if(!i.ok){G(n,s.message||Ie,!0);return}G(n,s.message||Ot),e.reset()}catch{G(n,Ie,!0)}finally{T(),a.disabled=!1}})}function G(e,t,n=!1){e.textContent=t,e.classList.toggle("is-error",!!t&&n)}const me=J.FAVORITES_KEY,ie=10;let R=1;const L=document.querySelector("#favorites-list"),ze=document.querySelector("#favorites-empty"),Ye=document.querySelector("#favorites-count"),se=document.querySelector("#favorites-message"),Re=document.querySelector("#favorites-pagination");function Qe(){try{const e=JSON.parse(localStorage.getItem(me)??"[]");return Array.isArray(e)?e.filter(t=>t&&typeof t=="object"&&(t._id||t.id)):[]}catch{return[]}}function Ht(e){try{return localStorage.setItem(me,JSON.stringify(e)),document.dispatchEvent(new CustomEvent(J.FAVORITES_CHANGED_EVENT,{detail:e})),!0}catch{return Je("Unable to update favorites in this browser. Check storage permissions."),!1}}function Je(e){se.textContent=e,se.hidden=!e}function Bt(e){return`${e} exercise${e===1?"":"s"}`}function u(e,t,n){const a=document.createElement(e);return t&&(a.className=t),n!=null&&(a.textContent=String(n)),a}function b(e,t="-"){return e==null||e===""?t:String(e)}function Pt(e){const t=String(e._id??e.id),n=u("article","exercise-card"),a=u("div","exercise-card-top"),r=u("div","exercise-card-actions"),i=u("span","workout-badge","WORKOUT"),s=u("button","remove-button"),o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("width","18"),o.setAttribute("height","18"),o.setAttribute("aria-hidden","true");const d=document.createElementNS("http://www.w3.org/2000/svg","use");d.setAttribute("href",m("icon-trash")),o.append(d),s.append(o),s.type="button",s.dataset.action="remove",s.dataset.id=t,s.setAttribute("aria-label",`Remove ${b(e.name,"exercise")} from favorites`);const l=u("button","start-button"),st=u("span","","Start"),h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("width","24"),h.setAttribute("height","24"),h.setAttribute("aria-hidden","true"),h.classList.add("start-arrow");const pe=document.createElementNS("http://www.w3.org/2000/svg","use");pe.setAttribute("href",m("icon-favorites-start-arrow")),h.append(pe),l.append(st,h),l.type="button",l.dataset.action="open",l.dataset.id=t,l.setAttribute("aria-label",`Open details for ${b(e.name,"exercise")}`),r.append(i,s),a.append(r,l);const ge=u("div","exercise-title-row"),ae=u("span","exercise-sport-icon"),$=document.createElementNS("http://www.w3.org/2000/svg","svg");$.setAttribute("width","22"),$.setAttribute("height","22"),$.setAttribute("aria-hidden","true");const he=document.createElementNS("http://www.w3.org/2000/svg","use");he.setAttribute("href",m("icon-run")),$.append(he),ae.append($),ae.setAttribute("aria-hidden","true");const ct=u("h3","exercise-name",b(e.name,"Exercise"));ge.append(ae,ct);const ye=u("div","exercise-stats"),ve=u("p","","Burned calories: ");ve.append(u("strong","",`${b(e.burnedCalories)} / 3 min`));const Ee=u("p","","Body part: ");Ee.append(u("strong","",b(e.bodyPart)));const be=u("p","","Target: ");return be.append(u("strong","",b(e.target))),ye.append(ve,Ee,be),n.append(a,ge,ye),n}function Y(){Je("");const e=Qe(),t=Math.ceil(e.length/ie);if(R>t&&(R=Math.max(1,t)),Ye.textContent=Bt(e.length),ze.hidden=e.length>0,L.hidden=e.length===0,e.length===0){Re.innerHTML="",L.replaceChildren();return}const n=(R-1)*ie,a=n+ie,r=e.slice(n,a);L.replaceChildren(...r.map(Pt)),ue({container:Re,currentPage:R,totalPages:t,onPageChange:i=>{R=i,Y()}})}function Dt(e){const t=Qe(),n=t.filter(a=>String(a._id??a.id)!==e);n.length!==t.length&&Ht(n)}function Ut(e){document.dispatchEvent(new CustomEvent(p.EXERCISE_OPEN,{detail:{id:e}}))}let _e=!1;function Ze(){_e||!L||!ze||!Ye||!se||(_e=!0,L.addEventListener("click",e=>{const t=e.target.closest("button[data-action]");if(!t||!L.contains(t))return;const{action:n,id:a}=t.dataset;n==="remove"&&Dt(a),n==="open"&&Ut(a)}),document.addEventListener(J.FAVORITES_CHANGED_EVENT,Y),window.addEventListener("storage",e=>{e.key===me&&Y()}))}function Gt(){Ze(),Y()}const ke=document.querySelector("#home-view"),Me=document.querySelector("#favorites-view"),_=document.querySelector(".header"),et=[...document.querySelectorAll(".header-navigation-link")],v=document.querySelector(".header-navigation-list");Ze();function Kt(){return window.location.hash==="#/favorites"?"favorites":"home"}function ne(){const e=Kt();ke&&(ke.hidden=e!=="home"),Me&&(Me.hidden=e!=="favorites"),e==="favorites"&&Gt(),et.forEach(n=>{n.getAttribute("data-route")==="favorites"===(e==="favorites")?n.setAttribute("aria-current","page"):n.removeAttribute("aria-current")});const t=v==null?void 0:v.querySelector('[aria-current="page"]');if(t&&v){const n=v.getBoundingClientRect(),a=t.getBoundingClientRect();v.style.setProperty("--active-link-offset",`${a.left-n.left}px`),v.style.setProperty("--active-link-width",`${a.width}px`)}}et.forEach(e=>{const t=e.textContent.trim().toLowerCase()==="favorites";e.dataset.route=t?"favorites":"home",e.href=t?"./index.html#/favorites":"./index.html#/"});document.addEventListener("click",e=>{const t=e.target.closest(".header-navigation-link");if(!t||!(_!=null&&_.contains(t))||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault(),e.stopPropagation();const n=t.dataset.route==="favorites"?"#/favorites":"#/";_.classList.remove("is-menu-open");const a=_.querySelector(".header-menu-toggle");a==null||a.setAttribute("aria-expanded","false"),a==null||a.setAttribute("aria-label","Open menu"),document.body.style.overflow="",window.location.hash!==n?window.location.hash=n:ne()},!0);window.addEventListener("hashchange",ne);window.addEventListener("resize",ne);ne();function tt(){try{const e=localStorage.getItem(Q),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return[]}}function jt(e){return tt().some(t=>t._id===e)}function Vt(e){const t=tt(),n=t.some(r=>r._id===e._id),a=n?t.filter(r=>r._id!==e._id):[...t,e];return localStorage.setItem(Q,JSON.stringify(a)),document.dispatchEvent(new CustomEvent("favorites:change",{detail:{favorites:a}})),document.dispatchEvent(new CustomEvent(J.FAVORITES_CHANGED_EVENT,{detail:a})),!n}let f=null,ce=null,X=0,D=!1;const c={};function Xt(){var e;c.modal=document.querySelector("[data-exercise-modal]"),c.dialog=document.querySelector("[data-modal-dialog]"),c.content=document.querySelector("[data-modal-content]"),c.closeButtons=document.querySelectorAll("[data-modal-close]"),!(!c.modal||!c.content)&&((e=c.modal.querySelector("[data-close-icon]"))==null||e.setAttribute("href",m("icon-close")),c.closeButtons.forEach(t=>{t.addEventListener("click",fe)}),c.modal.addEventListener("click",zt),c.content.addEventListener("click",Yt),c.content.addEventListener("submit",Jt),document.addEventListener("exercise:open",t=>{var n;Wt((n=t.detail)==null?void 0:n.id)}))}async function Wt(e){var n;if(!e||!c.modal)return;const t=++X;ce=document.activeElement,f=null,c.modal.hidden=!1,document.body.classList.add("is-modal-open"),document.removeEventListener("keydown",le),document.addEventListener("keydown",le),D=!1,Ne("Loading..."),(n=c.dialog)==null||n.focus(),C();try{const a=await ft(e);if(t!==X)return;f=a,rt(a)}catch{if(t!==X)return;f=null,Ne("Could not load this exercise. Please try again.")}finally{T()}}function fe(){if(D){nt();return}at()}function nt(){var e;if(D=!1,f){rt(f),(e=c.dialog)==null||e.focus();return}at()}function at(){!c.modal||c.modal.hidden||(D=!1,X+=1,c.modal.hidden=!0,document.body.classList.remove("is-modal-open"),document.removeEventListener("keydown",le),c.content.replaceChildren(),f=null,ce instanceof HTMLElement&&ce.focus())}function le(e){if(e.key==="Escape"){fe();return}e.key==="Tab"&&en(e)}function zt(e){(e.target===c.modal||e.target.closest("[data-modal-backdrop]"))&&fe()}function Yt(e){if(e.target.closest("[data-open-rating]")){Qt();return}nn(e)}function Qt(){var e;f&&(D=!0,c.content.innerHTML=tn(),(e=c.content.querySelector('[name="review"]'))==null||e.focus())}async function Jt(e){const t=e.target.closest(".rating-form");if(!t||!f)return;e.preventDefault();const n=t.querySelector("[data-rating-error]"),a=String(new FormData(t).get("email")||"").trim(),r=String(new FormData(t).get("review")||"").trim(),i=Number(new FormData(t).get("rate"));if(!i||!r||!Be.test(a)){t.reportValidity(),n&&(n.textContent="Fill in the rating, review, and a valid email.");return}const s=t.querySelector('[type="submit"]');s.disabled=!0,n&&(n.textContent=""),C();try{const o=await pt(f._id,{rate:i,email:a,review:r}),d=Number(o==null?void 0:o.rating);f={...f,rating:Number.isFinite(d)?d:f.rating},nt()}catch(o){const d=Zt(o);n&&(n.textContent=d),de(d)}finally{T(),s.isConnected&&(s.disabled=!1)}}function Zt(e){var a;const t=(a=e==null?void 0:e.response)==null?void 0:a.data,n=t&&typeof t=="object"?t.message:t;return typeof n=="string"&&n.trim()?n.trim():"Could not save the rating. Please try again."}function en(e){if(!c.dialog)return;const t=[...c.dialog.querySelectorAll("button, input, textarea, a[href]")].filter(i=>!i.disabled&&i.tabIndex!==-1);if(!t.length)return;const n=t[0],a=t[t.length-1],r=document.activeElement;if(e.shiftKey&&(r===n||r===c.dialog)){e.preventDefault(),a.focus();return}!e.shiftKey&&r===a&&(e.preventDefault(),n.focus())}function de(e){let t=document.querySelector(".app-notice");t||(t=document.createElement("p"),t.className="app-notice",t.setAttribute("role","alert"),document.body.append(t)),t.textContent=e,t.hidden=!1,window.clearTimeout(de.timer),de.timer=window.setTimeout(()=>{t.hidden=!0},4e3)}function tn(){return`
    <form class="rating-form" novalidate>
      <h2 class="rating-form-title" id="exercise-modal-title">Give a rating</h2>
      <fieldset class="rating-scale">
        <legend>Your rating</legend>
        ${[1,2,3,4,5].map(t=>`
        <label class="rating-choice">
          <input type="radio" name="rate" value="${t}" required aria-label="${t} out of 5" />
          <svg width="24" height="24" aria-hidden="true">
            <use href="${m("icon-star-modal")}"></use>
          </svg>
        </label>
      `).join("")}
      </fieldset>
      <label class="rating-field">
        <span>Review</span>
        <textarea name="review" required placeholder="How was this exercise?"></textarea>
      </label>
      <label class="rating-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          required
          pattern="${Be.source}"
          placeholder="example@mail.com"
          autocomplete="email"
        />
      </label>
      <p class="rating-form-error" data-rating-error role="alert"></p>
      <button class="rating-send" type="submit">Send</button>
    </form>
  `}function nn(e){var a;const t=e.target.closest("[data-favorite-toggle]");if(!t||!f)return;const n=Vt(f);t.classList.toggle("is-favorite",n),t.setAttribute("aria-pressed",String(n)),t.querySelector("[data-favorite-label]").textContent=n?"Remove from favorites":"Add to favorites",(a=t.querySelector("[data-heart-icon]"))==null||a.setAttribute("href",m("icon-heart"))}function Ne(e){c.content.innerHTML=`<p class="exercise-modal-status" id="exercise-modal-title">${A(e)}</p>`}function rt(e){const t=jt(e._id),n=rn(e.gifUrl),a=Number(e.time)||3;c.content.innerHTML=`
    <div class="exercise-modal-layout">
      ${n?`<img class="exercise-modal-gif" src="${n}" alt="${A(e.name)}" />`:""}
      <div class="exercise-modal-info">
        <h2 class="exercise-modal-title" id="exercise-modal-title">${A(e.name)}</h2>
        <div class="exercise-modal-rating">
          <span>${it(e.rating)}</span>
          ${an(e.rating)}
        </div>
        <ul class="exercise-modal-stats">
          ${k("Target",e.target)}
          ${k("Body Part",e.bodyPart)}
          ${k("Equipment",e.equipment)}
          ${k("Popular",e.popularity)}
          ${k("Burned calories",`${Number(e.burnedCalories)||0} / ${a} min`)}
        </ul>
        <p class="exercise-modal-description">${A(e.description)}</p>
        <div class="exercise-actions">
          <button
            class="exercise-favorite${t?" is-favorite":""}"
            type="button"
            data-favorite-toggle
            aria-pressed="${t}"
          >
            <span data-favorite-label>${t?"Remove from favorites":"Add to favorites"}</span>
            ${on()}
          </button>
          <button class="exercise-rate" type="button" data-open-rating>
            Give a rating
          </button>
        </div>
      </div>
    </div>
  `}function k(e,t){return`
    <li>
      <span>${A(e)}</span>
      <strong>${A(t)}</strong>
    </li>
  `}function an(e){const t=Number(e)||0,n=Array.from({length:5},(a,r)=>`
      <span class="modal-star" style="--fill: ${Math.min(Math.max(t-r,0),1)}">
        <svg width="18" height="18" aria-hidden="true">
          <use href="${m("icon-star")}"></use>
        </svg>
        <svg class="modal-star-fill" width="18" height="18" aria-hidden="true">
          <use href="${m("icon-star")}"></use>
        </svg>
      </span>
    `).join("");return`<span class="modal-stars" aria-label="Rating ${it(t)} out of 5">${n}</span>`}function it(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(1):"0.0"}function rn(e){try{const t=new URL(e);if(t.protocol==="https:"||t.protocol==="http:")return t.href}catch{return""}return""}function A(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function on(){return`
    <svg width="18" height="18" aria-hidden="true">
      <use data-heart-icon href="${m("icon-heart")}"></use>
    </svg>
  `}const g=document.createElement("button");g.className="scroll-top";g.type="button";g.setAttribute("aria-label","Back to top");g.hidden=!0;g.innerHTML=`
  <svg width="18" height="18" aria-hidden="true">
    <use href="${m("icon-angle-left")}"></use>
  </svg>
`;document.body.append(g);const ot=()=>{g.hidden=window.scrollY<400};window.addEventListener("scroll",ot,{passive:!0});g.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});ot();window.__SPRITE_URL__=Oe;Xt();Ft();
//# sourceMappingURL=index.js.map
