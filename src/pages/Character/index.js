import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import {
  Table,
  Button,
  Col,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencilAlt,
  faTrash,
  faFistRaised,
  faRunning,
  faHeart,
  faBrain,
  faHatWizard,
  faChevronCircleUp,
} from '@fortawesome/pro-duotone-svg-icons';
import swal from 'sweetalert';
import Header from '~/components/Header';
import SearchForm from '~/components/SearchForm';
import WizardForm from '~/components/WizardForm';

import { Container } from './styles';

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState([]);
  const [toggleSkills, setToggleSkills] = useState([]);

  const { search } = useSelector(state => state.search);

  const [modal, setModal] = useState(false);
  const toggle = char => {
    setModal(!modal);
    if (char) {
      console.log(char);
      setCharacter(char);
    } else {
      setCharacter(undefined);
    }
  };

  const toggleSkill = index => {
    setToggleSkills(toggleSkills.map((s, i) => (i === index ? !s : false)));
  };

  useEffect(() => {
    console.warn(search);
    async function loadData() {
      const response = await api.get(`characters?name=${search}`);

      setCharacters(response.data);
      setToggleSkills(response.data.map(() => false));
    }
    loadData();
  }, [search]);

  async function handleRemoverCharacter(character) {
    const willDelete = await swal({
      title: 'Do you want to delete this character?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      await api.delete(`characters/${character.id}`);
      setCharacters(characters.filter(c => c.id !== character.id));
    }
  }

  return (
    <Container>
      <Header />
      <SearchForm></SearchForm>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Level</th>
            <th>Name</th>
            <th>Life</th>
            <th>Strength</th>
            <th>Dexterity</th>
            <th>Constitution</th>
            <th>Intelligence</th>
            <th>Wisdom</th>
            <th>Charisma</th>
            <th colSpan="2"> </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <>
              <tr key={character.id}>
                <td
                  onClick={() => toggleSkill(index)}
                  className={
                    toggleSkills[index] ? 'icon-rotate' : 'reset-rotate'
                  }
                >
                  <FontAwesomeIcon icon={faChevronCircleUp} size="lg" />
                </td>
                <td>{character.level}</td>
                <td>{character.name}</td>
                <td>{character.life}</td>
                <td>{character.strength}</td>
                <td>{character.dexterity}</td>
                <td>{character.constitution}</td>
                <td>{character.intelligence}</td>
                <td>{character.wisdom}</td>
                <td>{character.charisma}</td>
                <td>
                  <Button
                    color="outline-light"
                    size="sm"
                    onClick={() => toggle(character)}
                  >
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </Button>
                </td>
                <td>
                  <Button
                    color="outline-danger"
                    size="sm"
                    onClick={() => handleRemoverCharacter(character)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
              <tr
                className={
                  toggleSkills[index] ? 'visible-skill' : 'hidden-skill'
                }
              >
                <td colSpan="12" style={{ overflow: 'hidden' }}>
                  {character.skills.map(skill => (
                    <Media key={skill}>
                      {skill.ability === 'strength' ? (
                        <FontAwesomeIcon icon={faFistRaised} size="3x" />
                      ) : skill.ability === 'dexterity' ? (
                        <FontAwesomeIcon icon={faRunning} size="3x" />
                      ) : skill.ability === 'constitution' ? (
                        <FontAwesomeIcon icon={faHeart} size="3x" />
                      ) : skill.ability === 'intelligence' ? (
                        <FontAwesomeIcon icon={faBrain} size="3x" />
                      ) : skill.ability === 'wisdom' ? (
                        <FontAwesomeIcon icon={faHatWizard} size="3x" />
                      ) : skill.ability === 'charisma' ? (
                        <FontAwesomeIcon icon={faPencilAlt} size="3x" />
                      ) : (
                        ''
                      )}
                      <Media body>
                        <Media heading>{skill.name}</Media>
                        <Row>
                          <Col>
                            {skill.ability} <br />
                          </Col>
                          <Col>
                            {skill.proficient === true
                              ? 'Proficient'
                              : 'Non-Proficient'}
                          </Col>

                          <Col>score: 345</Col>
                        </Row>
                      </Media>
                    </Media>
                  ))}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit character</ModalHeader>
        <ModalBody>
          <WizardForm character={character} />
        </ModalBody>
      </Modal>
    </Container>
  );
}
