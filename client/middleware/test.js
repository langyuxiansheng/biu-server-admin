import axios from 'axios';

export default function({ route }) {
    // console.log(`test`, route);
    console.log(axios);
    return route;
    /*   return axios.post('http://my-stats-api.com', {
          url: route.fullPath
      }); */
};