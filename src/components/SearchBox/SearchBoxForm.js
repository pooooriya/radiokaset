import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Button from '@/components/Button/Button';
import AutoCompleteWithCates from '@/components/Form/AutoCompleteWithCates';
import SelectField from '@/components/Form/SelectField';
import { messageValidator } from '@/modules/static';
import s from './SearchBoxForm.module.scss';

const validate = (values) => {
  const errors = {};
  if (!values.search) {
    errors.search = messageValidator.require;
  }
  return errors;
};

const SearchBoxForm = ({ handleSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
      enableReinitialize
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(form) => (
        <Form className={s.form}>
          <Row gutter={[24]} justify="space-between">
            <Col xs={24} md={18} lg={17}>
              <div className={s.searchInput}>
                <AutoCompleteWithCates
                  {...form}
                  wrapperCol={20}
                  name="search"
                  type="search"
                  placeholder="خواننده یا آهنگ مورد نظر را تایپ کنید ... "
                />
              </div>
            </Col>
            <Col xs={24} md={6} lg={7} className={s.Button}>
              <Button
                // {...form}
                disabled={!form.dirty || form.isSubmitting}
                name="submit"
                type="primary"
                htmlType="submit"
                size="large"
              >
                کاست رو پیدا کن
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

SearchBoxForm.defaultProps = {
  handleSubmit: null,
};

SearchBoxForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default SearchBoxForm;
