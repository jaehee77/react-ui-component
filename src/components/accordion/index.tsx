import Accordion1 from './1_r';
import Accordion2 from './2_r';
import Accordion3 from './3_r';
import Accordion4V from './4_vanila';
import Accordion5 from './5_r';
import Accordion6 from './6_r';
import Accordion7 from './7_r';
import { cx } from './cx';

const Accordions = () => {
  return (
    <div className={cx('Accordions')}>
      <h2>아코디언</h2>
      <Accordion1 />
      <br />
      <br />
      <Accordion2 />
      <br />
      <br />
      <Accordion3 />
      <br />
      <br />
      <Accordion4V />
      <br />
      <br />
      <Accordion5 />
      <br />
      <br />
      <Accordion6 />
      <br />
      <br />
      <Accordion7 />
    </div>
  );
};

export default Accordions;
