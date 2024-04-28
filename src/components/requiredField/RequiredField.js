import PropTypes from 'prop-types';
import './RequiredField.css';

function RequiredField({ title }) {
  //todo:  refactor like children
  return (
    <p className="required-field">
      <span>*</span>
      {' '}
      {title}
    </p>
  );
}

RequiredField.propTypes = {
  title: PropTypes.string.isRequired,
};
export default RequiredField;
