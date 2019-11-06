import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';

export default function CharacterSheet({ character }) {
  return (
    <Form initialData={character}>
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
    </Form>
  );
}
