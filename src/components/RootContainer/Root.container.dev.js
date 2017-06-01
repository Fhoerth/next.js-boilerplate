import React from 'react'
import propTypes from 'prop-types'

import DevTools from './DevTools/DevTools.container'

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
      <container>
        { this.state.isMounted && <DevTools />}
        { this.props.children }
      </container>
    )
  }
}

export default RootContainer
