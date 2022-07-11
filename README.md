<p></p>
<p align="center">
  <a href="https://www.bladewallet.io/" target="_blank">
    <img width="77px" src="./src/img/blade-logo.svg"/>
  </a>
</p>

# blade-wallet-airdrop

## Getting started

### Instalation

Download the project.
``` bash
npm run build
```
Fit into your project "docs/index[hash].js" file.

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

For local testing:
``` bash
npm run dev
```

### Links
* `demo` - https://blade-labs.github.io/blade-wallet-airdrop/
* `github` - https://github.com/Blade-Labs/blade-wallet-airdrop
