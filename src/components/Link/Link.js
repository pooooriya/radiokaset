import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkComponent = ({ to, children, ...rest }) => (
  <Link href={to || '/'}>
    <a {...rest}>{children}</a>
  </Link>
);

LinkComponent.propTypes = {
  to: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};

export default LinkComponent;
