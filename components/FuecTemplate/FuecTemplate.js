import React from 'react'
import { Page/* , Text */, View, Document, Image } from '@react-pdf/renderer'
import Mintransporte from '../../public/Images/Mintransporte.svg'
import Logo from '../../public/icon-512x512.png'
import PropTypes from 'prop-types'
export default function FuecTemplate ({ data }) {
  return (
    <Document>
      <Page size='A4' style={{}}>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '200px'
          }}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%'
            }}>
              <Image src={Mintransporte} />
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%'
            }}>
              <Image src={Logo} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
FuecTemplate.propTypes = {
  data: PropTypes.object
}
