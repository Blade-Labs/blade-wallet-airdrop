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

| Tag                 | Value |
|:--------------------|:------------------|
| `id`                | "bladeNFTAirdrop" |
| `data-use-testnet`  | boolean           |
| `data-dapp-code`    | string            |
| `data-dapp-nonce`   | string            |
| `data-dapp-secret`  | string            |

Example 👇

```html
  <div
    id="bladeNFTAirdrop"
    data-use-testnet="false"
    data-dapp-code="1234"
    data-dapp-nonce="1234"
    data-dapp-secret="1234"
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

### Links
* `demo` - https://mikhaben.github.io/blade-wallet-airdrop/
* `github` - https://github.com/mikhaben/blade-wallet-airdrop
