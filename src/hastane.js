import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from '@themesberg/react-bootstrap';
const axios = require('axios');

export default () => {
    const [data, setData] = useState([])
    const [ad, setAd] = useState(null)

    const fetchData = async () => {
        axios.post('/api/get-hastane')
            .then(function (response) {

                if (response.data.status === "success") {
                    setData(response.data.hastanes)
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
        if (!ad) {
            //error
        }
        axios.post('/api/add-hastane', { ad: ad })
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

    return (
        <div>
            <Button onClick={submitForm}> Hastane Ekle</Button>
            <Form>
                <Form.Group>
                    <Form.Label>Hastane Adı</Form.Label>
                    <Form.Control as="textarea" onChange={adOnChange} placeholder="Hastane Adı" />
                </Form.Group>
            </Form>
            <Table>
                <thead className="thead-light">
                    <tr>
                        <th className="border-0">id</th>
                        <th className="border-0">Ad</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(m =>
                    (
                        <tr key={m.id}>
                            <td className="border-0">
                                {m.id}
                            </td>
                            <td className="border-0 fw-bold">{m.ad}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}
