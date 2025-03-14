import Tooltip1 from './1_r';
import Tooltip3 from './3_r';
import cx from './cx';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <Tooltip1 />
      <br />
      <br />
      <Tooltip3 />
    </div>
  );
};

export default Tooltips;
