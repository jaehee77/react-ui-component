import { useState } from 'react';
import cx from './cx';
import data from './data';
import VanillaWrapper from '../vanillaWrapper';
/*
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
*/

/*
const TabMenu2 = () => {
  //
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const handleClickItem = (id: string) => {
    setCurrentId((prev) => (prev === id ? null : id));
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
            <div className={cx('description', { current: currentId === d.id })}>
              {d.description}
            </div>
          );
        })}
      </div>
    </>
  );
};
*/

const buildTabMenus = ({ id, title }: { id: string; title: string }) => {
  const $li = document.createElement('li');
  $li.classList.add(cx('tab'));
  $li.textContent = title;
  $li.setAttribute('data-id', id);

  return $li;
};

const buildDescriptions = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const $div = document.createElement('div');
  $div.classList.add(cx('description'));
  $div.textContent = description;

  return $div;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string = data[0].id;

  const $container = document.createElement('div');
  $container.classList.add(cx('container'), cx('tabMenu2'));

  const $tabUl = document.createElement('ul');
  $tabUl.classList.add(cx('tabList'));

  const $tabList = data.map(buildTabMenus);
  const $desc = data.map(buildDescriptions);

  $tabUl.append(...$tabList);
  $container.append($tabUl, ...$desc);

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;

    if (!$el.classList.contains(cx('tab'))) return;

    currentId = $el.dataset.id || data[0].id;

    $tabList.forEach(($item, i) => {
      $item.classList.toggle(cx('current'), currentId === $item.dataset.id);
      $desc[i].classList.toggle(cx('current'), currentId === $item.dataset.id);
    });
  };

  $tabUl.addEventListener('click', handleClickTab);
  $tabList[0].click();

  wrapper.append($container);
};

const TabMenuVanilla = () => (
  <VanillaWrapper title="#4" initiator={initiator} />
);

export default TabMenuVanilla;
