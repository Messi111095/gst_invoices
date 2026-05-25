import { useEffect, useMemo, useState } from 'react'
import {
  STORAGE_PARAM,
  calculateTotals,
  createEmptyItem,
  createHistoryEntry,
  decodeInvoice,
  defaultInvoice,
  encodeInvoice,
  mergeInvoice,
  readHistory,
  writeHistory,
} from '../lib/invoice'

function useInvoiceBuilder() {
  const params = new URLSearchParams(window.location.search)
  const sharedInvoice = decodeInvoice(params.get(STORAGE_PARAM))
  const [invoice, setInvoice] = useState(() => mergeInvoice(defaultInvoice, sharedInvoice))
  const [status, setStatus] = useState('')
  const [history, setHistory] = useState(() => readHistory())

  useEffect(() => {
    if (sharedInvoice) {
      setStatus('Loaded invoice data from shared link.')
    }
  }, [sharedInvoice])

  const totals = useMemo(() => calculateTotals(invoice), [invoice])

  function updateField(section, field, value) {
    setInvoice((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  function updateRootField(field, value) {
    setInvoice((current) => ({ ...current, [field]: value }))
  }

  function updateItem(index, field, value) {
    setInvoice((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item),
    }))
  }

  function addItem() {
    setInvoice((current) => ({ ...current, items: [...current.items, createEmptyItem()] }))
  }

  function removeItem(index) {
    setInvoice((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  function handleSaveInvoice() {
    const nextHistory = [createHistoryEntry(invoice), ...history].slice(0, 12)
    setHistory(nextHistory)
    writeHistory(nextHistory)
    setStatus('Invoice saved to local history.')
  }

  function handleLoadInvoice(entry) {
    setInvoice(mergeInvoice(defaultInvoice, entry.invoice))
    setStatus(`Loaded saved invoice ${entry.title}.`)
  }

  function handleDeleteInvoice(entryId) {
    const nextHistory = history.filter((entry) => entry.id !== entryId)
    setHistory(nextHistory)
    writeHistory(nextHistory)
    setStatus('Saved invoice removed from history.')
  }

  function handleNewInvoice() {
    setInvoice(structuredClone(defaultInvoice))
    setStatus('Started a fresh invoice.')
  }

  async function handleShareLink() {
    const shareUrl = new URL(window.location.href)
    shareUrl.searchParams.set(STORAGE_PARAM, encodeInvoice(invoice))

    try {
      await navigator.clipboard.writeText(shareUrl.toString())
      setStatus('Shareable invoice link copied to clipboard.')
    } catch {
      window.prompt('Copy this invoice link', shareUrl.toString())
      setStatus('Shareable invoice link is ready.')
    }
  }

  return {
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
  }
}

export default useInvoiceBuilder
