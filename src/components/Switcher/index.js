import React, { useRef, useEffect, useState } from 'react';
import { CustomInput } from 'reactstrap';
import { useField } from '@rocketseat/unform';

export default function Switcher({ name, ...rest }) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'checked',
    });
  }, [ref.current, fieldName]); // eslint-disable-line
  return (
    <CustomInput
      type="switch"
      id={fieldName}
      name={fieldName}
      innerRef={ref}
      {...rest}
      invalid={!!error}
      bsSize={'sm'}
      checked={value}
      onChange={e => setValue(!value)}
    />
  );
}
