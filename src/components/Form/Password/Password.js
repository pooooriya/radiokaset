import React, { useState } from 'react';
import cx from 'classnames';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';
import s from './Password.module.scss';

const FormItem = Form.Item;

function PasswordField({
  hasFeedback,
  icon,
  name,
  label,
  labelCol,
  wrapperCol,
  ...rest
}) {
  const [score, setScore] = useState(0);
  const onPassChange = ({ e, setFieldError, setFieldValue }) => {
    const strengthValue = {
      caps: false,
      length: false,
      special: false,
      numbers: false,
      small: false,
    };
    const password = e.target.value;
    if (password.length >= 8) {
      strengthValue.length = true;
    }
    let index;
    for (index = 0; index < password.length; index += 1) {
      const char = password.charCodeAt(index);
      if (!strengthValue.caps && char >= 65 && char <= 90) {
        strengthValue.caps = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (!strengthValue.small && char >= 97 && char <= 122) {
        strengthValue.small = true;
      } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
        strengthValue.numbers = true;
      } else if (
        (!strengthValue.special && char >= 33 && char <= 47) ||
        (char >= 58 && char <= 64)
      ) {
        strengthValue.special = true;
      }
    }
    let strengthIndicator = 0;
    Object.keys(strengthValue).forEach((metric) => {
      if (strengthValue[metric] === true) {
        strengthIndicator += 1;
      }
    });

    const error = strengthIndicator < 2;
    const errorMessage = 'لطفا پسورد قوی تری متشکل از حروف و اعداد انتخاب کنید';
    if (error) {
      setFieldError(name, errorMessage);
    } else {
      setFieldError(name, '');
    }
    setFieldValue(name, password);
    setScore(strengthIndicator);
  };

  return (
    <FormikField
      name={name}
      render={({ field, meta, form: { setFieldValue, setFieldError } }) => (
        <FormItem
          label={label}
          hasFeedback={hasFeedback && !!meta.error}
          validateStatus={meta.error && 'error'}
          help={meta.error}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
        >
          <Input
            {...field}
            {...rest}
            type="password"
            className={s.input}
            onChange={(e) => {
              onPassChange({ e, setFieldValue, setFieldError, name });
            }}
          />
          {icon && <i className={icon} />}
          <Input type="hidden" name={`${name}Score`} value={score} />
          <span
            className={cx({
              [s.passwordProgress]: true,
              [s.passwordProgressStep0]: score === 0,
              [s.passwordProgressStep1]: score === 1,
              [s.passwordProgressStep2]: score === 2,
              [s.passwordProgressStep3]: score === 3,
              [s.passwordProgressStep4]: score === 4,
            })}
          />
        </FormItem>
      )}
    />
  );
}

PasswordField.propTypes = {
  hasFeedback: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

PasswordField.defaultProps = {
  name: '',
  hasFeedback: false,
  icon: '',
  label: null,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default PasswordField;
