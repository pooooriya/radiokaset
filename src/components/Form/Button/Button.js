import cx from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import s from './Button.module.scss';

const ButtonField = ({ input, icon, label, float, htmlType, ...rest }) => (
  <Button
    {...input}
    {...rest}
    className={cx(s.button, float === 'left' && s.floatLeft)}
    htmlType={htmlType || 'submit'}
  >
    {label}
    {icon && typeof icon === 'string' ? (
      <i className={cx(icon, s.buttonIcon)} />
    ) : (
      icon || ''
    )}
  </Button>
);

ButtonField.defaultProps = {
  icon: '',
  float: '',
  label: null,
  htmlType: 'submit',
};

ButtonField.propTypes = {
  label: PropTypes.string,
  float: PropTypes.string,
  icon: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  htmlType: PropTypes.string,
};

export default ButtonField;
