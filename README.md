# oh-my-json <img src="assets/oh-my-json.png" alt="logo" width="40" height="40" style="vertical-align:bottom;margin-top:0px">

The zenith of JSON manipulation.

## Table of contents

- [Installation](#installation)
- [What's oh-my-json](#whats-oh-my-json)
- [API Documentation](#api-documentation)
    - [import](#import)
    - [get](#get)
    - [shortcuts](#shortcuts)
    - [update](#update)
    - [delete](#delete)
    - [sort](#sort)
    - [merge](#merge)
    - [clone](#clone)
    - [decompose](#decompose)
    - [simplify](#simplify)
    - [build](#build)
    - [keys](#keys)
    - [values](#values)
    - [stringify](#stringify)
    - [parse](#parse)
    - [isEmpty](#isEmpty)
    - [exists](#exists)
    - [depth](#depth)
    - [iterate](#iterate)
- [Facts about OMJ](#facts-about-omj)
- [Author](#author)
- [Other packages](#other-packages)
- [Support Me](#support-me)
- [Contact Me](#contact-me)
- [License](#license)

## Installation

```sh
# npm
$ npm install @vinoskey524/oh-my-json

# yarn
$ yarn add @vinoskey524/oh-my-json

# pnpm
$ pnpm add @vinoskey524/oh-my-json

# bun
$ bun add @vinoskey524/oh-my-json

# deno
$ deno add npm:@vinoskey524/oh-my-json
```

## What's oh-my-json

Oh-my-json is a powerful software that allows you to manipulate JSON data with incredible ease and flexibility like never before.

## API Documentation

>Note: Pay a good attention to the comments inside the code sections.

For this documentation we'll use the JSON model below:

```ts 
const user = {
  "id": "A9fG7XyK2qM4vZ8rP0W1B6tCJdNL3o",  
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 32,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001",
    "country": "USA"
  },
  "preferences": {
    "newsletter": true,
    "theme": "dark",
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    }
  },
  "company": {
    "name": "Tech Corp",
    "position": "Software Engineer",
    "department": {
      "name": "Development",
      "floor": 3
    }
  },
  "paymentInfo": {
    "cardType": "Visa",
    "last4": "1234",
    "billing": {
      "address": "456 Another St",
      "city": "Los Angeles"
    }
  },
  "settings": {
    "language": "en",
    "timezone": "UTC-5"
  },
  "tags": ["developer", "javascript", "remote"],
  "orderHistory": [
    { "orderId": "ORD123", "amount": 99.99, "date": "2024-03-06" },
    { "orderId": "ORD124", "amount": 49.99, "date": "2024-03-07" }
  ],
  "devices": [
    { "type": "laptop", "os": "Windows 11" },
    { "type": "phone", "os": "iOS" }
  ],
  "createdAt": "2024-03-07T12:00:00Z",
  "updatedAt": "2024-03-07T12:30:00Z",
  "status": "active",
  "roles": ["admin", "user"],
  "metadata": {
    "signupSource": "web",
    "referralCode": "XYZ123"
  },
  "greet": () => { console.log('Hello, am John Doe!') },
  "greetAsync": async () => { console.log('Hello, am John Doe!') },
  "zed": undefined
}
```

### **import**

```ts
import json from '@vinoskey524/oh-my-json';
```

### **get**

```ts 
// 1. Get one field
const g1 = json.get(user, 'preferences.notifications.email');
console.log('g1 ::', g1);

// 2. Get many fields grouped inside an array
const g2 = json.get(user, [
    'preferences.notifications.email',
    'company.department.floor',
    'orderHistory.[1]'
]);
console.log('g2 ::', g2);

// 3. Get many fields grouped inside a JSON object
const g3 = json.get(user, {
    email: 'preferences.notifications.email',
    floor: 'company.department.floor',
    order: 'orderHistory.[1]',
});
console.log('g3 ::', g3);
```

- **`get(*, *)`**: It takes two arguments:

  - `json`: The JSON object.

  - `path`: (`string | array | json`) The path to the data you want to get.

It returns the expected values, or undefined if something goes wrong.

```sh
# log (g1)
g1 :: true

# log (g2)
g2 :: [
    true, 
    3, 
    {
        amount: 49.99,
        date: "2024-03-07",
        orderId: "ORD124",
    }
]

# log (g3)
g3 :: {
    email: true,
    floor: 3,
    order: {
        amount: 49.99,
        date: "2024-03-07",
        orderId: "ORD124",
    },
} 
```

### **shortcuts**

```ts 
// 1. Get one field
const g1_ = json.get(user, 'preferences...email'); // We're using a shortcut
console.log('g1 ::', g1_);

// 2. Get many fields grouped inside an array
const g2_ = json.get(user, [
    'preferences...email',  // We're using a shortcut
    'company...floor',  // We're using a shortcut
    'orderHistory.[1]'
]);
console.log('g2 ::', g2_);

// 3. Get many fields grouped inside a JSON object
const g3_ = json.get(user, {
    email: 'preferences...email',
    floor: 'company...floor',
    order: 'orderHistory.[1]',
});
console.log('g3 ::', g3_);
```

A shortcut allows you to replace anything between **two keys** by **"..."**. The full path will be resolve internally.

We'll get the same result as previously.

```sh
# log (g1)
g1 :: true

# log (g2)
g2 :: [
    true, 
    3, 
    {
        amount: 49.99,
        date: "2024-03-07",
        orderId: "ORD124",
    }
]

# log (g3)
g3 :: {
    email: true,
    floor: 3,
    order: {
        amount: 49.99,
        date: "2024-03-07",
        orderId: "ORD124",
    },
}
```

> ⚠️ Please, note that if a shortcut corresponds to more than one path, it'll be invalidated and you'll get "undefined" as result.

Consider the following use case.

```ts
const pref = {
    pref: {
        notifications1: {
            aVeryVeryLongKey: {
                anotherVeryVeryLongKey: {
                    theLastVeryVeryLongKey: {
                        email: true,
                        sms: true,
                        push: true
                    }
                }
            }
        },
        notifications2: {
            aVeryVeryLongKey: {
                anotherVeryVeryLongKey: {
                    theLastVeryVeryLongKey: {
                        email: true,
                        sms: false,
                        push: false
                    }
                }
            }
        }
    }
};

// Get sms notification status
// This will give undefined, because the shortcut corresponds to more than one path.
const invalid = json.get(pref, 'pref...sms');
console.log('invalid ::', invalid);

// We'll need to give more precision
const valid1 = json.get(pref, 'pref.notifications1...sms'); // For notifications1
const valid2 = json.get(pref, 'pref.notifications2...sms'); // For notifications2
console.log('valid ::', valid1, valid2);
```

```sh 
# log (invalid)
invalid :: undefined

# log (valid)
valid :: true false
```

If you see something like this `⛔️ Err [oh-my-json] :: getFunc() => Many paths found for "pref...sms"`, it's because every errors are logged into the console.

### **update**

```ts 
// Update a JSON object 
// • The original JSON object is not modified.
const update = json.update(user, {
  // Increment age
    age: (currentValue: number) => currentValue + 1, 

    // Set email to false
    'preferences...email': false, 
    
    // Uppercase the os name for the device at index 0
    'devices.[0].os': (currentValue: string) => currentValue.toUpperCase() 
});
console.log('update ::', update);
```

- **`update(*, *)`**: It takes two arguments:

  - `json`: The JSON object.

  - `updates`: (`json`) A JSON object containing the new values.

It returns a JSON object, or undefined if something goes wrong.

There're two ways to make an update:

- **`overwrite`**: Set a new value to overwrite the old one.

- **`Functional mutation`**: Use a **synchronous** function to modify the current value of a field and return the new value. If the function throw an error the update will fail and return undefined.

```sh
# log 
update :: {
    age: 33, # updated to "33"
    # ...
    preferences: {
        newsletter: true,
        notifications: {
            email: false, # updated to "false"
            push: true,
            sms: false,
        },
        theme: "dark",
    },
    # ...
    devices: [
        {
            os: "WINDOWS 11", # updated (uppercased)
            type: "laptop",
        }, 
        {
            os: "iOS",
            type: "phone",
        }
    ],
}
```

### **delete**

```ts 
// 1. Delete one field
const del1 = json.delete(user, 'address');
console.log('del1 ::', del1);

// 2. Delete many fields
const del2 = json.delete(user, ['paymentInfo', 'orderHistory.[1]']);
console.log('del2 ::', del2);
```

- **`delete(*, *)`**: It takes two arguments:

  - `json`: The JSON object.

  - `path`: (`string | string[]`) The path(s) to the data to delete.

It returns a JSON object, or undefined if something goes wrong.

### **sort**

```ts
// 1. Sort in ascendant way
const asc = json.sort(user, 'asc');
console.log('asc ::', asc);

// 2. Sort in descendant way
const desc = json.sort(user, 'desc');
console.log('desc ::', desc);
```

- **`sort(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `order?`: (`asc | desc`) Specify if you want to order in **ascendant** (default) or **descendant** way.

It returns a JSON object, or undefined if something goes wrong.

### **merge**

```ts
// 1. Merge many JSON objects
const merge1 = json.merge([
    user,
    {
        'orderHistory.[2]': { orderId: "ORD125", amount: 169.99, date: "2024-03-08" } // Add a third order
    }
]);
console.log('merge1 ::', merge1);

// 2. Merge many JSON objects, and make usage of string interpolation.
const merge2 = json.merge([
    user,
    {
        '%0.[2]': { orderId: "ORD125", amount: 169.99, date: "2024-03-08" } // String placeholder (%0)
    }
], ['orderHistory']); // Deps
console.log('merge2 ::', merge2);
```

- **`merge(*, ?)`**: It takes two arguments:

  - `array`: (`json[]`) An array of JSON objects.

  - `deps?`: (`string[]`) An array of dependencies which represent the values of string placeholders.

It returns a JSON object, or undefined if something goes wrong.

```sh
# log (merge1)
merge1 :: {
    # ...
    orderHistory: [
        {
            amount: 99.99,
            date: "2024-03-06",
            orderId: "ORD123",
        }, 
        {
            amount: 49.99,
            date: "2024-03-07",
            orderId: "ORD124",
        }, 
        # The new order
        {
            amount: 169.99,
            date: "2024-03-08",
            orderId: "ORD125",
        }
    ],
    # ...
}

# log (merge2)
# Same result as above
```

### **clone**

```ts 
// 1. Clone a JSON object
// • All references are broken.
const clone1 = json.clone(user);
console.log('clone1 ::', clone1);

// 2. Clone and preserve the reference for the "address" field.
// • You can preserve the reference of many field by using an array.
const clone2 = json.clone(user, 'address');
console.log('clone2 ::', clone2);

// Test case
// Update "city" and "theme" directly from the user object
user.address.city = 'Miami';
user.preferences.theme = 'light';
//
console.log('address1 ::', clone1.address);
console.log(clone1.preferences);
console.log('address2 ::', clone2.address);
console.log(clone2.preferences);
```

- **`clone(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `preserve?`: (`path | path[]`) Specify any path you want to preserve reference for.

It returns a JSON object, or undefined if something goes wrong.

```sh 
# log (address1)
address1 :: { # address field
    street: "123 Main St",
    city: "New York", # No change because the reference to "address" is not preserved for clone1
    zip: "10001",
    country: "USA",
}
{ # preferences field
    newsletter: true,
    notifications: {
        email: true,
        push: true,
        sms: false,
    },
    theme: "dark",  # No change because the reference to "preferences" is not preserved for clone1
}

# log (address2)
address2 :: { # address field
    street: "123 Main St",
    city: "Miami", # City has changed because the reference to address is preserved for clone2
    zip: "10001",
    country: "USA",
}
{ # preferences field
    newsletter: true,
    notifications: {
        email: true,
        push: true,
        sms: false,
    },
    theme: "dark", # No change because the reference to "preferences" is not preserved for clone2
}
```

### **decompose**

```ts
// Decompose a JSON object into a fully detailed version.
const decomp = json.decompose(user);
console.log('decomp ::', decomp);
```

- **`decompose(*)`**: It takes only one argument:

  - `json`: The JSON object.

It returns a JSON object, or undefined if something goes wrong.

### **simplify**

```ts
// Transform a JSON object into a top-level only JSON object.
const simp = json.simplify(user);
console.log('simp ::', simp);
```

- **`simplify(*)`**: It takes only one argument:

  - `json`: The JSON object.

It returns a JSON object, or undefined if something goes wrong.

### **build**

```ts
// 1. Build a JSON object with paths
const build1 = json.build({
    id: "A9fG7XyK2qM4vZ8rP0W1B6tCJdNL3o",
    name: "John Doe",
    email: "johndoe@example.com",
    age: 32,
    "address.street": "123 Main St",
    "address.city": "New York",
    "address.zip": "10001",
    "address.country": "USA",
    "preferences.newsletter": true,
    "preferences.theme": "dark",
    "preferences.notifications.email": true,
    "preferences.notifications.sms": false,
    "preferences.notifications.push": true,
    "company.name": "Tech Corp",
    "company.position": "Software Engineer",
    "company.department.name": "Development",
    "company.department.floor": 3,
    "paymentInfo.cardType": "Visa",
    "paymentInfo.last4": "1234",
    "paymentInfo.billing.address": "456 Another St",
    "paymentInfo.billing.city": "Los Angeles",
    "settings.language": "en",
    "settings.timezone": "UTC-5",
    "tags.[0]": "developer",
    "tags.[1]": "javascript",
    "tags.[2]": "remote",
    "orderHistory.[0].orderId": "ORD123",
    "orderHistory.[0].amount": 99.99,
    "orderHistory.[0].date": "2024-03-06",
    "orderHistory.[1].orderId": "ORD124",
    "orderHistory.[1].amount": 49.99,
    "orderHistory.[1].date": "2024-03-07",
    "devices.[0].type": "laptop",
    "devices.[0].os": "Windows 11",
    "devices.[1].type": "phone",
    "devices.[1].os": "iOS",
    createdAt: "2024-03-07T12:00:00Z",
    updatedAt: "2024-03-07T12:30:00Z",
    status: "active",
    "roles.[0]": "admin",
    "roles.[1]": "user",
    "metadata.signupSource": "web",
    "metadata.referralCode": "XYZ123",
    greet: () => { console.log('Hello, am John Doe!') },
    greetAsync: () => { console.log('Hello, am John Doe!') },
    zed: undefined,
});
console.log('build1 ::', build1);

// 2. Build a JSON object with paths, using string interpolation.
const build2 = json.build({
    id: "A9fG7XyK2qM4vZ8rP0W1B6tCJdNL3o",
    name: "John Doe",
    "%0": "johndoe@example.com", // String placeholder (%0)
    age: 32,
    "%1.street": "123 Main St", // String placeholder (%1)
    "%1.city": "New York",
    "%1.zip": "10001",
    "%1.country": "USA",
    "preferences": {
        "newsletter": true,
        "theme": "dark",
        "notifications": {
            "%0": true, // String placeholder (%0)
            "sms": false,
            "push": true
        }
    }
},
['email', 'address']); // Deps
console.log('build2 ::', build2);
```

- **`build(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `deps?`: An array of dependencies which represent the values of string placeholders.

It returns a JSON object, or undefined if something goes wrong.

### **keys**

```ts
// 1. Get top-level keys
// • The value 0 represent the top-level.
const k = json.keys(user);
const k0 = json.keys(user, 0);
console.log('k ::', k);

// 2. Get nested keys. 
// • Use a value beyond 0 to specify the nested level you want.
const k1 = json.keys(user, 1);
const k2 = json.keys(user, 2);
console.log('k1 ::', k1);

// 3. Get all keys from all levels
// • Array indexes are also included.
const kn = json.keys(user, -1);
console.log('kn ::', kn);
```

- **`keys(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `level?`: (`number`) The level at which to get the keys.

It returns an array of strings, or undefined if something goes wrong.

### **values**

```ts
// 1. Get values of top-level keys
// • The value 0 represent the top-level.
const v = json.values(user);
const v0 = json.values(user, 0);
console.log('v ::', v);

// 2. Get values of nested keys. 
// • Use a value beyond 0 to specify the nested level you want.
const v1 = json.values(user, 1);
const v2 = json.values(user, 2);
console.log('v1 ::', v1);

// 3. Get all values from all fields
// • Array entries are also included.
const vn = json.values(user, -1);
console.log('vn ::', vn);
```

- **`values(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `level?`: (`number`) The level at which to get the values.

It returns an array of values, or undefined if something goes wrong.

### **stringify**

```ts
// 1. Stringify
const s1 = json.stringify(user);
console.log('s1 ::', s1);

// 2. Stringify, including function's codes
const s2 = json.stringify(user, true);
console.log('s2 ::', s2);
```

- **`stringify(*, ?)`**: It takes two arguments:

  - `json`: The JSON object.

  - `includeFunctions?`: (`boolean`) It true, function's codes will be stringified.

It returns a string, or undefined if something goes wrong.

### **parse**

```ts 
// Parse
const parse = json.parse(s1);
console.log('parse ::', parse);
```

- **`parse(*)`**: It takes only one argument:

  - `text`: The stringified JSON object.

It returns a JSON object, or undefined if something goes wrong.

### **isEmpty**

```ts 
// 1. Check if the JSON object is empty
const isEmpty1 = json.isEmpty(user);
console.log('isEmpty1 ::', isEmpty1);

// 2. ...
const isEmpty2 = json.isEmpty({});
console.log('isEmpty2 ::', isEmpty2);
```

- **`isEmpty(*)`**: It takes only one argument:

  - `json`: The JSON object.

It returns a boolean.

### **exists**

```ts 
// 1. Check if a key exists
// • It'll return a boolean.
const exists1 = json.exists(user, 'paymentInfo');
console.log('exists1 ::', exists1);

// 2. Check the existence of many keys and get the result inside an array
// • It'll return an array.
const exists2 = json.exists(user, ['paymentInfo', 'preferences.notifications.email']);
console.log('exists2 ::', exists2);

// 3. Check the existence of many keys and get the result inside a JSON object
// • It'll return a JSON object.
const exists3 = json.exists(user, {
    paymentInfo: 'paymentInfo', 
    email: 'preferences.notifications.email',
    interests: 'preferences.interests'
});
console.log('exists3 ::', exists3);
```

- **`exists(*, *)`**: It takes two arguments:

  - `json`: The JSON object.

  - `path`: The path to the key.

It returns a boolean for each case.

```sh
# log (exists1)
exists1 :: true

# log (exists2)
exists2 :: [true, true]

# log (exists3)
exists3 :: {
  paymentInfo: true,
  email: true,
  interests: false,
}
```

### **depth**

```ts
// Get the depth of the JSON object
const depth = json.depth(user);
console.log('depth ::', depth);
```

- **`depth(*)`**: It takes only one argument:

  - `json`: The JSON object.

It returns a positive number, or `-1` if something goes wrong.

### **iterate**

```ts 
// 1. Iterate at top-level
json.iterate({
    json: user,
    forEach: (level: number, path: string, key: string, value: any) => {
        console.log('iterating ::', level, path, key, value);
    }
});

// 2. Iterate at a specific level
// • 0 represent the top-level (default)
// • -1 represent all levels, including array's entries
// • Any value beyond 0 represent a nested level
json.iterate({
    json: user,
    level: 1, // Iterate at level 1
    forEach: (level: number, path: string, key: string, value: any) => {
        console.log('iterating ::', level, '-', path, '-', key, '-', value);
    }
});

// 3. Iterate at a specific path
json.iterate({
    json: user,
    path: 'preferences', // Iterate at "preferences"
    forEach: (level: number, path: string, key: string, value: any) => {
        console.log('iterating ::', level, '-', path, '-', key, '-', value);
    }
});
```

- **`values(*)`**: It takes as argument a JSON object with the following properties:

  - `json`: The JSON object.

  - `level?`: The deph level.

  - `path?`: The path to the data.

  - `forEach`: The callback function to run on each field or entry.

If you specify both **level** and **path**, then **path** will have the priority. You should use one or another, never both at the same time.

## Facts about OMJ

- The original JSON object is never modified.

- All references between the returned data and the original JSON object are broken by default.

## Author

My name is **Hamet Kévin E. ODOUTAN** (@vinoskey524) and I’ve been doing software development (web, desktop and mobile) since 2017.

I’m not the kind of developer who makes a dumb copy-paste from ChatGPT. No! I like to understand things and know what I’m really doing. 
For me, a real developer should be able to explain every single line of his code.

Don’t ask me which school or university I attended, because I taught myself software engineering using PDFs from **openclassrooms.com**, which was called **siteduzero** when I started.
A sad truth is that you can’t learn coding just by watching videos; you need books!

I’m really passionate about building software, and **I sincerely believe that being a developer is not just a job, but a lifestyle**!

## Other packages

Below are other packages from the same author.

<!-- - **[voicify](https://npmjs.com/package/voicify)**: A highly efficient and blazing fast Text-To-Speech (TTS) software. -->

- **[forestdb](https://npmjs.com/package/forestdb)**: An uncomplicated real-time database with encrypted HTTP and WebSocket server-client communication, fast caching, dataflow and state management, a cross-runtime file system manager, and more, working seamlessly on both frontend and backend.

- **[cococity](https://npmjs.com/package/cococity)**: A lightweight and high-performance library that provides regional data and precise GPS-based localization, without relying on external APIs.

- **[illisible](https://npmjs.com/package/illisible)**: A powerful and high-performance cross-runtime encryption software.

- **[feedlist-react](https://npmjs.com/package/@vinoskey524/feedlist-react)**: A highly efficient and high-performance feeds renderer, designed for React.

- **[feedlist-react-native](https://npmjs.com/package/@vinoskey524/feedlist-react-native)**: A highly efficient and high-performance feeds renderer, designed for React Native (Bare and Expo).

- **[panda](https://npmjs.com/package/@vinoskey524/panda)**: Advanced JSON-based state manager for React and React Native (Bare and Expo).

## Support Me

Please help sustain my open-source projects. Every donation makes a difference.

**[Support Me ❤️](https://hcfrgory.mychariow.com/)**

## Contact Me

Feel free to reach me at [vinoskey524@gmail.com](mailto:vinoskey524@gmail.com). I speak both French and English.

## License

MIT License

Copyright (c) [2025] [Hamet Kévin E. ODOUTAN]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM,
OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

