import React, { useState, useEffect } from 'react';
import './gates.css';
import axios from 'axios';

const Gates = () => {
    const [gates, setGates] = useState(new Map());
    const [loaded, setLoaded] = useState(false);

    const getAllGates = async () => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/gate',
        });

        let gates = await API.get('/getAllGates');
        gates = gates.data.data.gates;
        let map = new Map();
        for (let i = 0; i < gates.length; i++) {
            map.set(gates[i].name, {
                active: gates[i].active,
                id: gates[i]._id,
            });
        }
        setGates(map);
        setLoaded(true);
    };

    const toggleState = async (id) => {
        const API = axios.create({
            baseURL: 'http://localhost:5001/api/v1/gate',
        });

        const res = await API.post(`/toggleEnable/${id}`);
        getAllGates();
    };

    useEffect(() => {
        getAllGates();
    }, []);

    return (
        <div className="gates-container">
            <div className="gates-header">
                <div className="gates-header-sub">
                    <div className="box box-green"></div>
                    Open
                </div>
                <div className="gates-header-sub">
                    <div className="box box-red"></div>
                    Closed for maintainence
                </div>
            </div>
            <div className="instr">
                [Double click on the gate number to toggle state]
            </div>
            <div className="gates-info-cont">
                <div className="gates-info">
                    <div className="terminal-name">Terminal A</div>
                    <div className="grid-boxes">
                        {[...new Array(32).keys()].map((el) => {
                            return loaded == false ||
                                gates.get('A' + (el + 1))?.active ? (
                                <div
                                    className="box box-green box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('A' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            ) : (
                                <div
                                    className="box box-red box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('A' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="gates-info">
                    <div className="terminal-name">Terminal B</div>
                    <div className="grid-boxes">
                        {[...new Array(32).keys()].map((el) => {
                            return loaded == false ||
                                gates.get('B' + (el + 1))?.active ? (
                                <div
                                    className="box box-green box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('B' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            ) : (
                                <div
                                    className="box box-red box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('B' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="gates-info">
                    <div className="terminal-name">Terminal C</div>
                    <div className="grid-boxes">
                        {[...new Array(32).keys()].map((el) => {
                            return loaded == false ||
                                gates.get('C' + (el + 1))?.active ? (
                                <div
                                    className="box box-green box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('C' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            ) : (
                                <div
                                    className="box box-red box-large"
                                    key={el}
                                    onDoubleClick={() =>
                                        toggleState(
                                            gates.get('C' + (el + 1))?.id
                                        )
                                    }
                                >
                                    {el + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gates;
