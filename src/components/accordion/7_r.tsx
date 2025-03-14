import data from './data';
import { cx } from './cx';
import { useEffect, useRef, useState } from 'react';

const AccordionItem = ({
  title,
  description,
  open,
}: {
  title: string;
  description: string;
  open: boolean;
}) => {
  const descRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const open = () => descRef.current?.open;

    if (descRef.current) {
      descRef.current.addEventListener('beforematch', open);
    }
    return () => {
      if (descRef.current)
        descRef.current.removeEventListener('beforematch', open);
    };
  }, [open]);

  return (
    // details 에 같은 이름 정의시 한 묶음처리로 아코디언처리 가능
    <details name="sameName" ref={descRef} open={open}>
      <summary>{title}</summary>
      <div className={cx('description')}>{description}</div>
    </details>
  );
};

const Accordion7 = () => {
  // 기본적으로 첫 번째 항목이 열리도록 상태 설정
  const [currentId, setCurrentId] = useState<number | null>(0);

  return (
    <>
      <h3>
        #7. React
        <sub>여러 개가 펼쳐지는 아코디언 + 검색가능 (details태그)</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((d, i) => (
          <AccordionItem {...d} key={d.id} open={i === currentId} />
        ))}
      </ul>
    </>
  );
};

export default Accordion7;
