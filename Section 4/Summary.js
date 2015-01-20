/* Summary
Constructors are just normal functions that are called with the new oper- ator.
You can define your own constructors anytime you want to create multiple objects
with the same properties. You can identify objects created from constructors using
instanceof or by accessing their constructor prop- erty directly.
Every function has a prototype property that defines any properties shared by
objects created with a particular constructor. Shared methods and primitive value
properties are typically defined on prototypes, while all other properties are
defined within the constructor. The constructor property is actually defined on
the prototype because it is shared among object instances.
The prototype of an object is stored internally in the [[Prototype]] property.
This property is a reference, not a copy. If you change the prototype at any point
in time, those changes will occur on all instances because of the way JavaScript
looks up properties. When you try to access a property on an object, that object
is searched for any own property with the name you specify.
If an own property is not found, the prototype is searched.
This searching mechanism means the prototype can continue to change, and object
instances referencing that prototype will reflect those changes immediately.
Built-in objects also have prototypes that can be modified. While it’s not
recommended to do this in production, it can be helpful for experimentation
and proofs of concept for new functionality.
*/