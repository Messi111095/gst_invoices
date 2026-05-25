export const STORAGE_PARAM = 'invoice'
export const HISTORY_STORAGE_KEY = 'gst-invoices-history'

export const createEmptyItem = () => ({
  description: '',
  hsn: '',
  quantity: 1,
  rate: 0,
  gstRate: 18,
})

export const defaultInvoice = {
  invoiceNumber: 'GST-1001',
  invoiceDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date().toISOString().slice(0, 10),
  currency: 'INR',
  placeOfSupply: 'West Bengal',
  brand: {
    accentColor: '#1d5c63',
    tagline: 'Creative services with compliant GST invoicing',
  },
  seller: {
    businessName: 'Acme Studio Pvt. Ltd.',
    ownerName: 'Aarav Sen',
    gstin: '19ABCDE1234F1Z5',
    address: '12 Park Street, Kolkata, West Bengal 700016',
    email: 'billing@acmestudio.in',
    phone: '+91 98765 43210',
  },
  buyer: {
    businessName: 'Bright Retail LLP',
    contactName: 'Priya Kapoor',
    gstin: '27ABCDE1234F1Z5',
    address: '201 Linking Road, Mumbai, Maharashtra 400050',
    email: 'accounts@brightretail.in',
    phone: '+91 99887 66554',
  },
  gstType: 'intrastate',
  notes: 'Thank you for your business. Payment is due within 7 days.',
  bankDetails: 'Bank: HDFC Bank | A/C: 000123456789 | IFSC: HDFC0001234',
  items: [
    {
      description: 'Website redesign retainer',
      hsn: '9983',
      quantity: 1,
      rate: 15000,
      gstRate: 18,
    },
  ],
}

export function mergeInvoice(base, incoming) {
  if (!incoming) return structuredClone(base)

  return {
    ...base,
    ...incoming,
    brand: { ...base.brand, ...(incoming.brand ?? {}) },
    seller: { ...base.seller, ...(incoming.seller ?? {}) },
    buyer: { ...base.buyer, ...(incoming.buyer ?? {}) },
    items: Array.isArray(incoming.items) && incoming.items.length
      ? incoming.items.map((item) => ({ ...createEmptyItem(), ...item }))
      : base.items,
  }
}

export function encodeInvoice(invoice) {
  return encodeURIComponent(JSON.stringify(invoice))
}

export function decodeInvoice(value) {
  try {
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return null
  }
}

export function readHistory() {
  try {
    const saved = window.localStorage.getItem(HISTORY_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function writeHistory(history) {
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
}

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)
}

export function formatFieldLabel(field) {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())
}

export function createHistoryEntry(invoice) {
  return {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    title: invoice.invoiceNumber || 'Untitled invoice',
    buyer: invoice.buyer.businessName || invoice.buyer.contactName || 'No buyer',
    total: invoice.items.reduce((sum, item) => {
      const taxable = Number(item.quantity || 0) * Number(item.rate || 0)
      const tax = taxable * (Number(item.gstRate || 0) / 100)
      return sum + taxable + tax
    }, 0),
    invoice,
  }
}

export function calculateTotals(invoice) {
  const subtotal = invoice.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0)
  const taxTotal = invoice.items.reduce((sum, item) => {
    const taxableValue = Number(item.quantity || 0) * Number(item.rate || 0)
    return sum + taxableValue * (Number(item.gstRate || 0) / 100)
  }, 0)

  const cgst = invoice.gstType === 'intrastate' ? taxTotal / 2 : 0
  const sgst = invoice.gstType === 'intrastate' ? taxTotal / 2 : 0
  const igst = invoice.gstType === 'interstate' ? taxTotal : 0
  const grandTotal = subtotal + taxTotal

  return { subtotal, cgst, sgst, igst, grandTotal }
}
