# 📖 Mongoose Middleware (`pre`) & Schema Methods (`methods`)

This document explains two important Mongoose concepts used in this project:

1. **Schema Middleware (`pre`)**
2. **Schema Methods (`methods`)**

Understanding these concepts will help you build secure authentication systems and write cleaner MongoDB code.

---

# 🚀 AWS Setup Note

If you're working on AWS environments and encounter package installation issues, run:

```bash
npm ci

npm i --ignore-scripts
```

---

# 1. Schema Middleware (`pre`)

Mongoose provides middleware (also called hooks) that allow you to execute code automatically before or after certain database operations.

Common middleware examples:

```js
pre("save")
pre("findOneAndUpdate")
pre("deleteOne")
```

In this project, we use:

```js
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
```

---

## What does this do?

Before a user document is saved to MongoDB, this middleware automatically hashes the password.

For example:

```js
const user = new userModel({
  username: "aadit",
  email: "aadit@gmail.com",
  password: "123456",
});

await user.save();
```

The password is **not stored as plain text**.

Before saving, Mongoose transforms:

```js
{
  username: "aadit",
  email: "aadit@gmail.com",
  password: "123456"
}
```

into:

```js
{
  username: "aadit",
  email: "aadit@gmail.com",
  password: "$2a$10$abcxyz..."
}
```

and then saves the hashed password.

---

## Why hash passwords?

Storing plain-text passwords is a major security risk.

If a database is compromised, attackers can immediately see user passwords.

Hashing converts the password into a secure irreversible string:

```txt
123456
↓
$2a$10$abcxyz...
```

Even the server cannot recover the original password from the hash.

---

## Understanding `this`

Inside document middleware:

```js
this
```

refers to the current document being saved.

Example:

```js
console.log(this.username);
console.log(this.email);
console.log(this.password);
```

would print values of the current user.

---

## Why use `isModified()`?

```js
if (!this.isModified("password")) return;
```

Suppose a user updates only their username:

```js
user.username = "newName";

await user.save();
```

Without the check, the password would be hashed again:

```txt
hashedPassword
↓
hash(hashedPassword)
↓
hash(hash(hashedPassword))
```

This would make login impossible.

Therefore:

```js
this.isModified("password")
```

asks:

> "Has the password field changed?"

If the answer is **No**, hashing is skipped.

---

## When should you use `pre()`?

Use middleware when you want something to happen automatically.

Examples:

* Password hashing
* Validation
* Logging
* Audit tracking
* Data formatting
* Automatic timestamps

---

# 2. Schema Methods (`methods`)

Schema methods allow us to attach custom functions to every document created from a schema.

Common examples:

```js
user.comparePassword()
user.generateToken()
user.getProfile()
```

In this project:

```js
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

This creates a custom method called:

```js
user.comparePassword()
```

for every user document.

---

## Why use methods?

Without schema methods, we would repeatedly write:

```js
const user = await userModel.findOne({ email });

const isMatch = await bcrypt.compare(
  password,
  user.password
);
```

every time we implement login.

Instead, we can write:

```js
const user = await userModel.findOne({ email });

const isMatch = await user.comparePassword(password);
```

This keeps business logic inside the model where it belongs and makes controllers cleaner.

---

## Understanding `this` inside methods

In:

```js
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

`this` refers to the current user document.

Example:

```js
{
  username: "aadit",
  email: "aadit@gmail.com",
  password: "$2a$10$hashedPassword"
}
```

So:

```js
this.password
```

becomes:

```js
"$2a$10$hashedPassword"
```

and Mongoose executes:

```js
bcrypt.compare(
  candidatePassword,
  this.password
);
```

---

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

### Flow

1. User enters a password.
2. The user is fetched from MongoDB.
3. `comparePassword()` compares the entered password with the stored hash.
4. If they match, login succeeds.
5. If they don't match, login fails.

---

# 📌 Difference Between `pre()` and `methods`

| Feature            | `pre()` Middleware                         | `methods`                             |
| ------------------ | ------------------------------------------ | ------------------------------------- |
| Purpose            | Run code automatically before an operation | Create custom functions for documents |
| Trigger            | Automatically executed by Mongoose         | Manually called by developer          |
| Common Use Cases   | Hashing, validation, logging               | Password comparison, token generation |
| Access to Document | Yes (`this`)                               | Yes (`this`)                          |

---

# 🎯 Key Takeaways

### Use `pre()` when:

* You want logic to run automatically.
* You need password hashing.
* You want validation before database operations.

### Use `methods` when:

* You need reusable document-level functions.
* You want cleaner controllers.
* You want authentication-related utilities such as password comparison or token generation.

---

## Project Usage

This project uses:

### Middleware

```js
userSchema.pre("save", ...)
```

to automatically hash passwords before saving users.

### Methods

```js
userSchema.methods.comparePassword(...)
```

to securely compare entered passwords with stored hashed passwords during login.

Together, these two features help build a secure authentication system while keeping the code clean and maintainable.
