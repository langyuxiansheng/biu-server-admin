import axios from 'axios';

export default function({ route }) {
    // console.log(`route`, route);
    console.log(`route`, axios);
    return route;
    /*   return axios.post('http://my-stats-api.com', {
          url: route.fullPath
      }); */
}