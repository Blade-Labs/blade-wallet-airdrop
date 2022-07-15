import css from "../scss/style.scss";

import arrowImageData from '../img/arrow.svg';
import btnImageData from '../img/blade-logo.svg';

import BladeErrors from "./errors.js";
import { isMobile, translate } from "./utils.js";

class BladeAirdrop {
  constructor() {
    this.webLink = process.env.WEB_LINK
    this.deeplink;
    this.errors = BladeErrors;
    this.translate = translate;
    this.btn;
    this.box;
    this.overlay;
    this.attributes = {};
    this.stateAttribute = "data-waiting";
    this.isBladeInstalled = false;
    this.init();
  }

  init() {
    document.addEventListener("hederaWalletLoaded", () => {
      this.isBladeInstalled = true;
    })

    this.box = document.getElementById("bladeNFTAirdrop");

    if (this.box) {
      this.createBtn();
      this.getAttributes();
    } else {
      console.error(this.errors.box_not_set);
    }
  }

  createBtn() {
    this.btn = document.createElement("button");
    this.btn.innerHTML = this.translate("btnLabelConnect");
    this.btn.className = "blade-airdrop__btn"
    this.btn.type = "button";
    const img = document.createElement("img");
    img.src = btnImageData;
    img.className = "blade-airdrop__btn-img";
    this.btn.prepend(img);

    this.box.setAttribute(this.stateAttribute, false)
    this.box.appendChild(this.btn);
    this.addBtnListener();
  }

  addBtnListener() {
    this.btn.addEventListener('click',(e) => {
      this.validate();
    })
  }

  validate() {
    if (isMobile()) {
      this.generateDeeplink();
      window.open(this.deeplink);
    } else {
      if (this.isBladeInstalled) {
        this.createOverlay();
        this.box.setAttribute(this.stateAttribute, true);
        this.observeBox();
      } else {
        window.open(this.webLink)
      }
    }
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.className = "blade-airdrop__overlay";
    document.body.appendChild(this.overlay);

    const popup = document.createElement("div");
    popup.className = "blade-airdrop__popup";
    popup.innerHTML = this.translate("popupMessage");
    this.overlay.appendChild(popup);

    const img = document.createElement("img");
    img.src = arrowImageData;
    img.className = "blade-airdrop__popup-img";
    popup.prepend(img);
  }

  generateDeeplink() {
    let firebase = process.env.NODE_ENV === "development"
    ? process.env.F_DEEPLINK_DEV
    : process.env.F_DEEPLINK_PROD;
    let deeplink = new URL(process.env.DEEPLINK);

    for (const [key, value] of Object.entries(this.attributes)) {
      deeplink.searchParams.set(key, value);
    };

    deeplink.search = encodeURIComponent(deeplink.search).replace("%3F", "");
    this.deeplink = firebase + deeplink + "&apn=org.bladelabs.wallet";
  }

  getAttributes() {
    const keys = JSON.parse(process.env.ATTRIBUTE_KEYS);
    keys.forEach(key => {
      const value = this.box.dataset[key];

      value
        ? this.attributes[key] = value
        : console.error(BladeErrors.box_miss_params);
    });
  }

  observeBox() {
    const observer = new MutationObserver((mutations)=>{
      mutations.forEach(record => {
        if (record.target.dataset.waiting === "false" || !record.target.dataset.waiting) {
          this.overlay.remove();
          observer.disconnect();
        }
      })
    });

    observer.observe(this.box, {attributes: true, attributeFilter: ["data-waiting"]});
  }
}

window.onload = () => {
  new BladeAirdrop();
};
