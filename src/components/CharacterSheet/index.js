import React, { useState } from 'react';
import { Button, Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';
import CustomInput from '~/components/CustomInput';

import api from '~/services/api';

export default function CharacterSheet({ character, loadData, toggle }) {
  const [currentStep, setCurrentStep] = useState(1);

  function handleSubmit(data) {
    data = { ...data };
    api.post(`/characters`, data);

    loadData();
    toggle();
  }

  function updateCharacter(data) {
    data = { ...data };
    console.info(data);
    api.patch(`/characters/${data.id}`);

    loadData();
    toggle();
  }

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    strength: Yup.number()
      .required()
      .min(1)
      .max(20),
    dexterity: Yup.number()
      .required()
      .min(1)
      .max(20),
    constitution: Yup.number()
      .required()
      .min(1)
      .max(20),
    intelligence: Yup.number()
      .required()
      .min(1)
      .max(20),
    wisdom: Yup.number()
      .required()
      .min(1)
      .max(20),
    charisma: Yup.number()
      .required()
      .min(1)
      .max(20),
  });

  return (
    <>
      <Form
        schema={schema}
        initialData={character}
        onSubmit={character.id != null ? updateCharacter : handleSubmit}
        step={currentStep}
      >
        <Input name="id" />
        <FormGroup>
          <Label>Name</Label>
          <CustomInput name="name" />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label>Strength</Label>
              <CustomInput name="strength" type="number" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Dexterity</Label>
              <CustomInput name="dexterity" type="number" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Constitution</Label>
              <CustomInput name="constitution" type="number" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label>Intelligence</Label>
              <CustomInput name="intelligence" type="number" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Wisdom</Label>
              <CustomInput name="wisdom" type="number" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup size="sm">
              <Label>Charisma</Label>
              <CustomInput name="charisma" type="number" />
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
    </>
  );
}
