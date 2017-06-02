import React from 'react'
import propTypes from 'prop-types'

import Layout from '../Layout/Layout.component'

class RootContainer extends React.Component {
  static propTypes () {
    return {
      children: propTypes.object
    }
  }

  render () {
    return (
      <Layout>
        { this.props.children }
      </Layout>
    )
  }
}

export default RootContainer
