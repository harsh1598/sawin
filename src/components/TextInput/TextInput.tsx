import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.css';

interface PropData {
    type: string;
}

export const TextInput = (props: PropData) => {
    return (
        <input className='form-control' type={props.type} />
    )
}

TextInput.propTypes = {
    type: PropTypes.string
}

TextInput.defaultProps = {
    type: 'Text'
}
