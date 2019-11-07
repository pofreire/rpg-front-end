import React, { useState } from 'react';
import { Button, Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';

import api from '~/services/api';

export default function CharacterSheet({ character, loadData, toggle }) {
  function handleSubmit(data) {
    character = { ...data };
    api.post(`/characters`, character);

    loadData();
    toggle();
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    strength: Yup.string().required(),
    dexterity: Yup.string().required(),
    constitution: Yup.string().required(),
    intelligence: Yup.string().required(),
    wisdom: Yup.string().required(),
    charisma: Yup.string().required(),
  });

  return (
    <Form schema={schema} initialData={character} onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" className="form-control form-control-sm" />
      </FormGroup>
      <Row>
        <Col>
          <FormGroup>
            <Label>Strength</Label>
            <Input
              name="strength"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Dexterity</Label>
            <Input
              name="dexterity"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Constitution</Label>
            <Input
              name="constitution"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormGroup>
            <Label>Intelligence</Label>
            <Input
              name="intelligence"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Wisdom</Label>
            <Input
              name="wisdom"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup size="sm">
            <Label>Charisma</Label>
            <Input
              name="charisma"
              type="number"
              className="form-control form-control-sm"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className="text-right">
          <Button color="outline-secondary" size="sm" type="submit">
            <FontAwesomeIcon icon={faCheck} /> Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
