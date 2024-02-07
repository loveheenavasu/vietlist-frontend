import {
  BsDropdownDirective,
  BsDropdownMenuDirective,
  BsDropdownModule,
  BsDropdownToggleDirective,
  require_libphonenumber,
  setTheme
} from "./chunk-UAZ7HGR4.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-OLJ5JTBN.js";
import "./chunk-C4QB5JFB.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-MWTTXNEH.js";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Output,
  ViewChild,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-FRYU6ZCA.js";
import "./chunk-E7ZBGFHJ.js";
import "./chunk-Y6G3L5UY.js";
import "./chunk-Z33LTZ4V.js";
import "./chunk-AOF462FV.js";
import {
  __toESM
} from "./chunk-J5XZNU7V.js";

// node_modules/ngx-intl-tel-input/fesm2020/ngx-intl-tel-input.mjs
var lpn = __toESM(require_libphonenumber(), 1);
var _c0 = ["countryList"];
function NgxIntlTelInputComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1("+", ctx_r0.selectedCountry.dialCode, "");
  }
}
function NgxIntlTelInputComponent_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 17)(1, "input", 18);
    ɵɵlistener("ngModelChange", function NgxIntlTelInputComponent_div_6_div_1_Template_input_ngModelChange_1_listener($event) {
      ɵɵrestoreView(_r9);
      const ctx_r8 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r8.countrySearchText = $event);
    })("keyup", function NgxIntlTelInputComponent_div_6_div_1_Template_input_keyup_1_listener() {
      ɵɵrestoreView(_r9);
      const ctx_r10 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r10.searchCountry());
    })("click", function NgxIntlTelInputComponent_div_6_div_1_Template_input_click_1_listener($event) {
      return $event.stopPropagation();
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("ngModel", ctx_r3.countrySearchText)("placeholder", ctx_r3.searchCountryPlaceholder);
  }
}
function NgxIntlTelInputComponent_div_6_li_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 19);
    ɵɵlistener("click", function NgxIntlTelInputComponent_div_6_li_4_Template_li_click_0_listener() {
      const restoredCtx = ɵɵrestoreView(_r14);
      const country_r12 = restoredCtx.$implicit;
      const ctx_r13 = ɵɵnextContext(2);
      const _r2 = ɵɵreference(8);
      return ɵɵresetView(ctx_r13.onCountrySelect(country_r12, _r2));
    });
    ɵɵelementStart(1, "div", 20);
    ɵɵelement(2, "div", 3);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 21);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 22);
    ɵɵtext(6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const country_r12 = ctx.$implicit;
    ɵɵproperty("id", country_r12.htmlId + "-preferred");
    ɵɵadvance(2);
    ɵɵproperty("ngClass", country_r12.flagClass);
    ɵɵadvance(2);
    ɵɵtextInterpolate(country_r12.name);
    ɵɵadvance(2);
    ɵɵtextInterpolate1("+", country_r12.dialCode, "");
  }
}
function NgxIntlTelInputComponent_div_6_li_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "li", 23);
  }
}
function NgxIntlTelInputComponent_div_6_li_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 24);
    ɵɵlistener("click", function NgxIntlTelInputComponent_div_6_li_6_Template_li_click_0_listener() {
      const restoredCtx = ɵɵrestoreView(_r17);
      const country_r15 = restoredCtx.$implicit;
      const ctx_r16 = ɵɵnextContext(2);
      const _r2 = ɵɵreference(8);
      return ɵɵresetView(ctx_r16.onCountrySelect(country_r15, _r2));
    });
    ɵɵelementStart(1, "div", 20);
    ɵɵelement(2, "div", 3);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 21);
    ɵɵtext(4);
    ɵɵelementEnd();
    ɵɵelementStart(5, "span", 22);
    ɵɵtext(6);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const country_r15 = ctx.$implicit;
    ɵɵproperty("id", country_r15.htmlId);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", country_r15.flagClass);
    ɵɵadvance(2);
    ɵɵtextInterpolate(country_r15.name);
    ɵɵadvance(2);
    ɵɵtextInterpolate1("+", country_r15.dialCode, "");
  }
}
function NgxIntlTelInputComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵtemplate(1, NgxIntlTelInputComponent_div_6_div_1_Template, 2, 2, "div", 11);
    ɵɵelementStart(2, "ul", 12, 13);
    ɵɵtemplate(4, NgxIntlTelInputComponent_div_6_li_4_Template, 7, 4, "li", 14)(5, NgxIntlTelInputComponent_div_6_li_5_Template, 1, 0, "li", 15)(6, NgxIntlTelInputComponent_div_6_li_6_Template, 7, 4, "li", 16);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.searchCountryFlag && ctx_r1.searchCountryField);
    ɵɵadvance(3);
    ɵɵproperty("ngForOf", ctx_r1.preferredCountriesInDropDown);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.preferredCountriesInDropDown == null ? null : ctx_r1.preferredCountriesInDropDown.length);
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.allCountries);
  }
}
var _c1 = (a0) => ({
  "disabled": a0
});
var CountryISO;
(function(CountryISO2) {
  CountryISO2["Afghanistan"] = "af";
  CountryISO2["Albania"] = "al";
  CountryISO2["Algeria"] = "dz";
  CountryISO2["AmericanSamoa"] = "as";
  CountryISO2["Andorra"] = "ad";
  CountryISO2["Angola"] = "ao";
  CountryISO2["Anguilla"] = "ai";
  CountryISO2["AntiguaAndBarbuda"] = "ag";
  CountryISO2["Argentina"] = "ar";
  CountryISO2["Armenia"] = "am";
  CountryISO2["Aruba"] = "aw";
  CountryISO2["Australia"] = "au";
  CountryISO2["Austria"] = "at";
  CountryISO2["Azerbaijan"] = "az";
  CountryISO2["Bahamas"] = "bs";
  CountryISO2["Bahrain"] = "bh";
  CountryISO2["Bangladesh"] = "bd";
  CountryISO2["Barbados"] = "bb";
  CountryISO2["Belarus"] = "by";
  CountryISO2["Belgium"] = "be";
  CountryISO2["Belize"] = "bz";
  CountryISO2["Benin"] = "bj";
  CountryISO2["Bermuda"] = "bm";
  CountryISO2["Bhutan"] = "bt";
  CountryISO2["Bolivia"] = "bo";
  CountryISO2["BosniaAndHerzegovina"] = "ba";
  CountryISO2["Botswana"] = "bw";
  CountryISO2["Brazil"] = "br";
  CountryISO2["BritishIndianOceanTerritory"] = "io";
  CountryISO2["BritishVirginIslands"] = "vg";
  CountryISO2["Brunei"] = "bn";
  CountryISO2["Bulgaria"] = "bg";
  CountryISO2["BurkinaFaso"] = "bf";
  CountryISO2["Burundi"] = "bi";
  CountryISO2["Cambodia"] = "kh";
  CountryISO2["Cameroon"] = "cm";
  CountryISO2["Canada"] = "ca";
  CountryISO2["CapeVerde"] = "cv";
  CountryISO2["CaribbeanNetherlands"] = "bq";
  CountryISO2["CaymanIslands"] = "ky";
  CountryISO2["CentralAfricanRepublic"] = "cf";
  CountryISO2["Chad"] = "td";
  CountryISO2["Chile"] = "cl";
  CountryISO2["China"] = "cn";
  CountryISO2["ChristmasIsland"] = "cx";
  CountryISO2["Cocos"] = "cc";
  CountryISO2["Colombia"] = "co";
  CountryISO2["Comoros"] = "km";
  CountryISO2["CongoDRCJamhuriYaKidemokrasiaYaKongo"] = "cd";
  CountryISO2["CongoRepublicCongoBrazzaville"] = "cg";
  CountryISO2["CookIslands"] = "ck";
  CountryISO2["CostaRica"] = "cr";
  CountryISO2["CôteDIvoire"] = "ci";
  CountryISO2["Croatia"] = "hr";
  CountryISO2["Cuba"] = "cu";
  CountryISO2["Curaçao"] = "cw";
  CountryISO2["Cyprus"] = "cy";
  CountryISO2["CzechRepublic"] = "cz";
  CountryISO2["Denmark"] = "dk";
  CountryISO2["Djibouti"] = "dj";
  CountryISO2["Dominica"] = "dm";
  CountryISO2["DominicanRepublic"] = "do";
  CountryISO2["Ecuador"] = "ec";
  CountryISO2["Egypt"] = "eg";
  CountryISO2["ElSalvador"] = "sv";
  CountryISO2["EquatorialGuinea"] = "gq";
  CountryISO2["Eritrea"] = "er";
  CountryISO2["Estonia"] = "ee";
  CountryISO2["Ethiopia"] = "et";
  CountryISO2["FalklandIslands"] = "fk";
  CountryISO2["FaroeIslands"] = "fo";
  CountryISO2["Fiji"] = "fj";
  CountryISO2["Finland"] = "fi";
  CountryISO2["France"] = "fr";
  CountryISO2["FrenchGuiana"] = "gf";
  CountryISO2["FrenchPolynesia"] = "pf";
  CountryISO2["Gabon"] = "ga";
  CountryISO2["Gambia"] = "gm";
  CountryISO2["Georgia"] = "ge";
  CountryISO2["Germany"] = "de";
  CountryISO2["Ghana"] = "gh";
  CountryISO2["Gibraltar"] = "gi";
  CountryISO2["Greece"] = "gr";
  CountryISO2["Greenland"] = "gl";
  CountryISO2["Grenada"] = "gd";
  CountryISO2["Guadeloupe"] = "gp";
  CountryISO2["Guam"] = "gu";
  CountryISO2["Guatemala"] = "gt";
  CountryISO2["Guernsey"] = "gg";
  CountryISO2["Guinea"] = "gn";
  CountryISO2["GuineaBissau"] = "gw";
  CountryISO2["Guyana"] = "gy";
  CountryISO2["Haiti"] = "ht";
  CountryISO2["Honduras"] = "hn";
  CountryISO2["HongKong"] = "hk";
  CountryISO2["Hungary"] = "hu";
  CountryISO2["Iceland"] = "is";
  CountryISO2["India"] = "in";
  CountryISO2["Indonesia"] = "id";
  CountryISO2["Iran"] = "ir";
  CountryISO2["Iraq"] = "iq";
  CountryISO2["Ireland"] = "ie";
  CountryISO2["IsleOfMan"] = "im";
  CountryISO2["Israel"] = "il";
  CountryISO2["Italy"] = "it";
  CountryISO2["Jamaica"] = "jm";
  CountryISO2["Japan"] = "jp";
  CountryISO2["Jersey"] = "je";
  CountryISO2["Jordan"] = "jo";
  CountryISO2["Kazakhstan"] = "kz";
  CountryISO2["Kenya"] = "ke";
  CountryISO2["Kiribati"] = "ki";
  CountryISO2["Kosovo"] = "xk";
  CountryISO2["Kuwait"] = "kw";
  CountryISO2["Kyrgyzstan"] = "kg";
  CountryISO2["Laos"] = "la";
  CountryISO2["Latvia"] = "lv";
  CountryISO2["Lebanon"] = "lb";
  CountryISO2["Lesotho"] = "ls";
  CountryISO2["Liberia"] = "lr";
  CountryISO2["Libya"] = "ly";
  CountryISO2["Liechtenstein"] = "li";
  CountryISO2["Lithuania"] = "lt";
  CountryISO2["Luxembourg"] = "lu";
  CountryISO2["Macau"] = "mo";
  CountryISO2["Macedonia"] = "mk";
  CountryISO2["Madagascar"] = "mg";
  CountryISO2["Malawi"] = "mw";
  CountryISO2["Malaysia"] = "my";
  CountryISO2["Maldives"] = "mv";
  CountryISO2["Mali"] = "ml";
  CountryISO2["Malta"] = "mt";
  CountryISO2["MarshallIslands"] = "mh";
  CountryISO2["Martinique"] = "mq";
  CountryISO2["Mauritania"] = "mr";
  CountryISO2["Mauritius"] = "mu";
  CountryISO2["Mayotte"] = "yt";
  CountryISO2["Mexico"] = "mx";
  CountryISO2["Micronesia"] = "fm";
  CountryISO2["Moldova"] = "md";
  CountryISO2["Monaco"] = "mc";
  CountryISO2["Mongolia"] = "mn";
  CountryISO2["Montenegro"] = "me";
  CountryISO2["Montserrat"] = "ms";
  CountryISO2["Morocco"] = "ma";
  CountryISO2["Mozambique"] = "mz";
  CountryISO2["Myanmar"] = "mm";
  CountryISO2["Namibia"] = "na";
  CountryISO2["Nauru"] = "nr";
  CountryISO2["Nepal"] = "np";
  CountryISO2["Netherlands"] = "nl";
  CountryISO2["NewCaledonia"] = "nc";
  CountryISO2["NewZealand"] = "nz";
  CountryISO2["Nicaragua"] = "ni";
  CountryISO2["Niger"] = "ne";
  CountryISO2["Nigeria"] = "ng";
  CountryISO2["Niue"] = "nu";
  CountryISO2["NorfolkIsland"] = "nf";
  CountryISO2["NorthKorea"] = "kp";
  CountryISO2["NorthernMarianaIslands"] = "mp";
  CountryISO2["Norway"] = "no";
  CountryISO2["Oman"] = "om";
  CountryISO2["Pakistan"] = "pk";
  CountryISO2["Palau"] = "pw";
  CountryISO2["Palestine"] = "ps";
  CountryISO2["Panama"] = "pa";
  CountryISO2["PapuaNewGuinea"] = "pg";
  CountryISO2["Paraguay"] = "py";
  CountryISO2["Peru"] = "pe";
  CountryISO2["Philippines"] = "ph";
  CountryISO2["Poland"] = "pl";
  CountryISO2["Portugal"] = "pt";
  CountryISO2["PuertoRico"] = "pr";
  CountryISO2["Qatar"] = "qa";
  CountryISO2["Réunion"] = "re";
  CountryISO2["Romania"] = "ro";
  CountryISO2["Russia"] = "ru";
  CountryISO2["Rwanda"] = "rw";
  CountryISO2["SaintBarthélemy"] = "bl";
  CountryISO2["SaintHelena"] = "sh";
  CountryISO2["SaintKittsAndNevis"] = "kn";
  CountryISO2["SaintLucia"] = "lc";
  CountryISO2["SaintMartin"] = "mf";
  CountryISO2["SaintPierreAndMiquelon"] = "pm";
  CountryISO2["SaintVincentAndTheGrenadines"] = "vc";
  CountryISO2["Samoa"] = "ws";
  CountryISO2["SanMarino"] = "sm";
  CountryISO2["SãoToméAndPríncipe"] = "st";
  CountryISO2["SaudiArabia"] = "sa";
  CountryISO2["Senegal"] = "sn";
  CountryISO2["Serbia"] = "rs";
  CountryISO2["Seychelles"] = "sc";
  CountryISO2["SierraLeone"] = "sl";
  CountryISO2["Singapore"] = "sg";
  CountryISO2["SintMaarten"] = "sx";
  CountryISO2["Slovakia"] = "sk";
  CountryISO2["Slovenia"] = "si";
  CountryISO2["SolomonIslands"] = "sb";
  CountryISO2["Somalia"] = "so";
  CountryISO2["SouthAfrica"] = "za";
  CountryISO2["SouthKorea"] = "kr";
  CountryISO2["SouthSudan"] = "ss";
  CountryISO2["Spain"] = "es";
  CountryISO2["SriLanka"] = "lk";
  CountryISO2["Sudan"] = "sd";
  CountryISO2["Suriname"] = "sr";
  CountryISO2["SvalbardAndJanMayen"] = "sj";
  CountryISO2["Swaziland"] = "sz";
  CountryISO2["Sweden"] = "se";
  CountryISO2["Switzerland"] = "ch";
  CountryISO2["Syria"] = "sy";
  CountryISO2["Taiwan"] = "tw";
  CountryISO2["Tajikistan"] = "tj";
  CountryISO2["Tanzania"] = "tz";
  CountryISO2["Thailand"] = "th";
  CountryISO2["TimorLeste"] = "tl";
  CountryISO2["Togo"] = "tg";
  CountryISO2["Tokelau"] = "tk";
  CountryISO2["Tonga"] = "to";
  CountryISO2["TrinidadAndTobago"] = "tt";
  CountryISO2["Tunisia"] = "tn";
  CountryISO2["Turkey"] = "tr";
  CountryISO2["Turkmenistan"] = "tm";
  CountryISO2["TurksAndCaicosIslands"] = "tc";
  CountryISO2["Tuvalu"] = "tv";
  CountryISO2["USVirginIslands"] = "vi";
  CountryISO2["Uganda"] = "ug";
  CountryISO2["Ukraine"] = "ua";
  CountryISO2["UnitedArabEmirates"] = "ae";
  CountryISO2["UnitedKingdom"] = "gb";
  CountryISO2["UnitedStates"] = "us";
  CountryISO2["Uruguay"] = "uy";
  CountryISO2["Uzbekistan"] = "uz";
  CountryISO2["Vanuatu"] = "vu";
  CountryISO2["VaticanCity"] = "va";
  CountryISO2["Venezuela"] = "ve";
  CountryISO2["Vietnam"] = "vn";
  CountryISO2["WallisAndFutuna"] = "wf";
  CountryISO2["WesternSahara"] = "eh";
  CountryISO2["Yemen"] = "ye";
  CountryISO2["Zambia"] = "zm";
  CountryISO2["Zimbabwe"] = "zw";
  CountryISO2["ÅlandIslands"] = "ax";
})(CountryISO || (CountryISO = {}));
var CountryCode = class {
  constructor() {
    this.allCountries = [["Afghanistan (‫افغانستان‬‎)", CountryISO.Afghanistan, "93"], ["Albania (Shqipëri)", CountryISO.Albania, "355"], ["Algeria (‫الجزائر‬‎)", CountryISO.Algeria, "213"], ["American Samoa", "as", "1", 1, ["684"]], ["Andorra", CountryISO.Andorra, "376"], ["Angola", CountryISO.Angola, "244"], ["Anguilla", "ai", "1", 1, ["264"]], ["Antigua and Barbuda", "ag", "1", 1, ["268"]], ["Argentina", CountryISO.Argentina, "54"], ["Armenia (Հայաստան)", CountryISO.Armenia, "374"], ["Aruba", CountryISO.Aruba, "297"], ["Australia", CountryISO.Australia, "61", 0], ["Austria (Österreich)", CountryISO.Austria, "43"], ["Azerbaijan (Azərbaycan)", CountryISO.Azerbaijan, "994"], ["Bahamas", "bs", "1", 1, ["242"]], ["Bahrain (‫البحرين‬‎)", CountryISO.Bahrain, "973"], ["Bangladesh (বাংলাদেশ)", CountryISO.Bangladesh, "880"], ["Barbados", "bb", "1", 1, ["246"]], ["Belarus (Беларусь)", CountryISO.Belarus, "375"], ["Belgium (België)", CountryISO.Belgium, "32"], ["Belize", CountryISO.Belize, "501"], ["Benin (Bénin)", CountryISO.Benin, "229"], ["Bermuda", "bm", "1", 1, ["441"]], ["Bhutan (འབྲུག)", CountryISO.Bhutan, "975"], ["Bolivia", CountryISO.Bolivia, "591"], ["Bosnia and Herzegovina (Босна и Херцеговина)", CountryISO.BosniaAndHerzegovina, "387"], ["Botswana", CountryISO.Botswana, "267"], ["Brazil (Brasil)", CountryISO.Brazil, "55"], ["British Indian Ocean Territory", CountryISO.BritishIndianOceanTerritory, "246"], ["British Virgin Islands", "vg", "1", 1, ["284"]], ["Brunei", CountryISO.Brunei, "673"], ["Bulgaria (България)", CountryISO.Bulgaria, "359"], ["Burkina Faso", CountryISO.BurkinaFaso, "226"], ["Burundi (Uburundi)", CountryISO.Burundi, "257"], ["Cambodia (កម្ពុជា)", CountryISO.Cambodia, "855"], ["Cameroon (Cameroun)", CountryISO.Cameroon, "237"], ["Canada", CountryISO.Canada, "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde (Kabu Verdi)", CountryISO.CapeVerde, "238"], ["Caribbean Netherlands", CountryISO.CaribbeanNetherlands, "599", 1], ["Cayman Islands", "ky", "1", 1, ["345"]], ["Central African Republic (République centrafricaine)", CountryISO.CentralAfricanRepublic, "236"], ["Chad (Tchad)", CountryISO.Chad, "235"], ["Chile", CountryISO.Chile, "56"], ["China (中国)", CountryISO.China, "86"], ["Christmas Island", CountryISO.ChristmasIsland, "61", 2], ["Cocos (Keeling) Islands", CountryISO.Cocos, "61", 1], ["Colombia", CountryISO.Colombia, "57"], ["Comoros (‫جزر القمر‬‎)", CountryISO.Comoros, "269"], ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo, "243"], ["Congo (Republic) (Congo-Brazzaville)", CountryISO.CongoRepublicCongoBrazzaville, "242"], ["Cook Islands", CountryISO.CookIslands, "682"], ["Costa Rica", CountryISO.CostaRica, "506"], ["Côte d’Ivoire", CountryISO.CôteDIvoire, "225"], ["Croatia (Hrvatska)", CountryISO.Croatia, "385"], ["Cuba", CountryISO.Cuba, "53"], ["Curaçao", CountryISO.Curaçao, "599", 0], ["Cyprus (Κύπρος)", CountryISO.Cyprus, "357"], ["Czech Republic (Česká republika)", CountryISO.CzechRepublic, "420"], ["Denmark (Danmark)", CountryISO.Denmark, "45"], ["Djibouti", CountryISO.Djibouti, "253"], ["Dominica", CountryISO.Dominica, "1767"], ["Dominican Republic (República Dominicana)", CountryISO.DominicanRepublic, "1", 2, ["809", "829", "849"]], ["Ecuador", CountryISO.Ecuador, "593"], ["Egypt (‫مصر‬‎)", CountryISO.Egypt, "20"], ["El Salvador", CountryISO.ElSalvador, "503"], ["Equatorial Guinea (Guinea Ecuatorial)", CountryISO.EquatorialGuinea, "240"], ["Eritrea", CountryISO.Eritrea, "291"], ["Estonia (Eesti)", CountryISO.Estonia, "372"], ["Ethiopia", CountryISO.Ethiopia, "251"], ["Falkland Islands (Islas Malvinas)", CountryISO.FalklandIslands, "500"], ["Faroe Islands (Føroyar)", CountryISO.FaroeIslands, "298"], ["Fiji", CountryISO.Fiji, "679"], ["Finland (Suomi)", CountryISO.Finland, "358", 0], ["France", CountryISO.France, "33"], ["French Guiana (Guyane française)", CountryISO.FrenchGuiana, "594"], ["French Polynesia (Polynésie française)", CountryISO.FrenchPolynesia, "689"], ["Gabon", CountryISO.Gabon, "241"], ["Gambia", CountryISO.Gambia, "220"], ["Georgia (საქართველო)", CountryISO.Georgia, "995"], ["Germany (Deutschland)", CountryISO.Germany, "49"], ["Ghana (Gaana)", CountryISO.Ghana, "233"], ["Gibraltar", CountryISO.Gibraltar, "350"], ["Greece (Ελλάδα)", CountryISO.Greece, "30"], ["Greenland (Kalaallit Nunaat)", CountryISO.Greenland, "299"], ["Grenada", CountryISO.Grenada, "1473"], ["Guadeloupe", CountryISO.Guadeloupe, "590", 0], ["Guam", "gu", "1", 1, ["671"]], ["Guatemala", CountryISO.Guatemala, "502"], ["Guernsey", CountryISO.Guernsey, "44", 1, [1481]], ["Guinea (Guinée)", CountryISO.Guinea, "224"], ["Guinea-Bissau (Guiné Bissau)", CountryISO.GuineaBissau, "245"], ["Guyana", CountryISO.Guyana, "592"], ["Haiti", CountryISO.Haiti, "509"], ["Honduras", CountryISO.Honduras, "504"], ["Hong Kong (香港)", CountryISO.HongKong, "852"], ["Hungary (Magyarország)", CountryISO.Hungary, "36"], ["Iceland (Ísland)", CountryISO.Iceland, "354"], ["India (भारत)", CountryISO.India, "91"], ["Indonesia", CountryISO.Indonesia, "62"], ["Iran (‫ایران‬‎)", CountryISO.Iran, "98"], ["Iraq (‫العراق‬‎)", CountryISO.Iraq, "964"], ["Ireland", CountryISO.Ireland, "353"], ["Isle of Man", CountryISO.IsleOfMan, "44", 2, [1624]], ["Israel (‫ישראל‬‎)", CountryISO.Israel, "972"], ["Italy (Italia)", CountryISO.Italy, "39", 0], ["Jamaica", "jm", "1", 1, ["876"]], ["Japan (日本)", CountryISO.Japan, "81"], ["Jersey", CountryISO.Jersey, "44", 3, [1534]], ["Jordan (‫الأردن‬‎)", CountryISO.Jordan, "962"], ["Kazakhstan (Казахстан)", CountryISO.Kazakhstan, "7", 1], ["Kenya", CountryISO.Kenya, "254"], ["Kiribati", CountryISO.Kiribati, "686"], ["Kosovo", CountryISO.Kosovo, "383"], ["Kuwait (‫الكويت‬‎)", CountryISO.Kuwait, "965"], ["Kyrgyzstan (Кыргызстан)", CountryISO.Kyrgyzstan, "996"], ["Laos (ລາວ)", CountryISO.Laos, "856"], ["Latvia (Latvija)", CountryISO.Latvia, "371"], ["Lebanon (‫لبنان‬‎)", CountryISO.Lebanon, "961"], ["Lesotho", CountryISO.Lesotho, "266"], ["Liberia", CountryISO.Liberia, "231"], ["Libya (‫ليبيا‬‎)", CountryISO.Libya, "218"], ["Liechtenstein", CountryISO.Liechtenstein, "423"], ["Lithuania (Lietuva)", CountryISO.Lithuania, "370"], ["Luxembourg", CountryISO.Luxembourg, "352"], ["Macau (澳門)", CountryISO.Macau, "853"], ["Macedonia (FYROM) (Македонија)", CountryISO.Macedonia, "389"], ["Madagascar (Madagasikara)", CountryISO.Madagascar, "261"], ["Malawi", CountryISO.Malawi, "265"], ["Malaysia", CountryISO.Malaysia, "60"], ["Maldives", CountryISO.Maldives, "960"], ["Mali", CountryISO.Mali, "223"], ["Malta", CountryISO.Malta, "356"], ["Marshall Islands", CountryISO.MarshallIslands, "692"], ["Martinique", CountryISO.Martinique, "596"], ["Mauritania (‫موريتانيا‬‎)", CountryISO.Mauritania, "222"], ["Mauritius (Moris)", CountryISO.Mauritius, "230"], ["Mayotte", CountryISO.Mayotte, "262", 1], ["Mexico (México)", CountryISO.Mexico, "52"], ["Micronesia", CountryISO.Micronesia, "691"], ["Moldova (Republica Moldova)", CountryISO.Moldova, "373"], ["Monaco", CountryISO.Monaco, "377"], ["Mongolia (Монгол)", CountryISO.Mongolia, "976"], ["Montenegro (Crna Gora)", CountryISO.Montenegro, "382"], ["Montserrat", "ms", "1", 1, ["664"]], ["Morocco (‫المغرب‬‎)", CountryISO.Morocco, "212", 0], ["Mozambique (Moçambique)", CountryISO.Mozambique, "258"], ["Myanmar (Burma) (မြန်မာ)", CountryISO.Myanmar, "95"], ["Namibia (Namibië)", CountryISO.Namibia, "264"], ["Nauru", CountryISO.Nauru, "674"], ["Nepal (नेपाल)", CountryISO.Nepal, "977"], ["Netherlands (Nederland)", CountryISO.Netherlands, "31"], ["New Caledonia (Nouvelle-Calédonie)", CountryISO.NewCaledonia, "687"], ["New Zealand", CountryISO.NewZealand, "64"], ["Nicaragua", CountryISO.Nicaragua, "505"], ["Niger (Nijar)", CountryISO.Niger, "227"], ["Nigeria", CountryISO.Nigeria, "234"], ["Niue", CountryISO.Niue, "683"], ["Norfolk Island", CountryISO.NorfolkIsland, "672"], ["North Korea (조선 민주주의 인민 공화국)", CountryISO.NorthKorea, "850"], ["Northern Mariana Islands", CountryISO.NorthernMarianaIslands, "1670"], ["Norway (Norge)", CountryISO.Norway, "47", 0], ["Oman (‫عُمان‬‎)", CountryISO.Oman, "968"], ["Pakistan (‫پاکستان‬‎)", CountryISO.Pakistan, "92"], ["Palau", CountryISO.Palau, "680"], ["Palestine (‫فلسطين‬‎)", CountryISO.Palestine, "970"], ["Panama (Panamá)", CountryISO.Panama, "507"], ["Papua New Guinea", CountryISO.PapuaNewGuinea, "675"], ["Paraguay", CountryISO.Paraguay, "595"], ["Peru (Perú)", CountryISO.Peru, "51"], ["Philippines", CountryISO.Philippines, "63"], ["Poland (Polska)", CountryISO.Poland, "48"], ["Portugal", CountryISO.Portugal, "351"], ["Puerto Rico", CountryISO.PuertoRico, "1", 3, ["787", "939"]], ["Qatar (‫قطر‬‎)", CountryISO.Qatar, "974"], ["Réunion (La Réunion)", CountryISO.Réunion, "262", 0], ["Romania (România)", CountryISO.Romania, "40"], ["Russia (Россия)", CountryISO.Russia, "7", 0], ["Rwanda", CountryISO.Rwanda, "250"], ["Saint Barthélemy (Saint-Barthélemy)", CountryISO.SaintBarthélemy, "590", 1], ["Saint Helena", CountryISO.SaintHelena, "290"], ["Saint Kitts and Nevis", CountryISO.SaintKittsAndNevis, "1869"], ["Saint Lucia", "lc", "1", 1, ["758"]], ["Saint Martin (Saint-Martin (partie française))", CountryISO.SaintMartin, "590", 2], ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", CountryISO.SaintPierreAndMiquelon, "508"], ["Saint Vincent and the Grenadines", "vc", "1", 1, ["784"]], ["Samoa", CountryISO.Samoa, "685"], ["San Marino", CountryISO.SanMarino, "378"], ["São Tomé and Príncipe (São Tomé e Príncipe)", CountryISO.SãoToméAndPríncipe, "239"], ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", CountryISO.SaudiArabia, "966"], ["Senegal (Sénégal)", CountryISO.Senegal, "221"], ["Serbia (Србија)", CountryISO.Serbia, "381"], ["Seychelles", CountryISO.Seychelles, "248"], ["Sierra Leone", CountryISO.SierraLeone, "232"], ["Singapore", CountryISO.Singapore, "65"], ["Sint Maarten", "sx", "1", 1, ["721"]], ["Slovakia (Slovensko)", CountryISO.Slovakia, "421"], ["Slovenia (Slovenija)", CountryISO.Slovenia, "386"], ["Solomon Islands", CountryISO.SolomonIslands, "677"], ["Somalia (Soomaaliya)", CountryISO.Somalia, "252"], ["South Africa", CountryISO.SouthAfrica, "27"], ["South Korea (대한민국)", CountryISO.SouthKorea, "82"], ["South Sudan (‫جنوب السودان‬‎)", CountryISO.SouthSudan, "211"], ["Spain (España)", CountryISO.Spain, "34"], ["Sri Lanka (ශ්‍රී ලංකාව)", CountryISO.SriLanka, "94"], ["Sudan (‫السودان‬‎)", CountryISO.Sudan, "249"], ["Suriname", CountryISO.Suriname, "597"], ["Svalbard and Jan Mayen", CountryISO.SvalbardAndJanMayen, "47", 1], ["Swaziland", CountryISO.Swaziland, "268"], ["Sweden (Sverige)", CountryISO.Sweden, "46"], ["Switzerland (Schweiz)", CountryISO.Switzerland, "41"], ["Syria (‫سوريا‬‎)", CountryISO.Syria, "963"], ["Taiwan (台灣)", CountryISO.Taiwan, "886"], ["Tajikistan", CountryISO.Tajikistan, "992"], ["Tanzania", CountryISO.Tanzania, "255"], ["Thailand (ไทย)", CountryISO.Thailand, "66"], ["Timor-Leste", CountryISO.TimorLeste, "670"], ["Togo", CountryISO.Togo, "228"], ["Tokelau", CountryISO.Tokelau, "690"], ["Tonga", CountryISO.Tonga, "676"], ["Trinidad and Tobago", "tt", "1", 1, ["868"]], ["Tunisia (‫تونس‬‎)", CountryISO.Tunisia, "216"], ["Turkey (Türkiye)", CountryISO.Turkey, "90"], ["Turkmenistan", CountryISO.Turkmenistan, "993"], ["Turks and Caicos Islands", CountryISO.TurksAndCaicosIslands, "1649"], ["Tuvalu", CountryISO.Tuvalu, "688"], ["U.S. Virgin Islands", "vi", "1", 1, ["340"]], ["Uganda", CountryISO.Uganda, "256"], ["Ukraine (Україна)", CountryISO.Ukraine, "380"], ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", CountryISO.UnitedArabEmirates, "971"], ["United Kingdom", CountryISO.UnitedKingdom, "44", 0], ["United States", CountryISO.UnitedStates, "1", 0], ["Uruguay", CountryISO.Uruguay, "598"], ["Uzbekistan (Oʻzbekiston)", CountryISO.Uzbekistan, "998"], ["Vanuatu", CountryISO.Vanuatu, "678"], ["Vatican City (Città del Vaticano)", CountryISO.VaticanCity, "39", 1], ["Venezuela", CountryISO.Venezuela, "58"], ["Vietnam (Việt Nam)", CountryISO.Vietnam, "84"], ["Wallis and Futuna", CountryISO.WallisAndFutuna, "681"], ["Western Sahara (‫الصحراء الغربية‬‎)", CountryISO.WesternSahara, "212", 1], ["Yemen (‫اليمن‬‎)", CountryISO.Yemen, "967"], ["Zambia", CountryISO.Zambia, "260"], ["Zimbabwe", CountryISO.Zimbabwe, "263"], ["Åland Islands", CountryISO.ÅlandIslands, "358", 1]];
  }
};
CountryCode.ɵfac = function CountryCode_Factory(t) {
  return new (t || CountryCode)();
};
CountryCode.ɵprov = ɵɵdefineInjectable({
  token: CountryCode,
  factory: CountryCode.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CountryCode, [{
    type: Injectable
  }], null, null);
})();
var SearchCountryField;
(function(SearchCountryField2) {
  SearchCountryField2["DialCode"] = "dialCode";
  SearchCountryField2["Iso2"] = "iso2";
  SearchCountryField2["Name"] = "name";
  SearchCountryField2["All"] = "all";
})(SearchCountryField || (SearchCountryField = {}));
var phoneNumberValidator = (control) => {
  if (!control.value) {
    return;
  }
  const el = control.nativeElement;
  const inputBox = el ? el.querySelector('input[type="tel"]') : void 0;
  if (inputBox) {
    const id = inputBox.id;
    const isCheckValidation = inputBox.getAttribute("validation");
    if (isCheckValidation === "true") {
      const isRequired = control.errors && control.errors.required === true;
      const error = {
        validatePhoneNumber: {
          valid: false
        }
      };
      inputBox.setCustomValidity("Invalid field.");
      let number;
      try {
        number = lpn.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
      } catch (e) {
        if (isRequired) {
          return error;
        } else {
          inputBox.setCustomValidity("");
        }
      }
      if (control.value) {
        if (!number) {
          return error;
        } else {
          if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
            return error;
          } else {
            inputBox.setCustomValidity("");
          }
        }
      }
    } else if (isCheckValidation === "false") {
      inputBox.setCustomValidity("");
      control.clearValidators();
    }
  }
  return;
};
var PhoneNumberFormat2;
(function(PhoneNumberFormat3) {
  PhoneNumberFormat3["International"] = "INTERNATIONAL";
  PhoneNumberFormat3["National"] = "NATIONAL";
})(PhoneNumberFormat2 || (PhoneNumberFormat2 = {}));
var NativeElementInjectorDirective = class {
  constructor(controlDir, host) {
    this.controlDir = controlDir;
    this.host = host;
  }
  ngOnInit() {
    if (this.controlDir.control) {
      this.controlDir.control["nativeElement"] = this.host.nativeElement;
    }
  }
};
NativeElementInjectorDirective.ɵfac = function NativeElementInjectorDirective_Factory(t) {
  return new (t || NativeElementInjectorDirective)(ɵɵdirectiveInject(NgControl), ɵɵdirectiveInject(ElementRef));
};
NativeElementInjectorDirective.ɵdir = ɵɵdefineDirective({
  type: NativeElementInjectorDirective,
  selectors: [["", "ngModel", ""], ["", "formControl", ""], ["", "formControlName", ""]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NativeElementInjectorDirective, [{
    type: Directive,
    args: [{
      // tslint:disable-next-line: directive-selector
      selector: "[ngModel], [formControl], [formControlName]"
    }]
  }], function() {
    return [{
      type: NgControl
    }, {
      type: ElementRef
    }];
  }, null);
})();
var NgxIntlTelInputComponent = class {
  constructor(countryCodeData) {
    this.countryCodeData = countryCodeData;
    this.value = "";
    this.preferredCountries = [];
    this.enablePlaceholder = true;
    this.numberFormat = PhoneNumberFormat2.International;
    this.cssClass = "form-control";
    this.onlyCountries = [];
    this.enableAutoCountrySelect = true;
    this.searchCountryFlag = false;
    this.searchCountryField = [SearchCountryField.All];
    this.searchCountryPlaceholder = "Search Country";
    this.selectFirstCountry = true;
    this.phoneValidation = true;
    this.inputId = "phone";
    this.separateDialCode = false;
    this.countryChange = new EventEmitter();
    this.selectedCountry = {
      areaCodes: void 0,
      dialCode: "",
      htmlId: "",
      flagClass: "",
      iso2: "",
      name: "",
      placeHolder: "",
      priority: 0
    };
    this.phoneNumber = "";
    this.allCountries = [];
    this.preferredCountriesInDropDown = [];
    this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
    this.disabled = false;
    this.errors = ["Phone number is required."];
    this.countrySearchText = "";
    this.onTouched = () => {
    };
    this.propagateChange = (_) => {
    };
    setTheme("bs4");
  }
  ngOnInit() {
    this.init();
  }
  ngOnChanges(changes) {
    const selectedISO = changes["selectedCountryISO"];
    if (this.allCountries && selectedISO && selectedISO.currentValue !== selectedISO.previousValue) {
      this.updateSelectedCountry();
    }
    if (changes["preferredCountries"]) {
      this.updatePreferredCountries();
    }
    this.checkSeparateDialCodeStyle();
  }
  /*
      This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
      Ref: http://codelyzer.com/rules/no-life-cycle-call/
  */
  init() {
    this.fetchCountryData();
    if (this.preferredCountries.length) {
      this.updatePreferredCountries();
    }
    if (this.onlyCountries.length) {
      this.allCountries = this.allCountries.filter((c) => this.onlyCountries.includes(c.iso2));
    }
    if (this.selectFirstCountry) {
      if (this.preferredCountriesInDropDown.length) {
        this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
      } else {
        this.setSelectedCountry(this.allCountries[0]);
      }
    }
    this.updateSelectedCountry();
    this.checkSeparateDialCodeStyle();
  }
  setSelectedCountry(country) {
    this.selectedCountry = country;
    this.countryChange.emit(country);
  }
  /**
   * Search country based on country name, iso2, dialCode or all of them.
   */
  searchCountry() {
    if (!this.countrySearchText) {
      this.countryList.nativeElement.querySelector(".iti__country-list li").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
      return;
    }
    const countrySearchTextLower = this.countrySearchText.toLowerCase();
    const country = this.allCountries.filter((c) => {
      if (this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
        if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
          return c;
        }
        if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
          return c;
        }
        if (c.dialCode.startsWith(this.countrySearchText)) {
          return c;
        }
      } else {
        if (this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
          if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
            return c;
          }
        }
        if (this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
          if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
            return c;
          }
        }
        if (this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
          if (c.dialCode.startsWith(this.countrySearchText)) {
            return c;
          }
        }
      }
    });
    if (country.length > 0) {
      const el = this.countryList.nativeElement.querySelector("#" + country[0].htmlId);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }
    }
    this.checkSeparateDialCodeStyle();
  }
  onPhoneNumberChange() {
    let countryCode;
    if (this.phoneNumber && typeof this.phoneNumber === "object") {
      const numberObj = this.phoneNumber;
      this.phoneNumber = numberObj.number;
      countryCode = numberObj.countryCode;
    }
    this.value = this.phoneNumber;
    countryCode = countryCode || this.selectedCountry.iso2;
    const number = this.getParsedNumber(this.phoneNumber, countryCode);
    if (this.enableAutoCountrySelect) {
      countryCode = number && number.getCountryCode() ? this.getCountryIsoCode(number.getCountryCode(), number) : this.selectedCountry.iso2;
      if (countryCode && countryCode !== this.selectedCountry.iso2) {
        const newCountry = this.allCountries.sort((a, b) => {
          return a.priority - b.priority;
        }).find((c) => c.iso2 === countryCode);
        if (newCountry) {
          this.selectedCountry = newCountry;
        }
      }
    }
    countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
    this.checkSeparateDialCodeStyle();
    if (!this.value) {
      this.propagateChange(null);
    } else {
      const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : "";
      if (this.separateDialCode && intlNo) {
        this.value = this.removeDialCode(intlNo);
      }
      this.propagateChange({
        number: this.value,
        internationalNumber: intlNo,
        nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : "",
        e164Number: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164) : "",
        countryCode: countryCode.toUpperCase(),
        dialCode: "+" + this.selectedCountry.dialCode
      });
    }
  }
  onCountrySelect(country, el) {
    this.setSelectedCountry(country);
    this.checkSeparateDialCodeStyle();
    if (this.phoneNumber && this.phoneNumber.length > 0) {
      this.value = this.phoneNumber;
      const number = this.getParsedNumber(this.phoneNumber, this.selectedCountry.iso2);
      const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : "";
      if (this.separateDialCode && intlNo) {
        this.value = this.removeDialCode(intlNo);
      }
      this.propagateChange({
        number: this.value,
        internationalNumber: intlNo,
        nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : "",
        e164Number: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.E164) : "",
        countryCode: this.selectedCountry.iso2.toUpperCase(),
        dialCode: "+" + this.selectedCountry.dialCode
      });
    } else {
      this.propagateChange(null);
    }
    el.focus();
  }
  onInputKeyPress(event) {
    const allowedChars = /[0-9\+\-\(\)\ ]/;
    const allowedCtrlChars = /[axcv]/;
    const allowedOtherKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Home", "End", "Insert", "Delete", "Backspace"];
    if (!allowedChars.test(event.key) && !(event.ctrlKey && allowedCtrlChars.test(event.key)) && !allowedOtherKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  writeValue(obj) {
    if (obj === void 0) {
      this.init();
    }
    this.phoneNumber = obj;
    setTimeout(() => {
      this.onPhoneNumberChange();
    }, 1);
  }
  resolvePlaceholder() {
    let placeholder = "";
    if (this.customPlaceholder) {
      placeholder = this.customPlaceholder;
    } else if (this.selectedCountry.placeHolder) {
      placeholder = this.selectedCountry.placeHolder;
      if (this.separateDialCode) {
        placeholder = this.removeDialCode(placeholder);
      }
    }
    return placeholder;
  }
  /* --------------------------------- Helpers -------------------------------- */
  /**
   * Returns parse PhoneNumber object.
   * @param phoneNumber string
   * @param countryCode string
   */
  getParsedNumber(phoneNumber, countryCode) {
    let number;
    try {
      number = this.phoneUtil.parse(phoneNumber, countryCode.toUpperCase());
    } catch (e) {
    }
    return number;
  }
  /**
   * Adjusts input alignment based on the dial code presentation style.
   */
  checkSeparateDialCodeStyle() {
    if (this.separateDialCode && this.selectedCountry) {
      const cntryCd = this.selectedCountry.dialCode;
      this.separateDialCodeClass = "separate-dial-code iti-sdc-" + (cntryCd.length + 1);
    } else {
      this.separateDialCodeClass = "";
    }
  }
  /**
   * Cleans dialcode from phone number string.
   * @param phoneNumber string
   */
  removeDialCode(phoneNumber) {
    const number = this.getParsedNumber(phoneNumber, this.selectedCountry.iso2);
    phoneNumber = this.phoneUtil.format(number, lpn.PhoneNumberFormat[this.numberFormat]);
    if (phoneNumber.startsWith("+") && this.separateDialCode) {
      phoneNumber = phoneNumber.substr(phoneNumber.indexOf(" ") + 1);
    }
    return phoneNumber;
  }
  /**
   * Sifts through all countries and returns iso code of the primary country
   * based on the number provided.
   * @param countryCode country code in number format
   * @param number PhoneNumber object
   */
  getCountryIsoCode(countryCode, number) {
    const rawNumber = number["values_"]["2"].toString();
    const countries = this.allCountries.filter((c) => c.dialCode === countryCode.toString());
    const mainCountry = countries.find((c) => c.areaCodes === void 0);
    const secondaryCountries = countries.filter((c) => c.areaCodes !== void 0);
    let matchedCountry = mainCountry ? mainCountry.iso2 : void 0;
    secondaryCountries.forEach((country) => {
      country.areaCodes.forEach((areaCode) => {
        if (rawNumber.startsWith(areaCode)) {
          matchedCountry = country.iso2;
        }
      });
    });
    return matchedCountry;
  }
  /**
   * Gets formatted example phone number from phoneUtil.
   * @param countryCode string
   */
  getPhoneNumberPlaceHolder(countryCode) {
    try {
      return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat[this.numberFormat]);
    } catch (e) {
      return e;
    }
  }
  /**
   * Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248)
   */
  fetchCountryData() {
    this.allCountries = [];
    this.countryCodeData.allCountries.forEach((c) => {
      const country = {
        name: c[0].toString(),
        iso2: c[1].toString(),
        dialCode: c[2].toString(),
        priority: +c[3] || 0,
        areaCodes: c[4] || void 0,
        htmlId: `iti-0__item-${c[1].toString()}`,
        flagClass: `iti__${c[1].toString().toLocaleLowerCase()}`,
        placeHolder: ""
      };
      if (this.enablePlaceholder) {
        country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
      }
      this.allCountries.push(country);
    });
  }
  /**
   * Populates preferredCountriesInDropDown with prefferred countries.
   */
  updatePreferredCountries() {
    if (this.preferredCountries.length) {
      this.preferredCountriesInDropDown = [];
      this.preferredCountries.forEach((iso2) => {
        const preferredCountry = this.allCountries.filter((c) => {
          return c.iso2 === iso2;
        });
        this.preferredCountriesInDropDown.push(preferredCountry[0]);
      });
    }
  }
  /**
   * Updates selectedCountry.
   */
  updateSelectedCountry() {
    if (this.selectedCountryISO) {
      this.selectedCountry = this.allCountries.find((c) => {
        return c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase();
      });
      if (this.selectedCountry) {
        if (this.phoneNumber) {
          this.onPhoneNumberChange();
        } else {
          this.propagateChange(null);
        }
      }
    }
  }
};
NgxIntlTelInputComponent.ɵfac = function NgxIntlTelInputComponent_Factory(t) {
  return new (t || NgxIntlTelInputComponent)(ɵɵdirectiveInject(CountryCode));
};
NgxIntlTelInputComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxIntlTelInputComponent,
  selectors: [["ngx-intl-tel-input"]],
  viewQuery: function NgxIntlTelInputComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.countryList = _t.first);
    }
  },
  inputs: {
    value: "value",
    preferredCountries: "preferredCountries",
    enablePlaceholder: "enablePlaceholder",
    customPlaceholder: "customPlaceholder",
    numberFormat: "numberFormat",
    cssClass: "cssClass",
    onlyCountries: "onlyCountries",
    enableAutoCountrySelect: "enableAutoCountrySelect",
    searchCountryFlag: "searchCountryFlag",
    searchCountryField: "searchCountryField",
    searchCountryPlaceholder: "searchCountryPlaceholder",
    maxLength: "maxLength",
    selectFirstCountry: "selectFirstCountry",
    selectedCountryISO: "selectedCountryISO",
    phoneValidation: "phoneValidation",
    inputId: "inputId",
    separateDialCode: "separateDialCode"
  },
  outputs: {
    countryChange: "countryChange"
  },
  features: [ɵɵProvidersFeature([CountryCode, {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(() => NgxIntlTelInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useValue: phoneNumberValidator,
    multi: true
  }]), ɵɵNgOnChangesFeature],
  decls: 9,
  vars: 14,
  consts: [[1, "iti", "iti--allow-dropdown", 3, "ngClass"], ["dropdown", "", 1, "iti__flag-container", 3, "ngClass", "isDisabled"], ["dropdownToggle", "", 1, "iti__selected-flag", "dropdown-toggle"], [1, "iti__flag", 3, "ngClass"], ["class", "selected-dial-code", 4, "ngIf"], [1, "iti__arrow"], ["class", "dropdown-menu country-dropdown", 4, "dropdownMenu"], ["type", "tel", "autocomplete", "off", 3, "id", "ngClass", "ngModel", "disabled", "placeholder", "blur", "keypress", "ngModelChange"], ["focusable", ""], [1, "selected-dial-code"], [1, "dropdown-menu", "country-dropdown"], ["class", "search-container", 4, "ngIf"], [1, "iti__country-list"], ["countryList", ""], ["class", "iti__country iti__preferred", 3, "id", "click", 4, "ngFor", "ngForOf"], ["class", "iti__divider", 4, "ngIf"], ["class", "iti__country iti__standard", 3, "id", "click", 4, "ngFor", "ngForOf"], [1, "search-container"], ["id", "country-search-box", "autofocus", "", 3, "ngModel", "placeholder", "ngModelChange", "keyup", "click"], [1, "iti__country", "iti__preferred", 3, "id", "click"], [1, "iti__flag-box"], [1, "iti__country-name"], [1, "iti__dial-code"], [1, "iti__divider"], [1, "iti__country", "iti__standard", 3, "id", "click"]],
  template: function NgxIntlTelInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      ɵɵelement(3, "div", 3);
      ɵɵtemplate(4, NgxIntlTelInputComponent_div_4_Template, 2, 1, "div", 4);
      ɵɵelement(5, "div", 5);
      ɵɵelementEnd();
      ɵɵtemplate(6, NgxIntlTelInputComponent_div_6_Template, 7, 4, "div", 6);
      ɵɵelementEnd();
      ɵɵelementStart(7, "input", 7, 8);
      ɵɵlistener("blur", function NgxIntlTelInputComponent_Template_input_blur_7_listener() {
        return ctx.onTouched();
      })("keypress", function NgxIntlTelInputComponent_Template_input_keypress_7_listener($event) {
        return ctx.onInputKeyPress($event);
      })("ngModelChange", function NgxIntlTelInputComponent_Template_input_ngModelChange_7_listener($event) {
        return ctx.phoneNumber = $event;
      })("ngModelChange", function NgxIntlTelInputComponent_Template_input_ngModelChange_7_listener() {
        return ctx.onPhoneNumberChange();
      });
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ctx.separateDialCodeClass);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(12, _c1, ctx.disabled))("isDisabled", ctx.disabled);
      ɵɵadvance(2);
      ɵɵproperty("ngClass", (ctx.selectedCountry == null ? null : ctx.selectedCountry.flagClass) || "");
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.separateDialCode);
      ɵɵadvance(3);
      ɵɵproperty("id", ctx.inputId)("ngClass", ctx.cssClass)("ngModel", ctx.phoneNumber)("disabled", ctx.disabled)("placeholder", ctx.resolvePlaceholder());
      ɵɵattribute("maxLength", ctx.maxLength)("validation", ctx.phoneValidation);
    }
  },
  dependencies: [NgClass, BsDropdownDirective, BsDropdownToggleDirective, NgIf, BsDropdownMenuDirective, DefaultValueAccessor, NgControlStatus, NgModel, NativeElementInjectorDirective, NgForOf],
  styles: ['.dropup[_ngcontent-%COMP%], .dropright[_ngcontent-%COMP%], .dropdown[_ngcontent-%COMP%], .dropleft[_ngcontent-%COMP%]{position:relative}.dropdown-toggle[_ngcontent-%COMP%]{white-space:nowrap}.dropdown-toggle[_ngcontent-%COMP%]:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle[_ngcontent-%COMP%]:empty:after{margin-left:0}.dropdown-menu[_ngcontent-%COMP%]{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.dropdown-menu-left[_ngcontent-%COMP%]{right:auto;left:0}.dropdown-menu-right[_ngcontent-%COMP%]{right:0;left:auto}@media (min-width: 576px){.dropdown-menu-sm-left[_ngcontent-%COMP%]{right:auto;left:0}.dropdown-menu-sm-right[_ngcontent-%COMP%]{right:0;left:auto}}@media (min-width: 768px){.dropdown-menu-md-left[_ngcontent-%COMP%]{right:auto;left:0}.dropdown-menu-md-right[_ngcontent-%COMP%]{right:0;left:auto}}@media (min-width: 992px){.dropdown-menu-lg-left[_ngcontent-%COMP%]{right:auto;left:0}.dropdown-menu-lg-right[_ngcontent-%COMP%]{right:0;left:auto}}@media (min-width: 1200px){.dropdown-menu-xl-left[_ngcontent-%COMP%]{right:auto;left:0}.dropdown-menu-xl-right[_ngcontent-%COMP%]{right:0;left:auto}}.dropup[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{top:auto;bottom:100%;margin-top:0;margin-bottom:.125rem}.dropup[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.dropup[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:empty:after{margin-left:0}.dropright[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{top:0;right:auto;left:100%;margin-top:0;margin-left:.125rem}.dropright[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.dropright[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:empty:after{margin-left:0}.dropright[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{vertical-align:0}.dropleft[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{top:0;right:100%;left:auto;margin-top:0;margin-right:.125rem}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:""}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{display:none}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:empty:after{margin-left:0}.dropleft[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:before{vertical-align:0}.dropdown-menu[x-placement^=top][_ngcontent-%COMP%], .dropdown-menu[x-placement^=right][_ngcontent-%COMP%], .dropdown-menu[x-placement^=bottom][_ngcontent-%COMP%], .dropdown-menu[x-placement^=left][_ngcontent-%COMP%]{right:auto;bottom:auto}.dropdown-divider[_ngcontent-%COMP%]{height:0;margin:.5rem 0;overflow:hidden;border-top:1px solid #e9ecef}.dropdown-item[_ngcontent-%COMP%]{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0}.dropdown-item[_ngcontent-%COMP%]:hover, .dropdown-item[_ngcontent-%COMP%]:focus{color:#16181b;text-decoration:none;background-color:#f8f9fa}.dropdown-item.active[_ngcontent-%COMP%], .dropdown-item[_ngcontent-%COMP%]:active{color:#fff;text-decoration:none;background-color:#007bff}.dropdown-item.disabled[_ngcontent-%COMP%], .dropdown-item[_ngcontent-%COMP%]:disabled{color:#6c757d;pointer-events:none;background-color:transparent}.dropdown-menu.show[_ngcontent-%COMP%]{display:block}.dropdown-header[_ngcontent-%COMP%]{display:block;padding:.5rem 1.5rem;margin-bottom:0;font-size:.875rem;color:#6c757d;white-space:nowrap}.dropdown-item-text[_ngcontent-%COMP%]{display:block;padding:.25rem 1.5rem;color:#212529}', "li.iti__country[_ngcontent-%COMP%]:hover{background-color:#0000000d}.iti__selected-flag.dropdown-toggle[_ngcontent-%COMP%]:after{content:none}.iti__flag-container.disabled[_ngcontent-%COMP%]{cursor:default!important}.iti.iti--allow-dropdown[_ngcontent-%COMP%]   .flag-container.disabled[_ngcontent-%COMP%]:hover   .iti__selected-flag[_ngcontent-%COMP%]{background:none}.country-dropdown[_ngcontent-%COMP%]{border:1px solid #ccc;width:-moz-fit-content;width:fit-content;padding:1px;border-collapse:collapse}.search-container[_ngcontent-%COMP%]{position:relative}.search-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;border:none;border-bottom:1px solid #ccc;padding-left:10px}.search-icon[_ngcontent-%COMP%]{position:absolute;z-index:2;width:25px;margin:1px 10px}.iti__country-list[_ngcontent-%COMP%]{position:relative;border:none}.iti[_ngcontent-%COMP%]   input#country-search-box[_ngcontent-%COMP%]{padding-left:6px}.iti[_ngcontent-%COMP%]   .selected-dial-code[_ngcontent-%COMP%]{margin-left:6px}.iti.separate-dial-code[_ngcontent-%COMP%]   .iti__selected-flag[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2[_ngcontent-%COMP%]   .iti__selected-flag[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3[_ngcontent-%COMP%]   .iti__selected-flag[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4[_ngcontent-%COMP%]   .iti__selected-flag[_ngcontent-%COMP%]{width:93px}.iti.separate-dial-code[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding-left:98px}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxIntlTelInputComponent, [{
    type: Component,
    args: [{
      selector: "ngx-intl-tel-input",
      providers: [CountryCode, {
        provide: NG_VALUE_ACCESSOR,
        // tslint:disable-next-line:no-forward-ref
        useExisting: forwardRef(() => NgxIntlTelInputComponent),
        multi: true
      }, {
        provide: NG_VALIDATORS,
        useValue: phoneNumberValidator,
        multi: true
      }],
      template: `<div class="iti iti--allow-dropdown"
	[ngClass]="separateDialCodeClass">
	<div class="iti__flag-container"
		dropdown
		[ngClass]="{'disabled': disabled}"
		[isDisabled]="disabled">
		<div class="iti__selected-flag dropdown-toggle"
			dropdownToggle>
			<div class="iti__flag"
				[ngClass]="selectedCountry?.flagClass || ''"></div>
			<div *ngIf="separateDialCode"
				class="selected-dial-code">+{{selectedCountry.dialCode}}</div>
			<div class="iti__arrow"></div>
		</div>
		<div *dropdownMenu
			class="dropdown-menu country-dropdown">
			<div class="search-container"
				*ngIf="searchCountryFlag && searchCountryField">
				<input id="country-search-box"
					[(ngModel)]="countrySearchText"
					(keyup)="searchCountry()"
					(click)="$event.stopPropagation()"
					[placeholder]="searchCountryPlaceholder"
					autofocus>
			</div>
			<ul class="iti__country-list"
				#countryList>
				<li class="iti__country iti__preferred"
					*ngFor="let country of preferredCountriesInDropDown"
					(click)="onCountrySelect(country, focusable)"
					[id]="country.htmlId+'-preferred'">
					<div class="iti__flag-box">
						<div class="iti__flag"
							[ngClass]="country.flagClass"></div>
					</div>
					<span class="iti__country-name">{{country.name}}</span>
					<span class="iti__dial-code">+{{country.dialCode}}</span>
				</li>
				<li class="iti__divider"
					*ngIf="preferredCountriesInDropDown?.length"></li>
				<li class="iti__country iti__standard"
					*ngFor="let country of allCountries"
					(click)="onCountrySelect(country, focusable)"
					[id]="country.htmlId">
					<div class="iti__flag-box">
						<div class="iti__flag"
							[ngClass]="country.flagClass"></div>
					</div>
					<span class="iti__country-name">{{country.name}}</span>
					<span class="iti__dial-code">+{{country.dialCode}}</span>
				</li>
			</ul>
		</div>
	</div>
	<input type="tel"
		[id]="inputId"
		autocomplete="off"
		[ngClass]="cssClass"
		(blur)="onTouched()"
		(keypress)="onInputKeyPress($event)"
		[(ngModel)]="phoneNumber"
		(ngModelChange)="onPhoneNumberChange()"
		[disabled]="disabled"
		[placeholder]="resolvePlaceholder()"
		[attr.maxLength]="maxLength"
		[attr.validation]="phoneValidation"
		#focusable>
</div>
`,
      styles: ['.dropup,.dropright,.dropdown,.dropleft{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle:empty:after{margin-left:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.dropdown-menu-left{right:auto;left:0}.dropdown-menu-right{right:0;left:auto}@media (min-width: 576px){.dropdown-menu-sm-left{right:auto;left:0}.dropdown-menu-sm-right{right:0;left:auto}}@media (min-width: 768px){.dropdown-menu-md-left{right:auto;left:0}.dropdown-menu-md-right{right:0;left:auto}}@media (min-width: 992px){.dropdown-menu-lg-left{right:auto;left:0}.dropdown-menu-lg-right{right:0;left:auto}}@media (min-width: 1200px){.dropdown-menu-xl-left{right:auto;left:0}.dropdown-menu-xl-right{right:0;left:auto}}.dropup .dropdown-menu{top:auto;bottom:100%;margin-top:0;margin-bottom:.125rem}.dropup .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.dropup .dropdown-toggle:empty:after{margin-left:0}.dropright .dropdown-menu{top:0;right:auto;left:100%;margin-top:0;margin-left:.125rem}.dropright .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.dropright .dropdown-toggle:empty:after{margin-left:0}.dropright .dropdown-toggle:after{vertical-align:0}.dropleft .dropdown-menu{top:0;right:100%;left:auto;margin-top:0;margin-right:.125rem}.dropleft .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:""}.dropleft .dropdown-toggle:after{display:none}.dropleft .dropdown-toggle:before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.dropleft .dropdown-toggle:empty:after{margin-left:0}.dropleft .dropdown-toggle:before{vertical-align:0}.dropdown-menu[x-placement^=top],.dropdown-menu[x-placement^=right],.dropdown-menu[x-placement^=bottom],.dropdown-menu[x-placement^=left]{right:auto;bottom:auto}.dropdown-divider{height:0;margin:.5rem 0;overflow:hidden;border-top:1px solid #e9ecef}.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0}.dropdown-item:hover,.dropdown-item:focus{color:#16181b;text-decoration:none;background-color:#f8f9fa}.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:#007bff}.dropdown-item.disabled,.dropdown-item:disabled{color:#6c757d;pointer-events:none;background-color:transparent}.dropdown-menu.show{display:block}.dropdown-header{display:block;padding:.5rem 1.5rem;margin-bottom:0;font-size:.875rem;color:#6c757d;white-space:nowrap}.dropdown-item-text{display:block;padding:.25rem 1.5rem;color:#212529}\n', "li.iti__country:hover{background-color:#0000000d}.iti__selected-flag.dropdown-toggle:after{content:none}.iti__flag-container.disabled{cursor:default!important}.iti.iti--allow-dropdown .flag-container.disabled:hover .iti__selected-flag{background:none}.country-dropdown{border:1px solid #ccc;width:-moz-fit-content;width:fit-content;padding:1px;border-collapse:collapse}.search-container{position:relative}.search-container input{width:100%;border:none;border-bottom:1px solid #ccc;padding-left:10px}.search-icon{position:absolute;z-index:2;width:25px;margin:1px 10px}.iti__country-list{position:relative;border:none}.iti input#country-search-box{padding-left:6px}.iti .selected-dial-code{margin-left:6px}.iti.separate-dial-code .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 .iti__selected-flag,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 .iti__selected-flag{width:93px}.iti.separate-dial-code input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-2 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-3 input,.iti.separate-dial-code.iti--allow-dropdown.iti-sdc-4 input{padding-left:98px}\n"]
    }]
  }], function() {
    return [{
      type: CountryCode
    }];
  }, {
    value: [{
      type: Input
    }],
    preferredCountries: [{
      type: Input
    }],
    enablePlaceholder: [{
      type: Input
    }],
    customPlaceholder: [{
      type: Input
    }],
    numberFormat: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    onlyCountries: [{
      type: Input
    }],
    enableAutoCountrySelect: [{
      type: Input
    }],
    searchCountryFlag: [{
      type: Input
    }],
    searchCountryField: [{
      type: Input
    }],
    searchCountryPlaceholder: [{
      type: Input
    }],
    maxLength: [{
      type: Input
    }],
    selectFirstCountry: [{
      type: Input
    }],
    selectedCountryISO: [{
      type: Input
    }],
    phoneValidation: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    separateDialCode: [{
      type: Input
    }],
    countryChange: [{
      type: Output
    }],
    countryList: [{
      type: ViewChild,
      args: ["countryList"]
    }]
  });
})();
var dropdownModuleForRoot = BsDropdownModule.forRoot();
var NgxIntlTelInputModule = class {
};
NgxIntlTelInputModule.ɵfac = function NgxIntlTelInputModule_Factory(t) {
  return new (t || NgxIntlTelInputModule)();
};
NgxIntlTelInputModule.ɵmod = ɵɵdefineNgModule({
  type: NgxIntlTelInputModule,
  declarations: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BsDropdownModule],
  exports: [NgxIntlTelInputComponent, NativeElementInjectorDirective]
});
NgxIntlTelInputModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, FormsModule, ReactiveFormsModule, dropdownModuleForRoot]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxIntlTelInputModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxIntlTelInputComponent, NativeElementInjectorDirective],
      imports: [CommonModule, FormsModule, ReactiveFormsModule, dropdownModuleForRoot],
      exports: [NgxIntlTelInputComponent, NativeElementInjectorDirective]
    }]
  }], null, null);
})();
export {
  CountryISO,
  NativeElementInjectorDirective,
  NgxIntlTelInputComponent,
  NgxIntlTelInputModule,
  PhoneNumberFormat2 as PhoneNumberFormat,
  SearchCountryField,
  dropdownModuleForRoot
};
//# sourceMappingURL=ngx-intl-tel-input.js.map
