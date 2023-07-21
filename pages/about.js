
import React from 'react'
import Header from '@/components/shared/Header'
import BaseLayout from '@/components/layouts/BaseLayout'

// functional component - arrow function
const About = () => {
  const message = 'Hello World'
  return (
    
    <h1>Hello About Page - {message}</h1>
  )
}


export default About