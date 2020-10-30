import cx from 'classnames';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { Field as FormikField } from 'formik';
import s from './Textarea.module.scss';

const FormItem = Form.Item;

const TextAreaField = (props) => {
  const {
    hasFeedback,
    label,
    gray,
    labelCol,
    wrapperCol,
    name,
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
          <Input.TextArea
            {...rest}
            {...field}
            className={cx(s.input, gray && s.inputGray)}
          />
        </FormItem>
      )}
    />
  );
};

TextAreaField.propTypes = {
  hasFeedback: PropTypes.bool,
  gray: PropTypes.bool,
  label: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
};

TextAreaField.defaultProps = {
  hasFeedback: false,
  gray: false,
  label: '',
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default TextAreaField;
