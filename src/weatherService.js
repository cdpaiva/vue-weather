import service from "./service"

const apiKey = process.env.VUE_APP_API_KEY

export default {
    get(query,unit){
        return service.get(`?q=${query}&units=${unit}&appid=${apiKey}`)
    }
}