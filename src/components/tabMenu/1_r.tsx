import { useState } from 'react';
import cx from './cx';
import data from './data';

const TabItem = ({
  id,
  title,
  current,
  handleClickItem,
}: {
  id: string;
  title: string;
  current: boolean;
  handleClickItem: (id: string) => void;
}) => {
  return (
    <li className={cx('tab', { current })} onClick={() => handleClickItem(id)}>
      {title}
    </li>
  );
};

const TabMenu1 = () => {
  //
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const currentDescription =
    data.find((item) => item.id === currentId)?.description || '';

  const handleClickItem = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #1. React Only <sub>description만 교체하는 방법</sub>
      </h3>
      <div className={cx('container')}>
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
        <div className={cx('description')}>{currentDescription}</div>
      </div>
    </>
  );
};

export default TabMenu1;
