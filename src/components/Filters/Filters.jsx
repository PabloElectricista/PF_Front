import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Filters.css';

export default function Filters (props) {
    return(
        <Accordion className="accordion" defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtro #1</Accordion.Header>
                <Accordion.Body>
                Esta es la prueba para el filtro 1
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Filtro #2</Accordion.Header>
                <Accordion.Body>
                Esta es la prueba para el filtro 2
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Filtro #3</Accordion.Header>
                <Accordion.Body>
                Esta es la prueba para el filtro 3
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}