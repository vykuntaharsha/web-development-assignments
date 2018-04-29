# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:

 For the languages that have classes. When an object is created from that class.
 It cannot have any additional methods or properties be created and it will be
 similar to other object created from the same class.  

 Where as in case of JavaScript although an object is created a class. It can
 have its own properties which may differ from the other objects created from
 the same class.

## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:

React uses a virtual DOM to maintain its state modifications. When we alter the
DOM, React doesn't know that we altered and when it tries to render depending
on its state we see different results.

## Question:  What is composition, and why is it often favored over inheritance?

### Answer:

Composition is composing an object with the functions required by its functionality.

While using inheritance, we tend to think of our objects in terms of what they are, but when using object composition we think about what they can do.  

When using inheritance If we want to add additional functionality to a object we have to add to its class and if we require that to similar objects we have to add the functionality in top level class, it gets harder to maintain when the project gets bigger and tightly coupled. So object composition is favoured.

## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:

Because NodeJS uses `require` module as one of its core modules to manage dependencies.

## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:

Because old browsers don't have the modules support as Es5 and prior versions of JS don't have modules.

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:

Side-effect is any noticeable change in application's state outside the called function other than its return value. Such as, modifying global value, printing to console, file  or triggering and external process.  

It can minimized by using pure functions and monads. 
