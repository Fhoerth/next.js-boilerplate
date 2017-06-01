import React from 'react'
import propTypes from 'prop-types'

class RootContainer extends React.Component {
  static propTypes () {
    return {
      children: propTypes.object
    }
  }

  render () {
    return (
      <container>
        { this.props.children }
      </container>
    )
  }
}

export default RootContainer
