(function(){
  var overlay=document.getElementById('ov'), body=document.getElementById('mb'), closeButton=document.getElementById('close');
  var flow='', step=0, state={}, lastFocus=null;
  var countryNames=['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Congo-Brazzaville)','Costa Rica','Côte d’Ivoire','Croatia','Cuba','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (Burma)','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Türkiye','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];
  function escapeHtml(value){return String(value||'').replace(/[&<>'"]/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]})}
  function open(nextFlow){flow=nextFlow;step=0;state={};lastFocus=document.activeElement;render();overlay.classList.add('on');document.body.style.overflow='hidden';setTimeout(focusFirst,20)}
  function close(){overlay.classList.remove('on');document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
  document.querySelectorAll('[data-flow]').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();open(button.dataset.flow)})});
  document.querySelectorAll('.offer.launch').forEach(function(card){function startLaunch(event){if(event&&event.target.closest('button,a,input,select,textarea'))return;open('launch')}card.addEventListener('click',startLaunch);card.addEventListener('keydown',function(event){if(event.key==='Enter'||event.key===' '){event.preventDefault();startLaunch(event)}})});
  closeButton.addEventListener('click',close);overlay.addEventListener('click',function(event){if(event.target===overlay)close()});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&overlay.classList.contains('on'))close()});
  function focusFirst(){var item=body.querySelector('input,select,button');if(item)item.focus()}
  function progress(total){var output='<div class="prog" aria-hidden="true">';for(var i=0;i<total;i++)output+='<i class="'+(i<=step?'on':'')+'"></i>';return output+'</div>'}
  function actions(back,label){return '<div class="acts">'+(back?'<button class="btn ghost" type="button" data-back>Back</button>':'<span></span>')+'<button class="btn" type="button" data-next>'+label+'</button></div>'}
  function error(message,id){var errorBox=body.querySelector('.errmsg');if(errorBox)errorBox.textContent=message;if(id){var field=document.getElementById(id);if(field){field.closest('.field').classList.add('err');field.focus()}}}
  function field(id,label,type,value,wide){var isCountry=id==='country', autocomplete=isCountry?'country-name':id==='name'?'name':id==='email'?'email':'off', list=isCountry?' list="country-options" placeholder="Start typing to search"':'', options=isCountry?'<datalist id="country-options">'+countryNames.map(function(country){return '<option value="'+escapeHtml(country)+'"></option>'}).join('')+'</datalist>':'';return '<div class="field '+(wide?'full':'')+'" data-field="'+id+'"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="'+(type||'text')+'" value="'+escapeHtml(value)+'" autocomplete="'+autocomplete+'" aria-describedby="'+id+'-error" required'+list+'>'+options+'<p class="field-error" id="'+id+'-error" aria-live="polite"></p></div>'}
  function selectField(id,label,options,value){return '<div class="field full" data-field="'+id+'"><label for="'+id+'">'+label+'</label><select id="'+id+'" aria-describedby="'+id+'-error" required><option value="" disabled'+(!value?' selected':'')+'>Select an option</option>'+options.map(function(option){return '<option value="'+escapeHtml(option)+'"'+(value===option?' selected':'')+'>'+escapeHtml(option)+'</option>'}).join('')+'</select><p class="field-error" id="'+id+'-error" aria-live="polite"></p></div>'}
  function radio(name,label,options){return '<div class="field full" data-field="'+name+'"><label>'+label+'</label><div class="opts" role="radiogroup" aria-describedby="'+name+'-error">'+options.map(function(option){return '<label class="opt"><input type="radio" name="'+name+'" value="'+option+'"'+(state[name]===option?' checked':'')+'>'+option+'</label>'}).join('')+'</div><p class="field-error" id="'+name+'-error" aria-live="polite"></p></div>'}
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
    if(flow==='scale'&&step===0)bindScaleValidation();
    if(flow==='scale'&&step===2)bindContactValidation(['name','email']);
    if(flow==='checklist'&&step===0)bindContactValidation(['name','email']);
  }
  function launch(){
    if(step===0)return progress(2)+'<h3 id="mt">Register for the free webinar</h3><p class="sub">Learn the operator-led route to launching a short-term rental business. We’ll email your confirmation and webinar details.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+field('country','Country','text',state.country,true)+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Reserve my free place');
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">You’re registered.</h3><p class="sub">Your place is reserved for the free Flex Academy webinar.</p><div class="summary-card"><div><span>Webinar date</span><b>To be confirmed</b></div><div><span>Sent to</span><b>'+escapeHtml(state.email)+'</b></div></div><p class="hint">We’ll send the date, time and calendar link by email as soon as they are confirmed.</p><div class="acts"><span></span><button class="btn ghost" type="button" data-close>Done</button></div>';
  }
  function scale(){
    if(step===0)return progress(3)+'<h3 id="mt">Tell us where you are</h3><p class="sub">This short form helps the team prepare a useful strategy call.</p><div class="fields">'+selectField('units','How many units do you run today?',['1–4','5–30','31+'],state.units)+selectField('target','What is your main target?',['Open more units','Improve margins','Build a team-run company'],state.target)+field('city','Which city do you operate in?','text',state.city,true)+selectField('budget','Which budget band are you considering?',['Under $1,000','$1,000–$2,500','$2,500–$5,000','$5,000+'],state.budget)+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Continue to calendar');
    if(step===1)return progress(3)+'<h3 id="mt">Choose a time for your call</h3><p class="sub">Select a time that works for you. Times are shown in your local time.</p><div class="field full" data-field="slot"><div class="calendar">'+['Tue 10:00','Tue 15:00','Wed 11:00','Wed 16:00','Thu 10:00','Thu 15:00'].map(function(slot){return '<button type="button" class="slot" aria-pressed="'+(state.slot===slot)+'" data-slot="'+slot+'">'+slot+'</button>'}).join('')+'</div><p class="field-error" id="slot-error" aria-live="polite"></p></div><div class="errmsg" role="alert"></div>'+actions(true,'Confirm strategy call');
    if(step===2)return progress(3)+'<h3 id="mt">Where should we send the invite?</h3><p class="sub">We will use these details to confirm your strategy call.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+'</div><div class="errmsg" role="alert"></div>'+actions(true,'Confirm my call');
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">Your strategy call is confirmed.</h3><p class="sub">We’ll send the calendar invite and call details to '+escapeHtml(state.email)+'.</p><div class="summary-card"><div><span>When</span><b>'+escapeHtml(state.slot)+'</b></div><div><span>With</span><b>Flex Academy team</b></div><div><span>Length</span><b>20–30 minutes</b></div></div><div class="acts"><span></span><button class="btn" type="button" data-close>Done</button></div>';
  }
  function checklist(){
    if(step===0)return '<h3 id="mt">Get the free STR scaling checklist</h3><p class="sub">A practical starting point for when you are not ready to launch or scale just yet.</p><div class="fields">'+field('name','Full name','text',state.name,true)+field('email','Email','email',state.email,true)+'</div><div class="errmsg" role="alert"></div>'+actions(false,'Email me the checklist');
    return '<div class="tick" aria-hidden="true">✓</div><h3 id="mt">The checklist is on its way.</h3><p class="sub">We’ll send it to '+escapeHtml(state.email)+'. You can come back whenever you are ready to take the next step.</p><div class="acts"><span></span><button class="btn" type="button" data-close>Done</button></div>';
  }
  function emailValid(value){return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)}
  function setFieldError(input,message){var wrap=input.closest('.field'), messageBox=wrap.querySelector('.field-error');wrap.classList.add('is-invalid');input.setAttribute('aria-invalid','true');messageBox.textContent=message}
  function clearFieldError(input){var wrap=input.closest('.field'), messageBox=wrap.querySelector('.field-error');wrap.classList.remove('is-invalid');input.removeAttribute('aria-invalid');messageBox.textContent=''}
  function validateLaunchField(input){var value=input.value.trim(), message='';if(input.id==='name'&&!value)message='Enter your full name.';if(input.id==='email'&&!value)message='Enter your email address.';else if(input.id==='email'&&!emailValid(value))message='Enter a valid email address.';if(input.id==='country'&&!value)message='Select your country.';else if(input.id==='country'&&countryNames.indexOf(value)===-1)message='Select a country from the list.';if(message){setFieldError(input,message);return false}clearFieldError(input);return true}
  function validateContactForm(ids){var valid=true, firstInvalid=null;ids.forEach(function(id){var input=document.getElementById(id);if(!validateLaunchField(input)){valid=false;if(!firstInvalid)firstInvalid=input}});if(firstInvalid)firstInvalid.focus();return valid}
  function validateLaunchForm(){return validateContactForm(['name','email','country'])}
  function bindContactValidation(ids){ids.forEach(function(id){var input=document.getElementById(id);input.addEventListener('blur',function(){validateLaunchField(input)});input.addEventListener('input',function(){if(input.getAttribute('aria-invalid')==='true')validateLaunchField(input)})})}
  function bindLaunchValidation(){bindContactValidation(['name','email','country'])}
  function setScaleError(id,message){var wrap=body.querySelector('[data-field="'+id+'"]'), control=wrap.querySelector('input,select,button'), messageBox=wrap.querySelector('.field-error');wrap.classList.add('is-invalid');control.setAttribute('aria-invalid','true');messageBox.textContent=message}
  function clearScaleError(id){var wrap=body.querySelector('[data-field="'+id+'"]'), control=wrap.querySelector('input,select,button'), messageBox=wrap.querySelector('.field-error');wrap.classList.remove('is-invalid');control.removeAttribute('aria-invalid');messageBox.textContent=''}
  function validateScaleField(id){var control=document.getElementById(id), message='';if(id==='city'&&!control.value.trim())message='Enter your city.';else if(id!=='city'&&!control.value)message='Select an option.';if(message){setScaleError(id,message);return false}clearScaleError(id);return true}
  function validateScaleForm(){var valid=true, firstInvalid=null;['units','target','city','budget'].forEach(function(id){if(!validateScaleField(id)){valid=false;if(!firstInvalid)firstInvalid=document.getElementById(id)}});if(firstInvalid)firstInvalid.focus();return valid}
  function bindScaleValidation(){body.querySelectorAll('#units,#target,#city,#budget').forEach(function(control){var eventName=control.tagName==='SELECT'?'change':'blur';control.addEventListener(eventName,function(){validateScaleField(control.id)});if(control.id==='city')control.addEventListener('input',function(){if(control.getAttribute('aria-invalid')==='true')validateScaleField(control.id)})})}
  function validateSlot(){if(!state.slot){setScaleError('slot','Choose a time to continue.');return false}clearScaleError('slot');return true}
  function next(){
    if(flow==='launch'&&step===0){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();state.country=document.getElementById('country').value.trim();if(!validateLaunchForm())return;step++;render();focusFirst();return}
    if(flow==='scale'&&step===0){state.units=document.getElementById('units').value;state.target=document.getElementById('target').value;state.city=document.getElementById('city').value.trim();state.budget=document.getElementById('budget').value;if(!validateScaleForm())return;step++;render();focusFirst();return}
    if(flow==='scale'&&step===1){if(!validateSlot())return;step++;render();focusFirst();return}
    if(flow==='scale'&&step===2){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();if(!validateContactForm(['name','email']))return;step++;render();focusFirst();return}
    if(flow==='checklist'&&step===0){state.name=document.getElementById('name').value.trim();state.email=document.getElementById('email').value.trim();if(!validateContactForm(['name','email']))return;step++;render();focusFirst()}
  }
  var nav=document.querySelector('header.nav');
  if(nav){
    function updateNav(){nav.classList.toggle('is-scrolled',window.scrollY>32)}
    window.addEventListener('scroll',updateNav,{passive:true});
    updateNav();
  }
  var stickyCta=document.querySelector('.sticky'), hero=document.querySelector('.hero');
  if(stickyCta&&hero){
    function updateStickyCta(){stickyCta.classList.toggle('is-visible',hero.getBoundingClientRect().bottom<=0)}
    window.addEventListener('scroll',updateStickyCta,{passive:true});
    window.addEventListener('resize',updateStickyCta);
    updateStickyCta();
  }
  var inlineChecklistForm=document.getElementById('inline-checklist-form');
  if(inlineChecklistForm){
    var inlineChecklistName=document.getElementById('checklist-name'), inlineChecklistEmail=document.getElementById('checklist-email'), inlineChecklistConfirmation=document.getElementById('inline-checklist-confirmation');
    function validateInlineChecklistField(input){
      var message='', errorBox=document.getElementById(input.id+'-error'), fieldWrap=input.closest('.inline-field');
      if(input.id==='checklist-name'&&!input.value.trim())message='Enter your full name.';
      if(input.id==='checklist-email'&&!input.value.trim())message='Enter your email address.';
      else if(input.id==='checklist-email'&&!emailValid(input.value.trim()))message='Enter a valid email address.';
      fieldWrap.classList.toggle('invalid',!!message);input.setAttribute('aria-invalid',message?'true':'false');errorBox.textContent=message;
      return !message;
    }
    [inlineChecklistName,inlineChecklistEmail].forEach(function(input){input.addEventListener('blur',function(){validateInlineChecklistField(input)});input.addEventListener('input',function(){if(input.getAttribute('aria-invalid')==='true')validateInlineChecklistField(input)})});
    inlineChecklistForm.addEventListener('submit',function(event){
      event.preventDefault();var nameValid=validateInlineChecklistField(inlineChecklistName), inlineEmailIsValid=validateInlineChecklistField(inlineChecklistEmail);
      if(!nameValid||!inlineEmailIsValid){(!nameValid?inlineChecklistName:inlineChecklistEmail).focus();return}
      document.getElementById('checklist-confirmation-email').textContent=inlineChecklistEmail.value.trim();inlineChecklistForm.hidden=true;inlineChecklistConfirmation.hidden=false;inlineChecklistConfirmation.focus();
    });
  }
  var rotatingPromise=document.querySelector('.hero-rotating');
  if(rotatingPromise&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var promisePhrases=window.matchMedia('(max-width: 520px)').matches?['life you own.','business that runs.','freedom you built.']:['life you own.','business that runs.','freedom you built.','future on your terms.'], promiseIndex=0;
    window.setInterval(function(){
      rotatingPromise.classList.add('is-swapping');
      window.setTimeout(function(){
        promiseIndex=(promiseIndex+1)%promisePhrases.length;
        rotatingPromise.textContent=promisePhrases[promiseIndex];
        rotatingPromise.classList.remove('is-swapping');
      },220);
    },3200);
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
