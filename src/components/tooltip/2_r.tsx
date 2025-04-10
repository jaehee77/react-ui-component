import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';
import SingleOpenContextProvider, { useSingleOpen } from './singleOpenContext';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const [isOpen, toggle] = useSingleOpen(id);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    toggle((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const close = () => toggle(null);
    if (isOpen) {
      window.addEventListener('click', close, { once: true });
    }
    return () => {
      window.removeEventListener('click', close);
    };
  }, [isOpen, toggle]);

  return (
    <div className={cx('container')}>
      <button className={cx('trigger')} onClick={handleClick}>
        {title}
      </button>
      {isOpen && (
        <div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
          {description}
        </div>
      )}
    </div>
  );
};

const Tooltip2 = () => {
  //
  return (
    <>
      <h3>
        #2. React with createContext <sub>하나만 열리도록 개선</sub>
      </h3>
      <SingleOpenContextProvider>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </SingleOpenContextProvider>
    </>
  );
};

export default Tooltip2;
