import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const close = () => setIsOpen(false);

    if (isOpen) {
      window.addEventListener('click', close);
    }

    return () => {
      window.removeEventListener('click', close);
    };
  }, [isOpen]);

  return (
    <div className={cx('container')}>
      <button className={cx('trigger')} onClick={handleToggle}>
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
        #1. React 미완성 <sub>외부 클릭시 닫힘 처리</sub>
      </h3>
      {data.map((d) => (
        <Tooltip {...d} key={d.id} />
      ))}
    </>
  );
};

export default Tooltip2;
