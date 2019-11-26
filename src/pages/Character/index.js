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
  faComment,
  faEye,
  faEyeSlash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import Header from '~/components/Header';
import SearchForm from '~/components/SearchForm';
import WizardForm from '~/components/WizardForm';
import { Container } from './styles';
import Footer from '~/components/Footer';

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState([]);
  const [toggleSkills, setToggleSkills] = useState([]);
  const { search } = useSelector(state => state.search);
  const [modal, setModal] = useState(false);

  const toggle = char => {
    setModal(!modal);
    if (char) {
      setCharacter(char);
    }
  };

  const toggleSkill = index => {
    setToggleSkills(toggleSkills.map((s, i) => (i === index ? !s : false)));
  };

  async function loadData() {
    const response = await api.get(`characters?name=${search}`);

    setCharacters(response.data);
    setToggleSkills(response.data.map(() => false));
  }
  useEffect(() => {
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

  async function handleRemoverSkill(character, skill) {
    const willDelete = await swal({
      title: 'Do you want to delete this skill?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      await api.delete(`characters/${character.id}/skills/${skill.id}`);
      loadData();
    }
  }

  return (
    <>
      <Container>
        <Header />
        <Row className="align-items-center search">
          <Col>
            <SearchForm></SearchForm>
          </Col>
          <Col className="text-right">
            <Button size="sm" color="outline-secondary" onClick={toggle}>
              + New Character
            </Button>
          </Col>
        </Row>
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
              <th>Proficient</th>
              <th colSpan="2"> </th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character, index) => (
              <>
                <tr key={character.id}>
                  <td onClick={() => toggleSkill(index)}>
                    <Button color="outline-light" size="sm">
                      {toggleSkills[index] ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
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
                  <td>{character.proficient}</td>
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
                  <td colSpan="13" style={{ overflow: 'hidden' }}>
                    {character.skills.length > 0 ? (
                      ''
                    ) : (
                      <div>without skill</div>
                    )}
                    {character.skills
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map(skill => (
                        <Media key={skill.id} className="pl-2">
                          {skill.ability === 'strength' ? (
                            <FontAwesomeIcon icon={faFistRaised} size="2x" />
                          ) : skill.ability === 'dexterity' ? (
                            <FontAwesomeIcon icon={faRunning} size="2x" />
                          ) : skill.ability === 'constitution' ? (
                            <FontAwesomeIcon icon={faHeart} size="2x" />
                          ) : skill.ability === 'intelligence' ? (
                            <FontAwesomeIcon icon={faBrain} size="2x" />
                          ) : skill.ability === 'wisdom' ? (
                            <FontAwesomeIcon icon={faHatWizard} size="2x" />
                          ) : skill.ability === 'charisma' ? (
                            <FontAwesomeIcon icon={faComment} size="2x" />
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
                              <Col>Value: {skill.score}</Col>
                            </Row>
                          </Media>

                          <Button
                            color="outline-danger"
                            size="sm"
                            onClick={() => handleRemoverSkill(character, skill)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </Button>
                        </Media>
                      ))}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {!character.id ? 'Create' : 'Edit'} character
          </ModalHeader>
          <ModalBody>
            <WizardForm
              character={character}
              loadData={loadData}
              toggle={toggle}
            />
          </ModalBody>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}
