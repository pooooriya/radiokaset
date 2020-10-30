import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { Field } from 'formik';
import './RadioField.module.scss';

const RadioGroup = Radio.Group;
const RadioItem = Radio;

const RadioField = ({
  hasFeedback,
  name,
  // values,
  // errors,
  // handleSubmit,
  // setFieldValue,
  // setFieldTouched,
  label,
  options,
  labelCol,
  wrapperCol,
  ...rest
}) => (
  <Field name={name}>
    {({ field, meta }) => (
      <Form.Item
        label={label}
        // validateStatus={errors[name] ? 'error' : 'success'}
        // hasFeedback={!!errors[name]}
        // help={errors[name]}
        hasFeedback={hasFeedback && !!meta.error}
        validateStatus={meta.error && 'error'}
        help={meta.error}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <RadioGroup {...rest} {...field} size="large">
          {options.map((i) => (
            <RadioItem key={`${name}_${i.value}`} value={i.value}>
              {i.label}
            </RadioItem>
          ))}
        </RadioGroup>
      </Form.Item>
    )}
  </Field>
);

RadioField.propTypes = {
  hasFeedback: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  name: PropTypes.any.isRequired,
  // values: PropTypes.any.isRequired,
  // errors: PropTypes.any.isRequired,
  // handleSubmit: PropTypes.any.isRequired,
  // setFieldValue: PropTypes.any.isRequired,
  // setFieldTouched: PropTypes.any.isRequired,
};

RadioField.defaultProps = {
  hasFeedback: false,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default RadioField;
