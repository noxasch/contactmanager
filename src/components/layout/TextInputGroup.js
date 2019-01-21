import React from 'react';
import PropTypes from 'prop-types';


// this is just a stateless component
const TextInputGroup = ({name, type, label, value, placeholder, onChange, error}) => {
  // const {name, type, label, value, placeholder, onChange} = props;

  return(
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input 
        name={name}
        type={type !== null ? type : 'text'}
        value={value} 
        onChange={onChange} 
        className={`${ error ? 'is-invalid' : ''} form-control form-control-lg` }
        placeholder={placeholder}  
      />
      {
        // if error is true, it will take the second value
        // if false, react will ignore it
        // refs: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
        error && <div className="invalid-feedback">{label} is required</div> 
        // equivalent to
        // error ? <div className="invalid-feedback">{label} is required</div> : ''
      }
    </div>
  )
}

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup;