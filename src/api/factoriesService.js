import axios from "axios";

export default {
    find (uuid) {
        return axios.get(`/factories/users/${uuid}/details`);
    },

    store (data) {
        return axios.post(`/factories/register`, data);
    },

    factoriesByDistrict (factoryName) {
        return axios.get(`/factories/${factoryName}`);
    },

    factoriesOfDo () {
        return axios.get(`/docreatedfactories`);
    }
};
