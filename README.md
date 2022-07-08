<p></p>
<p align="center">
  <a href="https://www.bladewallet.io/" target="_blank">
    <img width="77px" src="./img/blade-logo.svg"/>
  </a>
</p>

# blade-wallet-airdrop

## Getting started

### Instalation

``` bash
npm install blade-wallet-airdrop --save
```

### html

You must create a div that contains the required tags with parameters.

| Tag           | Value |
|:--------------|:------------------|
| `id`          | "bladeNFTAirdrop" |
| `useTestnet`  | string            |
| `dApp_code`   | string            |
| `dApp_nonce`  | string            |
| `dApp_secret` | string            |

Example 👇

```html
  <div
    id="bladeNFTAirdrop"
    useTestnet="false"
    dApp_code="1234"
    dApp_nonce="1234"
    dApp_secret="1234"
  >
  </div>
```

### js

```javascript
import BladeAirdrop from 'blade-wallet-airdrop';

window.onload = () => {
  new BladeAirdrop();
};
```
