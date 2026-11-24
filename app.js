(function(){
'use strict';
var D=window.VOID_DATA, KEY='void.v1';
var $=function(s,r){return (r||document).querySelector(s)};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};

/* ---------- state ---------- */
var S;
function load(){try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){S={}}
 S.lang=S.lang||'ar'; S.done=S.done||{}; S.bm=S.bm||[]; S.sealed=S.sealed||{}; S.mirror=S.mirror||{}; S.review=S.review||{}; S.hidden=!!S.hidden;
 S.set=Object.assign({sound:false,music:.5,fx:.5,dread:true,calm:false},S.set||{});}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
load();

/* ---------- i18n ---------- */
var T={
 ar:{quote:'هناك أشياء لا تراها لأنك لم تتعلم كيف تنظر.',sub:'اكتشف أعماق العقل البشري',enter:'ادخل إلى المجهول',skip:'تخطي المقدمة',
  home:'البوابة',ascension:'الصعود',archive:'أرشيف المخطوطات',symbols:'موسوعة الرموز',forbidden:'الركن المحظور',vault:'الخزنة',mirror:'المرآة',lab:'معمل العقل',daily:'نصيحة اليوم',prophecy:'نبوءة اليوم',unknown:'المجهول',bookmarks:'المحفوظات',settings:'الإعدادات',about:'عن المشروع',contact:'تواصل',admin:'لوحة الإدارة',sealed:'الفصول المختومة',help:'مساعدة ودعم',sections:'الأقسام',tools:'الأدوات',
  search:'ابحث في الأرشيف…',tag:'THE UNIVERSE IS DARK. YOUR MIND IS DEEPER.',level:'المستوى الحالي',current:'المرحلة الحالية',next:'التالية',lessonsDone:'دروس مكتملة',of:'من',
  start:'ابدأ الدرس',done:'مكتمل',pending:'قيد المراجعة',reviewed:'تمت المراجعة',grade:'درجة الموثوقية',limits:'حدود الدراسة',practice:'تطبيق عملي',refs:'المصادر',check:'تحقق',correct:'إجابة صحيحة. تم احتساب الدرس في تقدمك.',wrong:'إجابة غير صحيحة، أعد قراءة الدرس وحاول مجدداً.',pick:'اختر إجابة',
  bookmark:'حفظ',unbookmark:'إزالة من المحفوظات',noBm:'لا توجد عناصر محفوظة بعد.',noRes:'لا نتائج.',
  disclaimer:'مادة تعليمية، وليست تشخيصاً طبياً أو نفسياً ولا بديلاً عن مختص.',
  lockedF:'يفتح الركن المحظور بعد المستوى 03.',lockedV:'تفتح الخزنة بعد المستوى 04.',locked:'مغلق',
  warnTitle:'تحذير الدخول',warnF:'هذا الركن يعرض تاريخ ممارسات خطرة بوصفها تاريخاً وبحثاً فقط، دون أي خطوات أو مقادير. لا شيء هنا دعوة للتجربة. بعض المواد قد تكون مزعجة. الوضع الهادئ متاح دائماً.',warnV:'الخزنة تشرح آليات التأثير والإكراه لتتعرف عليها وتقاومها. لا تستخدمها ضد أحد. إن كنت تمر بعلاقة مؤذية فراجع صفحة المساعدة.',breakSeal:'اكسر الختم',back:'رجوع',
  asWritten:'كما ورد في المخطوط',inMind:'ما كان يحدث فعلاً في العقل',context:'السياق',risk:'الخطر الموثق',scale:'الميزان',danger:'مقياس الخطر (1-5) على الممارس لا على الغير',
  hs:'الأهمية التاريخية',eq:'جودة الأدلة',pi:'الأثر النفسي',pr:'الخطر الجسدي',mm:'إساءة الاستخدام الحديثة',
  name:'الاسم الأصلي',date:'التاريخ التقريبي',attr:'النسبة',bg:'الخلفية',kind:'تاريخي أم اعتقاد',links:'الروابط',inst:'مؤسسات حافظة للمخطوطات (نقاط بحث، لم تُفتح سجلات بعينها بعد)',imgNote:'صور المخطوطات الأصلية غير متاحة بعد في هذا الإصدار: لن تُعرض صورة قبل التحقق من السجل الأصلي وحقوق الاستخدام.',
  filterAll:'الكل',filterPeriod:'الفترة',filterLang:'اللغة',
  mirrorQ:['ما الموقف الذي استفزك مؤخراً، وما الذي استفزّك فيه حقاً؟','ما القرار الذي تؤجله، وما الذي تخشاه فيه؟','متى قلت «نعم» وأنت تريد أن تقول «لا»؟','ما الذي تعتقده بشدة وتخشى أن تُسأل عن دليله؟','ما الذي تريد أن تفهمه عن نفسك هذا الشهر؟'],mirrorNote:'تُحفظ إجاباتك على جهازك فقط ولا تُرسل لأي جهة.',save:'حفظ',saved:'تم الحفظ',
  labStroop:'اختبار ستروب: اختر لون الحبر لا الكلمة',labBarnum:'تجربة Barnum: قيّم هذا الوصف',barnumText:'تميل أحياناً إلى الشك في نفسك رغم قوتك الظاهرة. لديك قدرات لم تستثمرها بعد. تحتاج إلى أن يحبك الناس ويعجبوا بك، وتميل أحياناً للانتقاد الذاتي.',barnumQ:'قيّم دقة هذا الوصف لك (1-5):',barnumReveal:'هذا الوصف مكتوب بعبارات عامة جداً تناسب أغلب الناس. هذا هو تأثير Barnum: نظن أن العبارات العامة شخصية جداً.',colorsAr:['أحمر','أخضر','أزرق','أصفر'],
  correctN:'صحيح',round:'جولة',
  unknownTxt:'المجهول: تاريخ وفلسفة وظواهر نفسية. تجد هنا مدخلاً لكل ما سبق مع تمييز ما هو موثق وما هو اعتقاد. ابدأ من إحدى هذه البوابات:',
  settingsTitle:'الإعدادات',lang:'اللغة',music:'مستوى الموسيقى',fx:'مستوى المؤثرات',soundOn:'تشغيل الصوت',dread:'نظام الرهبة (اختفاء النجوم، اهتزاز هادئ، همسات)',calm:'الوضع الهادئ (يطفئ كل مؤثرات الرعب)',reset:'مسح تقدمي وبياناتي',resetConfirm:'سيتم مسح التقدم والمحفوظات والإجابات من هذا الجهاز. متابعة؟',
  soundNote:'لا يبدأ أي صوت قبل أن تضغط تشغيل. الأصوات مولّدة برمجياً داخل الصفحة.',
  aboutTxt:['THE VOID أرشيف رقمي عن العقل البشري يمزج تاريخ المخطوطات الغامضة بعلم النفس والفلسفة. الجو مرعب بصرياً، لكن المحتوى تاريخي وعلمي.','القواعد: لا نشر لمعلومة بلا مصدر، ولا اختراع كتب أو اقتباسات، ولا تعليمات ضارة، ولا تشخيص. كل مدخل يحمل حالة مراجعة ودرجة موثوقية (A أصلي رقمي، B دراسة أكاديمية، C مصدر ثانوي، D غير مؤكد).','هذا الإصدار الأول يحوي عدداً محدوداً من المداخل. كل مدخل «قيد المراجعة» حتى تتم الموافقة عليه.'],
  contactTxt:'لا يوجد خادم لاستقبال الرسائل في هذا الموقع الثابت. للملاحظات أو تصحيح المعلومات افتح بلاغاً في صفحة المستودع على GitHub:',
  adminNote:'أداة تحرير محلية: الحالة تُحفظ في متصفحك فقط (موقع GitHub Pages ثابت بلا خادم أو كلمات مرور). للاعتماد الرسمي صدّر ملف المراجعة وأضِفه إلى المستودع. لا توجد أسرار في الواجهة.',
  exportJ:'تصدير JSON',approve:'اعتماد',reject:'رفض',backPending:'إرجاع للمراجعة',approved:'معتمد',rejected:'مرفوض',
  warden:{1:['هل أنت متأكد أنك تريد أن ترى؟','الأرشيف يتذكر من يزوره.','ابدأ بدرس واحد.'],2:['بدأت تلاحظ.','الحبر لا ينسى.','كل إجابة تترك أثراً.'],3:['الظل يقترب من الضوء.','ليس كل ختم يُكسر.','ما تتجنبه ينظر إليك.'],4:['أنت أبعد مما ظننت.','هنا يتوقف الضجيج.'],5:['لم يبقَ غير الفراغ، وأنت فيه.','نظرت طويلاً، فنظر إليك الفهم.']},
  nightTitle:'تنبيه راحة',nightTxt:'أنت هنا منذ ساعتين في وقت متأخر. خذ استراحة وانم جيداً. المحتوى سيبقى. وإن كنت تشعر بضيق فصفحة المساعدة في القائمة.',
  levelUp:'ارتقيت إلى المستوى',helpTxt:'إن كنت تمر بعلاقة مؤذية أو بضيق نفسي شديد فأنت لست وحدك. هذه روابط حقيقية، ويمكنك أيضاً الاتصال بخط المساعدة المحلي في بلدك أو خدمات الطوارئ.',
  lessonsTitle:'الدروس',cipher:'شيفرة قيصر: حرّك كل حرف 3 خطوات للخلف وافك الشفرة',sq:'المربع السحري 3×3: أكمل الأعداد 1-9 ليكون مجموع كل صف وعمود وقطر 15',planets:'أي كوكب يرمز له هذا الرمز؟',solved:'تم الحل',hiddenTitle:'الأرشيف الخفي',hiddenTxt:'وجدت الختم المخفي. عبارة «اعرف نفسك» (γνῶθι σεαυτόν) ارتبطت تقليدياً بمعبد أبولو في دلفي. هذه صفحة سرية بسيطة في هذا الإصدار، وسيضاف إليها حين تتحقق مصادرها.',
  prophecyTxt:'نبوءة اليوم: قراءة قصيرة بأسلوب مخطوطة، مأخوذة من مصادر الأرشيف ومشروحة. ليست تنبؤاً.',
  progressNote:'التقدم يُحسب بإكمال الدروس واجتياز الاختبارات القصيرة فقط.',notFound:'الصفحة غير موجودة',goHome:'العودة إلى البوابة',resume:'استكمل من حيث توقفت'},
 en:{quote:'There are things you cannot see because you never learned how to look.',sub:'Discover the depths of the human mind',enter:'Enter the unknown',skip:'Skip intro',
  home:'Gate',ascension:'Ascension',archive:'Manuscript archive',symbols:'Symbol encyclopedia',forbidden:'The Forbidden Archive',vault:'The Vault',mirror:'The Mirror',lab:'Mind Lab',daily:'Daily insight',prophecy:'Daily prophecy',unknown:'The Unknown',bookmarks:'Bookmarks',settings:'Settings',about:'About',contact:'Contact',admin:'Admin',sealed:'Sealed chapters',help:'Help & support',sections:'Sections',tools:'Tools',
  search:'Search the archive…',tag:'THE UNIVERSE IS DARK. YOUR MIND IS DEEPER.',level:'CURRENT LEVEL',current:'Current stage',next:'Next',lessonsDone:'lessons completed',of:'of',
  start:'Start lesson',done:'Completed',pending:'Pending review',reviewed:'Reviewed',grade:'Reliability grade',limits:'Limits of the evidence',practice:'Practice',refs:'Sources',check:'Check',correct:'Correct. The lesson counts toward your progress.',wrong:'Not correct. Re-read the lesson and try again.',pick:'Pick an answer',
  bookmark:'Save',unbookmark:'Remove bookmark',noBm:'No saved items yet.',noRes:'No results.',
  disclaimer:'Educational material, not a medical or psychological diagnosis and not a substitute for a professional.',
  lockedF:'The Forbidden Archive opens after Level 03.',lockedV:'The Vault opens after Level 04.',locked:'Locked',
  warnTitle:'Entry warning',warnF:'This section presents the history of dangerous practices as history and research only, with no steps or quantities. Nothing here invites you to try anything. Some material may be unsettling. Calm mode is always available.',warnV:'The Vault explains mechanisms of influence and coercion so you can recognise and resist them. Do not use them on anyone. If you are in an abusive relationship see the help page.',breakSeal:'Break the seal',back:'Back',
  asWritten:'As written in the manuscript',inMind:'What actually happened in the mind',context:'Context',risk:'Documented risk',scale:'The scale',danger:'Danger meter (1-5): risk to the practitioner, not to others',
  hs:'Historical significance',eq:'Evidence quality',pi:'Psychological impact',pr:'Physical risk',mm:'Modern misuse',
  name:'Original name',date:'Approximate date',attr:'Attribution',bg:'Background',kind:'Historical or belief',links:'Links',inst:'Holding institutions (search entry points; individual records not yet opened)',imgNote:'Original manuscript images are not available yet in this release: no image is shown before the source record and usage rights are verified.',
  filterAll:'All',filterPeriod:'Period',filterLang:'Language',
  mirrorQ:['What situation provoked you recently, and what really provoked you in it?','What decision are you postponing, and what do you fear in it?','When did you say yes while wanting to say no?','What do you believe strongly but fear being asked evidence for?','What do you want to understand about yourself this month?'],mirrorNote:'Your answers are saved on this device only and are never sent anywhere.',save:'Save',saved:'Saved',
  labStroop:'Stroop test: pick the ink colour, not the word',labBarnum:'Barnum experiment: rate this description',barnumText:'You sometimes doubt yourself despite your apparent strength. You have abilities you have not yet used. You need people to like and admire you, and you can be self-critical.',barnumQ:'Rate how accurate this is for you (1-5):',barnumReveal:'This description is written in very general terms that fit most people. This is the Barnum effect: we take generic statements as highly personal.',colorsAr:['Red','Green','Blue','Yellow'],
  correctN:'Correct',round:'Round',
  unknownTxt:'The Unknown: history, philosophy and psychological phenomena. Entry points to everything above, with the documented kept apart from the believed. Start at one of these gates:',
  settingsTitle:'Settings',lang:'Language',music:'Music level',fx:'Effects level',soundOn:'Sound on',dread:'Dread system (fading stars, quiet shake, whispers)',calm:'Calm mode (turns off all horror effects)',reset:'Erase my progress and data',resetConfirm:'This erases progress, bookmarks and answers from this device. Continue?',
  soundNote:'Nothing plays until you press play. Sounds are generated in the page itself.',
  aboutTxt:['THE VOID is a digital archive on the human mind that mixes the history of mysterious manuscripts with psychology and philosophy. The mood is visually frightening, but the content is historical and scientific.','Rules: no claim without a source, no invented books or quotes, no harmful instructions, no diagnosis. Every entry has a review status and a reliability grade (A original digital, B academic study, C secondary source, D uncertain).','This first release has a limited number of entries. Every entry is "pending review" until approved.'],
  contactTxt:'This static site has no server to receive messages. For feedback or corrections open an issue on the GitHub repository page:',
  adminNote:'A local editorial tool: state is saved in your browser only (GitHub Pages is static, with no server or passwords). For official approval export the review file and add it to the repository. No secrets in the front end.',
  exportJ:'Export JSON',approve:'Approve',reject:'Reject',backPending:'Back to pending',approved:'Approved',rejected:'Rejected',
  warden:{1:['Are you sure you want to see?','The archive remembers its visitors.','Start with one lesson.'],2:['You begin to notice.','Ink does not forget.','Every answer leaves a mark.'],3:['The shadow nears the light.','Not every seal should be broken.','What you avoid is looking at you.'],4:['You are further than you thought.','Here the noise stops.'],5:['Only the void is left, and you are in it.','You looked long, and understanding looked back.']},
  nightTitle:'Rest reminder',nightTxt:'You have been here two hours, late at night. Take a break and sleep well. The content will wait. If you feel distressed, the help page is in the menu.',
  levelUp:'You reached level',helpTxt:'If you are in an abusive relationship or in severe distress you are not alone. These are real links; you can also call your local helpline or emergency services.',
  lessonsTitle:'Lessons',cipher:'Caesar cipher: shift each letter back 3 places to decode',sq:'3x3 magic square: fill 1-9 so every row, column and diagonal sums to 15',planets:'Which planet does this symbol stand for?',solved:'Solved',hiddenTitle:'The Hidden Archive',hiddenTxt:'You found the hidden seal. The phrase "know thyself" (gnothi seauton) has traditionally been linked to the temple of Apollo at Delphi. This is a simple secret page in this release; more will be added once sources are verified.',
  prophecyTxt:'Daily prophecy: a short manuscript-style reading drawn from archive sources and explained. It is not a prediction.',
  progressNote:'Progress counts only completed lessons and passed short quizzes.',notFound:'Page not found',goHome:'Back to the gate',resume:'Resume where you left off'}
};
var L=function(){return S.lang};
var t=function(k){var v=T[L()][k];return v==null?(T.en[k]||k):v};
var pick=function(o,k){return o[k+'_'+L()]||o[k+'_ar']||''};

