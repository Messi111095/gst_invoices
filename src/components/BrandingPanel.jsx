function BrandingPanel({ brand, onUpdateField }) {
  return (
    <div className="section-card">
      <h2>Branding</h2>
      <label>
        <span>Accent Color</span>
        <input type="color" value={brand.accentColor} onChange={(event) => onUpdateField('brand', 'accentColor', event.target.value)} />
      </label>
      <label>
        <span>Tagline</span>
        <input value={brand.tagline} onChange={(event) => onUpdateField('brand', 'tagline', event.target.value)} />
      </label>
    </div>
  )
}

export default BrandingPanel
