import React, { Component } from "react";
//import Moment from 'react-moment';
//import 'moment/locale/es';
import { Col, Table, Image } from "react-bootstrap";

import fire from '../assets/images/resources/fuego.gif';
import ice from '../assets/images/resources/hielo.gif';
import optimo from '../assets/images/resources/optimo.gif';
import warning from '../assets/images/resources/warning.gif';
import nube from '../assets/images/resources/nube.gif';
import viento from '../assets/images/resources/viento3.gif';

class TableData extends Component {

    listData = [];

    render() {
        this.listData = this.props.listClimatizacion;

        var dataTable = (data, color, indicador, type) => {
            switch (type) {
                case "Temperatura":
                    return (
                        <td style={{
                            background: color,
                            color: 'white'
                        }}><Image src={indicador} width="50px" /> {data + ' °C'} <Image src={indicador} width="50px" /></td>
                    );
                case "Humedad":
                    return (
                        <td style={{
                            background: color,
                            color: 'white'
                        }}><Image src={indicador} height={50} /> {data + '%'} <Image src={indicador} height={50} /></td>
                    );/*
                case "Fecha":
                    return (
                        <td style={{
                            background: 'black',
                            color: 'white'
                        }}><Moment locale='es' fromNow>{data}</Moment></td>
                    );*/
                case "error":
                    return (
                        <td style={{
                            background: color,
                            color: 'white'
                        }}>{data}</td>
                    );
                default:
                    return (
                        <td style={{
                            background: 'black',
                            color: 'white'
                        }}>{data}</td>
                    );
            }
        }
        return (
            <React.Fragment>
                {this.listData !== null && this.listData.length > 0 &&
                    <Col xs={12} className="mt-3">
                        <Table responsive bordered>
                            <thead>
                                <tr style={{
                                    fontSize: 40,
                                    color: "white",
                                    background: "darkblue"
                                }}>
                                    <th>Datacenter</th>
                                    <th>Temperatura</th>
                                    <th>Humedad</th>
                                    {/* <th>Tiempo</th> */}                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.listData.map(arg => {
                                    return (
                                        <tr key={arg.climatizacion_id} style={{
                                            fontSize: 40,
                                            fontWeight: 'bold'
                                        }}>
                                            {dataTable(arg.datacenter, null, null, null)}
                                            {arg.temperatura === 0 &&
                                                dataTable('Error', '#FE2E2E', fire, 'error')
                                            }
                                            {arg.humedad === 0 &&
                                                dataTable('Error', '#FE2E2E', nube, 'error')
                                            }

                                            {arg.temperatura > 28 &&
                                                dataTable(arg.temperatura, '#FF0000', fire, 'Temperatura')
                                            }
                                            {arg.temperatura > 25 && arg.temperatura <= 28 &&
                                                dataTable(arg.temperatura, '#DF7600', warning, 'Temperatura')
                                            }
                                            {arg.temperatura > 0 && arg.temperatura < 22 &&
                                                dataTable(arg.temperatura, '#2764EE', ice, 'Temperatura')
                                            }
                                            {arg.temperatura >= 22 && arg.temperatura <= 25 &&
                                                dataTable(arg.temperatura, '#009823', optimo, 'Temperatura')
                                            }

                                            {arg.humedad > 62 &&
                                                dataTable(arg.humedad, '#FF0000', nube, 'Humedad')
                                            }
                                            {arg.humedad > 59 && arg.humedad <= 62 &&
                                                dataTable(arg.humedad, '#DF7600', warning, 'Humedad')
                                            }
                                            {arg.humedad > 0 && arg.humedad < 41 &&
                                                dataTable(arg.humedad, '#2764EE', viento, 'Humedad')
                                            }
                                            {arg.humedad >= 41 && arg.humedad <= 59 &&
                                                dataTable(arg.humedad, '#009823', optimo, 'Humedad')
                                            }

                                            {/*dataTable(arg.fecha_hora, null, null, "Fecha")*/}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                }
            </React.Fragment>
        )
    }
}

export default TableData;