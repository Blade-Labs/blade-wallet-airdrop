// import css from "../css/main.css";

import BladeErrors from "./errors.js";

import { isMobile, translate } from "./utils.js";

class BladeAirdrop{
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
    this.btn.className = "blade-airdrop_btn"
    this.btn.type = "button";
    this.btn.setAttribute("waiting", false)
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
        this.btn.setAttribute("waiting", true);
      } else {
        window.open(this.webLink)
      }
    }
  }

  isBladeInstalled() {
    return bladeConnect;
  }

  createOverlay() {
    let overlay = document.createElement("div");
    overlay.className = "blade-airdrop_overlay";
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.className = "blade-airdrop_popup";
    popup.innerHTML = this.translate("popupMessage");
    overlay.appendChild(popup);
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

export default BladeAirdrop;
