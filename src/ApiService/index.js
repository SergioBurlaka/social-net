import axios from 'axios';

const LOCAL_HOST =  'http://localhost:8080';


class ApiService {

    // getUsers() {
    //     return axios.get(USER_API_BASE_URL);
    // }

    // getUserById(userId) {
    //     return axios.get(USER_API_BASE_URL + userId);
    // }

    // deleteUser(userId) {
    //     return axios.delete(USER_API_BASE_URL + userId);
    // }

    // addUser(user) {
    //     return axios.post(""+USER_API_BASE_URL, user);
    // }

/////////////////////////////////////////////////

    seedUsers() {
        return axios.put(LOCAL_HOST + "/seed-users", {
            name: 'Seed User',
            password: "seed pasword"
        });
    }

    getUsers() {
        return axios.get(LOCAL_HOST + "/users");
    }



    getPong() {
        return axios.get(LOCAL_HOST + "/ping", {
            params:{
                login: 'Sergio',
                password: 123
            }
        });
    }

    login(loginToCheck) {
        return axios.get(LOCAL_HOST + "/users-login", {
            params: loginToCheck
        });
    }

    deleteAllUser() {
        return axios.delete(LOCAL_HOST + "/users");
    }


    ///////////////////////////

    addFriendRequestOut(info) {
        return axios.put(LOCAL_HOST + "/users-add-friend-req-out", info);
    }

    cancelFrinedRequestOut(info) {
        return axios.put(LOCAL_HOST + "/users-cancel-friend-req-out", info);
    }

    cancelFrinedRequestIn(info) {
        return axios.put(LOCAL_HOST + "/users-cancel-friend-req-in", info);
    }

    addFriend(info) {
        return axios.put(LOCAL_HOST + "/users-add-friend", info);
    }

    removeFriend(info) {
        return axios.put(LOCAL_HOST + "/users-rempve-friend", info);
    }


}

export default new ApiService();