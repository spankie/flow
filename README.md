# Documentation for setting up the [app](https://github.com/spankie/flow)

- Backend: The backend is written in golang using the [gin library](https://github.com/gin-gonic/gin);
- Frontend: React library using the [ant.design](https://ant.design) UI framework.
- Database: MYSQL

To get started, install the needed softwares which includes MYSQL, Golang.

After installing these, take the following steps to get the app up and running locally:

  - Pull the code from the github repository `git clone https://github.com/spankie/flow`
  - create a database named `flow`.
  - edit the .env file and change the `DB_URL` variable to suit you local database setting.
  - run the migration command to create the necessary tables using this command in the root directory: `go run main.go --migration`
  - after running the migration, you can start the server using the command: `go run main.go`. this will start the server in port `8080`.

### Starting the frontend locally.
  - Inisde the frontend directory, run `npm install` or `yarn install`. these will install all the necessary dependencies.
  - After installing the dependencies, run `npm run start` or `yarn start`. This will start the dev server.
  - Running the server will open your browser to the url: `http://localhost:3000`, if it does not, you can just visit the url on your browser and view the app.


