import { RefObject, useLayoutEffect, useState } from 'react';
import { useViewportRect } from './viewportContext';

type PositionKey = 'left' | 'right' | 'top' | 'bottom';
type Position = Partial<Record<PositionKey, string | number>>;

type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const useStyleInView = (
  wrapperRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  position: Position
) => {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<Style>({});

  useLayoutEffect(() => {
    if (!wrapperRef.current || !targetRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    // console.log(viewportRect.scrollHeight);
    const vertalcalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? 'top'
        : 'bottom';

    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? 'left'
        : 'right';

    setStyle({
      [vertalcalKey]: position[vertalcalKey] || 0,
      // top을 부여했으면 bottom 을 auto, botoom 을 부여했으면 top을 auto로 설정
      [vertalcalKey === 'top' ? 'bottom' : 'top']: 'auto',
      [horizontalKey]: position[horizontalKey] || 0,
      [horizontalKey === 'left' ? 'right' : 'left']: 'auto',
    });
  }, [viewportRect]);

  return style;
};

export default useStyleInView;
