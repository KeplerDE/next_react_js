import axios from 'axios';

import { useState, useCallback } from 'react'; 

// Выносим запрос в отдельную функцию 
async function createPortfolioRequest(data) {
  return axios.post('/api/v1/portfolios', data);
}

export function useCreatePortfolio() {

  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false  
  });

  // Оборачиваем в useCallback, чтобы не создавать новую функцию при rerender
  const createPortfolioHandler = useCallback(async (...data) => {

    setReqState({error: null, data: null, loading: true});

    try {
      const response = await createPortfolioRequest(...data);

      setReqState({error: null, data: response.data, loading: false});

    } catch (error) {
    
      const message = error.response?.data?.message || 'Something went wrong'; 

      setReqState({error: message, data: null, loading: false});
    }

  }, []); // Зависимости не нужны, т.к. используем request функцию

  return [createPortfolioHandler, {...reqState}];

}