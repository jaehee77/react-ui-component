import cx from '../cx';
import data from '../data';
import useInfiniteFetcher from './useInfiniteFetcher';

const ListItem = ({
  number,
  id,
  title,
  description,
}: {
  number: number;
  id: string;
  title: string;
  description: string;
}) => {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
};

const InfiniteScrollR = () => {
  const { data } = useInfiniteFetcher();

  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#1 React - scroll로 감지하는 방식</h3>
      <ul>
        {data.map((page, i) =>
          page.map((item, j) => (
            <ListItem {...item} number={i * 20 + j + 1} key={`${i}_${j}`} />
          ))
        )}
      </ul>
      <div className={cx('spinner')}></div>
    </>
  );
};

export default InfiniteScrollR;
