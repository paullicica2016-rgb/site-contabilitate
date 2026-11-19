(function(){
const KEY='ai-consent-v1';
const T={
ro:{label:'Cookie-uri',text:'Folosim cookie-uri pentru statistici și pentru măsurarea reclamelor doar dacă ești de acord.',more:'Detalii',reject:'Refuz',settings:'Setări',accept:'Accept',save:'Salvează alegerea',necessary:'Necesare',necessaryNote:'mereu active, păstrează alegerea ta',analytics:'Analiză',analyticsNote:'statistici despre vizite (Google Analytics)',ads:'Marketing',adsNote:'măsurarea și personalizarea reclamelor (Google Ads)'},
en:{label:'Cookies',text:'We use cookies for statistics and ad measurement only if you agree.',more:'Details',reject:'Reject',settings:'Settings',accept:'Accept',save:'Save choice',necessary:'Necessary',necessaryNote:'always on, they keep your choice',analytics:'Analytics',analyticsNote:'visit statistics (Google Analytics)',ads:'Marketing',adsNote:'ad measurement and personalisation (Google Ads)'}};
const L=()=>typeof lang!=='undefined'&&lang==='en'?'en':'ro';
const PIXEL_ID='2210351209857550';
function loadPixel(){if(window.fbq)return;
(function(f,b,e,v,n,t,s){n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init',PIXEL_ID);fbq('track','PageView')}
const fb=n=>{if(window.fbq)fbq('track',n)};
const g=b=>b?'granted':'denied';
function read(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function apply(s){try{localStorage.setItem(KEY,JSON.stringify({analytics:s.analytics,ads:s.ads,date:new Date().toISOString()}))}catch(e){}
gtag('consent','update',{analytics_storage:g(s.analytics),ad_storage:g(s.ads),ad_user_data:g(s.ads),ad_personalization:g(s.ads)});
if(s.ads)loadPixel();
dataLayer.push({event:'consent_update',consent_analytics:g(s.analytics),consent_ads:g(s.ads)})}
let box=null,open=false,detailed=false;
function render(){
if(!open){if(box){box.remove();box=null}return}
const t=T[L()],s=read()||{analytics:false,ads:false};
if(!box){box=document.createElement('div');box.className='consent';box.setAttribute('role','dialog');document.body.appendChild(box)}
box.setAttribute('aria-label',t.label);
box.innerHTML=`<p>${t.text} <button type="button" class="consent-more">${t.more}</button></p>${detailed?`<div class="consent-options"><label><input type="checkbox" checked disabled><span><b>${t.necessary}</b>${t.necessaryNote}</span></label><label><input type="checkbox" name="analytics"${s.analytics?' checked':''}><span><b>${t.analytics}</b>${t.analyticsNote}</span></label><label><input type="checkbox" name="ads"${s.ads?' checked':''}><span><b>${t.ads}</b>${t.adsNote}</span></label></div>`:''}<div class="consent-actions"><button type="button" class="consent-reject">${t.reject}</button>${detailed?`<button type="button" class="consent-save">${t.save}</button>`:`<button type="button" class="consent-settings">${t.settings}</button>`}<button type="button" class="consent-accept">${t.accept}</button></div>`}
function show(d){open=true;detailed=d;render();if(d)box.querySelector('input:not([disabled]),button').focus()}
function close(s){apply(s);open=false;render()}
document.addEventListener('click',e=>{const b=e.target.closest('button,a');if(!b)return;
if(b.matches('.consent-accept'))close({analytics:true,ads:true});
else if(b.matches('.consent-reject'))close({analytics:false,ads:false});
else if(b.matches('.consent-settings')){detailed=true;render()}
else if(b.matches('.consent-save'))close({analytics:box.querySelector('[name=analytics]').checked,ads:box.querySelector('[name=ads]').checked});
else if(b.matches('.consent-more'))document.querySelector('dialog')?.showModal();
else if(b.matches('.cookie-settings'))show(true);
else if(b.matches('a[href^="tel:"]'))(dataLayer.push({event:'click_telefon',link_url:b.getAttribute('href')}),fb('Contact'));
else if(b.matches('a[href*="wa.me/"]'))(dataLayer.push({event:'click_whatsapp',link_url:b.getAttribute('href')}),fb('Contact'))});
document.addEventListener('submit',e=>{const id=e.target.id;if(id==='contact-form'||id==='evaluation-form'){dataLayer.push({event:'formular_trimis',formular:id==='contact-form'?'contact':'evaluare'});fb('Lead')}});
{const c=read();if(c&&c.ads)loadPixel()}
window.consentUI={refresh:render};
if(!read())show(false);
})();
