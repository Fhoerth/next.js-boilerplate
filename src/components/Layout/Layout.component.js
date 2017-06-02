import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Footer = styled.div`
  background: lightgray;
  margin-top: 50px;
  text-align: center;
  padding: 25px;
`

export default ({ children, title = 'This is the default title' }) => (
  <div>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about'><a>About</a></Link> |
        <Link href='/contact'><a>Contact</a></Link>
      </nav>
    </header>

    { children }

    <Footer>
      I am here to stay
    </Footer>
  </div>
)
