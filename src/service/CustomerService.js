
import axios from 'axios';

export class CustomerService {    
    getCustomersLarge() {
        return axios.get('data/customers-large.json')
                .then(res => res.data.data);
    }    
}
    