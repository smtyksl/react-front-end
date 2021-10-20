import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from '@themesberg/react-bootstrap';
const axios = require('axios');


export default () => {
    const [data, setData] = useState([])
    const [ad, setAd] = useState(null)
    const [doktordata, setDoktorData] = useState([])
    const [doktorid, setDoktorId] = useState(null)
    const [hastanedata, setHastaneData] = useState([])
    const [hastaneid, setHastaneId] = useState(null)
    const fetchData = async () => {

        axios.post('/api/get-doktor-hastane')
            .then(function (response) {

                if (response.data.status === "success") {
                    setData(response.data.doktorhastanes)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.post('/api/get-doktor')
            .then(function (response) {

                if (response.data.status === "success") {
                    setDoktorData(response.data.doktors)
                    setDoktorId(response.data.doktors[0].id)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.post('/api/get-hastane')
            .then(function (response) {

                if (response.data.status === "success") {
                    setHastaneData(response.data.hastanes)
                    setHastaneId(response.data.hastanes[0].id)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData()
    }, []);


    const submitForm = () => {

        axios.post('/api/add-doktor-hastane', { doktorid, hastaneid })
            .then(function (response) {
                if (response.data.status === "success") {
                    fetchData()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const adOnChange = (e) => {
        setAd(e.target.value)
    }
    const selectedDoktorItem = (e) => {
        console.log(e)
        setDoktorId(e.target.value)

    }
    const selectedHastaneItem = (e) => {
        console.log(e.target.value)
        setHastaneId(e.target.value)

    }

    return (
        <div>
            <Button onClick={submitForm}> DoktorHastane Ekle</Button>
            <Form>
                <Form.Group>
                    <Form.Label>Hastane Adı</Form.Label>
                    <Form.Control as="textarea" onChange={adOnChange} placeholder="Hastane Adı" />
                </Form.Group>
            </Form>
            <Form>
                <Form.Group id="frameworks" className="mb-3" onChange={selectedDoktorItem} placeholder="" >
                    <Form.Label>Doktor Seç</Form.Label>
                    <Form.Select value={doktorid}>
                        {doktordata.map(m =>
                        (
                            <option value={m.id}>{m.ad}</option>
                        ))}
                    </Form.Select>

                </Form.Group>
                <Form.Group id="frameworks" className="mb-3" onChange={selectedHastaneItem} placeholder="" >
                    <Form.Label>Hastane Seç</Form.Label>
                    <Form.Select value={hastaneid}>
                        {hastanedata.map(m =>
                        (
                            <option value={m.id}>{m.ad}</option>
                        ))}
                    </Form.Select>

                </Form.Group>

            </Form>
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">Hastane Id</th>
                        <th className="border-0">Doktor Id</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(m =>
                    (
                        <tr key={m.id}>
                            <td className="border-0">
                                {m.hastaneid}
                            </td>
                            <td className="border-0 fw-bold">{m.doktorid}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>

        </div>

    )
}
