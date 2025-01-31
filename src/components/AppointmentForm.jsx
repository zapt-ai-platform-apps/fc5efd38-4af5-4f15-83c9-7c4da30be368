export default function AppointmentForm({ formData, loading, clients, onSubmit, onFieldChange }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Nuovo Appuntamento</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titolo</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-md box-border"
            value={formData.title}
            onChange={(e) => onFieldChange('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
          <textarea
            className="w-full p-2 border rounded-md box-border"
            value={formData.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Ora</label>
          <input
            type="datetime-local"
            required
            className="w-full p-2 border rounded-md box-border"
            value={formData.datetime}
            onChange={(e) => onFieldChange('datetime', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <select
            required
            className="w-full p-2 border rounded-md box-border"
            value={formData.clientId}
            onChange={(e) => onFieldChange('clientId', e.target.value)}
          >
            <option value="">Seleziona cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Salvataggio...' : 'Aggiungi Appuntamento'}
        </button>
      </div>
    </form>
  );
}