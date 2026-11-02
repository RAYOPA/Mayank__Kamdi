(()=>{
const variants={
 '/dashboard':{title:'Sign in to open your dashboard',third:'Then on to your dashboard.',back:'Back to the homepage',backHref:'/'},
 '/tracks':{title:'Register for BIOS',third:'Then on to the four modes, to choose yours.',back:'Back to Tracks',backHref:'/tracks'},
 '/forge':{title:'Sign in to continue',third:'Then on to the page you asked for.',back:'Back to the homepage',backHref:'/'},
 '/addons/open_innovation':{title:'Sign in to continue',third:'Then on to the page you asked for.',back:'Back to the homepage',backHref:'/'},
 '/addons/research':{title:'Sign in to continue',third:'Then on to the page you asked for.',back:'Back to the homepage',backHref:'/'},
 '/init/register':{title:'Sign in to register for SEED',third:'Then on to SEED registration.',back:'Back to the homepage',backHref:'/'},
 '/init/spoc/register':{title:'Sign in to register your school for SEED',third:'Then on to school registration for SEED.',back:'Back to the homepage',backHref:'/'}
};
const raw=new URLSearchParams(location.search).get('next')||'/dashboard';
const next=Object.prototype.hasOwnProperty.call(variants,raw)?raw:'/dashboard';
const v=variants[next];
const title=document.querySelector('#signin-title');
const third=document.querySelector('.signin__steps li:nth-child(3) strong');
const google=document.querySelector('.signin__actions a');
const back=document.querySelector('.signin__back a');
if(title) title.textContent=v.title;
if(third) third.textContent=v.third;
if(google) google.href='https://bios.notyouraverage.xyz/auth/login?next='+next;
if(back){back.textContent=v.back;back.href=v.backHref;}
document.title=v.title+' - BIOS Hackathon';
})();
