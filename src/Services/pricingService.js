import axios from 'axios';

const SERVICE_URL = 'http://localhost:8080/api';


const getTableData = () => {
    const url = `${SERVICE_URL}/getTableData`;
    return axios.get(url);
};

const getPenguinEarsPrice = (noOfUnits) => {
    const url = `${SERVICE_URL}/getPenguinEarsPrice/${noOfUnits}`;
    return axios.get(url);
};

const getHorseShoePrice = (noOfUnits) => {
    const url = `${SERVICE_URL}/getHorseShoresPrice/${noOfUnits}`;
    return axios.get(url);
};

export {
    getTableData,
    getPenguinEarsPrice,
    getHorseShoePrice,
};
