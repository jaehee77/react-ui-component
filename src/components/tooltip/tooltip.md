## 🔍 useSyncExternalStore의 기본 사용법

useSyncExternalStore는 세 가지 매개변수를 받습니다:

1. subscribe: 외부 상태의 변화를 구독하는 함수.
2. getSnapshot: 외부 상태의 최신 스냅샷(현재 값)을 반환하는 함수.
3. getServerSnapshot (선택 사항): 서버 측 렌더링(SSR)을 위한 스냅샷을 반환하는 함수.

<br>

### 1단계: subscribe 함수 만들기

subscribe는 외부 상태가 변경될 때마다 React가 리렌더링하도록 만드는 함수입니다.  
예를 들어, 외부 상태를 변경하는 방법(예: 이벤트 리스너를 설정하거나 상태 관리 라이브러리를 사용하는 방식)을 정의합니다.

> useSyncExternalStore는 subscribe 함수를 통해 외부 상태의 변화를 구독합니다.  
>  subscribe는 callback 함수를 전달받고, 외부 상태의 변화(예: storage 이벤트)에 대응하여 이 callback을 호출합니다.

<br>

### 2단계: getSnapshot 함수 만들기

getSnapshot은 외부 상태의 현재 값을 반환하는 함수입니다.
이 값은 컴포넌트가 렌더링될 때 React가 사용하게 됩니다.

<br>

### 3단계: useSyncExternalStore 사용하기

위에서 만든 subscribe와 getSnapshot을 useSyncExternalStore에 전달하여 컴포넌트에서 외부 상태를 구독하고 동기적으로 사용할 수 있습니다.

<br>

### 코드 예시

```
import React, { useSyncExternalStore } from 'react';

// 외부 상태 예시 (브라우저의 localStorage)
function useLocalStorage(key) {
  const subscribe = (callback) => {
    const handleStorageChange = () => callback();
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  };

  const getSnapshot = () => {
    return window.localStorage.getItem(key);
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

function App() {
  const value = useLocalStorage('myKey');

  return (
    <div>
      <h1>LocalStorage Value: {value}</h1>
    </div>
  );
}

export default App;

```

<br>

### 📌 callback의 역할

subscribe 함수에서의 역할:

> `useSyncExternalStore`는 `subscribe` 함수로 외부 상태의 변화를 구독합니다.  
> 이때 `subscribe` 함수는 외부 상태가 변경될 때마다 호출될 `callback을` 인자로 받습니다.  
> 예를 들어, `window.addEventListener('storage', callback)` 코드에서,  
> callback은 storage 이벤트가 발생할 때마다 호출됩니다.

> 하지만 `useSyncExternalStore`에서 `callback`은 단순히 React에 상태 변화가 발생했음을  
> 알리는 역할을 하기 때문에, `callback` 자체는 상태 변화의 처리를 직접적으로 하지는 않습니다.  
> 상태를 처리하는 작업은 getSnapshot에서 수행됩니다.

---

### 🛠️ useEffect vs useLayoutEffect 차이점

| Hook              | 실행 시점                            | 특징                                                    |
| ----------------- | ------------------------------------ | ------------------------------------------------------- |
| `useEffect`       | 렌더링 후 (비동기)                   | 화면이 업데이트된 후 실행됨 (깜빡임이 발생할 수도 있음) |
| `useLayoutEffect` | 렌더링 직후, 화면 업데이트 전 (동기) | DOM을 읽고 변경해도 깜빡임 없이 반영 가능               |
