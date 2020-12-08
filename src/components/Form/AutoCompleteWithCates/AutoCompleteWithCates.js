import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { AutoComplete, Input, Form } from 'antd';
import { Field } from 'formik';
import ReactImageFallback from 'react-image-fallback';
import { API_URL } from '@/root/env';
import Link from '@/components/Link';
import s from './AutoCompleteWithCates.module.scss';
import { searchArtist, searchMusic } from '@/root/src/api/music';
import { hashedID } from '@/modules/seo';

function AutoCompleteWithCates({
  name,
  hasFeedback,
  setFieldValue,
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
          <div className={s.search}>
            <div className={s.searchInfo}>
              <h4>{item?.name}</h4>
              {item?.artist && <h5>{item?.artist}</h5>}
            </div>

            {item.image && (
              <ReactImageFallback
                src={item.image}
                alt={item.name}
                fallbackImage="/defaultavatar.jpg"
                initialImage="/defaultavatar.jpg"
                className={s.searchCover}
              />
            )}
          </div>
        </Link>
      </div>
    ),
  });

  const searchResult = async (value) => {
    let data = null;
    data = await searchMusic(value);
    if (data?.data?.length <= 0) {
      data = await searchArtist(value);
    }

    const searchData = data.data;

    const optionsData = [];

    if (searchData.find((i) => i.artist)) {
      const dataPreview = searchData.map((item) =>
        renderItem({
          id: item.id,
          link: `/music/${hashedID(item?.id)}`,
          image:
            item.cover && item.cover.url
              ? `${API_URL}${item.cover.url}`
              : '/defaultavatar.jpg',
          name: `${item.persianTitle}`,
          artist: item?.artist?.persianTitle,
        })
      );

      optionsData.push({
        label: renderTitle('کاست ها', '/music'),
        options: dataPreview,
      });
    } else {
      const dataPreview = searchData.map((item) =>
        renderItem({
          id: item.id,
          link: `/artist/${hashedID(item?.id)}`,
          image:
            item.cover && item.cover.url
              ? `${API_URL}${item.cover.url}`
              : '/defaultavatar.jpg',
          name: `${item.persianTitle}`,
        })
      );

      optionsData.push({
        label: renderTitle('آرتیست ها', '/artist'),
        options: dataPreview,
      });
    }
    const options = [...optionsData];
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
    const valueSelect = val && val.value ? val.value : val || '';
    setFieldValue(name, valueSelect);
  };

  const { result } = state;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <Form.Item
          label={label}
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
            <Input prefix={icon && <i className={cx(icon, 'selectIcon')} />} />
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
  setFieldValue: PropTypes.any.isRequired,
};

AutoCompleteWithCates.defaultProps = {
  hasFeedback: false,
  label: null,
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
  icon: '',
};

export default AutoCompleteWithCates;
