function ActionBar({
  isExporting,
  onDownloadPdf,
  onShareLink,
  onSaveInvoice,
  onNewInvoice,
}) {
  return (
    <div className="hero-actions">
      <button type="button" className="primary" onClick={onDownloadPdf} disabled={isExporting}>
        {isExporting ? 'Preparing PDF...' : 'Download PDF'}
      </button>
      <button type="button" className="secondary" onClick={onShareLink}>Share Invoice Link</button>
      <button type="button" className="secondary" onClick={onSaveInvoice}>Save Invoice</button>
      <button type="button" className="secondary" onClick={onNewInvoice}>New Invoice</button>
    </div>
  )
}

export default ActionBar
