import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import swal from 'sweetalert';
import Header from '~/components/Header';
import WizardForm from '~/components/WizardForm';

import { Container } from './styles';

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState([]);
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

  useEffect(() => {
    async function loadData() {
      const response = await api.get('characters');

      setCharacters(response.data);
    }
    loadData();
  }, []);

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
      <Header>adasd</Header>

      <Table responsive>
        <thead>
          <tr>
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
          {characters.map(character => (
            <tr key={character.id}>
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
