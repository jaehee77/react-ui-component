import TabMenu1 from './1_r';
import TabMenu2 from './2_r';
import TabMenu3 from './3_r';
import TabMenuVanilla from './4_vanilla';
import TabMenu5 from './5_r';
import TabMenu6 from './6_r';
import cx from './cx';

const TabMenus = () => {
  return (
    <div className={cx('TabMenus')}>
      <h2>탭 메뉴</h2>
      <TabMenu1 />
      <br />
      <br />
      <TabMenu2 />
      <br />
      <br />
      <TabMenu3 />
      <br />
      <br />
      <TabMenuVanilla />
      <br />
      <br />
      <TabMenu5 />
      <br />
      <br />
      <TabMenu6 />
      <br />
      <br />
    </div>
  );
};

export default TabMenus;
