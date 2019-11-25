import React, { useState, useMemo } from 'react';
import CharacterSheet from '../CharacterSheet';
import Skill from '../Skill';
import { Button, Col, Row } from 'reactstrap';

export default function WizardForm({ character, loadData, toggle, modal }) {
  const [currentStep, setCurrentStep] = useState(1);
  const finalStep = useMemo(
    () =>
      character && character.skills ? character.skills.length + 1 : currentStep,
    [character, currentStep]
  );

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

  function handleClick() {
    if (!character.skills) {
      character.skills = [];
    }
    character.skills.push({});
    setCurrentStep(character.skills.length + 1);
    return <Skill />;
  }

  return (
    <>
      <Row className="align-baseline-center">
        <Col>
          <p>
            {currentStep === 1 ? 'Character sheet' : 'Skill'} {currentStep}
          </p>
        </Col>
        {character.id ? (
          <Col className="text-right">
            <Button color="outline-secondary" size="sm" onClick={handleClick}>
              + Add skill
            </Button>
          </Col>
        ) : (
          ''
        )}
      </Row>
      {currentStep === 1 && (
        <CharacterSheet
          character={character}
          loadData={loadData}
          toggle={toggle}
        />
      )}
      {currentStep > 1 &&
        character.skills &&
        character.skills.map((skill, index) => {
          if (index === currentStep - 2) {
            return (
              <Skill
                skill={skill}
                currentStep={currentStep}
                character={character}
              />
            );
          }
        })}

      {previousButton()}
      {nextButton()}
    </>
  );
}
