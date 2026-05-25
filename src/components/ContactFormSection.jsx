import { formatFieldLabel } from '../lib/invoice'

function ContactFormSection({ title, sectionKey, values, onUpdateField }) {
  return (
    <div className="section-card">
      <h2>{title}</h2>
      {Object.entries(values).map(([field, value]) => (
        <label key={field}>
          <span>{formatFieldLabel(field)}</span>
          <input value={value} onChange={(event) => onUpdateField(sectionKey, field, event.target.value)} />
        </label>
      ))}
    </div>
  )
}

export default ContactFormSection
