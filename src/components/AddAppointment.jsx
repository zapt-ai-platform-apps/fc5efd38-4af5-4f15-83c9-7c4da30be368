import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import AppointmentForm from './AppointmentForm';

export default function AddAppointment({ clients, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    datetime: '',
    clientId: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('appointments')
        .insert([{ 
          ...formData,
          user_id: user.id,
          datetime: new Date(formData.datetime).toISOString()
        }])
        .select();

      if (error) throw error;
      onAdd(data[0]);
      setFormData({ title: '', description: '', datetime: '', clientId: '' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentForm
      formData={formData}
      loading={loading}
      clients={clients}
      onSubmit={handleSubmit}
      onFieldChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
    />
  );
}