import{a as T}from"./chunk-JYEWWTJW.js";import{a as E,c as D,f as z,i as j,m as I,u as L,x as m,y as N}from"./chunk-E5WGR4OY.js";import{Aa as w,Ba as a,Ca as r,Da as g,Ha as x,I as y,L as b,N as d,Na as s,Oa as M,Ra as p,ha as c,ia as l,ib as k,jb as S,qb as F,ra as v,ta as P,ya as _,za as O}from"./chunk-IPTEZCAU.js";var u=(()=>{let t=class t{constructor(e,n){this.http=e,this.localStorage=n,typeof document<"u"&&(this.bearerToken=n.getData("vietlist::session"))}profileData(){let e=D.appendBaseUrl(E.ProfileDetail),n=new k().set("Authorization",this.bearerToken);return this.http.get(e,{headers:n})}};t.\u0275fac=function(n){return new(n||t)(b(S),b(m))},t.\u0275prov=y({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();var H=(()=>{let t=class t{constructor(e,n,o){this.profileDetail=e,this.router=n,this.userSessionService=o,this.email="",this.userName="",this.userSessionService.isSuccessLogin.subscribe(f=>{this.isLoginSucess=f})}ngOnInit(){this.isLoginSucess&&this.fetchProfileDetail()}fetchProfileDetail(){this.profileDetail.profileData().subscribe({next:e=>{e&&e.data&&e.data.user&&(this.showUserProfile=e,this.userDetails=e.data.user,this.email=e.data.user.user_email,this.userName=e.data.user.user_nicename,console.log("check the email,username",this.userName,this.email))},error:e=>{this.router.navigateByUrl("/login"),console.log("showUserProfile-error",e)}})}};t.\u0275fac=function(n){return new(n||t)(l(u),l(F),l(T))},t.\u0275cmp=d({type:t,selectors:[["app-edit-profile"]],standalone:!0,features:[p],decls:13,vars:2,consts:[[1,"profile-heading"],[1,"row","mt-5"],[1,"form-group"],[1,"col-12"],["type","text","readonly","",1,"input-control",3,"ngModel","ngModelChange"],[1,"btn","orange-background-btn-w-100"]],template:function(n,o){n&1&&(a(0,"section")(1,"h1",0),s(2," Edit Profile "),r(),a(3,"div",1)(4,"div",2)(5,"div",3)(6,"input",4),x("ngModelChange",function(h){return o.email=h}),r()()(),a(7,"div",2)(8,"div",3)(9,"input",4),x("ngModelChange",function(h){return o.userName=h}),r()()(),a(10,"div",2)(11,"button",5),s(12,"Update Profile"),r()()()()),n&2&&(c(6),v("ngModel",o.email),c(3),v("ngModel",o.userName))},dependencies:[L,z,j,I],styles:[".orange-background-btn[_ngcontent-%COMP%]{background:var(--primary-color-orange);width:fit-content;padding:10px 42px;color:var(--light-grey-2)}.orange-background-btn-w-100[_ngcontent-%COMP%]{background:var(--primary-color-orange);width:100%;padding:10px 42px;color:var(--light-grey-2);font-size:16px}.orange-background-btn-w-100[_ngcontent-%COMP%]:hover{background:var(--primary-color-orange);color:var(--light-grey-2)}.grey-bg-btn[_ngcontent-%COMP%]{width:12em;height:46px;border-radius:4px;background-color:var(--light-grey);color:var(--primary-color-mustard);font-size:16px;line-height:27px;transition:background-color .3s cubic-bezier(.68,-.55,.27,1.55),transform .3s ease}.input-control[_ngcontent-%COMP%]{width:100%;background:#f5f5f5;border:solid 1px rgba(128,128,128,.1882352941);height:40px;padding:10px;border-radius:4px}.input-control[_ngcontent-%COMP%]:focus{outline:solid 2px var(--primary-color-orange);border:none}.form-group[_ngcontent-%COMP%]{margin-bottom:16px}.profile-heading[_ngcontent-%COMP%]{font-size:1.75rem;color:var(--dark-grey)}"]});let i=t;return i})();function G(i,t){if(i&1&&(a(0,"li")(1,"span"),g(2,"i"),r(),s(3),r()),i&2){let C=t.$implicit;c(2),P(C.icon),c(),M(C.label)}}var ne=(()=>{let t=class t{constructor(e,n,o){this.sidebarService=e,this.profileDetail=n,this.localStorage=o,this.sidebarMenu=[],this.getSidebarLinks(),this.userEmail=JSON.parse(o.getData("vietlist::userdata"))}getSidebarLinks(){this.sidebarService.getSidebarLinks().subscribe(e=>{this.sidebarMenu=e,console.log(e)})}};t.\u0275fac=function(n){return new(n||t)(l(N),l(u),l(m))},t.\u0275cmp=d({type:t,selectors:[["app-main"]],standalone:!0,features:[p],decls:19,vars:1,consts:[[1,"container-fluid","g-0"],[1,"banner"],[1,"content"],[1,"container"],[1,"row","my-5"],[1,"col-4"],[1,"sidebar-cnt"],[1,"sidebar-items"],[1,"upload-profile"],[1,"profile-pic-div"],[1,"user-email"],[1,"col-8","mt-4"]],template:function(n,o){n&1&&(a(0,"div",0)(1,"section",1)(2,"div",2)(3,"h1"),s(4,"Account"),r()()(),a(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"div",7)(10,"div",8),g(11,"div",9),r(),a(12,"p",10),s(13),r(),a(14,"ul"),O(15,G,4,3,"li",null,_),r()()()(),a(17,"div",11),g(18,"app-edit-profile"),r()()()()),n&2&&(c(13),M(o.userEmail.user_email),c(2),w(o.sidebarMenu))},dependencies:[H],styles:['[_ngcontent-%COMP%]:root{--primary-color-orange: #FF9900;--primary-color-mustard: #FF9900;--primary-color-blue: #146EB4;--black: #000000;--dark-grey: #232f3e;--light-grey: #F2F2F2;--light-grey-2:#FFFFFF;--white: #fff}[_ngcontent-%COMP%]:root{--font-weight-light: 300;--font-weight-normal: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700}.mat-mdc-select-arrow[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{fill:currentColor;position:absolute;top:0!important;left:50%;transform:translate(-50%,-50%)}.mat-mdc-select[_ngcontent-%COMP%]{background:#f5f5f5;border:solid 1px rgba(128,128,128,.1882352941);height:40px;padding:10px;border-radius:4px;width:100%}.mat-mdc-select[_ngcontent-%COMP%]:focus{outline:solid 2px var(--primary-color-orange);border:none}.orange-background-btn[_ngcontent-%COMP%]{background:var(--primary-color-orange);width:fit-content;padding:10px 42px;color:var(--light-grey-2)}.orange-background-btn-w-100[_ngcontent-%COMP%]{background:var(--primary-color-orange);width:100%;padding:10px 42px;color:var(--light-grey-2);font-size:16px}.orange-background-btn-w-100[_ngcontent-%COMP%]:hover{background:var(--primary-color-orange);color:var(--light-grey-2)}.grey-bg-btn[_ngcontent-%COMP%]{width:12em;height:46px;border-radius:4px;background-color:var(--light-grey);color:var(--primary-color-mustard);font-size:16px;line-height:27px;transition:background-color .3s cubic-bezier(.68,-.55,.27,1.55),transform .3s ease}.input-control[_ngcontent-%COMP%]{width:100%;background:#f5f5f5;border:solid 1px rgba(128,128,128,.1882352941);height:40px;padding:10px;border-radius:4px}.input-control[_ngcontent-%COMP%]:focus{outline:solid 2px var(--primary-color-orange);border:none}.form-group[_ngcontent-%COMP%]{margin-bottom:16px}.profile-heading[_ngcontent-%COMP%]{font-size:1.75rem;color:var(--dark-grey)}.banner[_ngcontent-%COMP%]{height:450px;width:100%;position:relative;background-image:url(/assets/resgister-banner-img.jpeg);display:flex;justify-content:center;align-items:center}.banner[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background-color:#121212cb;z-index:1}.banner[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{position:relative;z-index:2;text-align:center;margin-top:22px}.banner[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-weight:var(--font-weight-medium);color:var(--light-grey);font-size:48px}.sidebar-cnt[_ngcontent-%COMP%]{height:100vh;width:70%;margin:auto;background-color:#f3f8fd;display:flex;justify-content:center}.sidebar-items[_ngcontent-%COMP%]{margin:0 auto;width:80%;padding:20px 35px}.sidebar-items[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;margin-top:2.5rem;padding:0}.sidebar-items[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin-bottom:26px;line-height:20px;color:#00000080;font-size:16px}.sidebar-items[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin-right:10px}.upload-profile[_ngcontent-%COMP%]{height:20vh;width:100%}.profile-pic-div[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:50%;background-color:var(--light-grey);border:solid 2px #fff}.user-email[_ngcontent-%COMP%]{color:#1e73be;text-align:center;font-weight:var(--font-weight-semibold);font-size:16px;margin-top:1rem}']});let i=t;return i})();export{ne as MainComponent};
