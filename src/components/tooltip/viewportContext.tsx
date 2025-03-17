import {
  ReactNode,
  createContext,
  useContext,
  useSyncExternalStore,
} from 'react';

// 컨텍스트에서 화면의 위치 좌표, 넓이,높이값을 얻어오려고  함
// document.body.getBoundingClientRect() 에서 DomRect가 반환
// 타입스크립트 Pick으로 DomRect에서 해당 타입을 얻어옴
// top, height를 알고 있으면 bottom 값을 알수 있음
// 대상(요소)의 top값은 뷰포트 기준으로 나타나는 값으로
// 만약 요소가 화면 위로 벗어났을 때 음수값이 나오고 화면 아래에 있을때는 양수값이 나옴
type Rect = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'> & {
  scrollHeight: number;
};
const DefaultRect: Rect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};
const rectKeys: (keyof Rect)[] = [
  'scrollHeight',
  'left',
  'top',
  'width',
  'height',
];

const isSameRect = (prev: Rect, next: Rect) => {
  return rectKeys.every((key) => prev?.[key] === next?.[key]);
};
//

const getViewportRect = () => {
  let stored: Rect = DefaultRect;

  return () => {
    const elem = typeof document !== 'undefined' && document.scrollingElement;
    if (!elem) return stored;

    const { left, top, width, height } = elem.getBoundingClientRect();
    const newRect = {
      left,
      top,
      width,
      height,
      scrollHeight: elem.scrollHeight,
    };

    if (newRect && !isSameRect(stored, newRect)) stored = newRect;
    return stored;
  };
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);

  window.addEventListener('scroll', callback);
  resizeObserver.observe(document.body);

  return () => {
    window.removeEventListener('scroll', callback);
    resizeObserver.disconnect();
  };
};

const ViewportContext = createContext<Rect>(DefaultRect);

//contentRect의 top, left, right, bottom 값은 문서의 전체 좌표계를 기준으로 요소의 위치

// scrollHeight -> 문서 전체 높이(스크롤할 수 있는 영역 포함)
// console.log(document.scrollingElement); // 대개 <html> 또는 <body> 요소

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  // subscribe: 외부 상태가 변경될 때마다 컴포넌트를 리렌더링하도록 구독하는 함수
  // getSnapshot: 외부 상태의 현재 값을 반환하는 함수입니다. 이 함수는 외부 상태를 동기적으로 반환

  const viewportRect = useSyncExternalStore(subscribe, getViewportRect());

  return (
    <ViewportContext.Provider value={viewportRect}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportContextProvider;

export const useViewportRect = () => useContext(ViewportContext);
