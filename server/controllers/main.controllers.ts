import axios from 'axios'
import { Request, Response } from 'express'

export const fetchData = async (req: Request, res: Response) => {
  try {
    // Make a GET request to the API
    const response = await axios.get(
      'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923',
    )

    // Send the API response as the HTTP response
    // console.log(response.data)
    res.status(200).json(response.data.fullInteractionTypeGroup)
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while fetching data from the API' })
  }
}

export default { fetchData }
