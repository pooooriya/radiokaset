import { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { hashedID } from '@/modules/seo';
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
          city:
            formValues.city && formValues.city !== 'all' ? formValues.city : '',
          specialty:
            formValues.specialty && formValues.specialty !== 'all'
              ? formValues.specialty
              : '',
        }
      : {};
  }

  const onSubmit = async (values) => {
    // let url = '/search/';
    // const city = values.city || 'all';
    // const specialty = values.specialty || 'all';
    // const name = values.search;
    // if (name) {
    //   url = `/search/${Number(city) ? hashedID(city, 'city') : 'all'}/${
    //     Number(specialty) ? hashedID(specialty, 'specialty') : 'all'
    //   }/${name}/`;
    // } else {
    //   url = `/search/${Number(city) ? hashedID(city, 'city') : 'all'}/${
    //     Number(specialty) ? hashedID(specialty, 'specialty') : 'all'
    //   }/`;
    // }
    // initialValues = { ...values };
    // // setFormValues({
    // //   city,
    // //   specialty,
    // //   value,
    // // });
    // router.push(url);
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
