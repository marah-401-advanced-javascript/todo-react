const axios = require('axios').default;


function useAjax(url, method, item, id) {
  if (!id) {
    if (method === 'put' || method === 'delete') {
      return axios({
        method: `${method}`,
        url: `${url}`,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: item ? JSON.stringify(item) : {},
      });
    }
    else {
      if(method === 'get'){
        return axios({
          method: `${method}`,
          url: `${url}`,
          mode: 'cors',
        });
      }else{ 
        return axios({
          method: `${method}`,
          url: `${url}`,
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          data: item ? JSON.stringify(item) : {},
        });
      }
    }
  }

  
  else{
    return axios({
      method: `${method}`,
      url: `${url}`,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: item ? JSON.stringify(item) : {},
    });

  }

  // return [fetchedData];
}

export default useAjax;
