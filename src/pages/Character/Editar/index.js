import React, { useState, useEffect } from 'react';
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
    }
    loadData();

    setLoading(false);
  }, []);

  async function handleSubmit(data) {
    console.log(`params`, params);
    if (params.id) {
      await api.patch(`characters/${params.id}`, data);
    } else {
      await api.post(`characters`, data);
    }
  }

  if (loading) return <div>loading...</div>;
  return (
    <Form onSubmit={handleSubmit} initialData={character}>
      <button type="submit">Salvar</button>
    </Form>
  );
}
