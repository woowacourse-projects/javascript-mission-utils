# mission-utils
![npm](https://img.shields.io/npm/v/@woowacourse/mission-utils)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Install

### with CDN

1. 스크립트 삽입하기

```html
<script src="https://cdn.jsdelivr.net/npm/@woowacourse/mission-utils@1.0.1/dist/mission-utils.min.js"></script>
<script type="module" src="index.js"></script>
```

- `index.html`에 해당 스크립트 태그를 삽입해주세요.
- 유틸 라이브러리의 경우 어플리케이션 스크립트 이전에 작성해야 합니다.

2. 유틸 사용하기

```js
// example
console.log(MissionUtils.Random.pickNumberInList([1, 2, 3]));
```

- 스크립트 태그로 삽입된 경우 전역에 할당되어 `MissionUtils.[util]` 형태로 사용할 수 있습니다.

### with npm

1. 모듈 다운로드

```sh
npm i @woowacourse/mission-utils
```

2. 모듈 사용하기

```js
import MissionUtils from "@woowacourse/mission-utils";

console.log(MissionUtils.Random.pickNumberInList([1, 2, 3]));
```

## Features

### Random

#### `pickNumberInRange(startInclusive, endInclusive)`

숫자 범위를 지정하면 시작 또는 끝 숫자를 포함하여 범위의 숫자를 반환한다. 

```js
Random.pickNumberInRange(1, 10); // 1
Random.pickNumberInRange(1, 10); // 10
Random.pickNumberInRange(1, 10); // 4
Random.pickNumberInRange(1, 10); // 5
```

#### `pickNumberInList(array)`

목록에 있는 숫자 중 하나를 반환한다.

```js
Random.pickNumberInList([1, 3, 10]); // 1
Random.pickNumberInList([1, 3, 10]); // 10
Random.pickNumberInList([1, 3, 10]); // 3
```

#### `pickUniqueNumbersInRange(startInclusive, endInclusive, count)`

숫자 범위 내에서 지정된 개수만큼 겹치지 않는 숫자를 반환한다.

```js
Random.pickUniqueNumbersInRange(1, 10, 2); // [1, 2]
Random.pickUniqueNumbersInRange(1, 10, 5); // [1, 10, 7, 8, 5]
```

#### `shuffle(array)`

무작위로 섞인 새 목록을 반환한다.
```js
Random.shuffle([1, 2, 3, 4, 5]); // [2, 4, 1, 3, 5]
```

## Contributors
[<img src="https://avatars.githubusercontent.com/u/46412689?v=4" width="50" alt="2SOOY">](https://github.com/2SOOY)
[<img src="https://avatars.githubusercontent.com/u/42544600?v=4" width="50" alt="zereight">](https://github.com/zereight)
