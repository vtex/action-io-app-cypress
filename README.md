# Action IO App Cypress

<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

GitHub action to run [Cypress] tests on your VTEX IO app.

## How to use

First of all, you must create an App Key and Token to use for a specific 
account. This is needed so this action can link the app in a given workspace to 
run the tests on. You can follow this guide for [generating App Keys in your 
account], and then set them up as secrets on your repository.

After that, you must have created at least some cypress tests in your 
repository. Optionally, you can keep your tests in a separate repository and 
reference them using the `test-repository` and `test-repository-ref` inputs.

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
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: vtex/action-io-app-cypress@v1
      with:
        account: MY_ACCOUNT
        app-key: ${{ secrets.APP_KEY }}
        app-token: ${{ secrets.APP_TOKEN }}
        # Optional repository containing cypress tests
        test-repository: vtex/my-app-tests
        # Optional ref for test repository
        test-repository-ref: main
        # Optional retry count to link app
        link-retries: 3
```

That's it! You should now be able to monitor your VTEX IO app in pull requests 
and pushes to specific branches with the full coverage Cypress can offer.

[Cypress]: https://www.cypress.io/
[generating App Keys in your account]: https://help.vtex.com/tutorial/application-keys--2iffYzlvvz4BDMr6WGUtet#generating-app-keys-in-your-account
