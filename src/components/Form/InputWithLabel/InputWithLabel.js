import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { Field as FormikField } from 'formik';
import s from './InputWithLabel.module.scss';

const FormItem = Form.Item;

function InputWithLabelField(props) {
  const {
    icon,
    hasFeedback,
    label,
    labelCol,
    wrapperCol,
    name,
    type,
    ...rest
  } = props;

  return (
    <FormikField
      name={name}
      render={({ field, meta }) => (
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
            className={
              (type === 'email' || type === 'password' || type === 'number') &&
              s.inputLtr
            }
            prefix={
              icon && typeof icon === 'string' ? (
                <i className={icon} />
              ) : (
                icon || ''
              )
            }
            type={type}
            {...rest}
          />
        </FormItem>
      )}
    />
  );
}

InputWithLabelField.propTypes = {
  hasFeedback: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

InputWithLabelField.defaultProps = {
  hasFeedback: false,
  icon: '',
  label: '',
  type: 'text',
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default InputWithLabelField;
