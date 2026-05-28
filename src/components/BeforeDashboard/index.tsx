import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'
import './index.scss'

const BeforeDashboard: React.FC = () => {
  return (
    <div className="before-dashboard">
      <Banner className="before-dashboard__banner" type="success">
        <h4>Добредојдовте во Лабораториум!</h4>
      </Banner>
      <p>Use the sidebar to manage events, spaces, projects, makers, news, and pages.</p>
    </div>
  )
}

export default BeforeDashboard
