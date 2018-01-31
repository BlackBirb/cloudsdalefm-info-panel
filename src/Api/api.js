import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post("/api/verify", { credentials }).then(res => res.data.user)
    },
    player: { // remove IP
        nowPlaying: () => 
            axios.get("http://188.116.8.133/api/data/playing").then(res => res.data)
    }
}