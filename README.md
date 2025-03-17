# [ UI요소 만들기 강의 코드 - 보일러플레이트 ]

## 디렉토리 구조 🤔

- `app`: app 전반에 대한 기본 view 제공
  - `[...item]/page.tsx`: `/[...item]` route의 page view. `routes`의 `key`에 매칭된 컴포넌트를 렌더링.
  - `layout.tsx`: 기본적인 html 구성
  - `page.tsx`: `/` route의 page view. `/README.md`를 보여줍니다.
  - `global.scss`: app 전반의 style
  - `gnb.tsx`: 좌측 메뉴 컴포넌트
- `components`
  - `vanillaWrapper.ts`: 독립적인 VanillaJS 환경의 wrapper 컴포넌트
- `routes.ts`: route 구성

## 🛑 Getting Started

- 다운로드 받은 파일의 압축을 해제하고, 터미널에서 해당 폴더로 이동합니다.

```bash
cd uiComponents
```

- npm module 설치를 진행합니다.

```bash
npm install
# or
pnpm install
# or
yarn
```

- 개발 서버를 실행합니다.

```bash
npm run dev
# or
pnpm run dev
# or
yarn dev
```

- 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하여 결과를 확인합니다.

---

### `new Map()`, `new Set()`은 컬렉션 객체로써, 이 두 객체는 데이터를 저장하는 방식과 제공하는 기능에서 각각 다른 목적을 가지고 있다.

### `new Map()`

Map은 키-값 쌍을 저장하는 컬렉션입니다.  
일반적인 객체와 유사하지만, 몇 가지 차이점이 있다..  
객체는 문자열을 키로 사용하지만, Map은 어떤 타입의 값도 키로 사용할 수 있다.  
또한, Map은 삽입 순서를 기억한다.

특징

- 키는 모든 데이터 타입을 사용할 수 있습니다 (예: 객체, 함수, 숫자 등).
- 삽입 순서를 기억합니다.
- Map 객체의 크기는 .size 속성으로 확인할 수 있습니다.
- Map은 forEach, get, set, delete, has와 같은 메서드를 제공합니다.

```
// 새로운 Map 객체 생성
let map = new Map();

// 값을 삽입
map.set('name', 'Alice');
map.set('age', 30);
map.set(1, 'one');

// 값 조회
console.log(map.get('name'));  // Alice
console.log(map.get(1));  // one

// 키가 존재하는지 확인
console.log(map.has('age'));  // true

// 키-값 쌍 삭제
map.delete('age');

// 크기 확인
console.log(map.size);  // 2

// 순회
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

```

<br>

#### **`Map을 사용하는 이유`**

> Map은 객체와 비슷하지만, 더 강력한 기능을 제공합니다.  
> 예를 들어 객체는 키를 문자열만 사용할 수 있는 반면, Map은 어떤 데이터 타입도 키로 사용할 수 있기 때문에 더 유연한 데이터 구조입니다. 또한 삽입 순서를 기억하고, 크기를 쉽게 확인할 수 있어, 순서가 중요한 데이터나 크기를 체크해야 하는 경우 유용합니다.

---

### `new Set()`

`Set`은 중복을 허용하지 않는 값들의 집합을 저장하는 객체이다.  
중복을 자동으로 제거해주기 때문에, 주로 유니크한 값을 저장할 때 사용된다.

특징

- 중복된 값을 허용하지 않습니다.
- 순서는 삽입된 순서를 기억합니다.
- Set은 add, has, delete, clear와 같은 메서드를 제공합니다.

```
// 새로운 Set 객체 생성
let set = new Set();

// 값 삽입 (중복 값은 삽입되지 않음)
set.add(1);
set.add(2);
set.add(3);
set.add(2);  // 중복값이므로 삽입되지 않음

// 값 존재 여부 확인
console.log(set.has(2));  // true
console.log(set.has(4));  // false

// 값 삭제
set.delete(2);

// 크기 확인
console.log(set.size);  // 2

// 순회
set.forEach(value => {
  console.log(value);
});
```

`Set을 사용하는 이유`

> Set은 주로 중복을 제거하고 싶을 때 사용됩니다.
> 예를 들어, 여러 데이터에서 중복된 값을 제거하거나, 고유한 값만을 저장하고 싶을 때 유용합니다.
> 배열에서 중복을 제거하는 것보다 성능적으로 더 효율적일 수 있습니다.

<br>

---

#### **Map과 Set을 사용하는 이유**

JavaScript에서 Map과 Set이 만들어진 이유는 다음과 같다.

- 객체와 배열의 한계 극복: 기존 객체와 배열은 특정한 용도에 제한적이었고, Map과 Set은 더 유연하고 효율적인 방법으로 데이터를 다룰 수 있습니다.
- 성능: Map과 Set은 내부적으로 해시 테이블을 기반으로 하기 때문에, 데이터 검색, 삽입, 삭제가 효율적으로 이루어집니다. Object는 이런 최적화가 부족할 수 있습니다.
- 중복 처리: Set은 중복을 자동으로 제거하는 간단한 방법을 제공하며, Map은 키를 자유롭게 선택할 수 있기 때문에 더 다양한 용도로 사용됩니다.

<br>

--

#### **실용적인 예제 코드**

`예제 1` : 중복 제거  
배열에서 중복된 값을 제거하고 싶을 때 Set을 사용

```
let numbers = [1, 2, 3, 2, 4, 5, 1, 6];

// Set을 사용하여 중복 값 제거
let uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers);  // [1, 2, 3, 4, 5, 6]
```

`예제 2` : 사용자 정보 저장 (Map 사용)  
사용자 정보를 Map에 저장하고 조회하는 예시

```
let users = new Map();

// 사용자 정보 삽입
users.set(1, { name: 'Alice', age: 25 });
users.set(2, { name: 'Bob', age: 30 });

// 사용자 정보 조회
console.log(users.get(1));  // { name: 'Alice', age: 25 }
console.log(users.get(2));  // { name: 'Bob', age: 30 }

// 키가 존재하는지 확인
console.log(users.has(1));  // true
console.log(users.has(3));  // false

// 사용자 삭제
users.delete(1);
console.log(users.size);  // 1

```

`예제 3` : 유니크한 태그 관리 (Set 사용)  
웹사이트에서 사용자 태그를 관리할 때 Set을 사용하여 중복 태그를 제거

```
let userTags = new Set();

// 태그 추가
userTags.add('javascript');
userTags.add('programming');
userTags.add('web');
userTags.add('javascript');  // 중복값 추가되지 않음

console.log(userTags);  // Set { 'javascript', 'programming', 'web' }

```

> 이처럼 `Map`과 `Set`은 데이터의 중복 제거, 키-값 저장 및 검색을 더 효율적으로 관리할 수 있도록 도와주는 유용한 자료구조입니다.

<br>

---
