# Introduction
This exercise will involve building a page for generating and displaying a quote for buying a specific cryptocoin.
A quote represents a fixed offer from the system indicating how much money a
customer will pay/receive, including the relevant fees.

The page that you need to build will be calculating how much USDC_EVMOS (a crypto coin) a customer will receive
in exchange for a specific amount of USD. The page will calculate this by making a request to a provided REST API.
You will not need to do any maths, only display the values you receive from the API.

# Detailed exercise specification
- You need to build a page that implements the design presented here -
  https://www.figma.com/file/5ZybOy1X8cwb9WQeldIPu3/Bitlabs-test?node-id=0%3A1.
  Your design needs to match the Figma mock closely but don't worry about making it pixel perfect.
- Your solution does not need to implement currency dropdowns, keep them unclickable.
- The page should allow the client to enter **either** the "You pay" amount **or** the "You receive" amount.
  Upon changing **either** of these amounts the page should make a request to the API to generate a quote for
  the newly-entered value. Depending on which field is updated the request made to the API will contain either
  `source_amount` or `target_amount`. Please refer to the documentation of the API for more information.
  - The docs for the endpoint of interest are hosted at
https://api-qjoa5a5qtq-uc.a.run.app/redoc#operation/create_quote_quotes_post.
  - The actual endpoint is
`POST https://api-qjoa5a5qtq-uc.a.run.app/quotes`.
- When the user loads the page, it should initially request the API to generate a quote for `source_amount="100.0"`.
- In the context of this exercise the following fields returned by the API endpoint can be ignored:
  - `id`
  - `source_currency`
  - `target_currency`
  - `internal_fee_percent`
  - `expires_at`
- Here is how the fields on the page map to the API responses:
  - **"You pay"** corresponds to the `source_amount` field in the API request/response
  - **"You receive"** corresponds to the `target_amount` field in the API request/response
  - **"Network fee"** corresponds to the `fiat_blockchain_fee` field in the API response
  - **"c14 fee"** corresponds to the `absolute_internal_fee` field in the API response
  - **"Total fee"** is the sum of the two fees above (this is the only bit of math that you need to do on the front-end)
- We expect you to have tests for your React code. Tests should be runnable using the `yarn test` command.

# Evaluation

Your submission will be evaluated on the following criteria:

- Your HTML/CSS closely matches the provided Figma mock
- Functionality is correctly implemented
- Modern React concepts used
- Code clarity and structure
- Functionality is well tested via automated tests (`yarn test`)

# Submission

Once you are happy with your solution, please create a `.zip` archive of the completed
project directory and email it directly to us at `info@bitlabs.team`.
