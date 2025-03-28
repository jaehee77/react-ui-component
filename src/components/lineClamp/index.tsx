import LineClamp1 from './1_r';
import LineClamp2 from './2_r';
import LineClampVanilla from './3_vanilla';
import cx from './cx';

const LineClamps = () => (
  <div className={cx('LineClamps')}>
    <h2>여러줄 말줄임</h2>
    <LineClamp1 />
    <br />
    <br />
    <LineClamp2 />
    <br />
    <br />
    <LineClampVanilla />
  </div>
);

export default LineClamps;
