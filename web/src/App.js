import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import { Container, Row, Image, Col } from 'react-bootstrap';
import { Container, Row, Col, Image } from 'react-bootstrap';

import TableData from './components/TableData';
import ChartData from './components/ChartData';

import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import check from './assets/images/resources/check.gif';
import loadingred from './assets/images/resources/loadingred.gif';
//import loading from './assets/images/resources/cargando2.gif';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

function App() {
  const [listClimatizacion, setListClimatizacion] = useState([]),
    [dataForChart, setDataForChart] = useState([]),
    [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getListClimatizacion = async () => {
      const result = await axios.get(process.env.REACT_APP_URL + 'climatizacion/climatizaciones/all').catch((e) => {
        console.log(e.message);
      });

      if (result != null && result.data.length > 0) {
        setListClimatizacion(result.data);
        setCargando(false);
      }
    }
    getListClimatizacion();

    const getListForChart = async () => {
      const result = await axios.get(process.env.REACT_APP_URL + 'climatizacion/climatizaciones-chart/all');
      const data = result.data;

      if (data != null && data.length > 0) {
        let datacenter = [];
        const hora = data.map(arg => arg.hora).filter((value, index, self) => self.indexOf(value) === index);

        for (let index = 0; index < 6; index++) {
          const arg = data[index].datacenter;
          datacenter.push(arg);
        }

        var chart = {
          datacenter: datacenter,
          hora: hora,
          climatizacion: data,
        };

        setDataForChart(chart);
      }
    }
    getListForChart();

    //60000 = 1min - se debe refrescar cada minuto en produccion
    setInterval(() => {
      //window.location.reload();    
      setCargando(true);
      getListClimatizacion();
      getListForChart();
    }, 60000);
  }, []);

  var today = new Date();
  //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const chartView = () => {
    return listClimatizacion.length > 0 && dataForChart.climatizacion != null ? (
      <ChartData
        dataForChart={dataForChart}
      />
    ) : (<></>)
  }

  return (
    <div className="App">
      <Container fluid className="d-flex justify-content-center align-items-center m-2">
        <Row className="d-flex justify-content-center m-2" style={{
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
          width: '100%',
          maxWidth: '1400px'
        }}>
          {listClimatizacion.length > 0 &&
            <TableData
              listClimatizacion={listClimatizacion}
            />
          }
          <Col xs={2}>
            <p className='text-muted'><b>Versión: {process.env.REACT_APP_VERSION}</b></p>
          </Col>
          {cargando ?
            (
              <Col xs={10} className='d-flex justify-content-end align-items-center'>
                <Image src={loadingred} width="50px" />
              </Col>
              /*
              <Col xs={10} className='text-end'>
                <p className="text-danger m-0" style={{
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>Actualizando Información...</p>
              </Col>*/
            ) : (
              <Col xs={10} className='d-flex justify-content-end align-items-center'>
                <Image src={check} width="50px" className='mx-4' /> <p className="text-primary m-0" style={{
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>{today.toLocaleString('es-CO')}</p>
              </Col>
              
              /*
              <Col xs={10} className='text-end'>
                <p className="text-primary m-0" style={{
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>Información Actualizada {today.toLocaleString('es-CO')}</p>
              </Col>*/
              /*
              <Col xs={12} className='text-end'>
                <p className="text-primary m-0" style={{
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}>Información Actualizada {today.toLocaleString('es-CO', {  hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              </Col>
              */
            )
          }
          {chartView()}

          {/*listClimatizacion.length === 0 ?
            (
              <Col sm={'auto'}>
                <Image className='mt-5' src={loading} alt='Cargando...' />
              </Col>
            ) : (
              <TableData
                listClimatizacion={listClimatizacion}
              />
            )            
            */}
          {/*chartView()*/}
        </Row>
      </Container>
    </div>
  );
}

export default App;