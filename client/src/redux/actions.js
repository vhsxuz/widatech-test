export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = data => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = error => ({
  type: FETCH_DATA_FAILURE,
  payload: error
});

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    fetch('http://localhost:8000/api/v1/transactions')
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .catch(error => dispatch(fetchDataFailure(error.message)));
  };
};

export const fetchDataById = (id) => {
  console.log(id)
  return dispatch => {
    dispatch(fetchDataRequest());
    fetch(`http://localhost:8000/api/v1/transactions/${id}`)
    .then(response => response.json())
    .then(data => dispatch(fetchDataSuccess(data)))
    .catch(error => dispatch(fetchDataFailure(error.message)));
  };
};

export const addData = (newData) => {
  return dispatch => {
    dispatch(fetchDataRequest());
    fetch('http://localhost:8000/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
     .then(response => response.json())
     .then(data => dispatch(fetchDataSuccess(data)))
     .catch(error => dispatch(fetchDataFailure(error.message)));
  };
};

export const fetchRevenue = () => {
  return dispatch => {
    dispatch(fetchDataRequest());
    fetch('http://localhost:8000/api/v1/revenue')
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .catch(error => dispatch(fetchDataFailure(error.message)));
  };
};
