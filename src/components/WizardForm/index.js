import React, { useState, useMemo } from 'react';
import CharacterSheet from '../CharacterSheet';
import Skill from '../Skill';
import { Button, Col, Row } from 'reactstrap';

export default function WizardForm({ character, loadData, toggle, modal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const finalStep = useMemo(
    () =>
      character && character.skills ? character.skills.length + 1 : currentStep,
    [character]
  );
  const steps = [, 'Character sheet', 'Skills'];

  function _next() {
    setCurrentStep(currentStep >= finalStep ? finalStep - 1 : currentStep + 1);
  }

  function _prev() {
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
  }

  /*
   * the functions for our button
   */
  function previousButton() {
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary btn-sm mt-1"
          type="button"
          onClick={_prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  function nextButton() {
    if (currentStep < finalStep) {
      return (
        <button
          className="btn btn-primary float-right btn-sm mt-1"
          type="button"
          onClick={_next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  return (
    <>
      <Row className="align-baseline-center">
        <Col>
          <p>{steps[currentStep]} </p>
        </Col>
        <Col className="text-right">
          <Button color="outline-secondary" size="sm">
            + Add skill
          </Button>
        </Col>
      </Row>
      {currentStep === 1 && (
        <CharacterSheet
          character={character}
          loadData={loadData}
          toggle={toggle}
        />
      )}

      {currentStep > 1 &&
        character &&
        character.skills &&
        character.skills.map(skill => (
          <Skill key={skill.id} skill={skill} currentStep={currentStep} />
        ))}
      {previousButton()}
      {nextButton()}
    </>
  );
}
