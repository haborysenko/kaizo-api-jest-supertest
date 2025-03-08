# Kaizo API Jest Supertest

## Table of Contents

- [Project Overview](#project-overview)
- [Project Local Setup](#project-setup)
  - [1. Clone the Repository](#1-clone-the-reposiory)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
- [Running the Tests](#running-the-tests)
  - [1. Run All Tests](#1-run-all-tests)
- [Test Structure](#test-structure)
- [Github CI-CD](#github-ci-cd)

## Project Overview

This project contains CRUD tests for **Teams** Kaizo API using **Jest** and **Supertest**.

## Project Local Setup

### 1. Clone the Repository

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone https://github.com/haborysenko/ApiTestsJestSupertest.git
cd ApiTestsJestSupertest
```

### 2. Install Dependencies

Make sure that all required dependencies are installed by running next command.
This command will install all necessary Node.js packages, including **Jest** and **Supertest**, which are required to run the tests.

```bash
npm install
```

If you encounter deprecation warnings, installing updates may help.

```bash
npm update jest supertest
```

```bash
npm install -g npm
```

### 3. Set Up Environment Variables

You need to set up environment variables to authenticate.

1. Create a `.env` file in the root directory of your project (if it doesn't already exist):

```bash
touch .env
```

4. Add the following content to the `.env` file:

```bash
BASE_URL=<your_value>
API_KEY=<your_value>
USER_ID=<your_value>
AUDIT_NAME=<your_value>
```

## Running the Tests

### 1. Run All Tests

To execute the entire test suite, run the following command:

```bash
npm test
```

This will:

- Run all test cases located in the `tests/` directory.
- Validate the **CRUD operations** for Teams.
- Ensure that the API responds correctly with the expected status codes and response data.

## Test Structure

The tests are structured to ensure reusability and maintainability:

- **`support/apiClient.js`**: Contains the reusable API client for making HTTP requests (GET, POST, PUT, DELETE).
- **`support/apiConfig.js`**: Provides environment configurations like base URLs, API keys, etc.
- **`support/apiHelper.js`**: Provides common utility methods.
- **`support/teamsApi.js`**: Contains utility methods specific to the Teams API such as createTeam, updateTeam, deleteTeam, etc.
- **`tests/`**: Contains all the CRUD tests for team management operations.

## Github CI-CD

This project includes a GitHub Actions CI/CD pipeline.
The workflow runs automatically for every push or pull request to the `main` branch.
In addition, the CI/CD pipeline can be manually triggered from the GitHub Actions tab in the repository.
