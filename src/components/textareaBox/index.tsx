import cx from './cx';
import TextBox1 from './1_r';
import TextBox2 from './2_r';
import TextBox3 from './3_r';
import TextBox2_New from './2_r_new';

const TextareaBoxes = () => {
  return (
    <div className={cx('TextBoxes')}>
      <h2>Reactive textarea 박스</h2>
      <TextBox1 />
      <br />
      <br />
      <TextBox2 />
      <br />
      <TextBox2_New />
      <br />
      <TextBox3 />
      <br />
      <br />
    </div>
  );
};

export default TextareaBoxes;
