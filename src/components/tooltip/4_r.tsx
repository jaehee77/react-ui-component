import { useRef } from 'react';
import cx from './cx';
import data from './data';
import ViewportContextProvider, { useViewportRect } from './viewportContext';
import useStyleInView from './useStyleInView';

const tooltipPosition = {
  top: '100%',
  bottom: 20,
  left: 0,
  right: 0,
};

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const style = useStyleInView(wrapperRef, targetRef, tooltipPosition);

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
        style={style}
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