/* ---------- levels ---------- */
function doneCount(){return D.lessons.filter(function(l){return S.done[l.id]}).length}
function levelNow(){var c=doneCount(),lv=1;D.levels.forEach(function(x){if(c>=x.need)lv=x.n});return lv}
function lvlName(n){var o=D.levels[n-1];return L()==='ar'?o.ar:o.en}

/* ---------- sky ---------- */
function startSky(cv,opts){
 var ctx=cv.getContext('2d'),w,h,stars=[],mx=0,my=0,raf,run=true,t0=0;
 var low=(navigator.hardwareConcurrency||4)<=4||(navigator.deviceMemory||4)<=2;
 function size(){var r=Math.min(window.devicePixelRatio||1,low?1:1.5);w=cv.width=Math.floor(innerWidth*r);h=cv.height=Math.floor(innerHeight*r);
  var n=Math.floor(w*h/(low?9000:5500));stars=[];for(var i=0;i<n;i++)stars.push({x:Math.random()*w,y:Math.random()*h,z:Math.random(),p:Math.random()*6.28,s:.4+Math.random()*1.4,k:Math.random()})}
 size();addEventListener('resize',size);
 addEventListener('mousemove',function(e){mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
 function frame(ts){
  if(!run)return;
  t0=t0||ts;
  var calm=document.body.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vis=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--stars'))||1;
  ctx.clearRect(0,0,w,h);
  var a=calm?0:ts/1000;
  var cx=w*.5,cy=h*.5,R=Math.max(w,h)*.55;
  ctx.save();ctx.translate(cx-mx*40,cy-my*40);ctx.rotate(a*.02);
  for(var i=0;i<3;i++){var rr=R*(.5+i*.25),g=ctx.createRadialGradient(0,0,0,0,0,rr);g.addColorStop(0,'rgba(118,82,181,'+((.22-i*.05)*(opts.glow||1))+')');g.addColorStop(.5,'rgba(23,15,42,'+(.18-i*.04)+')');g.addColorStop(1,'rgba(2,2,4,0)');
   ctx.save();ctx.scale(1.6-i*.2,.7+i*.15);ctx.rotate(i*1.1);ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,rr,0,6.28);ctx.fill();ctx.restore()}
  ctx.restore();
  for(var j=0;j<stars.length;j++){var s=stars[j];if(s.k>vis&&!opts.full)continue;
   var tw=calm?.8:.55+.45*Math.sin(a*1.5+s.p);var op=opts.fade?Math.min(1,Math.max(0,(ts-t0)/6000))*tw*s.z:tw*(.3+.7*s.z);
   ctx.globalAlpha=op;ctx.fillStyle=s.k>.93?'#c8b6ff':(s.k<.05?'#e8d9b0':'#fff');
   ctx.fillRect(s.x-mx*s.z*30*(w/1000),s.y-my*s.z*30*(w/1000),s.s*s.z+.4,s.s*s.z+.4)}
  ctx.globalAlpha=1;
  if(calm&&!opts.full){run=false;return}
  raf=requestAnimationFrame(frame)}
 raf=requestAnimationFrame(frame);
 document.addEventListener('visibilitychange',function(){if(document.hidden){cancelAnimationFrame(raf)}else if(run){raf=requestAnimationFrame(frame)}});
 return {stop:function(){run=false;cancelAnimationFrame(raf)},resume:function(){if(!run){run=true;raf=requestAnimationFrame(frame)}}}
}
var skyMain;

/* ---------- seal + human drawing ---------- */
function sealSVG(){
 var s='<g fill="none" stroke="#a68a55" stroke-width="1.2"><circle cx="100" cy="100" r="92"/><circle cx="100" cy="100" r="84" stroke-dasharray="2 5"/><circle cx="100" cy="100" r="60"/>';
 for(var i=0;i<12;i++){var a=i*Math.PI/6;s+='<line x1="'+(100+60*Math.cos(a))+'" y1="'+(100+60*Math.sin(a))+'" x2="'+(100+84*Math.cos(a))+'" y2="'+(100+84*Math.sin(a))+'"/>'}
 s+='<polygon points="100,40 152,130 48,130" stroke="#7652b5"/><polygon points="100,160 48,70 152,70" stroke="#7652b5"/><circle cx="100" cy="100" r="14" stroke="#b9b9c5"/><circle cx="100" cy="100" r="3" fill="#a68a55"/></g>';
 return s}
function humanSVG(lv){
 var ink=lv===1?'#8d8878':(lv===5?'#5a4a85':'#b9b9c5'), gold=lv===1?'#6e6247':'#a68a55', vio=lv>=2?'#7652b5':'#4b4660';
 var o='<svg class="human" viewBox="0 0 400 420" role="img" aria-label="'+esc(t('level'))+' '+lv+'">';
 o+='<defs><radialGradient id="halo"><stop offset="0" stop-color="#7652b5" stop-opacity=".55"/><stop offset="1" stop-color="#020204" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="void"><stop offset="0" stop-color="#000"/><stop offset=".6" stop-color="#07070d"/><stop offset="1" stop-color="#170f2a" stop-opacity="0"/></radialGradient>'+
 '<filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
 o+='<rect width="400" height="420" fill="'+(lv===1?'#1b170e':'#05050a')+'" opacity="'+(lv===1?'.55':'.4')+'"/>';
 if(lv>=4)o+='<circle cx="200" cy="210" r="190" fill="url(#halo)"/>';
 if(lv===5){o+='<g class="ring r2" opacity=".6">';for(var g=0;g<4;g++)o+='<ellipse cx="200" cy="210" rx="'+(190-g*22)+'" ry="'+(60+g*14)+'" fill="none" stroke="#7652b5" stroke-width=".8" transform="rotate('+(g*45)+' 200 210)"/>';o+='</g><circle cx="200" cy="210" r="120" fill="url(#void)"/>'}
 o+='<g fill="none" stroke="'+gold+'" stroke-width="1" '+(lv>=2?'filter="url(#glow)"':'')+'>';
 o+='<g class="ring r1"><circle cx="200" cy="210" r="188" stroke-dasharray="3 6"/><circle cx="200" cy="210" r="176"/>';
 var pl=['☉','☽','☿','♀','♂','♃','♄','♅'];
 for(var i=0;i<8;i++){var a=i*Math.PI/4-Math.PI/2;o+='<text x="'+(200+182*Math.cos(a))+'" y="'+(215+182*Math.sin(a))+'" fill="'+gold+'" stroke="none" font-size="14" text-anchor="middle" font-family="serif">'+pl[i]+'</text>'}
 o+='</g>';
 o+='<rect x="52" y="62" width="296" height="296" '+(lv===1?'opacity=".6"':'')+'/>';
 if(lv>=2)o+='<g class="ring r2"><polygon points="200,40 340,290 60,290" opacity=".7"/><polygon points="200,380 60,130 340,130" opacity=".7"/></g>';
 if(lv>=4){o+='<g class="ring r1" stroke="'+vio+'"><circle cx="200" cy="210" r="150"/><circle cx="200" cy="210" r="132" stroke-dasharray="1 4"/>';for(var k=0;k<24;k++){var b=k*Math.PI/12;o+='<line x1="'+(200+132*Math.cos(b))+'" y1="'+(210+132*Math.sin(b))+'" x2="'+(200+150*Math.cos(b))+'" y2="'+(210+150*Math.sin(b))+'"/>'}o+='</g>'}
 o+='</g>';
 function limbs(dx,op,col){
  var s='<g class="limbs" fill="none" stroke="'+col+'" stroke-width="'+(lv===5?3:2.2)+'" stroke-linecap="round" stroke-linejoin="round" opacity="'+op+'" transform="translate('+dx+' 0)">';
  [[-1,0],[1,0],[-1,1],[1,1]].forEach(function(m){var sx=m[0],hi=m[1],ex,ey,hx,hy;
   if(!hi){ex=sx*70;ey=170;hx=sx*150;hy=165}else{ex=sx*70;ey=105;hx=sx*128;hy=70}
   s+='<path d="M'+(200+sx*18)+' 150 L'+(200+ex)+' '+ey+' L'+(200+hx)+' '+hy+'"/><circle cx="'+(200+hx)+'" cy="'+hy+'" r="4"/>'});
  [[-1,0],[1,0],[-1,1],[1,1]].forEach(function(m){var sx=m[0],wd=m[1];var kx=wd?sx*58:sx*30,ky=wd?285:300,fx=wd?sx*118:sx*44,fy=wd?345:372;
   s+='<path d="M'+(200+sx*10)+' 250 L'+(200+kx)+' '+ky+' L'+(200+fx)+' '+fy+'"/><circle cx="'+(200+fx)+'" cy="'+fy+'" r="4"/>'});
  return s+'</g>'}
 if(lv>=3)o+=limbs(7,.35,vio);
 o+=limbs(0,lv===5?.95:.9,ink);
 o+='<g fill="'+(lv===5?'#000':'none')+'" stroke="'+ink+'" stroke-width="2"><ellipse cx="200" cy="200" rx="30" ry="62"/><circle cx="200" cy="108" r="23"/></g><g fill="none" stroke="'+gold+'" stroke-width="1.1" opacity=".9">';
 for(var r=0;r<5;r++){var yy=160+r*14;o+='<path d="M170 '+yy+' Q200 '+(yy+12)+' 230 '+yy+'"/>'}
 o+='<line x1="200" y1="140" x2="200" y2="250"/><circle cx="200" cy="108" r="30" stroke-dasharray="2 4"/><path d="M186 106 Q200 98 214 106 Q200 114 186 106Z"/><circle cx="200" cy="106" r="2.5" fill="'+gold+'"/>';
 if(lv>=2)o+='<path d="M195 190 q5 -9 10 0 q-5 12 -10 0z" stroke="'+vio+'"/>';
 o+='</g>';
 if(lv>=3){o+='<g opacity=".25" fill="#000">';for(var z=0;z<5;z++)o+='<ellipse cx="'+(120+z*40)+'" cy="'+(380-z%2*10)+'" rx="40" ry="10"/>';o+='</g>'}
 o+='<g class="hidden-sigil" id="hsig" tabindex="0" role="button" aria-label="sigil"><circle cx="372" cy="396" r="9" fill="none" stroke="#a68a55"/><path d="M366 396h12M372 390v12" stroke="#a68a55"/></g>';
 return o+'</svg>'}

/* ---------- audio ---------- */
var A={ctx:null,master:null,musicG:null,fxG:null,noise:null};
function audioInit(){
 if(A.ctx)return;var C=window.AudioContext||window.webkitAudioContext;if(!C)return;
 var c=A.ctx=new C();A.master=c.createGain();A.master.gain.value=0;A.master.connect(c.destination);
 A.musicG=c.createGain();A.fxG=c.createGain();A.musicG.connect(A.master);A.fxG.connect(A.master);
 [55,55.4,82.5].forEach(function(f,i){var o=c.createOscillator();o.type=i<2?'sawtooth':'sine';o.frequency.value=f;var lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=160;var g=c.createGain();g.gain.value=i<2?.07:.05;o.connect(lp);lp.connect(g);g.connect(A.musicG);o.start()});
 var buf=c.createBuffer(1,c.sampleRate*2,c.sampleRate),d=buf.getChannelData(0);for(var i=0;i<d.length;i++)d[i]=Math.random()*2-1;A.noise=buf;
 var n=c.createBufferSource();n.buffer=buf;n.loop=true;var bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=380;bp.Q.value=.7;var ng=c.createGain();ng.gain.value=.05;
 var lfo=c.createOscillator();lfo.frequency.value=.07;var lg=c.createGain();lg.gain.value=.04;lfo.connect(lg);lg.connect(ng.gain);lfo.start();n.connect(bp);bp.connect(ng);ng.connect(A.musicG);n.start();
 applyAudio();
}
function applyAudio(){if(!A.ctx)return;var m=S.set.sound?1:0;A.master.gain.setTargetAtTime(m*.8,A.ctx.currentTime,.4);A.musicG.gain.value=S.set.music;A.fxG.gain.value=S.set.fx}
function fx(kind){
 if(!A.ctx||!S.set.sound)return;var c=A.ctx,now=c.currentTime;
 if(kind==='bell'){[392,587,880].forEach(function(f,i){var o=c.createOscillator();o.type='sine';o.frequency.value=f*(i?1.003:1);var g=c.createGain();g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.16/(i+1),now+.03);g.gain.exponentialRampToValueAtTime(.0001,now+3);o.connect(g);g.connect(A.fxG);o.start(now);o.stop(now+3.1)})}
 else{var n=c.createBufferSource();n.buffer=A.noise;var f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=kind==='page'?2400:900;f.Q.value=kind==='page'?.6:3;var g=c.createGain();var dur=kind==='page'?.35:1.8;var peak=kind==='page'?.12:.05*(.5+levelNow()*.3);g.gain.setValueAtTime(.0001,now);g.gain.linearRampToValueAtTime(peak,now+dur*.3);g.gain.linearRampToValueAtTime(.0001,now+dur);n.connect(f);f.connect(g);g.connect(A.fxG);n.start(now);n.stop(now+dur+.1)}
}
var whisperTimer;
function whisperLoop(){clearTimeout(whisperTimer);if(!A.ctx||!S.set.sound||S.set.calm||!S.set.dread)return;
 whisperTimer=setTimeout(function(){fx('whisper');whisperLoop()},Math.max(9000,45000-levelNow()*8000)+Math.random()*8000)}

