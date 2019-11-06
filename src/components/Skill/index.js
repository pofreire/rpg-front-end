import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Form, Input, Check } from '@rocketseat/unform';

export default function Skill({ skill }) {
  return (
    <Form initialData={skill}>
      <FormGroup>
        <Label>Ability</Label>
        <Input name="ability" className="form-control form-control-sm" />
      </FormGroup>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" className="form-control form-control-sm" />
      </FormGroup>
      <FormGroup>
        <Label>Proficient</Label>
        <Check name="proficient" className="form-control form-control-sm" />
      </FormGroup>
    </Form>
  );
}
