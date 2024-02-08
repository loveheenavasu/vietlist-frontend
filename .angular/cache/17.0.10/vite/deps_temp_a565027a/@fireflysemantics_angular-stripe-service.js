import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-NXAQHI3B.js";
import "./chunk-BQTYKBYB.js";
import "./chunk-WI6LBH4V.js";
import "./chunk-KDOJNZN6.js";
import "./chunk-J5XZNU7V.js";

// node_modules/@fireflysemantics/angular-stripe-service/fesm2020/fireflysemantics-angular-stripe-service.mjs
var STRIPE_API_URL = "https://js.stripe.com/v3/";
var AngularStripeService = class {
  constructor() {
    this._stripe = window["Stripe"];
    this.stripePromise = this.inject();
  }
  get stripe() {
    return this._stripe;
  }
  set stripe(s) {
    this._stripe = s;
  }
  setPublishableKey(key, options) {
    return this.stripePromise.then(() => {
      return this.stripe(key, options);
    });
  }
  inject() {
    if (this.stripe) {
      return Promise.resolve(this.stripe);
    }
    return new Promise((res, rej) => {
      const head = this.getHeadElement();
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", STRIPE_API_URL);
      head.appendChild(script);
      script.addEventListener("load", () => {
        this.stripe = window["Stripe"];
        res(this.stripe);
      });
    });
  }
  /**
   * Returns the `head` element.
   * @throws Error('Application does not have a head element');
   */
  getHeadElement() {
    let elm = document.getElementsByTagName("head")[0];
    if (!elm) {
      throw new Error("Application does not have a head element");
    }
    return elm;
  }
};
AngularStripeService.ɵfac = function AngularStripeService_Factory(t) {
  return new (t || AngularStripeService)();
};
AngularStripeService.ɵprov = ɵɵdefineInjectable({
  token: AngularStripeService,
  factory: AngularStripeService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngularStripeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [];
  }, null);
})();
export {
  AngularStripeService
};
//# sourceMappingURL=@fireflysemantics_angular-stripe-service.js.map
