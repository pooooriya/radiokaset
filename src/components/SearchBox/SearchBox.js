import { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
// import { hashedID } from '@/modules/seo';
import { useRouter } from 'next/router';
import SearchBoxForm from './SearchBoxForm';
import s from './SearchBox.module.scss';

const SearchBox = ({ searchValues, withBoxshadow }) => {
  const formValues = useMemo(() => searchValues, [searchValues]);
  const router = useRouter();
  let initialValues = {};

  if (isEmpty(initialValues)) {
    initialValues = formValues
      ? {
          search: formValues.name ? formValues.name : '',
        }
      : {};
  }

  const onSubmit = async (values) => {
    let url = '/search/';
    if (values) {
      url = `/search/${values?.search}`;
    }
    initialValues = { ...values };
    router.push(url);
  };

  return (
    <div
      className={cx(s.search, withBoxshadow && s.withBoxshadow)}
      id="boxSearch"
    >
      <SearchBoxForm handleSubmit={onSubmit} initialValues={initialValues} />
    </div>
  );
};

SearchBox.propTypes = {
  withBoxshadow: PropTypes.bool,
  searchValues: PropTypes.instanceOf(Object),
};

SearchBox.defaultProps = {
  withBoxshadow: false,
  searchValues: null,
};

export default SearchBox;
