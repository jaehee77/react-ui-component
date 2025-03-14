import { useState } from 'react';
import { cx } from './cx';
import data from './data';
import VanillaWrapper from '../vanillaWrapper';

const itemBuilder = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const $li = document.createElement('li');
  $li.classList.add(cx('item'), cx('item3'));
  $li.setAttribute('data-id', id);

  const $tab = document.createElement('div');
  $tab.classList.add(cx('tab'));
  $tab.textContent = title;

  const $description = document.createElement('div');
  $description.classList.add(cx('description'));
  $description.textContent = description;

  $li.append($tab, $description);

  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId: string | null = null;

  const $ul = document.createElement('ul');
  $ul.classList.add(cx('container'));

  const handleClickTab = (e: Event) => {
    const $el = e.target as HTMLElement;
    // console.log($el);
    if (!$el.classList.contains(cx('tab'))) {
      return;
    }
    // console.log($el);

    // const parentLi = $el.closest('li[data-id]');
    const targetId = $el.parentElement!.dataset.id;

    if (!targetId) return;

    currentId = targetId === currentId ? null : targetId;

    $items.forEach(($item) => {
      $item.classList.toggle(cx('current'), currentId === $item.dataset.id);
    });
  };
  $ul.addEventListener('click', handleClickTab);

  // const $items = data.map((d) => itemBuilder(d));
  const $items = data.map(itemBuilder);
  // 매개변수 이름이 같을 때는 암묵적으로 매개변수를 전달할 수 있는 문법
  // 문법적 특성: 암묵적인 인수 전달
  // 이것을 암묵적인 함수 인수 전달(Implicit Argument Passing) 또는 암시적 함수 인수 전달이라고 한다.

  // 함수는 일급객체 : 함수 이름을 직접 전달
  // itemBuilder라는 함수 이름을 map에 바로 전달하는 것은 함수 참조를 전달하는 방식.
  // 즉, 함수 이름만 써서 해당 함수가 참조되고 map이 이를 호출할 때 각 항목을 자동으로 전달하는 것이다.
  // 이는 JavaScript에서의 함수 참조 방식으로,
  // 함수가 매개변수로 받을 값을 자동으로 처리하는 특성을 이용한 것이다.
  // 본래 map 함수가 콜백함수를 받아서 콜백함수를 실행해주기 때문에
  // 콜백함수로써 itmeBuilder 함수 참조값을 넘겨주고 itmeBuilder 이 콜백함수가 자동으로 실행된다.

  $ul.append(...$items);

  wrapper.append($ul);
  // append 하지마자 처음 요소에 클릭 트리거를 발생시켜서 열려있도록 함
  // console.log($items[0].children[0]);
  ($items[0].children[0] as HTMLElement).click();
};

const Accordion4V = () => <VanillaWrapper title="#4" initiator={initiator} />;

export default Accordion4V;
