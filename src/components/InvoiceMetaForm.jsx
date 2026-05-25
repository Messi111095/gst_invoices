function InvoiceMetaForm({ invoice, onUpdateRootField }) {
  return (
    <div className="grid two-up">
      <label>
        <span>Invoice Number</span>
        <input value={invoice.invoiceNumber} onChange={(event) => onUpdateRootField('invoiceNumber', event.target.value)} />
      </label>
      <label>
        <span>Place of Supply</span>
        <input value={invoice.placeOfSupply} onChange={(event) => onUpdateRootField('placeOfSupply', event.target.value)} />
      </label>
      <label>
        <span>Invoice Date</span>
        <input type="date" value={invoice.invoiceDate} onChange={(event) => onUpdateRootField('invoiceDate', event.target.value)} />
      </label>
      <label>
        <span>Due Date</span>
        <input type="date" value={invoice.dueDate} onChange={(event) => onUpdateRootField('dueDate', event.target.value)} />
      </label>
    </div>
  )
}

export default InvoiceMetaForm
