import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api"
})

// para decirle a react que en todas las llamadas envíe el token hacemos lo siguiente:
service.interceptors.request.use((req) => {

  const token = localStorage.getItem("authToken")

  // si el token existe, anádelo al request/llamada
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }

  return req

})

export default service