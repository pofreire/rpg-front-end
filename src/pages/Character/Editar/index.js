import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

export default function EditarCharacter({ match: { params } }) {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        const response = await api.get(`characters/${params.id}`);

        const data = response.data;

        setCharacter({
          ...data,
        });
      }
      /*  const resposeSkills = await api.get(`skills`);
      setDocentes(
        responseSkills.data.map(({ id, nome }) => ({
          id,
          title: nome,
        }))
      ); */
    }
    loadData();
  }, []);

  async function handleSubmit() {
    const data = {
      ...character /* ,
      skill: {
        id: parseInt(skill),
        nome: skill.find(d => s.id === parseInt(skill)).title,
      }, */,
    };

    if (character.id) {
      await api.patch(`characters/${params.id}`, data);
    } else {
      await api.post(`characters`, data);
    }
  }

  return (
    <Form onSubmit={handleSubmit} initialData={character}>
      <Input name="ementa" />

      <button type="submit">Salvar</button>
    </Form>
  );
}
