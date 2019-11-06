import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Container } from './styles';

export default function Dashboard() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('characters');

      setCharacters(response.data);
    }
    loadData();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>life</th>
            <th>strength</th>
            <th>dexterity</th>
            <th>constitution</th>
            <th>intelligence</th>
            <th>wisdom</th>
            <th>charisma</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id}>
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.life}</td>
              <td>{character.strength}</td>
              <td>{character.dexterity}</td>
              <td>{character.constitution}</td>
              <td>{character.intelligence}</td>
              <td>{character.wisdom}</td>
              <td>{character.charisma}</td>
              <td>
                <Link to={`/characters/${character.id}`}>editar</Link>
              </td>
              <td>remover</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
