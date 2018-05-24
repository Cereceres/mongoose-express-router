# mongoose-express-router
mongoose router to express js

# Usage

```js
const mongooseRouter = require('mongoose-express-router')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/myapp')
const schema = mongoose.Schema({
    user: String
},{strict: true})
mongoose.model('user', schema)
const router = mongooseRouter(mongoose)
const app = express()
app.use(bodyParser.json())
app.use('/path/to/expose/mongoose',router)
app.listen() // app is listen in '/path/to/expose/mongoose'/:model/:id
// GET -> findResult
// POST -> createResult
// PUT -> updateResult
// DELETE -> deleteResult
```