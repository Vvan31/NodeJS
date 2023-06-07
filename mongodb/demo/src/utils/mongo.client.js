import * as Realm from 'realm-web'

const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID })
const credentials = Realm.Credentials.anonymous() // Any user can read and write to the database
const user = await app.logIn(credentials)

//connect to the database
const mongo = app.currentUser.mongoClient("mongodb-atlas")
const collection = mongo.db("m0922-demo").collection("m0922-demo-col")

export { app, user, collection }
