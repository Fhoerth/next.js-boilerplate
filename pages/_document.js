'use strict'
import 'babel-polyfill'
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'
import ss from 'styles/global.scss'

class MyDocument extends Document {
  static getInitialProps ({ req }) {
    return {}
  }

  render () {
    if (process.env.NODE_ENV === 'development') {
      return (
        <html>
          <Head>
            <style dangerouslySetInnerHTML={{ __html: ss }} />
            <title>Fashioncook</title>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      )
    } else {
      const sheet = new ServerStyleSheet()
      const main = sheet.collectStyles(<Main />)
      const styleTags = sheet.getStyleElement()
      return (
        <html>
          <Head>
            <style dangerouslySetInnerHTML={{ __html: ss }} />
            <title>Fashioncook</title>
            {styleTags}
          </Head>
          <body>
            {main}
            <NextScript />
          </body>
        </html>
      )
    }
  }
}

MyDocument.getInitialProps = function (ctx) {
  // const isServer = ctx.req === true ? true : false
  const props = Document.getInitialProps(ctx)
  props.nextStyle = flush()

  return props
}

export default MyDocument