/* ---------- dread / calm ---------- */
function applyDread(){
 var lv=levelNow(),b=document.body;b.setAttribute('data-level',lv);
 b.classList.toggle('calm',!!S.set.calm);
 var vis=(S.set.dread&&!S.set.calm)?Math.max(.35,1-(lv-1)*.16):1;
 document.documentElement.style.setProperty('--stars',vis);
 var v=$('#view');if(v)v.classList.toggle('tremor',!!(S.set.dread&&!S.set.calm&&lv>=3));
 $('#calmBtn').classList.toggle('on',!!S.set.calm);$('#soundBtn').classList.toggle('on',!!S.set.sound);
 $('#calmBtn').title=t('calm');$('#calmBtn').setAttribute('aria-label',t('calm'));
 $('#soundBtn').title=t('soundOn');$('#soundBtn').setAttribute('aria-label',t('soundOn'));
 if(skyMain&&!S.set.calm)skyMain.resume();
 whisperLoop()}

/* ---------- language ---------- */
function applyLang(){
 var h=document.documentElement;h.lang=L();h.dir=L()==='ar'?'rtl':'ltr';
 $('#langBtn').textContent=L()==='ar'?'EN':'عربي';$('#langBtn').setAttribute('aria-label',L()==='ar'?'English':'العربية');
 $('#searchBox').placeholder=t('search');$('#searchBox').setAttribute('aria-label',t('search'));
 var iq=$('#introQuote');if(iq){iq.textContent=t('quote');$('#introSub').textContent=t('sub');$('#enterBtn').textContent=t('enter');$('#skipBtn').textContent=t('skip')}
 $('#foot').textContent='THE VOID · '+t('tag')+' · '+t('disclaimer');
 document.title='THE VOID — '+(L()==='ar'?'أرشيف العقل البشري':'The Archive of the Human Mind');
 buildNav()}

