import { Request, Response } from "express"

export const requestRide = (req: Request, res: Response) => {
  // create ride 
  // find/match driver service called
  res.send("Request Ride endpoint")
}

export const getRide = (req: Request, res: Response) => {
  res.send("Get Ride endpoint")
}

export const editRide = (req: Request, res: Response) => {
  res.send("Edit Ride details endpoint")
}

export const getUserRides = (req: Request, res: Response) => {
  res.send("Get user rides")
}

export const getDriverRides = (req: Request, res: Response) => {
  res.send("Get driver rides")
}

export const getRideStatus = (req: Request, res: Response) => {
  res.send("Get ride status")
}

export default { requestRide, getRide, editRide, getUserRides, getDriverRides, getRideStatus };