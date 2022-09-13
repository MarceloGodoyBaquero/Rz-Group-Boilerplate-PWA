import React from 'react'
import { Page/* , Text */, View, Document, Image } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
export default function FuecTemplate ({ data }) {
  return (
    <Document>
      <Page size='A4' style={{
        padding: '20px',
        fontFamily: 'Helvetica',
        fontSize: '12px'

      }}>
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
              alignItems: 'flex-start',
              width: '50%'
            }}>
              <Image src="https://live.staticflickr.com/65535/52354221810_b4438511ba_h.jpg" style={{
                width: '300px',
                height: '50px'
              }}/>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%'
            }}>
              <Image src="https://live.staticflickr.com/65535/52352853287_b76a7c159e.jpg" style={{
                width: '100px',
                height: '100px'
              }}/>
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
