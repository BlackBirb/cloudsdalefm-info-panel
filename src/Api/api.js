import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post("/api/verify", { credentials }).then(res => res.data.user)
    }
}