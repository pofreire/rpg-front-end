import React from 'react';
import {
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { searchRequest } from '~/store/modules/search/actions';

export default function SearchForm() {
  const dispatch = useDispatch();

  function handleSubmit({ name }) {
    dispatch(searchRequest(name));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label className="text-white">Pesquisar</Label>
        <InputGroup className="form-search">
          <Input name="name" className="form-control form-control-sm" />
          <InputGroupAddon addonType="append">
            <Button size="sm" color="outline-secondary">
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
