// import css from "../css/main.css";
import BladeErrors from "./errors.js";

import { isMobile, translate } from "./utils.js";

const arrowImageData = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjUiIGhlaWdodD0iMTk2IiB2aWV3Qm94PSIwIDAgNjUgMTk2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWFzayBpZD0ibWFzazBfMV85IiBzdHlsZT0ibWFzay10eXBlOmFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIxIiB5PSIwIiB3aWR0aD0iNjQiIGhlaWdodD0iMTk2Ij4KPHJlY3QgeD0iMSIgd2lkdGg9IjY0IiBoZWlnaHQ9IjE5NiIgZmlsbD0iI0Q5RDlEOSIvPgo8L21hc2s+CjxnIG1hc2s9InVybCgjbWFzazBfMV85KSI+CjxwYXRoIGQ9Ik0wLjY2NjY2NyAxODlDMC42NjY2NjcgMTkxLjk0NiAzLjA1NDQ4IDE5NC4zMzMgNiAxOTQuMzMzQzguOTQ1NTIgMTk0LjMzMyAxMS4zMzMzIDE5MS45NDYgMTEuMzMzMyAxODlDMTEuMzMzMyAxODYuMDU0IDguOTQ1NTIgMTgzLjY2NyA2IDE4My42NjdDMy4wNTQ0OCAxODMuNjY3IDAuNjY2NjY3IDE4Ni4wNTQgMC42NjY2NjcgMTg5Wk0zOC44MDIxIDYuMDQ0NTRDMzguMjc0NCA1Ljg4MTU1IDM3LjcxNDUgNi4xNzcyIDM3LjU1MTYgNi43MDQ4OEwzNC44OTU1IDE1LjMwNEMzNC43MzI1IDE1LjgzMTcgMzUuMDI4MiAxNi4zOTE2IDM1LjU1NTkgMTYuNTU0NkMzNi4wODM1IDE2LjcxNzYgMzYuNjQzNCAxNi40MjIgMzYuODA2NCAxNS44OTQzTDM5LjE2NzQgOC4yNTA1OEw0Ni44MTExIDEwLjYxMTVDNDcuMzM4NyAxMC43NzQ1IDQ3Ljg5ODYgMTAuNDc4OCA0OC4wNjE2IDkuOTUxMTZDNDguMjI0NiA5LjQyMzQ3IDQ3LjkyOSA4Ljg2MzU3IDQ3LjQwMTMgOC43MDA1OEwzOC44MDIxIDYuMDQ0NTRaTTYgMTkwQzEzLjgwMiAxOTAgMjMuMDIyOCAxODQuNTI1IDMxLjU4MjEgMTc1LjA4NkM0MC4xODExIDE2NS42MDMgNDguMjY0IDE1MS45NjEgNTMuNzcyMyAxMzUuMjUxQzY0Ljc5NDcgMTAxLjgxMyA2NS41Mjc2IDU2LjAzMDYgMzkuMzkxMyA2LjUzMzA3TDM3LjYyMjcgNy40NjY5M0M2My40OTc3IDU2LjQ2OTQgNjIuNzMwMiAxMDEuNjg3IDUxLjg3MjkgMTM0LjYyNEM0Ni40NDEzIDE1MS4xMDIgMzguNDg5NiAxNjQuNDkxIDMwLjEwMDUgMTczLjc0MkMyMS42NzE4IDE4My4wMzcgMTIuOTUxMiAxODggNiAxODhWMTkwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzFfOSkiLz4KPC9nPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzFfOSIgeDE9IjQzLjUwODEiIHkxPSItNi41IiB4Mj0iNi4wMTU3MiIgeTI9IjIwOS41MDMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMC43NSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAuNTUiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K";
const btnImageData = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIgcng9IjguNSIgc3Ryb2tlPSIjQjFCMUIxIi8+CjxwYXRoIGQ9Ik03LjQwNjc2IDExLjg5MjJMOC41NjM4MyA5LjA1NDFMNy42MzU2IDYuNzI0MzdMNC43OTk5OSAxMy43OTJMMTAuNDQ1NSAxMy44MDAyTDkuNjk0NTYgMTEuODkyMkg3LjQwNjc2WiIgZmlsbD0iI0VFRUVFRSIvPgo8cGF0aCBkPSJNOC42OTk1NCAzTDguMDE0NDkgNC43MjMzNEw3Ljk4NjkgNC43OTE4MUM3LjgyODU2IDUuMjUwOTcgNy43NzU5OSA1LjczOTc5IDcuODMzMSA2LjIyMTk4QzcuODUxNjUgNi40MTczMyA3Ljg5MTAxIDYuNjEwMTYgNy45NTA1MSA2Ljc5NzIxQzcuOTYyMjUgNi44MzI5MSA3Ljk3NDU4IDYuODY4MDIgNy45ODgwOCA2LjkwMTk2TDEwLjc1NyAxMy44SDEzLjA3OThMOC42OTk1NCAzWiIgZmlsbD0iI0VFRUVFRSIvPgo8L3N2Zz4K";


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
    const img = document.createElement("img");
    img.src = btnImageData;
    img.className = "blade-airdrop_btn-img";
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
    overlay.className = "blade-airdrop_overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "blade-airdrop_popup";
    popup.innerHTML = this.translate("popupMessage");
    overlay.appendChild(popup);

    const img = document.createElement("img");
    img.src = arrowImageData;
    img.className = "blade-airdrop_popup-img";
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
