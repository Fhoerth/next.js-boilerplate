import React from 'react'
import propTypes from 'prop-types'

import DevTools from './DevTools/DevTools.container'
import Layout from '../Layout/Layout.component'

class RootContainer extends React.Component {
  static propTypes () {
    return {
      children: propTypes.object
    }
  }

  static getInitialProps () {
    console.log('Ok')
  }

  constructor (props) {
    super(props)

    this.state = {
      isMounted: false
    }
  }

  componentDidMount () {
    this.setState({
      isMounted: true
    })
  }

  render () {
    return (
      <Layout>
        { this.state.isMounted && <DevTools />}
        { this.props.children }
      </Layout>
    )
  }
}

export default RootContainer
