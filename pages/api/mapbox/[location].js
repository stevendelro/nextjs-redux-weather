import axios from 'axios'

export default async (req, res) => {
  const location = req.query.location
  const baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  const urlComplete = `${baseUrl}/${encodeURIComponent(location)}.json?limit=1&access_token=${process.env.MAPBOX_KEY}`

  try {
    const response = await axios.get(urlComplete)
    const long = response.data.features[0].center[0]
    const lat = response.data.features[0].center[1]
    const placeName = response.data.features[0].place_name

    res.status(200).json({
      latitude: lat,
      longitude: long,
      placeName,
    })
  } catch (e) {
    console.error(e)
    res.status(e.status || 400).json({ message: 'Api error' })
  }
}
