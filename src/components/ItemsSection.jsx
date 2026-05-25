function ItemsSection({ items, onAddItem, onUpdateItem, onRemoveItem }) {
  return (
    <div className="section-card">
      <div className="items-header">
        <div>
          <h2>Invoice Items</h2>
          <p>Add line items and GST for each service or product.</p>
        </div>
        <button type="button" className="secondary" onClick={onAddItem}>Add Item</button>
      </div>

      <div className="item-list">
        {items.map((item, index) => (
          <div className="item-row" key={`${item.description}-${index}`}>
            <label>
              <span>Description</span>
              <input value={item.description} onChange={(event) => onUpdateItem(index, 'description', event.target.value)} />
            </label>
            <label>
              <span>HSN/SAC</span>
              <input value={item.hsn} onChange={(event) => onUpdateItem(index, 'hsn', event.target.value)} />
            </label>
            <label>
              <span>Qty</span>
              <input type="number" min="0" value={item.quantity} onChange={(event) => onUpdateItem(index, 'quantity', Number(event.target.value))} />
            </label>
            <label>
              <span>Rate</span>
              <input type="number" min="0" value={item.rate} onChange={(event) => onUpdateItem(index, 'rate', Number(event.target.value))} />
            </label>
            <label>
              <span>GST %</span>
              <input type="number" min="0" value={item.gstRate} onChange={(event) => onUpdateItem(index, 'gstRate', Number(event.target.value))} />
            </label>
            <button type="button" className="ghost" onClick={() => onRemoveItem(index)} disabled={items.length === 1}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemsSection
