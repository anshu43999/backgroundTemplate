import https from '@/utils/axios'  //引入我们二次封装的axios.js文件


// a. post请求，参数是json类型的
        
          const PASSWORDUPDARE = '/account/accountUpdate';  //请求的地址
          export const passwordUpdate = function (params) { 
                return https(PASSWORDUPDARE, params, "post");  
          };

// b.post请求，参数是字符串类型

           const PASSWORDUPDARE = "/account/accountUpdate";  //请求的地址
           export const passwordUpdate = function (params) {
                return https(PASSWORDUPDARE , params, "post", "from");
            };
// c.get请求
           const PASSWORDUPDARE = "/account/accountUpdate";  //请求的地址
           export const passwordUpdate = function (params) {
                return https(PASSWORDUPDARE , params);
            };
