import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import s from './Button.scss';

class ButtonMain extends React.Component {
  render() {
    const { icon, className, children, ...rest } = this.props;
    return (
      <Button {...rest} className={cx(className, s.button)}>
        {children}
        {icon && <i className={cx(icon, s.buttonIcon)} />}
      </Button>
    );
  }
}

ButtonMain.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  className: PropTypes.string,
};

ButtonMain.defaultProps = {
  children: null,
  icon: '',
  className: '',
};

export default ButtonMain;
