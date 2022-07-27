# VTEX IO App Cypress

Reusable workflow to run [Cypress] tests on your VTEX IO app.

## How to use

First of all, you must create an App Key and Token to use for a specific 
account. This is needed so this action can link the app in a given workspace to 
run the tests on. You can follow this guide for [generating App Keys in your 
account], and then set them up as secrets on your repository.

After that, you must have created at least some cypress tests in your 
repository. Optionally, you can keep your tests in a separate repository and 
reference them using the `tests-repository` and `tests-repository-ref` inputs.

Now, create a workflow file inside `.github/workflows` and paste in the 
following into the file `e2e.yml` (remember to also update the input values as 
needed):

```yaml
name: "E2E Tests"
on:
  pull_request:
    types:
    - synchronize
    - opened
  push:
    branches:
    - main
    - master

jobs:
  Cypress:
    uses: vtex/action-io-app-cypress/.github/workflows/cypress.yml@main
    with:
      accounts: '["MY_ACCOUNT"]'
      # Optional repository containing cypress tests
      tests-repository: vtex/my-app-tests
      # Optional ref for test repository
      tests-repository-ref: main
      # Optional retry count to link app
      link-retries: 3
      # Optional pattern to filter tests that will be run by Cypress
      spec: '**/*.test.*'
      # Whether or not to run tests in parallel, this required you to pass
      # the record key because it is only supported when using Cypress Dashboard
      parallel: true
      # Amount of containers to spin up when running the tests in parallel
      containers: 5
    secrets:
      app-key: ${{ secrets.APP_KEY }}
      app-token: ${{ secrets.APP_TOKEN }}
      # Optional record key, if you plan on using Cypress Dashboard
      record-key: ${{ secrets.RECORD_KEY }}
```

That's it! You should now be able to monitor your VTEX IO app in pull requests 
and pushes to specific branches with the full coverage Cypress can offer.

## Environment variables

This action passes on the following environment variables to the Cypress
instance. You should use them to be able to effectively make use of this
workflow:

### `CYPRESS_VTEX_WORKSPACE`

This one contains the workpace name the tests must be run to. You should use
this as a prefix for the account name when calling `cy.visit`, or else it won't
test the changes proposed in the PR.

```js
// Example usage:
const workspace = Cypress.env('VTEX_WORKSPACE') || 'master'

beforeEach(() => {
  cy.visit(`https://${workspace}--account.myvtex.com/admin/search`)
})
```

### `CYPRESS_APP_KEY` and `CYPRESS_APP_TOKEN`

These contains the same app-key and app-token you passed as inputs to the
workflow. You should use them to authenticate to the VTEX ID API and be able to
access the page using `myvtex.com`. You can use the following snippet:

```js
function visitAndAuthenticate() {
  const appKey = Cypress.env('APP_KEY')
  const appToken = Cypress.env('APP_TOKEN')

  cy.visit('https://account.myvtex.com/admin/search')

  cy.clearCookies()

  cy.request(
    'POST',
    `http://api.vtexcommercestable.com.br/api/vtexid/apptoken/login?an=${account}`,
    {
      appkey: appKey,
      apptoken: appToken,
    }
  ).then((response) => {
    cy.setCookie('VtexIdclientAutCookie', response.body.token)
    cy.reload()
  })
}

beforeEach(() => {
  visitAndAuthenticate()
})
```

[Cypress]: https://www.cypress.io/
[generating App Keys in your account]: https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-app-keys-in-your-account
