import { useState } from 'react';
import { cx } from './cx';
import data from './data';

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li className={cx('item', { current })} onClick={toggle}>
      <div className={cx('tab')}>{title}</div>
      {current ? <div className={cx('description')}>{description}</div> : null}
    </li>
  );
};

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const onToggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
    // prev 값과 id 값을 비교하여, 같은 값이면 null로, 다르면 해당 id로 상태를 변경
  };

  return (
    <>
      <h3>#1. React Only</h3>
      <ul className={cx('container')}>
        {data.map((d) => (
          <AccordionItem
            key={d.id}
            {...d}
            current={currentId === d.id}
            toggle={onToggleItem(d.id)}
          /> // toggle에 onToggleItem 함수가 전달되고, 각 d.id를 기억함
        ))}
      </ul>
    </>
  );
};

export default Accordion1;
