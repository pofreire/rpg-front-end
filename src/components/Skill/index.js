import React from 'react';
import { Button, Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Input, Check, Select } from '@rocketseat/unform';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '~/services/api';

export default function Skill({ character, loadData, skill }) {
  async function handleSubmit(data) {
    const skills = { skill: { ...data, character_id: character.id } };

    if (skill.id) {
      await api.patch(`/characters/${character.id}/skills/${skill.id}`, data);
    } else {
      await api.post(`/characters/${character.id}/skills`, skills);
    }
  }

  const abilities = [
    { id: 'strength', title: 'Strength' },
    { id: 'dexterity', title: 'Dexterity' },
    { id: 'constitution', title: 'Constitution' },
    { id: 'intelligence', title: 'Intelligence' },
    { id: 'wisdom', title: 'Wisdom' },
    { id: 'charisma', title: 'Charisma' },
  ];

  return (
    <Form initialData={skill} onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Ability</Label>
        <Select
          name="ability"
          className="form-control form-control-sm"
          options={abilities}
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
