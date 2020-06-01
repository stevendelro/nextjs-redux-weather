import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import serveIcon from '../../public/icons/index'

const useStyles = makeStyles({
  iconBox: {
    width: '155px',
  },
})

export default function CurrentTemp({ weather }) {
  const classes = useStyles()
  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Typography align='center' component='h2' variant='h6' color='primary'>
        {weather.currently.today}
      </Typography>
      <Box className={classes.iconBox}>
        {serveIcon(weather.currently.icon)}
      </Box>
      <Typography align='center' component='p' variant='h2'>
        {Number(weather.currently.temperature).toFixed(0)}°F
      </Typography>
      <Typography align='center' color='textSecondary' gutterBottom>
        {weather.hourly.summary}
      </Typography>
    </Grid>
  )
}

function mapStateToProps({ weather }) {
  return { weather }
}
export default connect(mapStateToProps, null)(Index)