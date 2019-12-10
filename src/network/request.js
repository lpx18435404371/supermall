import axios from 'axios'

export function request(config){

    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      //timeout: 10000
    });
    //响应拦截
    // instance.interceptors.response.use(res =>{
    //   // console.log(config);
    //   // return res.data
    // },err =>{
    //   console.log(err)
    // })

    return instance(config)
}

export function http(config){

  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/',
    //timeout: 8000
  });
 
  return instance(config)
}

// export function request(config){

//   return new Promise((resolve,rejects)=>{
//     const instance = axios.create({
//       baseURL: 'http://106.54.54.237:8000/api/v1/home/data',
//       timeout: 5000
//     })
  
//     instance(config).then(res =>{
//       console.log(res);
//       resolve(res)
//     })
//     .catch(err =>{
//       console.log(err);
//       rejects(err)
//     })
//   })
  
// }



// export function request(config,success,failure){
//   const instance = axios.create({
//     baseURL: 'http://106.54.54.237:8000/api/v1/home/data',
//     timeout: 5000
//   })

//   instance(config).then(res =>{
//     console.log(res);
//     success(res)
//   }).catch(err =>{
//     console.log(err);
//     failure(err)
//   })
// }

