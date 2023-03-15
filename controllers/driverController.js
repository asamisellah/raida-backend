export const createDriver = (req, res) => {
  // Capture vehicle info
  res.send("Create Driver")
}

export const getDriver = (req, res) => {
  res.send("Get Driver")
}

export const editDriver = (req, res) => {
  res.send("Edit driver details")
}

export const setDriverStatus = (req, res) => {
  // status in payload and map to an emum
  // Depending on status being set:
  // If available/standby, switch on GPS streaming and add to drivers queue
  // If in ride, GPS streaming is still on and remove from queue 
  // If unavailable, switch off GPS streaming and remove from drivers queue
  res.send("Set driver status")
}

export default { createDriver, getDriver, editDriver, setDriverStatus };