import React from 'react';
import { Button, Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Input, Check } from '@rocketseat/unform';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '~/services/api';

export default function Skill({ character, loadData, skill }) {
  async function handleSubmit(data) {
    console.log(skill);
    console.log('data', data);
    /*   if (!skill) {
      await api.post(`/characters`, data);
    } else {
      await api.patch(`/characters/${character.id}/skills/${skill.id}`, data);
    } */

    await api.patch(`/characters/${character.id}/skills/${skill.id}`, data);
  }

  return (
    <Form initialData={skill} onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Ability</Label>
        <Input
          name="ability"
          readOnly
          className="form-control form-control-sm"
        />
      </FormGroup>
      <FormGroup>
        <Label>Name</Label>
        <Input name="name" className="form-control form-control-sm" />
      </FormGroup>
      <FormGroup>
        <Label>Proficient</Label>
        <Check name="proficient" className="form-control form-control-sm" />
      </FormGroup>

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
