(function(){
  var overlay=document.getElementById('ov'), body=document.getElementById('mb'), closeButton=document.getElementById('close');
  var flow='', step=0, state={}, lastFocus=null;
  function escapeHtml(value){return String(value||'').replace(/[&<>'"]/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]})}
  function open(nextFlow){flow=nextFlow;step=0;state={};lastFocus=document.activeElement;render();overlay.classList.add('on');document.body.style.overflow='hidden';setTimeout(focusFirst,20)}
  function close(){overlay.classList.remove('on');document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
  document.querySelectorAll('[data-flow]').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();open(button.dataset.flow)})});
  closeButton.addEventListener('click',close);overlay.addEventListener('click',function(event){if(event.target===overlay)close()});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&overlay.classList.contains('on'))close()});
  function focusFirst(){var item=body.querySelector('input,select,button');if(item)item.focus()}
  function progress(total){var output='<div class="prog" aria-hidden="true">';for(var i=0;i<total;i++)output+='<i class="'+(i<=step?'on':'')+'"></i>';return output+'</div>'}
  function actions(back,label){return '<div class="acts">'+(back?'<button class="btn ghost" type="button" data-back>Back</button>':'<span></span>')+'<button class="btn" type="button" data-next>'+label+'</button></div>'}
  function error(message,id){var errorBox=body.querySelector('.errmsg');if(errorBox)errorBox.textContent=message;if(id){var field=document.getElementById(id);if(field){field.closest('.field').classList.add('err');field.focus()}}}
  function field(id,label,type,value,wide){return '<div class="field '+(wide?'full':'')+'"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="'+(type||'text')+'" value="'+escapeHtml(value)+'" autocomplete="'+(id==='name'?'name':id==='email'?'email':'off')+'" aria-describedby="'+id+'-error" required><p class="field-error" id="'+id+'-error" aria-live="polite"></p></div>'}
  function radio(name,label,options){return '<div class="field full"><label>'+label+'</label><div class="opts" role="radiogroup">'+options.map(function(option){return '<label class="opt"><input type="radio" name="'+name+'" value="'+option+'"'+(state[name]===option?' checked':'')+'>'+option+'</label>'}).join('')+'</div></div>'}
  function render(){
    var output='';
    if(flow==='launch') output=launch();
    if(flow==='scale') output=scale();
    if(flow==='checklist') output=checklist();
    body.innerHTML=output;
    body.querySelectorAll('[data-back]').forEach(function(button){button.addEventListener('click',function(){step--;render();focusFirst()})});
    body.querySelectorAll('[data-next]').forEach(function(button){button.addEventListener('click',next)});
    body.querySelectorAll('[data-slot]').forEach(function(button){button.addEventListener('click',function(){state.slot=button.dataset.slot;render()})});
    body.querySelectorAll('[data-close]').forEach(function(button){button.addEventListener('click',close)});
    if(flow==='launch'&&step===0)bindLaunchValidation();
  }
  function launch(){
    if(step===0)return progress(2)+'<h3 id="mt">Register for the free webinar</h3><p class="sub">Learn the operator-led route to launching a short-term rental business.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+field('country','Country','text',state.country,true)+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Reserve my free place')+'<p class="hint">We will email your confirmation and webinar details.</p>';
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">You’re registered.</h3><p class="sub">Your place is reserved for the free Flex Academy webinar.</p><div class="summary-card"><div><span>Webinar date</span><b>To be confirmed</b></div><div><span>Sent to</span><b>'+escapeHtml(state.email)+'</b></div></div><button class="btn" type="button" disabled>Add to calendar when confirmed</button><p class="hint">We’ll send the date, time and calendar link by email as soon as they are confirmed.</p><div class="acts"><span></span><button class="btn ghost" type="button" data-close>Done</button></div>';
  }
  function scale(){
    if(step===0)return progress(3)+'<h3 id="mt">First, tell us where you are</h3><p class="sub">This short form helps the team prepare a useful strategy call.</p><div class="fields">'+radio('units','How many units do you run today?',['1–4','5–30','31+'])+radio('target','What is your main target?',['Open more units','Improve margins','Build a team-run company'])+field('city','Which city do you operate in?','text',state.city,true)+radio('budget','Which budget band are you considering?',['Under X','X–Y','Y–Z','Above Z'])+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Continue to calendar');
    if(step===1)return progress(3)+'<h3 id="mt">Choose a time for your call</h3><p class="sub">Select a time that works for you. Times are shown in your local time.</p><div class="calendar">'+['Tue 10:00','Tue 15:00','Wed 11:00','Wed 16:00','Thu 10:00','Thu 15:00'].map(function(slot){return '<button type="button" class="slot" aria-pressed="'+(state.slot===slot)+'" data-slot="'+slot+'">'+slot+'</button>'}).join('')+'</div><div class="errmsg" role="alert"></div><p class="calendar-note">Example calendar step — connect your scheduling tool before launch.</p>'+actions(true,'Confirm strategy call');
    if(step===2)return progress(3)+'<h3 id="mt">Where should we send the invite?</h3><p class="sub">We will use these details to confirm your strategy call.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+'</div><div class="errmsg" role="alert"></div>'+actions(true,'Confirm my call');
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">Your strategy call is confirmed.</h3><p class="sub">We’ll send the calendar invite and call details to '+escapeHtml(state.email)+'.</p><div class="summary-card"><div><span>When</span><b>'+escapeHtml(state.slot)+'</b></div><div><span>With</span><b>Flex Academy team</b></div><div><span>Length</span><b>20–30 minutes</b></div></div><p class="hint">Prototype confirmation — connect your scheduling tool to create live bookings.</p><div class="acts"><span></span><button class="btn" type="button" data-close>Done</button></div>';
  }
  function checklist(){
    if(step===0)return '<h3 id="mt">Get the free STR scaling checklist</h3><p class="sub">A practical starting point for when you are not ready to launch or scale just yet.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Email me the checklist');
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">The checklist is on its way.</h3><p class="sub">We’ll send it to '+escapeHtml(state.email)+'. You can come back whenever you are ready to take the next step.</p><div class="acts"><span></span><button class="btn" type="button" data-close>Done</button></div>';
  }
  function emailValid(value){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)}
  function setFieldError(input,message){var wrap=input.closest('.field'), messageBox=wrap.querySelector('.field-error');wrap.classList.add('is-invalid');input.setAttribute('aria-invalid','true');messageBox.textContent=message}
  function clearFieldError(input){var wrap=input.closest('.field'), messageBox=wrap.querySelector('.field-error');wrap.classList.remove('is-invalid');input.removeAttribute('aria-invalid');messageBox.textContent=''}
  function validateLaunchField(input){var value=input.value.trim(), message='';if(input.id==='name'&&!value)message='Enter your full name.';if(input.id==='email'&&!value)message='Enter your email address.';else if(input.id==='email'&&!emailValid(value))message='Enter a valid email address.';if(input.id==='country'&&!value)message='Enter your country.';if(message){setFieldError(input,message);return false}clearFieldError(input);return true}
  function validateLaunchForm(){var valid=true, firstInvalid=null;['name','email','country'].forEach(function(id){var input=document.getElementById(id);if(!validateLaunchField(input)){valid=false;if(!firstInvalid)firstInvalid=input}});if(firstInvalid)firstInvalid.focus();return valid}
  function bindLaunchValidation(){body.querySelectorAll('#name,#email,#country').forEach(function(input){input.addEventListener('blur',function(){validateLaunchField(input)});input.addEventListener('input',function(){if(input.getAttribute('aria-invalid')==='true')validateLaunchField(input)})})}
  function next(){
    if(flow==='launch'&&step===0){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();state.country=document.getElementById('country').value.trim();if(!validateLaunchForm())return;step++;render();focusFirst();return}
    if(flow==='scale'&&step===0){state.units=(body.querySelector('input[name="units"]:checked')||{}).value;state.target=(body.querySelector('input[name="target"]:checked')||{}).value;state.city=document.getElementById('city').value.trim();state.budget=(body.querySelector('input[name="budget"]:checked')||{}).value;if(!state.units||!state.target||!state.city||!state.budget)return error('Complete each field to continue.');step++;render();focusFirst();return}
    if(flow==='scale'&&step===1){if(!state.slot)return error('Choose a time to continue.');step++;render();focusFirst();return}
    if(flow==='scale'&&step===2){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();if(!state.name)return error('Enter your name to continue.','name');if(!emailValid(state.email))return error('Enter a valid email address.','email');step++;render();focusFirst();return}
    if(flow==='checklist'&&step===0){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();if(!state.name)return error('Enter your name to continue.','name');if(!emailValid(state.email))return error('Enter a valid email address.','email');step++;render();focusFirst()}
  }
  var counters=document.querySelectorAll('.count-up');
  function countUp(counter){
    var target=Number(counter.dataset.count), suffix=counter.dataset.suffix||'', duration=650, startedAt=null;
    counter.textContent='0'+suffix;
    function tick(now){
      if(!startedAt)startedAt=now;
      var progress=Math.min((now-startedAt)/duration,1), eased=1-Math.pow(1-progress,3);
      counter.textContent=Math.round(target*eased)+suffix;
      if(progress<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if(counters.length){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      counters.forEach(function(counter){counter.textContent=counter.dataset.count+(counter.dataset.suffix||'')});
    }else if('IntersectionObserver' in window){
      var counterObserver=new IntersectionObserver(function(entries,observer){entries.forEach(function(entry){if(entry.isIntersecting){countUp(entry.target);observer.unobserve(entry.target)}})},{threshold:.55});
      counters.forEach(function(counter){counterObserver.observe(counter)});
    }else{counters.forEach(countUp)}
  }
})();
