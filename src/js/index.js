import css from "../scss/style.scss";

import arrowImageData from '../img/arrow.svg';
import btnImageData from '../img/blade-logo.svg';

import BladeErrors from "./errors.js";
import { isMobile, translate } from "./utils.js";

class BladeAirdrop {
  constructor() {
    this.webLink = process.env.WEB_LINK
    this.errors = BladeErrors;
    this.translate = translate;
    this.btn;
    this.box;
    this.deeplink;
    this.attributes = {};
    this.init();
  }

  init() {
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

    this.box.setAttribute("data-waiting", false)
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
      if (this.isBladeInstalled()) {
        this.createOverlay();
        this.box.setAttribute("data-waiting", true);
      } else {
        window.open(this.webLink)
      }
    }
  }

  isBladeInstalled() {
    return bladeConnect;
  }

  createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "blade-airdrop__overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "blade-airdrop__popup";
    popup.innerHTML = this.translate("popupMessage");
    overlay.appendChild(popup);

    const img = document.createElement("img");
    img.src = arrowImageData;
    img.className = "blade-airdrop__popup-img";
    popup.prepend(img);
  }

  generateDeeplink () {
    let firebase = process.env.F_DEEPLINK;
    let deeplink = new URL(process.env.DEEPLINK);

    for (const [key, value] of Object.entries(this.attributes)) {
      deeplink.searchParams.set(key, value);
    };
    deeplink.search = encodeURIComponent(deeplink.search);
    this.deeplink = firebase + deeplink;
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
}

window.onload = () => {
  new BladeAirdrop();
};
