import React from 'react'
import { Page, Text, View, Document, Image, Font } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

Font.register({
  family: 'Arial',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/arial@1.0.4/Arial.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/arial-bold@1.0.4/Arial Bold.ttf', fontWeight: 'bold' }
  ]
})
export default function FuecTemplate ({ name, service }) {
  return (
    <Document>
      <Page size='A4' style={{
        padding: '20px',
        fontFamily: 'Arial',
        fontSize: '12px'
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginTop: '-70px'
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
              width: '20%'
            }}>
              {/* <Image src="https://live.staticflickr.com/65535/52415774878_cda119f7bc_c.jpg" style={{ */}
              {/*  width: '100px', */}
              {/*  height: '100px' */}
              {/* }}/> */}
              <Image src={service.QR_code} style={{
                width: '100px',
                height: '100px'
              }}/>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30%'
            }}>
              <Image src="https://live.staticflickr.com/65535/52352853287_b76a7c159e.jpg" style={{
                width: '100px',
                height: '100px'
              }}/>
            </View>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginLeft: '50px',
            marginRight: '50px',
            marginTop: '-40px'
          }}>
            <Text style={{
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              FORMATO ÚNICO DE EXTRACTO DEL CONTRATO DEL SERVICIO PÚBLICO
              DE TRANSPORTE TERRESTRE AUTOMOTOR ESPECIAL
              No. 42500471420224191{service?.fuec_ID ? service?.fuec_ID : '0001'} {/* numero dinamico */}
            </Text>
          </View>
          <View style={{
            marginTop: '30px',
            width: '98%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            textAlign: 'flex-start',
            flexDirection: 'column'
          }}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'column'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                RAZÓN SOCIAL DE LA EMPRESA DE TRANSPORTE ESPECIAL:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px',
                marginTop: '5px'
              }}>
                RZGROUP S.A.S
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'row',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                NIT:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '30px'
              }}>
                901.279.534-8 {/* numero dinamico */}
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'row',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>CONTRATO No.: </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px'
              }}>
                4191 {/* numero dinamico */}
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'column',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                CONTRATANTE:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px',
                marginTop: '5px'
              }}>
                {service?.client?.companyAllied
                  ? service.client.companyAllied.name
                  : service?.ext_client.name
                    ? service.ext_client.name
                    : ''
                }
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'row',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                NIT/CC:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px'
              }}>
                {service?.client?.companyAllied
                  ? service.client.companyAllied.Id_number
                    ? service.client.companyAllied.Id_number
                    : ''
                  : service?.ext_client?.id_number ? service.ext_client.id_number : ''
                }
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'column',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                OBJETO CONTRATO:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px',
                marginTop: '5px'
              }}>
                4. CONTRATO PARA UN GRUPO ESPECÍFICO DE USUARIOS (TRANSPORTE DE PARTICULARES) {/* dinamico */}
              </Text>
            </View>

            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'row',
              marginTop: '50px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                ORIGEN-DESTINO:
              </Text>
              <Text style={{
                fontFamily: 'Arial',
                fontSize: '9px',
                marginLeft: '10px'
              }}>
                {service.from.toUpperCase()} - {service.to.toUpperCase() + ' ' + service.serviceType}
              </Text>
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'center',
              flexDirection: 'row',
              marginTop: '10px'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                CONVENIO DE COLABORACIÓN:
              </Text>
            </View>

            {/* TABLA */}
            <View style={{
              marginTop: '20px',
              width: '100%',
              height: '370px',
              /* backgroundColor: 'red', */
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              flexDirection: 'column'
            }}>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                VIGENCIA DEL CONTRATO
              </Text>
              <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                flexDirection: 'column',
                marginTop: '5px',
                border: '1px solid black',
                height: '50px'
              }}>
                <View style={{
                  margin: '1px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '50%'
                }}>
                  <View style={{
                    height: '100%',
                    margin: '1px',
                    border: '1px solid black',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      FECHA INICIAL
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      DIA
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[2].split('T')[0]}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      MES
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[1]}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      AÑO
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[0]}
                    </Text>
                  </View>
                </View>

                <View style={{
                  margin: '1px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '50%'
                }}>
                  <View style={{
                    height: '100%',
                    margin: '1px',
                    border: '1px solid black',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      FECHA VENCIMIENTO
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      DIA
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[2].split('T')[0]}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      MES
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[1] === '12' ? '01' : Number(service.start_date.split('-')[1]) + 1}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    width: '25%',
                    margin: '1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      AÑO
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.start_date.split('-')[0]}
                    </Text>
                  </View>
                </View>

              </View>
              <Text style={{
                fontSize: '10px',
                fontWeight: 'bold',
                marginTop: '5px'
              }}>
                CARACTERÍSTICAS DEL VEHÍCULO
              </Text>
              <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                flexDirection: 'column',
                marginTop: '5px',
                marginBottom: '5px',
                border: '1px solid black',
                height: '285px'
              }}>
                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '25px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      PLACA
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      MODELO
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      MARCA
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      CLASE
                    </Text>
                  </View>
                </View>

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '25px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].carPlate}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].year}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].brand}
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].type}
                    </Text>
                  </View>
                </View>

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '20px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      NUMERO INTERNO
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      NÚMERO TARJETA DE OPERACIÓN
                    </Text>
                  </View>
                </View>

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '20px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].numero_interno}
                    </Text>
                  </View>
                  <View style={{
                    borderTop: '0px',
                    border: '1px solid black',
                    margin: '1px',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      {service.vehicle[0].tarjeta_operacion}
                    </Text>
                  </View>
                </View>

                {/* datos del conductor */}

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '30px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      DATOS DEL
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      CONDUCTOR
                    </Text>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        NOMBRES Y APELLIDOS
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px',
                        marginBottom: '5px'
                      }}>
                        {name} {/* dinamico */}
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        No CÉDULA
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {service.driver[0].idNumber}
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        No LICENCIA CONDUCCIÓN
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {service.driver[0].nro_license}
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        VIGENCIA
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {service.driver[0].nro_license_ven.split('T')[0]}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* datos del Contratante */}

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '30px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      RESPONSABLE
                    </Text>
                    <Text style={{
                      fontFamily: 'Arial',
                      fontSize: '9px'
                    }}>
                      CONTRATANTE
                    </Text>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        NOMBRES Y APELLIDOS
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {
                          service?.client
                            ? (service?.client?.firstName + ' ' + service?.client?.lastName)
                            : service?.ext_client?.responsible_name
                              ? service?.ext_client?.responsible_name
                              : service?.ext_client?.name
                        }
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        No CÉDULA
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px',
                        marginBottom: '5px'
                      }}>
                        {
                          service?.client
                            ? service?.client?.idNumber
                            : service?.ext_client?.responsible_id
                              ? service?.ext_client?.responsible_id
                              : service?.ext_client?.id_number
                        }
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        TELEFONO
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {
                          service?.client
                            ? service?.client?.phoneNumber
                            : service?.ext_client?.responsible_phone
                              ? service?.ext_client?.responsible_phone
                              : service?.ext_client?.phone
                        }
                      </Text>
                    </View>
                  </View>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '25%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '5px'
                      }}>
                        DIRECCIÓN
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      marginBottom: '5px'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        {
                          service?.client?.companyAllied
                            ? service.client.companyAllied.address
                              ? service.client.companyAllied.address
                              : ''
                            : service?.ext_client?.address
                              ? service?.ext_client?.address
                              : ''
                        }
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Firma del contratante */}

                <View style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  textAlign: 'center',
                  flexDirection: 'row',
                  height: '120px',
                  margin: '1px'
                }}>
                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px',
                      flexDirection: 'row'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        Dirección:
                      </Text>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px',
                        marginLeft: '20px'
                      }}>
                        Carrera 18 # 93a - 04 of 206
                        Bogotá - Colombia
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px',
                      flexDirection: 'row'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        Teléfono:
                      </Text>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px',
                        marginLeft: '25px'
                      }}>
                        +57 311 590 4808
                      </Text>
                    </View>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'flex-start',
                      marginLeft: '2px',
                      flexDirection: 'row'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        Email:
                      </Text>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px',
                        marginLeft: '35px'
                      }}>
                        rzgroupsas@gmail.com
                      </Text>
                    </View>
                  </View>

                  <View style={{
                    border: '1px solid black',
                    margin: '1px',
                    width: '40%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    textAlign: 'center',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <View style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}>
                      <Text style={{
                        fontFamily: 'Arial',
                        fontSize: '9px'
                      }}>
                        Firma y Sello Gerente Empresa
                      </Text>
                    </View>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
FuecTemplate.propTypes = {
  service: PropTypes.object,
  name: PropTypes.string
}
