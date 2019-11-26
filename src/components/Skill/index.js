import React from 'react';
import { Button, Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Select } from '@rocketseat/unform';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switcher from '~/components/Switcher';
import api from '~/services/api';
import CustomInput from '../CustomInput';

export default function Skill({ character, skill, loadData }) {
  async function handleSubmit(data) {
    const skills = { skill: { ...data, character_id: character.id } };

    if (skill.id) {
      await api.patch(`/characters/${character.id}/skills/${skill.id}`, data);
    } else {
      await api.post(`/characters/${character.id}/skills`, skills);
    }
    loadData();
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
        <Label>Name</Label>
        <CustomInput name="name" />
      </FormGroup>
      <FormGroup>
        <Label>Ability</Label>
        <Select
          name="ability"
          options={abilities}
          className="form-control form-control-sm"
        />
      </FormGroup>
      <FormGroup>
        <Label>Proficient</Label>
        <Switcher name="proficient" />
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
