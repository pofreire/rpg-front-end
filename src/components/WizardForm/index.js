import React, { useState, useMemo } from 'react';
import CharacterSheet from '../CharacterSheet';
import Skill from '../Skill';

export default function WizardForm({ character }) {
  const [currentStep, setCurrentStep] = useState(1);
  const finalStep = useMemo(
    () =>
      character && character.skills ? character.skills.length + 1 : currentStep,
    [character]
  );
  if (!character) {
    return <div>...</div>;
  }
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
        <button className="btn btn-secondary" type="button" onClick={_prev}>
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
          className="btn btn-primary float-right"
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
      <p>{steps[currentStep]} </p>
      {currentStep === 1 && <CharacterSheet character={character} />}

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
