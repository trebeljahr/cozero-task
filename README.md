## Intro

Welcome to the Cozero coding challenge!

Our idea is to offer you a fun and practical challenge so that we can later can use it as a conversation starter to go over your thought process.

In this repo you find the boilerplate for a Create React App + Typescript project to help you get started.

## Challenge

Use the public API of [CoinGecko](https://www.coingecko.com/en/api) to allow users to query information about a specific cryptocurrency.

### Acceptance criteria:

- Have a text input field and a submit button where a user can type a cryptocurrency id (eg. bitcoin) and submit to search.
- On clicking submit, fetch the cryptocurrency that match the name in the text input. You can use the coins GET call `/coins/{id}`.
- Display a spinner while the user is waiting for the results
- Display its most relevant data to the user (i.e. logo, marketcap rank, name, current USD price, symbol, 24h percentual price change). You can use a table or any other data display component you find easier.
- Add style that highlights if it had a growth or a decline in its price in the past 24h (i.e. mark it red or green accordingly)
- Save the past user queries and display it in a list of "Past searches" next to the input box
- Show a line graph with the selected cryptocurrency USD price fluctuation in the past 7 days. You can find an example [here](https://www.coingecko.com/en/coins/ethereum). You can find data for this graph in the GET `/coins/{id}/market_chart` call

## Note

- Use TypeScript and React
- Use React Hooks instead of Redux
- Prettier / Eslint should show no errors. You can edit the linter rules but you should have a good reason for it.
- This should not take more than 6-8 hours to solve, please do not spend more than that on the task
- You can use any npm package to help you
- You don't need to focus on UI design but it still should be functional.
- If you experience any issue during the task, feel free to contact your recruiting manager directly via e-mail
- There are no right or wrong answers, this is an opportunity to know each other better in a technical way.

## How to submit

1. Clone this repo locally
2. Make your changes that solve the task
3. Zip compress your project with the solution and send it via email to your recruiting manager. You will be contacted to setup a follow-up call
