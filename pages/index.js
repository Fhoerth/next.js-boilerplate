import React from 'react'
import styled from 'styled-components'

import RootContainer from 'components/RootContainer'
import { nextConnect } from 'services/store/initStore'
import { fetchTitle } from 'modules/helloWorld/helloWorld.sagas'

const Maintitle = styled.h1`
  font-size: 2em;
  color: darkred;
  text-align: center;
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
  static async getInitialProps ({ store }) {
    await store.runSaga(fetchTitle, true)
    return {
      title: store.getState().helloWorld.title
    }
  }
  render () {
    return (
      <RootContainer {...this.props}>
        <Maintitle>
          { this.props.title }
        </Maintitle>
        <Subtitle>Lorem Ipsum</Subtitle>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit nibh non massa posuere, sed sodales nisi fringilla. Duis varius, dui at sodales accumsan, massa velit placerat lorem, sed cursus odio lectus quis neque. Ut vel tellus dolor. Cras ac tortor eu ligula mollis semper ac a orci. Vestibulum at mollis sapien. Duis dui quam, porta eget pharetra et, mollis nec est. Phasellus sollicitudin erat id felis commodo pellentesque. Quisque leo metus, dapibus vitae pellentesque ut, rhoncus non leo. Ut fringilla a sapien eget vehicula. Ut suscipit felis sed dui blandit, ut venenatis augue sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae
        </Paragraph>
      </RootContainer>
    )
  }
}

export default nextConnect((state) => state)(IndexComponent)
