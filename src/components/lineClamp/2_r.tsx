import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

const LineClampedText = ({ text }: { text: string }) => {
  const cloneRef = useRef<HTMLDivElement>(null);
  const elemRef = useRef<HTMLDivElement>(null);

  const [isClamped, toggleClamped] = useState(true);

  useEffect(() => {
    if (text && elemRef.current && cloneRef.current) {
      const lines = Math.floor(
        cloneRef.current.offsetHeight /
          parseInt(getComputedStyle(elemRef.current).lineHeight)
      );
      toggleClamped(lines > 3);
    }

    return () => {};
  }, [text]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
      <div className={cx('text-clone')} ref={cloneRef}>
        {text}
      </div>
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

const LineClamp2 = () => {
  return (
    <>
      <h3>
        #2 lineClamp - 3줄 말줄임 <sub>Clone(Fake)</sub>
      </h3>
      <div className={cx(`LineClamps`)}></div>
      {data.map((text, i) => (
        <LineClampedText text={text} key={i} />
      ))}
    </>
  );
};

export default LineClamp2;
