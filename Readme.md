Always use this command if you are using AWS

```js
npm ci

npm i --ignore-scripts
```

# 1. userSchema.pre()

`pre()` is a middleware (hook) that runs before a specific Mongoose operation.

Examples:

```js
pre("save")
pre("findOneAndUpdate")
pre("deleteOne")
```

In my code (Perplexcity-clone, Day-11.1):

```js
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
```
means:

> "Before saving a user document, execute this function."

So, when the user hits the registration API and we get the user information:

```js
const user = new userModel({
  username: "aadit",
  email: "aadit@gmail.com",
  password: "123456",
});

await user.save();
```

before saving this data in the database, the `pre("save")` hook runs and changes it to:

```js
{
  username: "aadit",
  email: "aadit@gmail.com",
  password: "$2a$10$abcxyz..."
}
```

Then Mongoose saves the hashed password.

## Why check isModified()?

```js
if (!this.isModified("password")) return;
```

Imagine:

```js
user.username = "newName";
await user.save();
```

You only changed the username.
Without the check, Mongoose would hash the already-hashed password again.

So:

```js
this.isModified("password")
```

asks:
> "Did the password field change?"
If not, skip hashing.

---

# 2. userSchema.methods

`methods` are custom functions that we attach to every document created from this schema.

Examples:

```js
user.comparePassword()
user.generateToken()
user.getProfile()
```


In my code:

```js
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

This creates a custom method called:

```js
comparePassword()
```

for every user document.

## Why use methods?

Without methods, during login we would write:

```js
const user = await userModel.findOne({ email });

const isMatch = await bcrypt.compare(
  password,
  user.password,
);
```

every time.

Instead, we can write:

```js
const user = await userModel.findOne({ email });

const isMatch = await user.comparePassword(password);
```

which is cleaner and easier to understand.

```js
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

`this` refers to the current user document.

## Login Flow Example

```js
const user = await userModel.findOne({ email });

const isMatch = await user.comparePassword(password);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid credentials",
  });
}
```

Here:

1. User enters a password.
2. `comparePassword()` compares the entered password with the hashed password stored in the database.
3. If they match, login succeeds.
4. Otherwise, login fails.

---

