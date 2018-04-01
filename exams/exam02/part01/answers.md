# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => {
  return data;
});

console.log(data.cats);
```
### Answer:

(answer here)  
Here the author is trying to fetch the data from server and assign it to a
local variable but instead he is assigning it to a __Promise__. The correct way
is to assign the variable inside of __then__ block rather than return the data.

```
fetch('example.com/test')
.then( response => response.json() )
.then( json => {
  const data = dataFromJson;
  console.log(data.cats);
});

```


## Question: What is the scope of a variable in JS?  How does it relate to closures?

### Answer:

(answer here)  
In JS there are two types of scopes global and local. variables declared
outside a function are globally accessible and those declared inside are
locally accessible. `var` is function scoped, a var declared inside a block is
also declared out-side of it. `let` and `const` are block scoped, they can't be
accessed from out-side of the block.  

A closure is the combination of a function and the lexical environment within
which that function was declared. Closures are inner functions that are
returned by an outer function which can have access to the inner variables of
that outer function even after the outer function is done executing.

eg:
```
    function makeEmail( domain ){
        return function generateEmail ( firstName, lastName){
            return firstName + lastName + '@' + domain;
        }
    }

    const createEmail = makeEmail( 'husky.neu.edu');

    console.log( createEmail('harsha', 'vykunta'));
    //expected output = harshavykunta@husky.neu.edu
```
In this example generateEmail is a closure that can access the inner variable
of makeEmail even after the makeEmail's execution.

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes?

### Answer:

(answer here)  
Polyfill is a piece of code, that allows functionality supported in modern
browsers to work in older browsers.  

If we create a function on an object only that object and its children can have
that functionality, but if we create a function on its prototype, that
functionality can be accessed by any new objects created by that prototype.
Here in our case if we create a polyfill on Array's prototype, We can access
that functionality in all our Array objects.

## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer:

(answer here)  
Cross Origin Resource Sharing(CORS) is mechanism that uses HTTP headers to
provide a permission for the client on different origin to access a resource
from the server.

The modern browsers follow this policy to restrict the scripts and other
malicious files from other/unknown origins.

If cors is not allowed the browser only allows the requests to that of same
origin.

## Question: What is the difference between a bundler and a transpiler?

### Answer:

(answer here)  
Bundler:  
It is a tool used to put all the JS code along with the dependencies in one
file. It allows to manage the code into different modules and make workflow
easy.  

Transpiler:  
It is used to convert one version of JS to other to run in browsers for
backward compatibility and use of JS alternatives.
