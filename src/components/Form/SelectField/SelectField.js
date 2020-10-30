import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { Field } from 'formik';
import cx from 'classnames';
// import { getCurrentPosition } from '@/modules/index';
// import getCityName from '@/api/citynameFromlatlong';
// import cities from '@/statics/cities.json';
// import specialties from '@/statics/specialties.json';
// import s from './SelectField.scss';

let filtredCounts = 0;

const SelectField = ({
  name,
  // values,
  // errors,
  // handleSubmit,
  setFieldValue,
  // setFieldTouched,
  hasFeedback,
  label,
  icon,
  type,
  selectOption,
  labelCol,
  wrapperCol,
  filterDataTimeOut,
  ...rest
}) => {
  const [result, setresult] = useState([]);
  let timeout = 0;

  const handleOptionData = (TypeSelect) => {
    switch (TypeSelect) {
      case 'specialty': {
        const specialtiesData = specialties.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setresult(specialtiesData);
        break;
      }
      case 'city': {
        const citiesData = cities.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }));
        setresult(citiesData);
        break;
      }

      default:
        setresult(selectOption);
        break;
    }
  };
  // lotfan pakesh nakonid marbot be peida kardane locationeee
  // const fetchCoordinates = async () => {
  //   try {
  //     const { coords } = await getCurrentPosition();
  //     const { latitude, longitude } = coords;
  //     getCityName(latitude, longitude).then((res) => {
  //       const { features } = res.data ? res.data : null;
  //       const { text_fa } = features ? features[0] : null;
  //       const { context } = features ? features[0] : null;
  //       const { text } = context ? context[0] : null;
  //       if ((text, text_fa)) {
  //         const city = cities.find((item) => item.name === text_fa);
  //         if (city) {
  //           setValue(city.id.toString());
  //         } else {
  //           const provines = cities.find((item) => item.name === text);
  //           setValue(provines && provines.id.toString());
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // };

  useEffect(() => {
    // if (type === 'city') {
    //   fetchCoordinates();
    // }
    handleOptionData(type);
  }, []);

  const filterData = () => {
    filtredCounts += 1;
    const currentRun = filtredCounts;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (currentRun === filtredCounts) {
        // always run last query
        handleOptionData(type);
      }
    }, filterDataTimeOut);
  };

  return (
    <div>
      <Field name={name}>
        {({ field, meta, form }) => (
          <Form.Item
            label={label}
            hasFeedback={hasFeedback && !!meta.error}
            validateStatus={meta.error && 'error'}
            help={meta.error}
            // validateStatus={errors[name] ? 'error' : 'success'}
            // hasFeedback={!!errors[name]}
            // help={errors[name]}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Select
              {...rest}
              {...field}
              value={
                result?.find((r) => String(r.value) === String(field.value))
                  ?.label
              }
              onChange={(val) => form.setFieldValue(name, val)}
              className={icon && 'selectWithIcon'}
              onFocus={() => handleOptionData(type)}
              filterOption
              showSearch
              optionFilterProp="label"
              onInputKeyDown={(e) => filterData(e.target.value)}
              allowClear
            >
              {result &&
                result.length &&
                result.length > 0 &&
                result.map(({ value: optionValue, label: optionLabel }) => (
                  <Select.Option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </Select.Option>
                ))}
            </Select>
            {icon && <i className={cx(icon, 'selectIcon')} />}
          </Form.Item>
        )}
      </Field>
    </div>
  );
};

SelectField.propTypes = {
  hasFeedback: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  selectOption: PropTypes.instanceOf(Array),
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  filterDataTimeOut: PropTypes.number,
  name: PropTypes.any.isRequired,
};

SelectField.defaultProps = {
  hasFeedback: false,
  selectOption: [],
  label: null,
  icon: '',
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  filterDataTimeOut: 500,
};

export default SelectField;
