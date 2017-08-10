Admin interface for Gap.js

## Example

```javascript
const Admin = require('gap-admin');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-db');


const db = mongoose.connection;


const UserModel = mongoose.model('user', {
    name: String
});


const admin = new Admin();


admin.addView(Admin.mongoose.View(UserModel));
```

It implements CRUD operations on database models and provides a convenient interface for interaction


## Installation
```bash
npm install gap-admin --save
```


## License
[MIT](LICENSE)

