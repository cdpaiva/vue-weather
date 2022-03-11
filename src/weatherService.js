import service from "./service"

const apiKey = "6591c384ed91f3bdafb834bc7542e47a"

export default {
    get(query,unit){
        return service.get(`?q=${query}&units=${unit}&appid=${apiKey}`)
    }
}