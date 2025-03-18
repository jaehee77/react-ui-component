import Tooltip1 from './1_r';
import Tooltip2 from './2_r';
import Tooltip3 from './3_r';
import Tooltip4 from './4_r';
import TooltipVanilla from './5_vanilla';
import cx from './cx';

const Tooltips = () => {
  return (
    <div className={cx('Tooltips')} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <Tooltip1 />
      <br />
      <br />
      <Tooltip2 />
      <br />
      <br />
      {/* <Tooltip3 /> */}
      <br />
      <br />
      <Tooltip4 />
      <br />
      <br />
      <TooltipVanilla />
    </div>
  );
};

export default Tooltips;
