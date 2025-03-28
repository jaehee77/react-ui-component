import { FormEvent, useEffect, useRef } from 'react';
import cx from './cx';
import { measureLines } from '@/service/utils';

const TextBox2_New = () => {
  const hanldeInput = (e: FormEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    if (!elem) return;

    const val = elem.value;

    const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
    elem.rows = lines;
  };

  return (
    <>
      <h3>
        #2-2 textarea <sub>uncontrolled. with Canvas Ver.02</sub>
      </h3>
      <div className={cx(`container`)}>
        <textarea
          onInput={hanldeInput}
          className={cx('textarea')}
          rows={3}
        ></textarea>
      </div>
    </>
  );
};

export default TextBox2_New;
