import PropTypes from 'prop-types';
import { Form, Checkbox } from 'antd';
import './CheckboxField.scss';

const CheckboxItem = Checkbox;

function CheckboxField(props) {
  const {
    input,
    meta,
    hasFeedback,
    label,
    checkboxLabel,
    labelCol,
    wrapperCol,
    ...rest
  } = props;
  const hasWarning = meta.touched && meta.valid;
  const hasError = meta.touched && meta.invalid;
  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      extra={hasWarning && meta.warning}
      help={hasError && meta.error}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <CheckboxItem {...input} {...rest}>
        {checkboxLabel || ''}
      </CheckboxItem>
    </Form.Item>
  );
}

CheckboxField.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  hasFeedback: PropTypes.bool,
  label: PropTypes.string.isRequired,
  checkboxLabel: PropTypes.string.isRequired,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

CheckboxField.defaultProps = {
  hasFeedback: false,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default CheckboxField;
