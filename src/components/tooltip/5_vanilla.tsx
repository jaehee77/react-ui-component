import VanillaWrapper from '../vanillaWrapper';
import data from './data';
import cx from './cx';

const initiator = (wrapper: HTMLDivElement) => {
  const $tooltips = data.map(({ id, title, description }) => {
    const $details = document.createElement('details');
    $details.classList.add(cx('details'));
    $details.setAttribute('data-tooltip', id);
    $details.setAttribute('name', 'test');

    const $summary = document.createElement('summary');
    $summary.classList.add(cx('summary'));
    $summary.setAttribute('data-tooltip-summary', 'true');
    $summary.textContent = title;

    const $tooltip = document.createElement('div');
    $tooltip.classList.add(cx('tooltip'));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);

    return $details;
  });
  // console.log($tooltips);

  const closeAllTooltip = (e: Event) => {
    const target = e.target as HTMLElement;

    document.querySelectorAll('[data-tooltip').forEach((elem) => {
      // 자기 자신을 다시 클릭해서 닫는 동작은 details와 summary의 기본 동작에 의한 결과이고
      // 클릭 대상의 부모요소인 details 가 아닐때 remove
      if (elem !== target.parentElement) elem.removeAttribute('open');
    });
  };
  window.addEventListener('click', closeAllTooltip);

  wrapper.append(...$tooltips);
};

const TooltipVanilla = () => (
  <VanillaWrapper title="#5" initiator={initiator} />
);

export default TooltipVanilla;
