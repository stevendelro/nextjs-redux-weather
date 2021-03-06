import axios from 'axios'

export const weatherActions = {
  START_WEATHER_FETCH: 'START_WEATHER_FETCH',
  WEATHER_FETCHED: 'WEATHER_FETCHED',
}

export const startWeatherFetch = () => dispatch => {
  dispatch({ type: weatherActions.START_WEATHER_FETCH })
}

export const getWeatherByCoords = coords => async dispatch => {
  startWeatherFetch()
  const res = await axios
    .get(`/api/darksky/${coords[0]}/${coords[1]}`)
    .then(({ data }) => {
      dispatch({
        type: weatherActions.WEATHER_FETCHED,
        payload: data,
      })
      return data
    })
    .catch(error => console.log('ERROR in getWeatherByCoords: ', error.message))
  if (res) {
    return res
  }
}
