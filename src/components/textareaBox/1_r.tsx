import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import { measureLines } from '@/service/utils';

const TextBox1 = () => {
  const [text, setText] = useState('');

  const [lines, setLines] = useState(3);

  const handleChange = (e: SyntheticEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    const val = elem.value;

    // const lines = Math.min(Math.max(val.split('\n').length, 3), 15); // 최소 3줄, 최대 15줄
    const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);

    setText(val);
    setLines((prevLines) => (prevLines !== lines ? lines : prevLines));
  };

  return (
    <>
      <h3>
        #1 <sub>controlled. with Canvas</sub>
      </h3>
      <div className={cx(`container`)}>
        <textarea
          name=""
          id=""
          className={cx('textarea')}
          value={text}
          onChange={handleChange}
          rows={lines}
        ></textarea>
      </div>
    </>
  );
};

export default TextBox1;
