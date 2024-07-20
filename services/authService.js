import http from "./httpService";

export function login(data){
    return http.post('/api/v1/login',data)
}
export function otp(data){
    return http.post('/api/v1/login',data)
}