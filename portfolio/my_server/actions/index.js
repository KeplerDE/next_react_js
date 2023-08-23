
import { useState } from 'react';   

export const fetcher = (url) =>
  fetch(url).then(async res => {
    const result = await res.json();

    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });

export function useApiHandler(apiCall) {

  // Состояние для хранения данных и статуса запроса
  const [reqState, setReqState] = useState({ 
    error: null,
    data: null, 
    loading: false
  });

  // Обработчик запроса
  const handler = async (...data) => {

    // Устанавливаем загрузку перед запросом
    setReqState({error: null, data: null, loading: true});

    try {
      // Делаем запрос к API  
      const json = await apiCall(...data);

      // Если успешно - сохраняем данные    
      setReqState({error: null, data: json.data, loading: false});
      return json.data;
    } catch(e) {

      // Если ошибка - сохраняем сообщение    
      const message = (e.response && e.response.data) || 'Ooops, something went wrong...';
      
      setReqState({error: message, data: null, loading: false});
      return Promise.reject(message);
    }

  }

  // Возвращаем обработчик и состояние
  return [handler, {...reqState}]; 

}    