import './App.css'
import ActionBar from './components/ActionBar'
import BrandingPanel from './components/BrandingPanel'
import ContactFormSection from './components/ContactFormSection'
import InvoiceMetaForm from './components/InvoiceMetaForm'
import InvoicePreview from './components/InvoicePreview'
import ItemsSection from './components/ItemsSection'
import SavedInvoicesPanel from './components/SavedInvoicesPanel'
import TaxAndSharePanel from './components/TaxAndSharePanel'
import TotalsCard from './components/TotalsCard'
import useInvoiceBuilder from './hooks/useInvoiceBuilder'
import useInvoicePdf from './hooks/useInvoicePdf'

function App() {
  const {
    history,
    invoice,
    status,
    totals,
    addItem,
    handleDeleteInvoice,
    handleLoadInvoice,
    handleNewInvoice,
    handleSaveInvoice,
    handleShareLink,
    removeItem,
    setStatus,
    updateField,
    updateItem,
    updateRootField,
  } = useInvoiceBuilder()
  const { downloadInvoicePdf, isExporting, previewRef } = useInvoicePdf()

  return (
    <div className="page-shell" style={{ '--brand-accent': invoice.brand.accentColor }}>
      <section className="hero-panel">
        <div>
          <p className="eyebrow">GST Invoice Builder</p>
          <h1>Create, save, export, and reuse invoices from one screen.</h1>
          <p className="hero-copy">
            Save invoices locally, manage GST with CGST, SGST, or IGST, export a branded PDF, and still share the current invoice with a one-click link.
          </p>
        </div>
        <ActionBar
          isExporting={isExporting}
          onDownloadPdf={() => downloadInvoicePdf(invoice, setStatus)}
          onShareLink={handleShareLink}
          onSaveInvoice={handleSaveInvoice}
          onNewInvoice={handleNewInvoice}
        />
        {status ? <p className="status-banner">{status}</p> : null}
      </section>

      <main className="workspace">
        <section className="editor-panel">
          <SavedInvoicesPanel
            history={history}
            currency={invoice.currency}
            onLoadInvoice={handleLoadInvoice}
            onDeleteInvoice={handleDeleteInvoice}
          />
          <InvoiceMetaForm invoice={invoice} onUpdateRootField={updateRootField} />

          <div className="grid two-up">
            <BrandingPanel brand={invoice.brand} onUpdateField={updateField} />
            <TotalsCard totals={totals} currency={invoice.currency} gstType={invoice.gstType} />
          </div>

          <div className="grid two-up stacked-sections">
            <ContactFormSection title="Seller Details" sectionKey="seller" values={invoice.seller} onUpdateField={updateField} />
            <ContactFormSection title="Buyer Details" sectionKey="buyer" values={invoice.buyer} onUpdateField={updateField} />
          </div>

          <ItemsSection
            items={invoice.items}
            onAddItem={addItem}
            onUpdateItem={updateItem}
            onRemoveItem={removeItem}
          />
          <TaxAndSharePanel invoice={invoice} onUpdateRootField={updateRootField} />
        </section>
        <InvoicePreview invoice={invoice} totals={totals} previewRef={previewRef} />
      </main>
    </div>
  )
}

export default App
