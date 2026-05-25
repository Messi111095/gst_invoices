import { useRef, useState } from 'react'

function useInvoicePdf() {
  const previewRef = useRef(null)
  const [isExporting, setIsExporting] = useState(false)

  async function downloadInvoicePdf(invoice, setStatus) {
    if (!previewRef.current) return

    setIsExporting(true)
    setStatus('Generating PDF...')

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#f6f1e8',
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10
      const contentWidth = pageWidth - margin * 2
      const contentHeight = (canvas.height * contentWidth) / canvas.width

      pdf.setFillColor(246, 241, 232)
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight)
      pdf.save(`${invoice.invoiceNumber || 'invoice'}.pdf`)
      setStatus('PDF downloaded successfully.')
    } catch {
      setStatus('PDF export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return {
    downloadInvoicePdf,
    isExporting,
    previewRef,
  }
}

export default useInvoicePdf
