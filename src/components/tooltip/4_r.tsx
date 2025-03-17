import { useLayoutEffect, useRef } from 'react';
import cx from './cx';
import data from './data';
import ViewportContextProvider, { useViewportRect } from './viewportContext';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const viewportRect = useViewportRect();
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

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
        ? 'top'
        : 'bottom';
  }, []);

  return (
    <details
      name="test"
      className={cx('details')}
      data-tooltip={id}
      ref={wrapperRef}
    >
      <summary className={cx('summary')} data-tooltip-summary>
        {title}
      </summary>
      <div
        className={cx('tooltip')}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
      >
        {description}
      </div>
    </details>
  );
};

const Tooltip4 = () => {
  return (
    <ViewportContextProvider>
      <>
        <h3>
          #4. React <sub>툴팁이 뷰포트을 벗어나지 않게 보이도록 처리</sub>
        </h3>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </>
    </ViewportContextProvider>
  );
};

export default Tooltip4;
