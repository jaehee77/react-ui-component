import Tooltip1 from './1_r';
import cx from './cx';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <Tooltip1 />
    </div>
  );
};

export default Tooltips;
