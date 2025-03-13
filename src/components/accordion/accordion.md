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
