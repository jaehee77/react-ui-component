import { useState } from 'react';
import { cx } from './cx';
import data from './data';
import VanillaWrapper from '../vanillaWrapper';

const AccordionItem = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <li className={cx('item', 'item3')}>
      <div className={cx('tab')}>{title}</div>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};

const AccordionVanilla = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const onToggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>#4. React with Vanilla</h3>
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

const initiator = (wrapper: HTMLDivElement) => {
  const $ul = document.createElement('ul');
  $ul.classList.add(cx('container'));
};

const Accordion4V = () => <VanillaWrapper title="#4" initiator={initiator} />;
