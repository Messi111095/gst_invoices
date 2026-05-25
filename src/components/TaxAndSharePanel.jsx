function TaxAndSharePanel({ invoice, onUpdateRootField }) {
  return (
    <div className="grid two-up">
      <div className="section-card">
        <h2>Tax Configuration</h2>
        <label>
          <span>GST Type</span>
          <select value={invoice.gstType} onChange={(event) => onUpdateRootField('gstType', event.target.value)}>
            <option value="intrastate">CGST + SGST</option>
            <option value="interstate">IGST</option>
          </select>
        </label>
        <label>
          <span>Bank Details</span>
          <textarea rows="3" value={invoice.bankDetails} onChange={(event) => onUpdateRootField('bankDetails', event.target.value)} />
        </label>
        <label>
          <span>Notes</span>
          <textarea rows="4" value={invoice.notes} onChange={(event) => onUpdateRootField('notes', event.target.value)} />
        </label>
      </div>
      <div className="section-card">
        <h2>Share and Reuse</h2>
        <p className="section-copy">Saved invoices are stored in local browser history. Shared links still embed the invoice in the URL, so they work without a backend.</p>
        <p className="section-copy">When you want true cross-device sharing, the next step is adding a real backend with persistent invoice IDs.</p>
      </div>
    </div>
  )
}

export default TaxAndSharePanel
