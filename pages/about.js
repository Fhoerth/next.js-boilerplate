import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import RootContainer from 'components/RootContainer'
import { nextConnect } from 'services/store/initStore'
import { fetchTitle } from 'modules/helloWorld/helloWorld.sagas'

const Maintitle = styled.h1`
  font-size: 2em;
  color: darkred;
  text-align: center;
`

const Info = styled.span`
  background: darkorange;
  display: block;
  padding: 10px;
`

const Subtitle = styled.h2`
  font-size: 1.7em;
  text-align: center;
  border-bottom: 1px solid violet;
  padding-bottom: .4em;
  color: darkviolet;
`

const Paragraph = styled.span`
  color: darkviolet;
  display: block;
  font-size: 1.4em;
  margin-top: 20px;
`

class IndexComponent extends React.Component {
  static async getInitialProps ({ store, req }) {
    await store.runSaga(fetchTitle, true)
    return {
      title: store.getState().helloWorld.title,
      isServer: typeof req !== 'undefined'
    }
  }

  static propTypes () {
    return {
      title: PropTypes.string,
      isServer: PropTypes.boolean
    }
  }

  render () {
    return (
      <RootContainer {...this.props}>
        <Maintitle>
        { this.props.title } <br/> About
        </Maintitle>
        <Info>You requested from { this.props.isServer ? 'server' : 'client' }</Info>
        <Subtitle>Dolor sit amet</Subtitle>
        <Paragraph>
          Nulla malesuada est in mauris porta pulvinar. Nunc finibus congue purus, vel maximus ante euismod sed.
          unc ultrices justo non ipsum finibus, a vulputate ipsum fringilla.
          Duis tincidunt eget orci sit amet pulvinar. Nunc gravida pretium turpis, nec imperdiet turpis auctor vitae.
          Maecenas mi lectus, ornare eu felis eget, pellentesque sagittis risus. Sed vel scelerisque risus. Quisque viverra faucibus augue,
          a iaculis turpis commodo sit amet.
        </Paragraph>
      </RootContainer>
    )
  }
}

export default nextConnect((state) => state)(IndexComponent)
