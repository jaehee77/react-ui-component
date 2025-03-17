import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';
import { log } from 'console';

const Tooltip = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <details name="test" className={cx('details')} data-tooltip={id}>
      <summary className={cx('summary')} data-tooltip-summary>
        {title}
      </summary>
      <div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
        {description}
      </div>
    </details>
  );
};

const Tooltip3 = () => {
  //

  useEffect(() => {
    const closeAllTooltip = (e: Event) => {
      const target = e.target as HTMLElement;
      // console.log(target, target.parentElement);

      // data-tooltip -> details 태그
      document.querySelectorAll('[data-tooltip').forEach((elem) => {
        // 자기 자신을 다시 클릭해서 닫는 동작은 details와 summary의 기본 동작에 의한 결과이고
        // if 문은...
        // 클릭 대상의 부모요소인 details 가 아닐때 remove
        if (elem !== target.parentElement) elem.removeAttribute('open');
      });
    };

    window.addEventListener('click', closeAllTooltip);

    return () => {
      window.removeEventListener('click', closeAllTooltip);
    };
  }, []);

  return (
    <>
      <h3>
        #3. React with HTML(details, summary 태그 사용)
        <sub>외부 클릭시 닫힘(react 추가)</sub>
      </h3>
      {data.map((d) => (
        <Tooltip {...d} key={d.id} />
      ))}
    </>
  );
};

export default Tooltip3;
