import { useState } from 'react';
import cx from './cx';
import data from './data';

const TabItem = ({
  id,
  title,
  current,
  description,
  handleClickItem,
}: {
  id: string;
  title: string;
  current: boolean;
  description: string;
  handleClickItem: (id: string) => void;
}) => {
  return (
    <li className={cx('item', { current })}>
      <div className={cx('tab')} onClick={() => handleClickItem(id)}>
        {title}
      </div>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};

const TabMenu3 = () => {
  //
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const handleClickItem = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3. React with CSS <sub>접근성 고려(li 안에 title/desc 모두 존재) </sub>
      </h3>
      <div className={cx('container', 'tabMenu3')}>
        <ul className={cx('tabList')}>
          {data.map((d) => (
            <TabItem
              key={d.id}
              {...d}
              current={currentId === d.id}
              handleClickItem={handleClickItem}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TabMenu3;
