import { useEffect, useRef } from 'react';
import cx from './cx';
import { measureLines } from '@/service/utils';

const TextBox2 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textareaRef.current;
    const hanldeInput = () => {
      if (!elem) return;

      const val = elem.value;

      const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
      elem.rows = lines;
    };

    if (elem) {
      elem.addEventListener('input', hanldeInput);
    }

    return () => {
      if (elem) elem.removeEventListener('input', hanldeInput);
    };
  }, []);

  return (
    <>
      <h3>
        #2 textarea <sub>uncontrolled. with Canvas</sub>
      </h3>
      <div className={cx(`container`)}>
        <textarea
          ref={textareaRef}
          className={cx('textarea')}
          rows={3}
        ></textarea>
      </div>
    </>
  );
};

export default TextBox2;
