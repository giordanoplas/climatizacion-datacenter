import React, { Component } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class ChartData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showHide: false,
            headerForModal: "",
            dataIndexForModal: -1
        }
    }

    handleModalShowHide(header = null, index = null) {
        if (header == null) {
            this.setState({ showHide: !this.state.showHide });
        } else {            
            this.setState({
                showHide: !this.state.showHide,
                headerForModal: header,
                dataIndexForModal: index
            });
        }
    }

    data = (dataChart) => {
        var args = dataChart.datacenter.map((arg, index) => {
            return ({
                labels: dataChart.hora,
                datasets: [
                    {
                        type: 'line',
                        label: 'Temperatura (°C)',
                        borderColor: 'rgba(255, 46, 0)',
                        borderWidth: 3,
                        fill: true,
                        data: dataChart.climatizacion.filter(fil => fil.datacenter_id === (index + 1)).map(arg => arg.temperatura),
                        yAxisID: 'y'
                    },
                    {
                        type: 'line',
                        label: 'Humedad (%)',
                        borderColor: 'rgb(0, 152, 223)',
                        borderWidth: 3,
                        fill: true,
                        data: dataChart.climatizacion.filter(fil => fil.datacenter_id === (index + 1)).map(arg => arg.humedad),
                        yAxisID: 'y1'
                    }
                ]
            })
        });

        return args;
    }

    options = {
        indexAxis: 'x',
        plugins: {
            datalabels: {
                display: true,
                color: "black",
                align: "center",
                anchor: "end",
                font: {
                    weight: 'bold',
                    size: 14
                },/*
                formatter: (value, context) => {
                    let valueInt = parseInt(value);

                    if (context.dataset.label === "Humedad") {
                        //return img;
                        return value ? valueInt + '%' : value;
                    } else {
                        return value ? valueInt + ' °C' : value;
                    }
                }*/
            },
            legend: {
                labels: {
                    color: 'blue',
                    font: {
                        weight: 'bold',
                        size: 20
                    }
                }
            }
        },
        responsive: true,
        scales: {
            y: {
                ticks: {
                    //beginAtZero: true,
                    //color: 'black',
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                },
                display: true,
                position: 'right'
            },
            y1: {
                ticks: {
                    //color: 'black',
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                },
                display: true,
                position: 'left'
            },
            x: {
                ticks: {
                    //beginAtZero: true,
                    //color: 'black',
                    font: {
                        weight: 'bold',
                        size: 12
                    }
                }
            }
        },
    };

    render() {
        var dataChart = this.props.dataForChart;

        return (
            <React.Fragment>
                {dataChart.datacenter.map((arg, index) => {
                    return (
                        <Col md={5} xs={12} key={index} className="text-center my-2 mx-2" style={{
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
                        }}>
                            <>
                                <Button variant="outline-primary" size="lg" onClick={() => this.handleModalShowHide(arg, index)}>
                                    <b>{arg}</b>
                                </Button>
                                <Chart
                                    data={this.data(dataChart)[index]}
                                    plugins={[ChartDataLabels]}
                                    options={this.options}
                                />
                            </>
                        </Col>
                    )
                })}
                <Col sm={12} className="d-flex justify-content-center align-items-center">
                    <Modal show={this.state.showHide} dialogClassName="my-modal">
                        <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                            <Modal.Title className="text-success" style={{
                                fontSize: 35
                            }}>
                                <b>{this.state.headerForModal}</b>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Chart
                                data={this.data(dataChart)[this.state.dataIndexForModal]}
                                plugins={[ChartDataLabels]}
                                options={this.options}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </React.Fragment>
        )
    }
}

export default ChartData;