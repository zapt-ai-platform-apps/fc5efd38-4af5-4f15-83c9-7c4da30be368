import React from 'react';
import { format } from 'date-fns';

export default function AppointmentList({ appointments, loading }) {
  if (loading) return <div className="text-center py-4">Caricamento appuntamenti...</div>;
  if (appointments.length === 0) return <div className="text-center py-4">Nessun appuntamento registrato</div>;

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{appointment.title}</h3>
              <p className="text-sm text-gray-600">{appointment.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600">
                {format(new Date(appointment.datetime), 'dd/MM/yyyy HH:mm')}
              </p>
              <p className="text-sm text-gray-500">{appointment.clientName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}