import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import cx from './cx';

const TextBox3 = () => {
  const cloneRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const elem = textareaRef.current;
    const cloneElem = cloneRef.current;
    const hanldeInput = () => {
      if (!elem || !cloneElem) return;

      const val = elem.value;
      cloneElem.value = val;

      const lines = Math.min(
        Math.max(cloneElem.scrollHeight / cloneElem.clientHeight, 3),
        15
      );
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
        #3 textarea <sub>uncontrolled. Clone Elem</sub>
      </h3>
      <div className={cx(`container`)}>
        <textarea ref={cloneRef} className={cx('clone')} rows={1}></textarea>
        <textarea
          ref={textareaRef}
          className={cx('textarea')}
          rows={3}
        ></textarea>
      </div>
    </>
  );
};

export default TextBox3;
