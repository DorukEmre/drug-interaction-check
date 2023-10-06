import axios from 'axios'
import { fetchData } from '../../controllers/main.controllers.js'

jest.mock('axios')

let fullData = [
  {
    sourceDisclaimer:
      'DrugBank is intended for educational and scientific research purposes only and you expressly acknowledge and agree that use of DrugBank is at your sole risk. The accuracy of DrugBank information is not guaranteed and reliance on DrugBank shall be at your sole risk. DrugBank is not intended as a substitute for professional medical advice, diagnosis or treatment..[www.drugbank.ca]',
    sourceName: 'DrugBank',
    fullInteractionType: [
      {
        comment:
          'Drug1 (rxcui = 152923, name = simvastatin 40 MG Oral Tablet [Zocor], tty = SBD). Drug2 (rxcui = 207106, name = fluconazole 50 MG Oral Tablet [Diflucan], tty = SBD). Drug1 is resolved to simvastatin, Drug2 is resolved to fluconazole and interaction asserted in DrugBank between Simvastatin and Fluconazole.',
        minConcept: [
          {
            rxcui: '152923',
            name: 'simvastatin 40 MG Oral Tablet [Zocor]',
            tty: 'SBD',
          },
          {
            rxcui: '207106',
            name: 'fluconazole 50 MG Oral Tablet [Diflucan]',
            tty: 'SBD',
          },
        ],
        interactionPair: [
          {
            interactionConcept: [
              {
                minConceptItem: {
                  rxcui: '36567',
                  name: 'simvastatin',
                  tty: 'IN',
                },
                sourceConceptItem: {
                  id: 'DB00641',
                  name: 'Simvastatin',
                  url: 'https://go.drugbank.com/drugs/DB00641#interactions',
                },
              },
              {
                minConceptItem: {
                  rxcui: '4450',
                  name: 'fluconazole',
                  tty: 'IN',
                },
                sourceConceptItem: {
                  id: 'DB00196',
                  name: 'Fluconazole',
                  url: 'https://go.drugbank.com/drugs/DB00196#interactions',
                },
              },
            ],
            severity: 'N/A',
            description:
              'The metabolism of Simvastatin can be decreased when combined with Fluconazole.',
          },
        ],
      },
    ],
  },
  {
    sourceDisclaimer: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3422823/',
    sourceName: 'ONCHigh',
    fullInteractionType: [
      {
        comment:
          'Drug1 (rxcui = 152923, name = simvastatin 40 MG Oral Tablet [Zocor], tty = SBD). Drug2 (rxcui = 207106, name = fluconazole 50 MG Oral Tablet [Diflucan], tty = SBD). Drug1 is resolved to simvastatin, Drug2 is resolved to fluconazole and interaction asserted in ONCHigh between simvastatin and fluconazole.',
        minConcept: [
          {
            rxcui: '152923',
            name: 'simvastatin 40 MG Oral Tablet [Zocor]',
            tty: 'SBD',
          },
          {
            rxcui: '207106',
            name: 'fluconazole 50 MG Oral Tablet [Diflucan]',
            tty: 'SBD',
          },
        ],
        interactionPair: [
          {
            interactionConcept: [
              {
                minConceptItem: {
                  rxcui: '36567',
                  name: 'simvastatin',
                  tty: 'IN',
                },
                sourceConceptItem: { id: 'NA', name: 'simvastatin', url: 'NA' },
              },
              {
                minConceptItem: {
                  rxcui: '4450',
                  name: 'fluconazole',
                  tty: 'IN',
                },
                sourceConceptItem: { id: 'NA', name: 'fluconazole', url: 'NA' },
              },
            ],
            severity: 'high',
            description: 'HMG Co-A reductase inhibitors - CYP3A4 inhibitors',
          },
        ],
      },
    ],
  },
]

describe('fetchData function', () => {
  describe('when API call is successful', () => {
    it('should fetch data successfully', async () => {
      // Create a mock response
      const mockResponse = {
        data: {
          fullInteractionTypeGroup: 'Mocked Data',
        },
        status: 200,
      }

      // Spy on axios.get and mock the axios.get method to resolve with the mock response
      const axiosGetSpy = jest.spyOn(axios, 'get')
      axiosGetSpy.mockResolvedValue(mockResponse)

      // Create mock request and response objects
      const req: any = {}
      const res: any = {
        status: jest.fn(() => res), // Mock the status method to return 'res' for chaining
        json: jest.fn(), // Mock the json method
      }

      // Call the fetchData function
      await fetchData(req, res)

      // Expect axios.get to have been called with the correct URL
      expect(axios.get).toHaveBeenCalledWith(
        'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923',
      )
      // Expect status to be called with 200
      expect(res.status).toHaveBeenCalledWith(200)
      // Expect json to be called with the mock response data
      expect(res.json).toHaveBeenCalledWith(
        mockResponse.data.fullInteractionTypeGroup,
      )

      // Restore the original axios.get implementation
      axiosGetSpy.mockRestore()
    })
  })

  // describe("when API call fails", () => {
  // it('should handle errors', async () => {
  //   // Create a new instance of axios with the mock adapter
  //   const mock = new MockAdapter(axios)

  //   // Set up the mock to respond with an error
  //   mock
  //     .onGet(
  //       'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=207106+152923',
  //     )
  //     .reply(500, {})

  //   // Create mock request and response objects
  //   const req: any = {}
  //   const res: any = {
  //     json: jest.fn(), // Mock the json function
  //     status: jest.fn(() => res), // Mock the status function
  //   }

  //   // Call the fetchData function
  //   await fetchData(req, res)

  //   // Expect that the response status should be 500
  //   expect(res.status).toHaveBeenCalledWith(500)

  //   // Expect that the json function should have been called with an error message
  //   expect(res.json).toHaveBeenCalledWith({
  //     error: 'An error occurred while fetching data from the API',
  //   })
  // })
  // })
})
