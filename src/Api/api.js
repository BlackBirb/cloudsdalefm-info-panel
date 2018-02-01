import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post("/api/verify", { credentials }).then(res => res.data.user),
        getConnectDetails: (token) =>
            axios.get("/api/admin/connectiondetails", { headers: {'Authorization': token} }).then(res => res.data)
    },
    player: { // remove IP
        nowPlaying: () => 
            axios.get("http://188.116.8.133/api/data/playing").then(res => res.data),
        like: song => 
            axios.post("http://188.116.8.133/api/like", {data: "here, i guess", title: song}).then(res => res.data)
    }
}