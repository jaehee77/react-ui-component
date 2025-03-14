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

const TabMenu2 = () => {
  //
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const handleClickItem = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #2. React with CSS{' '}
        <sub>리액트로 모든 description 렌더링 해놓은 상태 </sub>
      </h3>
      <div className={cx('container', 'tabMenu2')}>
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
        {data.map((d) => {
          return (
            <div
              className={cx('description', { current: currentId === d.id })}
              key={d.id}
            >
              {d.description}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabMenu2;
