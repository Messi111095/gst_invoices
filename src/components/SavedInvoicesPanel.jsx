import { formatCurrency } from '../lib/invoice'

function SavedInvoicesPanel({ history, currency, onLoadInvoice, onDeleteInvoice }) {
  return (
    <div className="section-card">
      <div className="items-header">
        <div>
          <h2>Saved Invoices</h2>
          <p>Your last 12 saved invoices stay in this browser.</p>
        </div>
      </div>
      <div className="history-list">
        {history.length ? history.map((entry) => (
          <article key={entry.id} className="history-item">
            <div>
              <strong>{entry.title}</strong>
              <p>{entry.buyer}</p>
              <p>{new Date(entry.savedAt).toLocaleString('en-IN')}</p>
            </div>
            <div className="history-meta">
              <strong>{formatCurrency(entry.total, currency)}</strong>
              <div className="history-actions">
                <button type="button" className="secondary history-button" onClick={() => onLoadInvoice(entry)}>Load</button>
                <button type="button" className="ghost history-button" onClick={() => onDeleteInvoice(entry.id)}>Delete</button>
              </div>
            </div>
          </article>
        )) : <p className="empty-state">No saved invoices yet. Save one to build your history.</p>}
      </div>
    </div>
  )
}

export default SavedInvoicesPanel
