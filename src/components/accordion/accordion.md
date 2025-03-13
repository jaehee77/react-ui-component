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

### 단계별로 살펴보기

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