/* ---------- nav ---------- */
function route(){var h=(location.hash||'#/').slice(1)||'/';var p=h.split('/');return {path:h.split('?')[0],parts:p.slice(1),h:h}}
function buildNav(){
 var lv=levelNow(),r=route().path;
 function a(h,ic,label,lock){return '<a href="#'+h+'" class="'+(r===h?'active':'')+'"><span>'+ic+'</span>'+esc(label)+(lock?'<span class="lock">⛓</span>':'')+'</a>'}
 var s=a('/','◈',t('home'))+a('/ascension','☉',t('ascension'));
 s+='<div class="sec">'+esc(t('sections'))+'</div>';
 D.sections.forEach(function(x){s+=a('/section/'+x.id,'✦',L()==='ar'?x.ar:x.en)});
 s+=a('/archive','☿',t('archive'))+a('/symbols','♄',t('symbols'));
 s+=a('/forbidden','✠',t('forbidden'),lv<3)+a('/vault','❖',t('vault'),lv<4);
 s+='<div class="sec">'+esc(t('tools'))+'</div>';
 s+=a('/mirror','◯',t('mirror'))+a('/lab','⚗',t('lab'))+a('/daily','☼',t('daily'))+a('/prophecy','☽',t('prophecy'))+a('/sealed','⌘',t('sealed'))+a('/unknown','?',t('unknown'));
 s+='<div class="sec">·</div>'+a('/bookmarks','★',t('bookmarks'))+a('/settings','⚙',t('settings'))+a('/help','♡',t('help'))+a('/about','i',t('about'))+a('/contact','✉',t('contact'))+a('/admin','▣',t('admin'));
 $('#side').innerHTML=s}

