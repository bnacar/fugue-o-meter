import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './table.css'
import Table from './Table.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Table />
  </StrictMode>,
)
