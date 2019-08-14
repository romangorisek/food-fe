import axios from 'axios'
// import store from '@/store/store'
// import config from '../../config/config'

export default () => {
  return axios.create({
    // baseURL: config.baseUrl,
    baseURL: 'http://food-api.loc/api',
    headers: {
      // Authorization: `Bearer ${store.state.token}`
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mb29kLWFwaS5sb2NcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1NjU2OTAyMDgsImV4cCI6MTU2OTI5MDIwOCwibmJmIjoxNTY1NjkwMjA4LCJqdGkiOiJJU2JwTmt4ZFBLcEt2TjR3Iiwic3ViIjoiOGIxZGMzNDUtYmIxYS00MTViLWE5ZTgtY2Q1MDhiOTYwNjkwIiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.hVg9F6g4_p1uY2bkA2nvxQs1wsv6X0n1YExYh9gjWEw`
    }
  })
}