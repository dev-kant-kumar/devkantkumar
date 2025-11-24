import React from 'react'
import SEOHead from '../components/SEO/SEOHead'

const NotFound = () => {
  return (
    <div>
      <SEOHead title="404 Not Found" description="Page not found" noindex={true} />
      No such page found. Go to home page.
    </div>
  )
}

export default NotFound
