import { formatCurrency } from '../lib/invoice'

function TotalsCard({ totals, currency, gstType }) {
  return (
    <div className="section-card total-card">
      <h2>Invoice Totals</h2>
      <div className="total-row"><span>Subtotal</span><strong>{formatCurrency(totals.subtotal, currency)}</strong></div>
      {gstType === 'intrastate' ? (
        <>
          <div className="total-row"><span>CGST</span><strong>{formatCurrency(totals.cgst, currency)}</strong></div>
          <div className="total-row"><span>SGST</span><strong>{formatCurrency(totals.sgst, currency)}</strong></div>
        </>
      ) : (
        <div className="total-row"><span>IGST</span><strong>{formatCurrency(totals.igst, currency)}</strong></div>
      )}
      <div className="total-row grand"><span>Grand Total</span><strong>{formatCurrency(totals.grandTotal, currency)}</strong></div>
    </div>
  )
}

export default TotalsCard