/* ---------- helpers for views ---------- */
function secName(id){var x=D.sections.filter(function(s){return s.id===id})[0];return x?(L()==='ar'?x.ar:x.en):id}
function status(e){var r=S.review[e.id];if(r==='approved')return '<span class="tag ok">'+esc(t('approved'))+'</span>';if(r==='rejected')return '<span class="tag">'+esc(t('rejected'))+'</span>';return '<span class="tag pending">'+esc(t('pending'))+'</span>'}
function bmBtn(id){var on=S.bm.indexOf(id)>-1;return '<button class="btn small" data-bm="'+esc(id)+'">'+esc(on?t('unbookmark'):t('bookmark'))+' ★</button>'}
function linkList(arr){if(!arr||!arr.length)return '';return '<ul>'+arr.map(function(x){return x[1]?'<li><a href="'+esc(x[1])+'" target="_blank" rel="noopener noreferrer">'+esc(x[0])+'</a></li>':'<li>'+esc(x[0])+'</li>'}).join('')+'</ul>'}
function today(){var d=new Date();return Math.floor((d-new Date(d.getFullYear(),0,0))/864e5)}
function linkify(s){return esc(s).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')}
function meter(n){var s='<div class="meter" aria-label="'+n+'/5">';for(var i=1;i<=5;i++)s+='<i class="'+(i<=n?'on':'')+'"></i>';return s+'</div>'}
var sessionStart=Date.now(),unlockedF=false,unlockedV=false;

/* ---------- views ---------- */
var V={};
V.home=function(){
 var lv=levelNow(),c=doneCount(),tot=D.lessons.length,nx=D.levels[lv]||null;
 var pct=Math.round(c/tot*100);
 var next=D.lessons.filter(function(l){return !S.done[l.id]})[0];
 return '<section class="hero"><div>'+humanSVG(lv)+'</div><div><p class="lvl" dir="ltr">'+esc(t('tag'))+'</p><h1 style="margin:.2em 0">THE VOID</h1><p>'+esc(t('sub'))+'. '+esc(t('quote'))+'</p>'+
 '<div class="panel"><div class="lvl">'+esc(t('level'))+'</div><div class="lvlnum">'+('0'+lv)+'</div><div class="lvl">'+esc(lvlName(lv))+'</div>'+
 '<div class="bar" role="progressbar" aria-valuenow="'+pct+'" aria-valuemin="0" aria-valuemax="100"><i style="width:'+pct+'%"></i></div>'+
 '<div class="dots">'+D.levels.map(function(x){return '<b class="'+(x.n<=lv?'on':'')+'"></b>'}).join('')+'</div>'+
 '<p style="text-align:center;margin:.2em">'+esc(t('current'))+': '+esc(lvlName(lv))+(nx?' · '+esc(t('next'))+': '+esc(lvlName(lv+1)):'')+'<br>'+c+' '+esc(t('of'))+' '+tot+' '+esc(t('lessonsDone'))+'</p></div>'+
 (next?'<a class="btn gold" href="#/lesson/'+next.id+'" style="display:inline-block">'+esc(c?t('resume'):t('start'))+'</a>':'')+'</div></section>'+
 '<h2>'+esc(t('sections'))+'</h2><div class="cards">'+D.sections.map(function(s){var n=D.lessons.filter(function(l){return l.sec===s.id}).length;return '<a class="card" href="#/section/'+s.id+'"><h3>'+esc(L()==='ar'?s.ar:s.en)+'</h3><p>'+esc(pick(s,'d'))+'</p><span class="meta">'+n+' '+esc(t('lessonsTitle'))+'</span></a>'}).join('')+
 '<a class="card '+(lv<3?'locked':'')+'" href="#/forbidden"><h3>✠ '+esc(t('forbidden'))+'</h3><p>'+esc(lv<3?t('lockedF'):t('warnF').slice(0,90)+'…')+'</p></a>'+
 '<a class="card '+(lv<4?'locked':'')+'" href="#/vault"><h3>❖ '+esc(t('vault'))+'</h3><p>'+esc(lv<4?t('lockedV'):t('warnV').slice(0,90)+'…')+'</p></a></div>'+
 '<p class="meta">'+esc(t('progressNote'))+'</p>'};

V.section=function(id){
 var s=D.sections.filter(function(x){return x.id===id})[0];if(!s)return V.nf();
 return '<h1>'+esc(L()==='ar'?s.ar:s.en)+'</h1><p>'+esc(pick(s,'d'))+'</p><div class="cards">'+D.lessons.filter(function(l){return l.sec===id}).map(lessonCard).join('')+'</div>'};
function lessonCard(l){return '<a class="card" href="#/lesson/'+l.id+'"><span class="meta">'+esc(secName(l.sec))+' · '+esc(t('grade'))+' '+esc(l.grade)+'</span><h3>'+esc(pick(l,'t'))+'</h3>'+(S.done[l.id]?'<span class="tag ok">✓ '+esc(t('done'))+'</span>':'')+status(l)+'</a>'}

V.lesson=function(id){
 var l=D.lessons.filter(function(x){return x.id===id})[0];if(!l)return V.nf();
 var b=L()==='ar'?l.body_ar:l.body_en,q=l.quiz,o=L()==='ar'?q.o_ar:q.o_en;
 return '<p class="meta"><a href="#/section/'+l.sec+'">'+esc(secName(l.sec))+'</a></p><h1>'+esc(pick(l,'t'))+'</h1><p>'+status(l)+'<span class="tag">'+esc(t('grade'))+': '+esc(l.grade)+'</span> '+bmBtn(l.id)+'</p>'+
 b.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')+
 '<div class="panel"><h3>'+esc(t('practice'))+'</h3><p>'+esc(pick(l,'practice'))+'</p><h3>'+esc(t('limits'))+'</h3><p>'+esc(pick(l,'limits'))+'</p><h3>'+esc(t('refs'))+'</h3><ul>'+l.refs.map(function(r){return '<li>'+linkify(r)+'</li>'}).join('')+'</ul></div>'+
 '<form class="panel quiz" id="quiz" data-id="'+l.id+'"><h3>'+esc(pick(q,'q'))+'</h3>'+o.map(function(x,i){return '<label><input type="radio" name="a" value="'+i+'"> '+esc(x)+'</label>'}).join('')+
 '<p><button class="btn gold" type="submit">'+esc(t('check'))+'</button></p><p id="qres" role="status">'+(S.done[l.id]?'<span class="good">✓ '+esc(t('done'))+'</span>':'')+'</p></form>'};

V.ascension=function(){
 var lv=levelNow();
 return '<h1>'+esc(t('ascension'))+'</h1><p>'+esc(t('progressNote'))+'</p><div class="cards">'+D.levels.map(function(x){var on=x.n<=lv;return '<div class="card '+(on?'':'locked')+'"><span class="meta">LEVEL 0'+x.n+'</span><h3>'+esc(L()==='ar'?x.ar:x.en)+'</h3><p>'+x.need+' '+esc(t('lessonsDone'))+'</p>'+(on?'<span class="tag ok">✓</span>':'')+'</div>'}).join('')+'</div>'+
 '<h2>'+esc(t('lessonsTitle'))+'</h2><div class="cards">'+D.lessons.map(lessonCard).join('')+'</div>'};

V.archive=function(){
 var fp=(S.fp||'all'),fl=(S.fl||'all');
 var periods=['all'],langs=['all'];D.manuscripts.forEach(function(m){if(periods.indexOf(m.period)<0)periods.push(m.period);m.lang.split('/').forEach(function(x){if(langs.indexOf(x)<0)langs.push(x)})});
 var list=D.manuscripts.filter(function(m){return (fp==='all'||m.period===fp)&&(fl==='all'||m.lang.split('/').indexOf(fl)>-1)});
 function sel(id,arr,cur,lab){return '<label>'+esc(lab)+' <select id="'+id+'">'+arr.map(function(x){return '<option value="'+esc(x)+'"'+(x===cur?' selected':'')+'>'+esc(x==='all'?t('filterAll'):x)+'</option>'}).join('')+'</select></label>'}
 return '<h1>'+esc(t('archive'))+'</h1><div class="panel"><p>'+esc(t('imgNote'))+'</p></div><div class="row">'+sel('fp',periods,fp,t('filterPeriod'))+sel('fl',langs,fl,t('filterLang'))+'</div>'+
 '<div class="cards">'+list.map(function(m){return '<a class="card" href="#/manuscript/'+m.id+'"><span class="meta">'+esc(m.period)+' · '+esc(m.lang)+'</span><h3>'+esc(pick(m,'t'))+'</h3><p style="font-size:.8em;direction:ltr;text-align:start">'+esc(m.name_orig)+'</p>'+status(m)+'</a>'}).join('')+'</div>'+
 '<h2>'+esc(t('inst'))+'</h2>'+linkList(D.institutions)};
V.manuscript=function(id){
 var m=D.manuscripts.filter(function(x){return x.id===id})[0];if(!m)return V.nf();
 return '<p><a href="#/archive">← '+esc(t('archive'))+'</a></p><h1>'+esc(pick(m,'t'))+'</h1><p>'+status(m)+bmBtn(m.id)+'</p>'+
 '<table class="idx"><tr><th>'+esc(t('name'))+'</th><td dir="ltr">'+esc(m.name_orig)+'</td></tr><tr><th>'+esc(t('date'))+'</th><td>'+esc(pick(m,'date'))+'</td></tr><tr><th>'+esc(t('attr'))+'</th><td>'+esc(pick(m,'attr'))+'</td></tr></table>'+
 '<h3>'+esc(t('bg'))+'</h3><p>'+esc(pick(m,'bg'))+'</p><h3>'+esc(t('kind'))+'</h3><p>'+esc(pick(m,'kind'))+'</p><div class="panel"><p>'+esc(t('imgNote'))+'</p></div><h3>'+esc(t('links'))+'</h3>'+linkList(m.links)+'<p class="meta">'+esc(t('disclaimer'))+'</p>'};
V.symbols=function(){
 return '<h1>'+esc(t('symbols'))+'</h1><div class="cards">'+D.symbols.map(function(s){return '<div class="card"><div class="glyph" dir="ltr">'+esc(s.g)+'</div><h3>'+esc(L()==='ar'?s.ar:s.en)+'</h3><p>'+esc(pick(s,'note'))+'</p>'+status({id:'s'+s.g})+'</div>'}).join('')+'</div><p class="meta">'+esc(L()==='ar'?'هذه رموز نصية قياسية، وليست صور مخطوطات. أقدم ظهور موثق والمخطوطات الحاضنة تُضاف بعد التحقق من السجلات.':'These are standard text glyphs, not manuscript images. Earliest documented appearance and host manuscripts will be added after records are verified.')+'</p>'};

function gate(kind){
 var lv=levelNow(),need=kind==='forbidden'?3:4;
 if(lv<need)return '<div class="panel" style="text-align:center"><div class="glyph">⛓</div><h1>'+esc(t(kind))+'</h1><p>'+esc(kind==='forbidden'?t('lockedF'):t('lockedV'))+'</p><a class="btn" href="#/ascension">'+esc(t('ascension'))+'</a></div>';
 if(kind==='forbidden'?unlockedF:unlockedV)return null;
 return '<div class="panel" style="text-align:center"><div class="glyph" id="sealg" style="font-size:5rem">✠</div><h1>'+esc(t('warnTitle'))+'</h1><p>'+esc(kind==='forbidden'?t('warnF'):t('warnV'))+'</p><button class="btn gold" id="breakBtn" data-k="'+kind+'">'+esc(t('breakSeal'))+'</button> <a class="btn ghost" href="#/">'+esc(t('back'))+'</a></div>'}
V.forbidden=function(){
 var g=gate('forbidden');if(g)return g;
 return '<h1>✠ '+esc(t('forbidden'))+'</h1><p>'+esc(t('disclaimer'))+'</p><div class="cards">'+D.forbidden.map(function(f){return '<a class="card" href="#/f/'+f.id+'"><span class="meta">'+esc(t('grade'))+' '+esc(f.grade)+'</span><h3>'+esc(pick(f,'t'))+'</h3>'+meter(f.danger)+status(f)+'</a>'}).join('')+'</div>'};
V.f=function(id){
 var g=gate('forbidden');if(g)return g;
 var f=D.forbidden.filter(function(x){return x.id===id})[0];if(!f)return V.nf();
 function row(k,v){return '<tr><th>'+esc(t(k))+'</th><td>'+meter(v)+'</td></tr>'}
 return '<p><a href="#/forbidden">← '+esc(t('forbidden'))+'</a></p><h1>'+esc(pick(f,'t'))+'</h1><p>'+status(f)+bmBtn(f.id)+'</p>'+
 '<div class="split"><div><h3>'+esc(t('asWritten'))+'</h3><p>'+esc(pick(f,'src'))+'</p></div><div><h3>'+esc(t('inMind'))+'</h3><p>'+esc(pick(f,'mind'))+'</p></div></div>'+
 '<h3>'+esc(t('context'))+'</h3><p>'+esc(pick(f,'ctx'))+'</p><h3>'+esc(t('risk'))+'</h3><p>'+esc(pick(f,'risk'))+'</p><h3>'+esc(t('scale'))+'</h3><p>'+esc(pick(f,'scale'))+'</p>'+
 '<h3>'+esc(t('danger'))+'</h3>'+meter(f.danger)+'<table class="idx">'+row('hs',f.hist)+row('eq',f.evid)+row('pi',f.psych)+row('pr',f.phys)+row('mm',f.misuse)+'</table>'+
 '<h3>'+esc(t('refs'))+'</h3>'+linkList(f.links)+'<p class="meta">'+esc(t('grade'))+': '+esc(f.grade)+'</p>'};
V.vault=function(){
 var g=gate('vault');if(g)return g;
 return '<h1>❖ '+esc(t('vault'))+'</h1><p>'+esc(t('warnV'))+'</p><div class="cards">'+D.vault.map(function(v,i){return '<a class="card" href="#/v/'+i+'"><h3>'+esc(L()==='ar'?v[0]:v[1])+'</h3>'+status({id:'v'+i})+'</a>'}).join('')+'</div>'};
V.v=function(i){
 var g=gate('vault');if(g)return g;var v=D.vault[+i];if(!v)return V.nf();
 var ar=L()==='ar';
 return '<p><a href="#/vault">← '+esc(t('vault'))+'</a></p><h1>'+esc(ar?v[0]:v[1])+'</h1><p>'+status({id:'v'+i})+bmBtn('v'+i)+'</p>'+
 '<h3>'+esc(t('refs'))+'</h3><p>'+linkify(v[2])+'</p><h3>'+esc(ar?'كيف تعمل':'How it works')+'</h3><p>'+esc(ar?v[3]:v[4])+'</p><h3>'+esc(ar?'خطة الدفاع':'Defence plan')+'</h3><p>'+esc(ar?v[5]:v[6])+'</p>'+
 '<div class="panel"><p>'+esc(ar?'هذا الملخص مختصر. الحقول الكاملة (الإشارات، الحالة الموثقة، الأثر، جمل الرد) تُضاف مع كل دفعة بحث، وبعد التحقق من مصدرين مستقلين، وتبقى «قيد المراجعة».':'This summary is brief. The full fields (signs, documented case, impact, reply phrases) are added with each research batch after two independent sources are checked, and stay "pending review".')+'</p></div><p><a href="#/help">'+esc(t('help'))+'</a></p>'};

V.mirror=function(){
 var q=T[L()].mirrorQ;
 return '<h1>'+esc(t('mirror'))+'</h1><p>'+esc(t('mirrorNote'))+'</p><form id="mirrorForm">'+q.map(function(x,i){return '<div class="panel"><label for="mq'+i+'">'+esc(x)+'</label><textarea id="mq'+i+'" data-i="'+i+'">'+esc(S.mirror[i]||'')+'</textarea></div>'}).join('')+'<button class="btn gold" type="submit">'+esc(t('save'))+'</button> <span id="mres" role="status"></span></form>'};
V.lab=function(){
 return '<h1>'+esc(t('lab'))+'</h1><div class="panel"><h3>'+esc(t('labStroop'))+'</h3><div id="stroop"></div></div>'+
 '<div class="panel"><h3>'+esc(t('labBarnum'))+'</h3><p>'+esc(t('barnumText'))+'</p><p>'+esc(t('barnumQ'))+'</p><div class="row" id="barnum">'+[1,2,3,4,5].map(function(n){return '<button class="btn" data-b="'+n+'">'+n+'</button>'}).join('')+'</div><p id="barnumRes" role="status"></p></div><p class="meta">'+esc(t('disclaimer'))+'</p>'};
V.daily=function(){
 var d=D.insights[today()%D.insights.length],ar=L()==='ar';
 return '<h1>'+esc(t('daily'))+'</h1><div class="panel"><span class="meta">'+esc(ar?d[0]:d[1])+'</span><h2>'+esc(ar?d[2]:d[3])+'</h2><p>'+esc(ar?d[4]:d[5])+'</p><h3>'+esc(t('practice'))+'</h3><p>'+esc(ar?d[6]:d[7])+'</p><h3>'+esc(t('refs'))+'</h3><p>'+linkify(d[8])+'</p><p>'+status({id:'d'})+'</p></div><p class="meta">'+esc(t('disclaimer'))+'</p>'};
V.prophecy=function(){
 var d=D.insights[(today()+3)%D.insights.length],ar=L()==='ar';
 return '<h1>'+esc(t('prophecy'))+'</h1><p>'+esc(t('prophecyTxt'))+'</p><div class="panel" style="background:linear-gradient(160deg,#1d1608,#07070d);text-align:center"><div class="glyph">☽</div><h2>'+esc(ar?d[2]:d[3])+'</h2><p>'+esc(ar?d[4]:d[5])+'</p><p class="meta">'+linkify(d[8])+'</p></div>'};
V.unknown=function(){
 return '<h1>'+esc(t('unknown'))+'</h1><p>'+esc(t('unknownTxt'))+'</p><div class="cards"><a class="card" href="#/archive"><h3>'+esc(t('archive'))+'</h3></a><a class="card" href="#/section/philo"><h3>'+esc(secName('philo'))+'</h3></a><a class="card" href="#/lab"><h3>'+esc(t('lab'))+'</h3></a><a class="card" href="#/sealed"><h3>'+esc(t('sealed'))+'</h3></a></div>'};
function caesar(s,k){return s.replace(/[A-Z]/g,function(c){return String.fromCharCode((c.charCodeAt(0)-65+k)%26+65)})}
V.sealed=function(){
 var cp=D.cipherPuzzle;
 return '<h1>'+esc(t('sealed'))+'</h1>'+
 '<div class="panel"><h3>1 · '+esc(t('cipher'))+'</h3><p class="cipher">'+esc(caesar(cp.plain,cp.shift))+'</p><div class="row"><input type="text" id="cpIn" dir="ltr" autocomplete="off" aria-label="cipher"><button class="btn" id="cpBtn">'+esc(t('check'))+'</button></div><p id="cpRes" role="status">'+(S.sealed.c?'<span class="good">✓ '+esc(t('solved'))+'</span>':'')+'</p></div>'+
 '<div class="panel"><h3>2 · '+esc(t('sq'))+'</h3><div class="sq" id="sq">'+[2,'',6,'',5,'',4,'',8].map(function(v,i){return '<input type="text" inputmode="numeric" maxlength="1" data-i="'+i+'" value="'+v+'"'+(v!==''?' readonly':'')+' aria-label="cell '+(i+1)+'">'}).join('')+'</div><div class="row" style="justify-content:center"><button class="btn" id="sqBtn">'+esc(t('check'))+'</button></div><p id="sqRes" role="status" style="text-align:center">'+(S.sealed.s?'<span class="good">✓ '+esc(t('solved'))+'</span>':'')+'</p></div>'+
 '<div class="panel"><h3>3 · '+esc(t('planets'))+'</h3><p class="glyph" dir="ltr" style="text-align:center">♄</p><div class="row" style="justify-content:center">'+['Mars','Saturn','Venus'].map(function(n,i){return '<button class="btn" data-pl="'+n+'">'+esc(L()==='ar'?['المريخ','زحل','الزهرة'][i]:n)+'</button>'}).join('')+'</div><p id="plRes" role="status" style="text-align:center">'+(S.sealed.p?'<span class="good">✓ '+esc(t('solved'))+'</span>':'')+'</p></div>'};
V.hidden=function(){return '<h1>'+esc(t('hiddenTitle'))+'</h1><div class="panel"><p>'+esc(t('hiddenTxt'))+'</p></div>'};
function allEntries(){
 var r=[];D.lessons.forEach(function(l){r.push({id:l.id,title:pick(l,'t'),href:'#/lesson/'+l.id,type:t('lessonsTitle'),text:(L()==='ar'?l.body_ar:l.body_en).join(' ')})});
 D.manuscripts.forEach(function(m){r.push({id:m.id,title:pick(m,'t'),href:'#/manuscript/'+m.id,type:t('archive'),text:m.name_orig+' '+pick(m,'bg')})});
 var lv=levelNow();
 if(lv>=3)D.forbidden.forEach(function(f){r.push({id:f.id,title:pick(f,'t'),href:'#/f/'+f.id,type:t('forbidden'),text:pick(f,'src')+' '+pick(f,'mind')})});
 if(lv>=4)D.vault.forEach(function(v,i){r.push({id:'v'+i,title:L()==='ar'?v[0]:v[1],href:'#/v/'+i,type:t('vault'),text:L()==='ar'?v[3]:v[4]})});
 D.symbols.forEach(function(s){r.push({id:'s'+s.g,title:s.g+' '+(L()==='ar'?s.ar:s.en),href:'#/symbols',type:t('symbols'),text:pick(s,'note')})});
 return r}
function entryCard(e){return '<a class="card" href="'+e.href+'"><span class="meta">'+esc(e.type)+'</span><h3>'+esc(e.title)+'</h3></a>'}
V.bookmarks=function(){
 var all=allEntries().filter(function(e){return S.bm.indexOf(e.id)>-1});
 return '<h1>'+esc(t('bookmarks'))+'</h1>'+(all.length?'<div class="cards">'+all.map(entryCard).join('')+'</div>':'<p>'+esc(t('noBm'))+'</p>')};
V.search=function(q){
 try{q=decodeURIComponent(q||'')}catch(e){q=''}q=q.toLowerCase().trim();
 var res=q?allEntries().filter(function(e){return (e.title+' '+e.text).toLowerCase().indexOf(q)>-1}):[];
 return '<h1>'+esc(t('search').replace('…',''))+': '+esc(q)+'</h1>'+(res.length?'<div class="cards">'+res.map(entryCard).join('')+'</div>':'<p>'+esc(t('noRes'))+'</p>')};
V.settings=function(){
 var s=S.set;
 function chk(id,lab,v){return '<div class="row"><label><input type="checkbox" id="'+id+'" '+(v?'checked':'')+'> '+esc(lab)+'</label></div>'}
 return '<h1>'+esc(t('settingsTitle'))+'</h1><div class="panel"><div class="row"><label for="setLang">'+esc(t('lang'))+'</label><select id="setLang"><option value="ar"'+(L()==='ar'?' selected':'')+'>العربية</option><option value="en"'+(L()==='en'?' selected':'')+'>English</option></select></div>'+
 chk('setSound',t('soundOn'),s.sound)+'<div class="row"><label for="setMusic">'+esc(t('music'))+'</label><input type="range" id="setMusic" min="0" max="1" step=".05" value="'+s.music+'"></div><div class="row"><label for="setFx">'+esc(t('fx'))+'</label><input type="range" id="setFx" min="0" max="1" step=".05" value="'+s.fx+'"></div><p class="meta">'+esc(t('soundNote'))+'</p>'+
 chk('setDread',t('dread'),s.dread)+chk('setCalm',t('calm'),s.calm)+'<p><a href="#/help">'+esc(t('help'))+'</a></p><p><button class="btn" id="resetBtn">'+esc(t('reset'))+'</button></p></div>'};
V.help=function(){return '<h1>'+esc(t('help'))+'</h1><div class="panel"><p>'+esc(t('helpTxt'))+'</p>'+linkList(D.help)+'</div>'};
V.about=function(){return '<h1>'+esc(t('about'))+'</h1>'+T[L()].aboutTxt.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')};
V.contact=function(){var u='https://github.com/mohamedmohnad88-byte/THE-VOID-M/issues';return '<h1>'+esc(t('contact'))+'</h1><p>'+esc(t('contactTxt'))+'</p><p><a href="'+u+'" target="_blank" rel="noopener noreferrer">'+u+'</a></p>'};
V.admin=function(){
 var items=[];
 D.lessons.forEach(function(l){items.push([l.id,'lesson',pick(l,'t')])});D.manuscripts.forEach(function(m){items.push([m.id,'manuscript',pick(m,'t')])});D.forbidden.forEach(function(f){items.push([f.id,'forbidden',pick(f,'t')])});D.symbols.forEach(function(s){items.push(['s'+s.g,'symbol',s.g+' '+s.en])});
 D.vault.forEach(function(v,i){items.push(['v'+i,'vault',L()==='ar'?v[0]:v[1]])});
 var cnt={approved:0,rejected:0,pending:0};items.forEach(function(i){cnt[S.review[i[0]]||'pending']++});
 return '<h1>'+esc(t('admin'))+'</h1><div class="panel"><p>'+esc(t('adminNote'))+'</p><p>'+esc(t('approved'))+': '+cnt.approved+' · '+esc(t('pending'))+': '+cnt.pending+' · '+esc(t('rejected'))+': '+cnt.rejected+'</p><button class="btn" id="exportBtn">'+esc(t('exportJ'))+'</button></div>'+
 '<div style="overflow-x:auto"><table class="idx"><tr><th>ID</th><th>Type</th><th>Title</th><th>Status</th><th></th></tr>'+items.map(function(i){var st=S.review[i[0]]||'pending';return '<tr><td>'+esc(i[0])+'</td><td>'+esc(i[1])+'</td><td>'+esc(i[2])+'</td><td>'+esc(t(st))+'</td><td><button class="btn small" data-rv="'+esc(i[0])+':approved">'+esc(t('approve'))+'</button> <button class="btn small" data-rv="'+esc(i[0])+':rejected">'+esc(t('reject'))+'</button> <button class="btn small" data-rv="'+esc(i[0])+':pending">'+esc(t('backPending'))+'</button></td></tr>'}).join('')+'</table></div>'};
V.nf=function(){return '<h1>'+esc(t('notFound'))+'</h1><p><a href="#/">'+esc(t('goHome'))+'</a></p>'};

/* ---------- render + events ---------- */
function render(){
 var r=route(),p=r.parts,name=p[0]||'home',v=$('#view'),html;
 var map={'':'home',home:'home',ascension:'ascension',section:'section',lesson:'lesson',archive:'archive',manuscript:'manuscript',symbols:'symbols',forbidden:'forbidden',f:'f',vault:'vault',v:'v',mirror:'mirror',lab:'lab',daily:'daily',prophecy:'prophecy',unknown:'unknown',sealed:'sealed',hidden:'hidden',bookmarks:'bookmarks',search:'search',settings:'settings',help:'help',about:'about',contact:'contact',admin:'admin'};
 var fn=V[map[name]]||V.nf;
 try{html=fn(p[1])}catch(e){console.error(e);html=V.nf()}
 v.innerHTML=html;
 document.body.classList.toggle('forbidden',name==='forbidden'||name==='f');
 buildNav();applyDread();window.scrollTo(0,0);$('#side').classList.remove('open');
 fx('page');wire();wardenMaybe()}
function wire(){
 var v=$('#view');
 v.querySelectorAll('[data-bm]').forEach(function(b){b.onclick=function(){var id=b.dataset.bm,i=S.bm.indexOf(id);if(i>-1)S.bm.splice(i,1);else S.bm.push(id);save();b.textContent=(S.bm.indexOf(id)>-1?t('unbookmark'):t('bookmark'))+' ★'}});
 var qz=$('#quiz');if(qz)qz.onsubmit=function(e){e.preventDefault();var id=qz.dataset.id,l=D.lessons.filter(function(x){return x.id===id})[0],sel=qz.querySelector('input:checked'),res=$('#qres');
  if(!sel){res.textContent=t('pick');return}
  if(+sel.value===l.quiz.a){var before=levelNow();S.done[id]=true;save();res.innerHTML='<span class="good">✓ '+esc(t('correct'))+'</span>';fx('bell');var after=levelNow();applyDread();buildNav();if(after>before)levelUp(after)}
  else res.innerHTML='<span class="bad">'+esc(t('wrong'))+'</span>'};
 var fp=$('#fp');if(fp){fp.onchange=function(){S.fp=fp.value;render()};$('#fl').onchange=function(){S.fl=$('#fl').value;render()}}
 var bb=$('#breakBtn');if(bb)bb.onclick=function(){var k=bb.dataset.k;$('#sealg').classList.add('sealbreak');fx('bell');setTimeout(function(){if(k==='forbidden')unlockedF=true;else unlockedV=true;render()},1500)};
 var mf=$('#mirrorForm');if(mf)mf.onsubmit=function(e){e.preventDefault();mf.querySelectorAll('textarea').forEach(function(a){S.mirror[a.dataset.i]=a.value});save();$('#mres').textContent=t('saved')};
 if($('#stroop'))stroop();
 v.querySelectorAll('[data-b]').forEach(function(b){b.onclick=function(){$('#barnumRes').textContent=t('barnumReveal')}});
 var cb=$('#cpBtn');if(cb)cb.onclick=function(){var ok=$('#cpIn').value.trim().toUpperCase()===D.cipherPuzzle.plain;if(ok){S.sealed.c=1;save()}$('#cpRes').innerHTML=ok?'<span class="good">✓ '+esc(t('solved'))+'</span>':'<span class="bad">✗</span>';if(ok)fx('bell')};
 var sb=$('#sqBtn');if(sb)sb.onclick=function(){var c=[].map.call(document.querySelectorAll('#sq input'),function(i){return +i.value});var u=c.slice().sort().join('');var ok=u==='123456789'&&[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].every(function(l){return c[l[0]]+c[l[1]]+c[l[2]]===15});if(ok){S.sealed.s=1;save()}$('#sqRes').innerHTML=ok?'<span class="good">✓ '+esc(t('solved'))+'</span>':'<span class="bad">✗</span>';if(ok)fx('bell')};
 v.querySelectorAll('[data-pl]').forEach(function(b){b.onclick=function(){var ok=b.dataset.pl==='Saturn';if(ok){S.sealed.p=1;save()}$('#plRes').innerHTML=ok?'<span class="good">✓ '+esc(t('solved'))+'</span>':'<span class="bad">✗</span>';if(ok)fx('bell')}});
 var hs=$('#hsig');if(hs){hs.onclick=hs.onkeydown=function(e){if(e.type==='keydown'&&e.key!=='Enter')return;S.hidden=true;save();location.hash='#/hidden'}}
 v.querySelectorAll('[data-rv]').forEach(function(b){b.onclick=function(){var x=b.dataset.rv.split(':');S.review[x[0]]=x[1];save();render()}});
 var eb=$('#exportBtn');if(eb)eb.onclick=function(){var blob=new Blob([JSON.stringify({exported:new Date().toISOString(),review:S.review},null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='void-review.json';a.click()};
 var sl=$('#setLang');if(sl){sl.onchange=function(){S.lang=sl.value;save();applyLang();render()};
  $('#setSound').onchange=function(e){setSound(e.target.checked)};$('#setMusic').oninput=function(e){S.set.music=+e.target.value;save();applyAudio()};$('#setFx').oninput=function(e){S.set.fx=+e.target.value;save();applyAudio()};
  $('#setDread').onchange=function(e){S.set.dread=e.target.checked;save();applyDread()};$('#setCalm').onchange=function(e){S.set.calm=e.target.checked;save();applyDread()};
  $('#resetBtn').onclick=function(){if(confirm(t('resetConfirm'))){localStorage.removeItem(KEY);load();applyLang();render()}}}}
function stroop(){
 var cols=['#d94a4a','#4aa86a','#5a7de0','#d9c04a'],names=T[L()].colorsAr,n=0,ok=0,box=$('#stroop');
 function next(){var w=Math.floor(Math.random()*4),c=Math.floor(Math.random()*4);if(Math.random()<.7)while(c===w)c=Math.floor(Math.random()*4);
  box.innerHTML='<p style="font-size:2.4rem;text-align:center;color:'+cols[c]+';font-family:serif">'+esc(names[w])+'</p><div class="row" style="justify-content:center">'+names.map(function(x,i){return '<button class="btn" data-c="'+i+'">'+esc(x)+'</button>'}).join('')+'</div><p style="text-align:center">'+esc(t('round'))+' '+(n+1)+'/8 · '+esc(t('correctN'))+': '+ok+'</p>';
  box.querySelectorAll('[data-c]').forEach(function(b){b.onclick=function(){n++;if(+b.dataset.c===c)ok++;if(n>=8){box.innerHTML='<p>'+esc(t('correctN'))+': '+ok+'/8</p><button class="btn" id="again">'+esc(t('round'))+' ↻</button>';$('#again').onclick=function(){n=0;ok=0;next()}}else next()}})}
 next()}
function levelUp(n){var m=$('#modal');m.hidden=false;m.innerHTML='<div class="box" role="alertdialog"><div class="glyph">☉</div><h2>'+esc(t('levelUp'))+' 0'+n+'</h2><h3>'+esc(lvlName(n))+'</h3><button class="btn gold" id="mok">OK</button></div>';$('#mok').onclick=function(){m.hidden=true;render()};$('#mok').focus();fx('bell')}
function setSound(on){S.set.sound=on;save();if(on){audioInit();if(A.ctx&&A.ctx.state==='suspended')A.ctx.resume()}applyAudio();applyDread()}
var wardenT;
function wardenMaybe(){
 var w=$('#warden');if(S.set.calm||!S.set.dread){w.hidden=true;return}
 clearTimeout(wardenT);wardenT=setTimeout(function(){var a=T[L()].warden[levelNow()];w.innerHTML='<b>THE WARDEN</b>'+esc(a[Math.floor(Math.random()*a.length)]);w.hidden=false;setTimeout(function(){w.hidden=true},7000)},12000)}
function nightCheck(){var h=new Date().getHours();if((h>=23||h<5)&&Date.now()-sessionStart>72e5&&!S.nightShown){S.nightShown=Date.now();var m=$('#modal');m.hidden=false;m.innerHTML='<div class="box" role="alertdialog"><h2>'+esc(t('nightTitle'))+'</h2><p>'+esc(t('nightTxt'))+'</p><p><a href="#/help">'+esc(t('help'))+'</a></p><button class="btn gold" id="mok">OK</button></div>';$('#mok').onclick=function(){m.hidden=true;S.nightShown=0}}}

/* ---------- boot ---------- */
function enterApp(fast){
 var it=$('#intro');it.classList.add('leaving');
 setTimeout(function(){it.remove();$('#app').hidden=false;S.intro=1;save();applyLang();render();$('#view').focus({preventScroll:true})},fast?50:1500)}
function boot(){
 applyLang();
 $('#seal').innerHTML=sealSVG();
 var introSky=startSky($('#introSky'),{fade:true,full:true,glow:1.3});
 skyMain=startSky($('#sky'),{glow:.8});
 $('#enterBtn').onclick=function(){introSky.stop();enterApp(false)};
 $('#skipBtn').onclick=function(){introSky.stop();enterApp(true)};
 $('#langBtn').onclick=function(){S.lang=L()==='ar'?'en':'ar';save();applyLang();render()};
 $('#calmBtn').onclick=function(){S.set.calm=!S.set.calm;save();applyDread()};
 $('#soundBtn').onclick=function(){setSound(!S.set.sound)};
 $('#menuBtn').onclick=function(){$('#side').classList.toggle('open')};
 $('#searchBox').onkeydown=function(e){if(e.key==='Enter'){var q=this.value.trim();if(q)location.hash='#/search/'+encodeURIComponent(q)}};
 addEventListener('hashchange',function(){if(!$('#app').hidden)render()});
 setInterval(nightCheck,60000);
 if(S.intro)document.body.classList.add('skipintro');
 if(S.intro&&location.hash.length>2){introSky.stop();enterApp(true)}
 window.__void={S:S,levelNow:levelNow,render:render};
}
boot();
})();
