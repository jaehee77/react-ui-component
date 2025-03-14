## 아코디언 클로저 활용 예시

`클로저 내부함수가 실행되는 곳`

```
const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li className={cx('item', { current })} onClick={toggle}>
      <div className={cx('tab')}>{title}</div>
      {current ? <div className={cx('description')}>{description}</div> : null}
    </li>
  );
};
```

`원본 코드`

```
const onToggleItem = (id: string) => () => {
  setCurrentId((prev) => (prev === id ? null : id));
};
```

` 풀어쓴 코드`

```
const onToggleItem = function(id: string) {
  return function() {
    setCurrentId((prev) => {
      return prev === id ? null : id;
    });
  };
};
```

<br >

> toggle={onToggleItem(d.id)}는 **onToggleItem(d.id)**을 실행한 결과를 toggle prop으로 전달  
> 즉, props로 실행한 결과값 id를 전달함

<br>

### 클릭시 실행되는 함수

- 사용자가 AccordionItem을 클릭하면, onClick 이벤트가 발생하고, 그에 따라 toggle() 함수가 호출
- 여기서 toggle() 함수는 onToggleItem(d.id)에서 반환된 내부 함수
- 이 내부 함수는 **setCurrentId**를 호출하여 상태를 변경
- 그리고 이미 부모 컴포넌트에 props로 전달한 id값이 있음
- 그리고 이 상태 변경 로직에서 prev === id ? null : id로 **현재 선택된 id**를 기준으로 상태를 업데이트

### 🛑 단계별로 살펴보기

1. Accordion3 컴포넌트에서 onToggleItem(d.id)가 실행될 때,  
   onToggleItem은 반환된 함수를 toggle에 할당한다.  
   즉, toggle은 onToggleItem(d.id)의 반환값을 갖는다.
2. 여기서 onToggleItem(d.id)는 익명 함수(즉, ( ) => { ... })를 반환한다.  
   이 익명 함수가 바로 toggle이 된다.
3. toggle={onToggleItem(d.id)}는 결국 toggle에 () => { setCurrentId(...) } 형태의 함수가 전달되게 된다.
4. AccordionItem에서 onClick={toggle}로 설정하면, toggle 함수가 호출되고,  
   toggle 함수는 onToggleItem(d.id)에서 반환된 익명 함수이므로,  
   이 함수가 실행되면 setCurrentId가 호출되고, 상태가 변경됩니다.

### 간단한 예시로 이해하기

```
const sayHello = (name) => {
  return () => {
    console.log(`Hello, ${name}`);
  };
};

const greetJohn = sayHello('John');  // sayHello('John')이 return한 함수가 greetJohn에 할당됨
greetJohn();  // "Hello, John" 출력
```

<br>
<br>
<br>

## 매개변수 이름과 호출(콜백)함수의 전달 받는 인수값이 같을 때 문법 축약

```
const data = [
  { title: 'Title 1', description: 'Description 1' },
  { title: 'Title 2', description: 'Description 2' }
];

const itemBuilder = (d) => {
  const $li = document.createElement('li');
  $li.textContent = d.title;  // d.title 사용
  return $li;
};

const $items = data.map(itemBuilder);  // 여기서 자동으로 각 항목이 d로 전달됨
```

> 매개변수 이름이 같을 때는 암묵적으로 매개변수를 전달할 수 있는 문법
> 문법적 특성: 암묵적인 인수 전달
> 이것을 암묵적인 함수 인수 전달(Implicit Argument Passing) 또는 암시적 함수 인수 전달이라고 한다.

<br>

> 함수는 일급객체 : 함수 이름을 직접 전달
> itemBuilder라는 함수 이름을 map에 바로 전달하는 것은 함수 참조를 전달하는 방식.
> 즉, 함수 이름만 써서 해당 함수가 참조되고 map이 이를 호출할 때 각 항목을 자동으로 전달하는 것이다.
> 이는 JavaScript에서의 함수 참조 방식으로,
> 함수가 매개변수로 받을 값을 자동으로 처리하는 특성을 이용한 것이다.
> 본래 map 함수가 콜백함수를 받아서 콜백함수를 실행해주기 때문에
> 콜백함수로써 itmeBuilder 함수 참조값을 넘겨주고 itmeBuilder 이 콜백함수가 자동으로 실행된다.

`items` 담긴 배열

```
[
  <li class="item item3">
    <div class="tab">Title 1</div>
    <div class="tab">Description 1</div>
  </li>,

  <li class="item item3">
    <div class="tab">Title 2</div>
    <div class="tab">Description 2</div>
  </li>
]
```

<br>
<br>

### e.target Vs e.currentTarget

- **e.target**은 이벤트가 실제로 발생한 요소를 가리킵니다. (예: 클릭된 요소)
- **e.currentTarget**은 이벤트 리스너가 설정된 요소를 가리킵니다. (예: 이벤트 리스너가 붙어있는 부모 요소)

> 이 차이는 이벤트 버블링이나 이벤트 캡처링을 활용할 때 유용하게 사용된다.
> 예를 들어, 부모 요소에 이벤트 리스너를 붙이고, 자식 요소가 클릭될 때
> 그 자식 요소가 아닌 부모 요소에서 이벤트를 처리하려면 e.target을 사용하여
> 어떤 자식 요소가 클릭되었는지를 확인할 수 있습니다.

## 닫혀있는 아코디언을 검색해도 열리도록 하는 방법

[접근성 아코디언](https://hiddenest.dev/accessible-accordion)
