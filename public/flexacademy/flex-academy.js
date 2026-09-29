(function(){
var S={},step=0,order=['units','target','city','budget','slot','details','done'];
var ov=document.getElementById('ov'),mb=document.getElementById('mb'),last=null;
function el(h){return h}
function open(){last=document.activeElement;S={};step=0;render();ov.classList.add('on');document.body.style.overflow='hidden';setTimeout(function(){var f=mb.querySelector('input,button');f&&f.focus()},30)}
function close(){ov.classList.remove('on');document.body.style.overflow='';last&&last.focus()}
document.querySelectorAll('[data-open]').forEach(function(b){b.addEventListener('click',open)});
document.getElementById('close').addEventListener('click',close);
ov.addEventListener('click',function(e){if(e.target===ov)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('on'))close()});
function prog(){var h='<div class="prog" aria-hidden="true">';for(var i=0;i<6;i++)h+='<i class="'+(i<=step?'on':'')+'"></i>';return h+'</div><p class="hint" style="margin:-10px 0 14px">Step '+(step+1)+' of 6</p>'}
function radios(name,list){return '<div class="opts" role="radiogroup">'+list.map(function(o,i){return '<label class="opt"><input type="radio" name="'+name+'" value="'+o+'"'+(S[name]===o?' checked':'')+'>'+o+'</label>'}).join('')+'</div><div class="errmsg" id="err" role="alert"></div>'}
function nav(back,label){return '<div class="acts">'+(back?'<button class="btn ghost" id="back" type="button">Back</button>':'<span></span>')+'<button class="btn" id="next" type="button">'+(label||'Continue')+'</button></div>'}
var Q={
 units:['How many units do you manage today?','Helps us check the programme fits your stage.',['1–4','5–30','31+']],
 target:['Where do you want to be in 12 months?','Your target, not a promise.',['Stabilise what I have','Add 5–10 units','Double my portfolio','Build a team-run company']],
 city:['Which market are you in?','We launch in the UK, France and Algeria first.',['United Kingdom','France','Algeria','Somewhere else']],
 budget:['What budget are you considering?','Rough band only — this shapes the call, it is not a commitment.',['Under £3,000','£3,000–£5,000','£5,000–£10,000','Over £10,000']]
};
var slots=['Tue 09:30','Tue 14:00','Wed 11:00','Wed 16:30','Thu 10:00','Thu 15:00'];
function render(){
 var k=order[step],h='';
 if(Q[k]){var q=Q[k];h=prog()+'<h3 id="mt">'+q[0]+'</h3><p class="sub">'+q[1]+'</p>'+radios(k,q[2])+nav(step>0)}
 else if(k==='slot'){h=prog()+'<h3 id="mt">Pick a time</h3><p class="sub">20–30 minutes on video. Times shown in your local time.</p><div class="slots">'+slots.map(function(s){return '<button type="button" class="chip" aria-pressed="'+(S.slot===s)+'" data-s="'+s+'">'+s+'</button>'}).join('')+'</div><div class="errmsg" id="err" role="alert"></div><p class="hint">Illustrative availability <span class="ph">[connect scheduler]</span></p>'+nav(true)}
 else if(k==='details'){h=prog()+'<h3 id="mt">Where should we send the invite?</h3><p class="sub">Only what we need to confirm your call.</p><div class="field" id="fn"><label for="n">Full name</label><input id="n" autocomplete="name" value="'+(S.name||'')+'"></div><div class="field" id="fe"><label for="e">Email</label><input id="e" type="email" autocomplete="email" value="'+(S.email||'')+'"></div><div class="errmsg" id="err" role="alert"></div>'+nav(true,'Confirm my call')}
 else if(k==='done'){
  if(S.notyet){h='<div class="tick soft" aria-hidden="true">✓</div><h3 id="mt">Not yet — and that\'s a useful answer.</h3><p class="sub">'+(S.reason)+' We\'ll send the STR scaling checklist and tell you when there\'s a fit.</p><div class="field" id="fe"><label for="e">Email</label><input id="e" type="email" autocomplete="email" value="'+(S.email||'')+'"></div><div class="errmsg" id="err" role="alert"></div><div class="acts"><button class="btn ghost" id="close2" type="button">Close</button><button class="btn" id="send" type="button">Send me the checklist</button></div><p class="hint">Illustrative flow — nothing is sent.</p>'}
  else{h='<div class="tick" aria-hidden="true">✓</div><h3 id="mt">You\'re booked, '+(S.name||'').split(' ')[0]+'.</h3><p class="sub">A calendar invite is on its way to '+S.email+'.</p><div class="sum"><div><span>When</span><b>'+S.slot+'</b></div><div><span>Length</span><b>20–30 min</b></div><div><span>With</span><b>Flex Academy team</b></div></div><p class="sub" style="margin:0">Bring your unit count and one bottleneck you want fixed.</p><div class="acts"><span></span><button class="btn" id="close2" type="button">Done</button></div><p class="hint">Design concept — no booking is created.</p>'}
 }
 mb.innerHTML=h;
 var b=document.getElementById('back');b&&b.addEventListener('click',function(){step--;render();focus()});
 var nx=document.getElementById('next');nx&&nx.addEventListener('click',next);
 var c2=document.getElementById('close2');c2&&c2.addEventListener('click',close);
 var sd=document.getElementById('send');sd&&sd.addEventListener('click',sendCheck);
 mb.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){S.slot=c.dataset.s;render();focus()})});
 mb.querySelectorAll('input[type=radio]').forEach(function(r){r.addEventListener('change',function(){S[r.name]=r.value;document.getElementById('err').textContent=''})});
}
function focus(){var f=mb.querySelector('input:checked,input,.chip[aria-pressed="true"],.chip');f&&f.focus()}
function err(m,id){document.getElementById('err').textContent=m;if(id){var f=document.getElementById(id);f&&f.parentNode.classList.add('err');f&&f.focus()}}
function goNotYet(r){S.notyet=true;S.reason=r;step=order.indexOf('done');render();focus()}
function next(){
 var k=order[step];
 if(Q[k]){if(!S[k])return err('Choose one option to continue.');
  if(k==='units'&&S.units==='1–4'&&false){}
  if(k==='city'&&S.city==='Somewhere else')return goNotYet('We\'re launching in the UK, France and Algeria first.');
  if(k==='budget'&&S.budget==='Under £3,000')return goNotYet('The programme is likely above your current budget.');
 }
 if(k==='slot'&&!S.slot)return err('Pick a time to continue.');
 if(k==='details'){var n=document.getElementById('n').value.trim(),e=document.getElementById('e').value.trim();
  S.name=n;S.email=e;
  if(!n)return err('Enter your name so we know who to expect.','n');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))return err('Enter a valid email, like name@company.com.','e')}
 step++;render();focus();
}
function sendCheck(){var e=document.getElementById('e').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))return err('Enter a valid email, like name@company.com.','e');S.email=e;
 mb.innerHTML='<div class="tick soft" aria-hidden="true">✓</div><h3 id="mt">Checklist on its way.</h3><p class="sub">Sent to '+e+'. We\'ll be in touch when a cohort opens in your market.</p><div class="acts"><span></span><button class="btn" id="close2" type="button">Done</button></div><p class="hint">Illustrative flow — nothing is sent.</p>';
 document.getElementById('close2').addEventListener('click',close)}
document.querySelectorAll('[data-checklist]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();open();goNotYet('Here\'s the low-friction route.')})});
})();
