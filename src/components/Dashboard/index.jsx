import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import AppointmentList from '../AppointmentList';
import ClientList from '../ClientList';
import AddAppointment from '../AddAppointment';
import AddClient from '../AddClient';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        const { data: apps } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
          .order('datetime', { ascending: true });

        const { data: cls } = await supabase
          .from('clients')
          .select('*')
          .eq('user_id', user.id);

        setAppointments(apps || []);
        setClients(cls || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Appuntamenti</h2>
              <Link to="/add-appointment" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Nuovo Appuntamento
              </Link>
            </div>
            <AppointmentList appointments={appointments} loading={loading} />
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Clienti</h2>
              <Link to="/add-client" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Nuovo Cliente
              </Link>
            </div>
            <ClientList clients={clients} loading={loading} />
          </section>
        </div>
        
        <div className="space-y-8">
          <AddAppointment clients={clients} onAdd={(app) => setAppointments([...appointments, app])} />
          <AddClient onAdd={(client) => setClients([...clients, client])} />
        </div>
      </div>
    </div>
  );
}