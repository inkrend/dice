# inkrend/dice

<picture>
  <img alt="TypeScript Version" src="https://img.shields.io/badge/typescript-4.9.3-informational?style=flat-square">
</picture> <picture>
  <a href="https://github.com/inkrend/dice/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/inkrend/dice?style=flat-square"></a>
</picture> <picture>
  <a href="https://github.com/inkrend/dice/issues"><img alt="GitHub Issues" src="https://img.shields.io/github/issues-raw/inkrend/dice?label=issues&style=flat-square"></a>
</picture> <picture>
  <a href="https://github.com/inkrend/dice/actions/workflows/test.yml"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/inkrend/dice/Node.js%20Testing?style=flat-square"></a>
</picture> <picture>
  <img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/inkrend/dice?style=flat-square&token=IO0M38LI6O">
</picture> <picture>
  <a href="https://github.com/inkrend/dice/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/inkrend/dice?style=flat-square"></a>
</picture><br><br>

> A set of virtual game dice.

## Installation

```shell
npm i git+https://github.com/inkrend/dice#1.0.0
```


## Usage

`inkrend/dice` supports the following virtual dice: `d4`, `d6`, `d8`, `d10`, `d12`, `d20`, and `d100`

The random numbers produced by this module are derived from a cryptographically strong source provided by the underlying operating system. The average and distribution of each virtual die is simulated by rolling them millions of times, then performing both a simple average and a chi-squared goodness-of-fit test on the results. You can run these tests yourself using the `npm test` script.

```javascript
import { d6 } from '@inkrend/dice';

await d6.roll(); // 1..6
```


## Development

```shell
git clone https://github.com/inkrend/dice
cd dice
npm i
```


## License

The code in this repository is not currently licensed.
