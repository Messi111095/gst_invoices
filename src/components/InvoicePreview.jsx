import { formatCurrency } from '../lib/invoice'

function InvoicePreview({ invoice, totals, previewRef }) {
  return (
    <aside className="preview-panel">
      <div className="preview-sheet branded-sheet" ref={previewRef}>
        <div className="brand-ribbon">
          <div>
            <p className="eyebrow light">Branded Tax Invoice</p>
            <h2>{invoice.seller.businessName}</h2>
            <p>{invoice.brand.tagline}</p>
          </div>
          <div className="invoice-chip">
            <span>Invoice</span>
            <strong>{invoice.invoiceNumber}</strong>
          </div>
        </div>

        <div className="invoice-head">
          <div>
            <h3>Seller</h3>
            <p>{invoice.seller.ownerName}</p>
            <p>{invoice.seller.address}</p>
            <p>{invoice.seller.email}</p>
            <p>{invoice.seller.phone}</p>
            <p>GSTIN: {invoice.seller.gstin}</p>
          </div>
          <div className="head-meta">
            <h3>Invoice Meta</h3>
            <p><strong>Date:</strong> {invoice.invoiceDate}</p>
            <p><strong>Due:</strong> {invoice.dueDate}</p>
            <p><strong>Supply:</strong> {invoice.placeOfSupply}</p>
            <p><strong>Tax Mode:</strong> {invoice.gstType === 'intrastate' ? 'CGST + SGST' : 'IGST'}</p>
          </div>
        </div>

        <div className="party-grid">
          <div className="party-card">
            <h3>Bill To</h3>
            <p>{invoice.buyer.businessName}</p>
            <p>{invoice.buyer.contactName}</p>
            <p>{invoice.buyer.address}</p>
            <p>{invoice.buyer.email}</p>
            <p>{invoice.buyer.phone}</p>
            <p>GSTIN: {invoice.buyer.gstin}</p>
          </div>
          <div className="party-card accent-card">
            <h3>Payment</h3>
            <p>{invoice.bankDetails}</p>
            <h3>Notes</h3>
            <p>{invoice.notes}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>GST</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => {
              const amount = Number(item.quantity || 0) * Number(item.rate || 0)
              return (
                <tr key={`${item.description}-${index}-preview`}>
                  <td>{item.description || 'Untitled item'}</td>
                  <td>{item.hsn || '--'}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(Number(item.rate || 0), invoice.currency)}</td>
                  <td>{item.gstRate}%</td>
                  <td>{formatCurrency(amount, invoice.currency)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="summary-grid summary-grid-tight">
          <div className="summary-note">
            <h3>Prepared For</h3>
            <p>{invoice.buyer.businessName}</p>
            <p>{invoice.brand.tagline}</p>
          </div>
          <div className="summary-box">
            <div className="summary-line"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal, invoice.currency)}</strong></div>
            {invoice.gstType === 'intrastate' ? (
              <>
                <div className="summary-line"><span>CGST</span><strong>{formatCurrency(totals.cgst, invoice.currency)}</strong></div>
                <div className="summary-line"><span>SGST</span><strong>{formatCurrency(totals.sgst, invoice.currency)}</strong></div>
              </>
            ) : (
              <div className="summary-line"><span>IGST</span><strong>{formatCurrency(totals.igst, invoice.currency)}</strong></div>
            )}
            <div className="summary-line total"><span>Total</span><strong>{formatCurrency(totals.grandTotal, invoice.currency)}</strong></div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default InvoicePreview
