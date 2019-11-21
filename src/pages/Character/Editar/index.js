import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { Form } from '@rocketseat/unform';

import api from '~/services/api';

export default function EditarCharacter({ match: { params } }) {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

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

    setLoading(false);
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

  if (loading) return <div>loading...</div>;
  return (
    <Form onSubmit={handleSubmit} initialData={character}>
      <Input name="ementa" />

      <button type="submit">Salvar</button>
    </Form>
  );
}
