export const requestRide = (req, res) => {
  // find/match driver service called
  res.send("Request Ride endpoint")
}

export const getRide = (req, res) => {
  res.send("Get Ride endpoint")
}

export const editRide = (req, res) => {
  res.send("Edit Ride details endpoint")
}

export const getUserRides = (req, res) => {
  res.send("Get user rides")
}

export const getDriverRides = (req, res) => {
  res.send("Get driver rides")
}

export const getRideStatus = (req, res) => {
  res.send("Get ride status")
}

export default { requestRide, getRide, editRide, getUserRides, getDriverRides, getRideStatus };