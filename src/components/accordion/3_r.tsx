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
    <li className={cx('item', 'item3', { current })} onClick={toggle}>
      <div className={cx('tab')}>{title}</div>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};

const Accordion3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const onToggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #3. React with CSS Animation <sub>transition</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((d) => (
          <AccordionItem
            key={d.id}
            {...d}
            current={currentId === d.id}
            toggle={onToggleItem(d.id)}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion3;
