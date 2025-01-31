import React from 'react';

export default function ClientList({ clients, loading }) {
  if (loading) return <div className="text-center py-4">Caricamento clienti...</div>;
  if (clients.length === 0) return <div className="text-center py-4">Nessun cliente registrato</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {clients.map((client) => (
        <div key={client.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-900">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.email}</p>
          <p className="text-sm text-gray-600 mt-1">{client.phone}</p>
        </div>
      ))}
    </div>
  );
}