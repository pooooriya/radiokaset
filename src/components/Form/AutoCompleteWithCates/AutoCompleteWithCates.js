import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { AutoComplete, Input, Form } from 'antd';
import { Field } from 'formik';
import ReactImageFallback from 'react-image-fallback';
import { API_URL } from '@/root/env';
import Link from '@/components/Link';
// import { getMiniSearch } from '@/api/search';
import { hashedID } from '@/modules/seo';
import s from './AutoCompleteWithCates.module.scss';

function AutoCompleteWithCates({
  name,
  hasFeedback,
  // values,
  // errors,
  // handleSubmit,
  setFieldValue,
  // setFieldTouched,
  label,
  icon,
  labelCol,
  wrapperCol,
  ...rest
}) {
  const [state, _setState] = useState({
    result: [],
  });
  const setState = (value) =>
    _setState((currentState) => ({ ...currentState, ...value }));

  const renderTitle = (title, link) => (
    <Link to={link}>
      <span className={s.certainCategorySearch__groupTitle}>{title}</span>
    </Link>
  );
  const renderItem = (item) => ({
    value: item.name,
    label: (
      <div>
        <Link to={item.link}>
          <div className={s.certainCategorySearch__itemMeta}>
            {item.image && (
              <div className={s.certainCategorySearch__itemMetaAvatar}>
                <ReactImageFallback
                  src={item.image}
                  alt={item.name}
                  fallbackImage="/Avatar.jpg"
                  initialImage="/Avatar.jpg"
                />
              </div>
            )}
            <div className={s.certainCategorySearch__itemMetaContent}>
              <h4 className={s.certainCategorySearch__itemMetaContent___title}>
                {item.name}
              </h4>
              <div className={s.certainCategorySearch__itemMetaContent___desc}>
                {item.desc && <span> {item.desc} </span>}
                {item.location && item.location !== '|' && (
                  <span>
                    <i className="icon-placeholder1" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    ),
  });

  const searchResult = async (value) => {
    const data = await getMiniSearch(value);
    const searchData = data.data;

    const optionsData = [];

    if (searchData.doctors && searchData.doctors.length > 0) {
      const doctorsData = searchData.doctors.map((item) =>
        renderItem({
          id: item.id,
          link: `/doctors/${hashedID(item.id, 'doctor')}`,
          image:
            item.avatar && item.avatar.url
              ? `${API_URL}${item.avatar.url}`
              : '/Avatar.jpg',
          name: item.displayName,
          desc: item.specialityName,
          location: item.cityName,
        })
      );

      optionsData.push({
        label: renderTitle('پزشکان', '/doctors'),
        options: doctorsData,
      });
    }

    if (searchData.healthCenters && searchData.healthCenters.length > 0) {
      const healthCentersData = searchData.healthCenters.map((item) =>
        renderItem({
          id: item.id,
          link: `/health-centers/${hashedID(item.id, 'healthcenter')}`,
          image:
            item.thumbnail && item.thumbnail.url
              ? `${API_URL}${item.thumbnail.url}`
              : '/Avatar.jpg',
          name: item.name,
          desc: '',
          location: item.adress,
        })
      );

      optionsData.push({
        label: renderTitle('مراکز درمانی', '/health-centers'),
        options: healthCentersData,
      });
    }

    if (searchData.articles && searchData.articles.length > 0) {
      const articlesData = searchData.articles.map((item) =>
        renderItem({
          id: item.id,
          link: `/articles/${hashedID(item.id, 'article')}`,
          image:
            item.thumbnail && item.thumbnail.url
              ? `${API_URL}${item.thumbnail.url}`
              : '/Avatar.jpg',
          name: item.title,
          desc: '',
          location: '',
        })
      );

      optionsData.push({
        label: renderTitle('مقالات', '/articles'),
        options: articlesData,
      });
    }

    if (searchData.qas && searchData.qas.length > 0) {
      const qasData = searchData.qas.map((item) =>
        renderItem({
          id: item.id,
          link: `/faq/${hashedID(item.id, 'faq')}`,
          image:
            item.user && item.user.avatar && item.user.avatar.url
              ? `${API_URL}${item.user.avatar.url}`
              : '/Avatar.jpg',
          name: item.title,
          desc: `${item.comments} پاسخ`,
          location: '',
        })
      );

      optionsData.push({
        label: renderTitle('سوالات', '/faq'),
        options: qasData,
      });
    }

    const servicesData = [];

    if (searchData.services && searchData.services.length > 0) {
      searchData.services.forEach((service) => {
        if (service.children && service.children.length > 0) {
          const serviceData = service.children.map((child) => {
            return {
              value: child.name,
              label: (
                <span className={s.certainCategorySearch__catesItem}>
                  {child.name}
                </span>
              ),
            };
          });

          servicesData.push({
            label: renderTitle(service.name, ''),
            options: serviceData,
          });
        }
      });
    }

    const options = [...optionsData, ...servicesData];

    setState({
      result: options,
    });
  };
  const handleSearch = () => {
    const input = document.getElementById('inputCategorySearch');

    let typingTimer = null;

    input.addEventListener('keydown', () => {
      clearTimeout(typingTimer);
    });

    input.addEventListener('keyup', () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        searchResult(input.value);
      }, 300);
    });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleChange = (val) => {
    // console.log(`selected ${val}`);
    const valueSelect = val && val.value ? val.value : val || '';
    setFieldValue(name, valueSelect);
    // setValue(val);
  };

  const { result } = state;

  return (
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
          <AutoComplete
            id="inputCategorySearch"
            style={{ width: '100%' }}
            {...rest}
            dropdownClassName={s.certainCategorySearch_dropdown}
            dropdownMatchSelectWidth={false}
            size="large"
            options={result}
            optionLabelProp="value"
            defaultValue={field.value}
            className={s.autoCompleteWithCates}
            backfill
            onChange={handleChange}
          >
            <Input
              prefix={icon && <i className={cx(icon, 'selectIcon')} />}
              // onChange={handleSearch}
            />
          </AutoComplete>
        </Form.Item>
      )}
    </Field>
  );
}

AutoCompleteWithCates.propTypes = {
  hasFeedback: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object,
  name: PropTypes.any.isRequired,
  // values: PropTypes.any.isRequired,
  // errors: PropTypes.any.isRequired,
  // handleSubmit: PropTypes.any.isRequired,
  setFieldValue: PropTypes.any.isRequired,
  // setFieldTouched: PropTypes.any.isRequired,
};

AutoCompleteWithCates.defaultProps = {
  hasFeedback: false,
  label: null,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  icon: '',
};

export default AutoCompleteWithCates;
