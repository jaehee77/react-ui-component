import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import { measureLines } from '@/service/utils';

const LineClampedText = ({ text }: { text: string }) => {
  const elemRef = useRef(null);

  const [isClamped, toggleClamped] = useState(true);

  useEffect(() => {
    if (text && elemRef.current) {
      const measeredLines = measureLines(elemRef.current, text);
      toggleClamped(measeredLines > 3);
    }

    return () => {};
  }, [text]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
      <div className={cx('text')} ref={elemRef} style={{ WebkitLineClamp: 3 }}>
        {text}
      </div>
      {isClamped && (
        <button
          className={cx('buttonMore')}
          onClick={() => toggleClamped(false)}
        />
      )}
    </div>
  );
};

const LineClamp1 = () => {
  return (
    <>
      <h3>
        #1 lineClamp - 3줄 말줄임 <sub>with Canvas</sub>
      </h3>
      <div className={cx(`LineClamps`)}></div>
      {data.map((text, i) => (
        <LineClampedText text={text} key={i} />
      ))}
    </>
  );
};

export default LineClamp1;
