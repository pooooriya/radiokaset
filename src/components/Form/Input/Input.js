import cx from 'classnames';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { Field as FormikField } from 'formik';
import s from './Input.module.scss';

const FormItem = Form.Item;

function InputField(props) {
  const {
    icon,
    hasFeedback,
    label,
    type,
    ltr,
    labelCol,
    wrapperCol,
    name,
    ...rest
  } = props;

  return type === 'hidden' ? (
    <input type="hidden" {...rest} />
  ) : (
    <FormikField
      name={name}
      render={({ field, meta }) => (
        <FormItem
          label={label}
          validateStatus={meta.error && 'error'}
          hasFeedback={hasFeedback && !!meta.error}
          help={meta.error}
          wrapperCol={wrapperCol}
          labelCol={labelCol}
        >
          <input
            className={
              meta.active &&
              (type === 'email' ||
                type === 'password' ||
                type === 'phoneNumber' ||
                ltr)
                ? cx(s.input, s.inputLtr)
                : s.input
            }
            type={type}
            {...rest}
            {...field}
          />
          {icon && <i className={icon} />}
        </FormItem>
      )}
    />
  );
}

InputField.propTypes = {
  hasFeedback: PropTypes.bool,
  ltr: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

InputField.defaultProps = {
  hasFeedback: false,
  ltr: false,
  icon: '',
  label: '',
  type: null,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default InputField;
