import { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import { makeStyles } from '@material-ui/core/styles'

import {
  startLocationFetchByPlaceName,
  getLocationByPlaceName,
} from '../../store/location/action'
import {
  startWeatherFetch,
  getWeatherByCoords,
} from '../../store/weather/action'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function SearchPage(props) {
  const [userInput, setUserInput] = useState('')
  const classes = useStyles()
  const {
    // Action Creators
    startLocationFetchByPlaceName,
    getLocationByPlaceName,
    startWeatherFetch,
    getWeatherByCoords,
    // State
    urlSlug,
    latitude,
    longitude,
    noWeatherData,
  } = props

  const submitHandler = async event => {
    event.preventDefault()
    startLocationFetchByPlaceName()
    await getLocationByPlaceName(userInput)
  }

  useEffect(() => {
    if (latitude && longitude) {
      startWeatherFetch()
      getWeatherByCoords([latitude, longitude])
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (!noWeatherData) {
      Router.push('/home/[location]', `/home/${urlSlug}`)
    }
  }, [noWeatherData])

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}>
        <Grid item xs={12} md={8} lg={6}>
          <form onSubmit={submitHandler}>
            <FormControl
              fullWidth
              className={classes.margin}
              variant='outlined'>
              <OutlinedInput
                id='outlined-adornment-amount'
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                startAdornment={
                  <InputAdornment position='start'>
                    <SearchIcon color='disabled' />
                  </InputAdornment>
                }
              />
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    startLocationFetchByPlaceName: bindActionCreators(
      startLocationFetchByPlaceName,
      dispatch
    ),
    getLocationByPlaceName: bindActionCreators(
      getLocationByPlaceName,
      dispatch
    ),
    startWeatherFetch: bindActionCreators(startWeatherFetch, dispatch),
    getWeatherByCoords: bindActionCreators(getWeatherByCoords, dispatch),
  }
}
function mapStateToProps({ location, weather }) {
  const { urlSlug, latitude, longitude } = location
  const { noWeatherData } = weather
  return { urlSlug, latitude, longitude, noWeatherData }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
