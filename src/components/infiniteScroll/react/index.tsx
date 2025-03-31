import cx from '../cx';
import data from '../data';

const InfiniteScrollR = () => {
  return (
    <>
      <h2>무한 스크롤</h2>
      <h3>#1 React - scroll로 감지하는 방식</h3>
      <ul></ul>
      <div className={cx('spinner')}></div>
    </>
  );
};

export default InfiniteScrollR;
