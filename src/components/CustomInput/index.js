import React, { useRef, useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import { useField } from '@rocketseat/unform';

export default function CustomInput({ name, ...rest }) {
  const [value, setValue] = useState();
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Input
        name={fieldName}
        ref={ref}
        {...rest}
        invalid={!!error}
        bsSize={'sm'}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </>
  );
}
