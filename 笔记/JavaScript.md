[TOC]



## JavaScript笔记

### 6. 面向对象的程序设计

####     6.1：理解对象

#####          6.1.1：属性类型

对象的属性分为**数据类型**和**访问器类型**

**数据类型**具有以下几个特征：

数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4 个描述其行为的
特性。

- [[**Configurable**]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特
  性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的
  这个特性默认值为true。

- [[**Enumerable**]]：表示能否通过for-in 循环返回属性。像前面例子中那样直接在对象上定
  义的属性，它们的这个特性默认值为true。

- [[**Writable**]]：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的
  这个特性默认值为true。

- [[**Value**]]：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，
  把新值保存在这个位置。这个特性的默认值为undefined。

  

  **访问器属性**具有以下几个特性：

  访问器属性不包含数据值；它们包含一对儿getter 和setter 函数（不过，这两个函数都不是必需的）。
  在读取访问器属性时，会调用getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用
  setter 函数并传入新值，这个函数负责决定如何处理数据。

  - [[**Configurable**]]：表示能否通过delete 删除属性从而重新定义属性，能否修改属性的特
    性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为
    true。

  - [[**Enumerable**]]：表示能否通过for-in 循环返回属性。对于直接在对象上定义的属性，这
    个特性的默认值为true。

  - [[**Get**]]：在读取属性时调用的函数。默认值为undefined。

  - [[**Set**]]：在写入属性时调用的函数。默认值为undefined。

    访问器属性不能直接定义，必须使用**Object.defineProperty()**来定义。请看下面的例子。

  `Object.defineProperty(book, "year", {`
  `get: function(){`
  `return this._year;
  },
  set: function(newValue){
  if (newValue > 2004) {
  this._year = newValue;`
  `this.edition += newValue - 2004;`
  `}`
  `}`
  `});`

#####         6.1.2：定义多个属性

定义多个属性的方法为：**Object.defineProperties**

用法：

`Object.defineProperties(book, {`
        `_year: {`
       `value: 2004`
       `},`
       `edition: {`
       `value: 1`
       `},`
       `year: {`
       `get: function(){`

​       `return this._year;
​       },
​       set: function(newValue){
​       if (newValue > 2004) {
​       this._year = newValue;`
`​       this.edition += newValue - 2004;`
`​       }`
`​       }`
`​       }`
`});`

#####         6.1.3：读取属性的特性

根据 **Object.getOwnPropertyDescriptor**判断对象属性是数据属性还是访问器属性，这个方法接收两个参数，一个是属性所在的对象名称，一个是要读取的属性名。这个方法的返回值是一个**对象**。所以要根据这个返回值对象的属性判断他是哪种属性，在这个时候

**返回值对象 = 要读取的属性名**

用法如下：

var descriptor = **Object.getOwnPropertyDescriptor**(book, "_year");

alert(descriptor.get) 如果是是undefined 则他是一个数据属性，如果是一个function ，那么他是一个访问器属性

####     6.2：创建对象

#####         6.2.1：工厂模式

 用函数来封装以特定接口创建对象的细节

函数**createPerson()**能够根据接受的参数来构建一个包含所有必要信息的Person 对象。可以无
数次地调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。

`function createPerson(name, age, job){`
`var o = new Object();`
`o.name = name;`
`o.age = age;`
`o.job = job;`
`o.sayName = function(){`
`alert(this.name);`
`};`
`return o;`
`}`
`var person1 = createPerson("Nicholas", 29, "Software Engineer");`
`var person2 = createPerson("Greg", 27, "Doctor");`

**工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）**



#####         6.2.2构造函数模式

`function Person(name, age, job){`
`this.name = name;`
`this.age = age;`
`this.job = job;`
`this.sayName = function(){`
`alert(this.name);`
`};`
`}`
`var person1 = new Person("Nicholas", 29, "Software Engineer");`
`var person2 = new Person("Greg", 27, "Doctor");`

**Person()**函数取代了**createPerson()**函数

- 没有显式地创建对象
- 直接将属性和方法赋给了this 对象；
- 没有return 语句

构造函数的函数名首字母是大写，而非构造函数则以小写字母开头，主要是为了区分其他函数。

**`instanceof`** **运算符**用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

对象的**constructor** （构造函数）属性最初是用来标识对象类型。

提到检测对象类型，还是instanceof操作符要更可靠一些。

用法：

`alert(person1.constructor == Person); //true`
`alert(person2.constructor == Person); //true`

`alert(person1 instanceof Object); //true`
`alert(person1 instanceof Person); //true`
`alert(person2 instanceof Object); //true`
`alert(person2 instanceof Person); //true`

要创建Person 的新实例，必须使用new 操作符。以这种方式调用构造函数实际上会经历以下4
个步骤：
(1) 创建一个新对象；
(2) 将构造函数的作用域赋给新对象（因此this 就指向了这个新对象）；
(3) 执行构造函数中的代码（为这个新对象添加属性）；
(4) 返回新对象。

###### 6.2.2.1将构造函数当作函数

构造函数与其他函数的唯一区别，就在于调用它们的方式不同。不过，构造函数毕竟也是函数，不
存在定义构造函数的特殊语法。任何函数，只要通过new 操作符来调用，那它就可以作为构造函数；而
任何函数，如果不通过new 操作符来调用，那它跟普通函数也不会有什么两样。

用法示例：

`// 当作构造函数使用`
`var person = new Person("Nicholas", 29, "Software Engineer");`
`person.sayName(); //"Nicholas"`

不用new操作符调用person函数的话属性和方法会添加给window对象

`// 作为普通函数调用`
`Person("Greg", 27, "Doctor"); // 添加到window`
`window.sayName(); //"Greg"`

也可以使用**call()**（或者**apply()**）在某个特殊对象的作用域中调用**Person()**函数。

则该对象 o 添加所有属性和方法

`// 在另一个对象的作用域中调用`
`var o = new Object();`
`Person.call(o, "Kristen", 25, "Nurse");`
`o.sayName(); //"Kristen"`



**构造函数与普通函数的区别**：   

1. 返回值类型的区别：

   构造函数是没有返回值类型 的，
   普通函数是有返回值类型的，即使函数没有返回值，返回值类型也要写上void。

2. 函数名的区别：

   构造函数的函数名必须要与类名一致，

   普通函数的函数名只要符合标识符的命名规则即可。

3. 调用方式的区别：

   构造函数是 在创建对象的时候由jvm调用的。

   普通函数是由我们使用对象调用的，一个对象可以对象多次普通 的函数

4. 作用上的区别：

   构造函数 的作用用于初始化一个对象。
   普通函数是用于描述一类事物的公共行为的。

###### 6.2.2.2构造函数的问题

构造函数模式虽然好用，但也并非没有缺点。使用构造函数的主要问题，就是每个方法都要在每个
实例上重新创建一遍。在前面的例子中，person1 和person2 都有一个名为sayName()的方法，但那
两个方法不是同一个Function 的实例。

**也就是说两个person1 和 person2 的sayName（）方法并不相等**

`alert(person1.sayName == person2.sayName); //false`

然而，创建两个相同示例的函数没有必要；况且有this 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。

所以，我们可以像下面这样，通过把函数定义转移到构造函数外
部来解决这个问题。
`function Person(name, age, job){`
`this.name = name;`
`this.age = age;`
`this.job = job;`
`this.sayName = sayName;`
`}`
`function sayName(){`
`alert(this.name);`
`}`
`var person1 = new Person("Nicholas", 29, "Software Engineer");`
`var person2 = new Person("Greg", 27, "Doctor");`

在这里，可以简单理解为把 sayName 转移到函数外面，通过新对象的this指针指向全局的sayName函数，从而实现两个对象共享全局函数的功能，让两个函数做同一件事。

问题：

1.在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。

2.如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。（通过原型模式解决这些问题）

##### 6.2.3原型模式

概念：我们创建的每个函数都有一个**prototype**（原型）属性，这个属性就是一个指向对象的指针。

而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法

也就是说，那么**prototype** 就是通过调用构造函数而创建的那个对象实例的原型对象。

使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中

用法：

`function Person(){`
`}`
`Person.prototype.name = "Nicholas";`
`Person.prototype.age = 29;`
`Person.prototype.job = "Software Engineer";`
`Person.prototype.sayName = function(){`
`alert(this.name);`
`};`
`var person1 = new Person();`
`person1.sayName(); //"Nicholas"`
`var person2 = new Person();`

`person2.sayName(); //"Nicholas"`
`alert(person1.sayName == person2.sayName); //true`

在这个实例中，**person1.sayName** 和 **person2.sayName** 指向的是同一个属性和同一个**sayName** 函数

###### 6.2.3.1理解原型对象

只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个**prototype**属性，这个属性指向函数的原型对象。在默认情况下，所有原型对象都会自动获得一个**constructor**（构造函数）属性，这个属性包含一个指向**prototype** 属性所在函数的指针。就拿前面的例子来说，**Person.prototype. constructor** 指向**Person**。而通过这个构造函数，我们还可继为原型对象添加其他属性和方法。

**简单理解为： 函数的prototype 属性指向该函数的原型对象。  constructor 指向根据该对象创建出来的新函数。**

例如：

![image-20210107155144555](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210107155144555.png)



`person.prototype = person1.prototype=person2.prototype`

`person.prototype.constructor = person`

`person1.prototype.constructor = person1`

`person2.prototype.constructor = person2`

**person.prototype**就是该例子中的原型对象，而**person**的每个实例（**person1、person2**）都包括了一个内部属性（**prototype**），该属性指向 **person.prototype**这个原型对象，所以可以调用原型对象中的其他属性和方法，如：

**person1.prototype.sayName = person.prototype.sayName**



**isPrototypeOf()**方法：

用法：判断对象之间是否存在这种指向同一原型对象的关系。

`alert(Person.prototype.isPrototypeOf(person1)); //true`

`alert(Person.prototype==person1.prototype); //true`



**Object.getPrototypeOf()**方法：

用法：返回传递参数（函数）的 **prototype** 的值

`Object.getPrototypeOf(person1) == person.prototype //true`

每当代码读取某个对象的属性时，会先搜索该对象给定名字的属性，搜索从对象实例本身开始，如果该对象有这个名字的属性，则正常返回这个属性的值。

如果实例本身并没有该名字的属性，则向prototype指针指向到原型对象搜索，如果该原型对象有这个名字的属性，则正常返回这个属性的值。

例如：

`person1.name = "Greg";`
`alert(person1.name); //"Greg"——来自实例`
`alert(person2.name); //"Nicholas"——来自原型`

当给这个对象实例（person1）的 name 属性给定一个值的时候，原型对象（person.prototype）的name 属性并没有被更改，只是屏蔽阻止 person1 从原型对象中保存过来的同名属性。同理，当删除 person1.name的时候，原型对象中的name属性并不会被删除，而person1.name 也重新指向原型对象中的name 属性。

例如：

`delete person1.name；`

``alert(person1.name); //"Nicholas"——来自原型`



**hasOwnProperty()**方法：

用法：检测一个属性是存在于实例中，还是在原型对象中。

`person1.name = "Greg";`
`alert(person1.name); //"Greg"——来自实例`
`alert(person1.hasOwnProperty("name")); //true`

`delete person1.name;`
`alert(person1.name); //"Nicholas"——来自原型`
`alert(person1.hasOwnProperty("name")); //false`

由此可见，根据返回的布尔值判断这个属性存在，当这个实例没有这个属性的时候返回false，反之也true。

###### 6.2.3.2原型与 in 操作符

**in** 操作符：

**有两种方式使用in 操作符：单独使用和在for-in 循环中使用。**

- 单独使用：

  判断该对象是否带有给定名字的属性，不论是在该对象的实例中，还是在原型对象中。有则返回true，反之false。

  与**hasOwnProperty（）**方法组合使用准确判断该实例对象是否带有给定名字属性。

  用法如下：

  **("name" in person1)**  **//true** : 该对象带有name 属性   **false** : 该对象不带name属性

  **(person1.hasOwnProperty("name"))**  **//true**:该对象属性在实例对象上  **false**: 该对象属性在原型对象上

  **hasPrototypeProperty()**方法（自定义方法）：

  `function hasPrototypeProperty(object, name){`
  `return !object.hasOwnProperty(name) && (name in object);`
  `}`

  用法与 hasOwnProperty（）相似。不过不一样的是如果实例对象有给定名字属性的值，则返回false，给定属性的值在原型对象上时返回true。

- **for-in** 循环中使用：

  在使用 **for-in** 循环时，返回的是所有能通过对象访问的、可枚举的（**enumerated**）属性，其中既包括在实例中的属性，也包括在原型中的属性。即使实例的同名属性屏蔽了原型中的同名属性那么这个**实例属性**也会返回。

  IE8及更早版本之前除外：在ie8更早的版本中，已赋值而屏蔽原型中同名属性的实例属性也不会出现在**for-in**中。

**Object.keys()**方法：

用法：可以枚举对象上所有可以枚举的属性，包括已经屏蔽原型中同名属性的实例属性。

`var keys = Object.keys(Person.prototype);`
`alert(keys); //"name,age,job,sayName"`
`var p1 = new Person();`
`p1.name = "Rob";`
`p1.age = 31;`
`var p1keys = Object.keys(p1);`
`alert(p1keys); //"name,age"`

**简单理解：所谓可枚举的属性就是自己本身带有的且有值的属性，不追溯到原型对象中，所以实例对象的属性返回的是已给定值的name 和 age 属性。**

**get.OwnpropertyNames（）**方法：

用法：返回所有的可枚举和不可枚举的实例属性（包括**constructor**属性）

`var keys = Object.getOwnPropertyNames(Person.prototype);`
`alert(keys); //"constructor,name,age,job,sayName"`

###### 6.2.3.3更简单的原型语法

在前面的例子中，没添加一个属性或者方法都要输入一次 person.prototype ，所以为了减少不不要的输入，也为了视觉上更好的封装原型的功能，更常见的是用一个包含所有属性和方法的对象字面量来重写整个原型对象。如下：



`function	Person(){`

`}`

以下为两种语法对比


`Person.prototype.name = "Nicholas";`
`Person.prototype.age = 29;`
`Person.prototype.job = "Software Engineer";`
`Person.prototype.sayName = function(){`
`alert(this.name);`
`};`



`Person.prototype = {`

​	`name : "Ni",`

​	`age :15,`

​	 `job:"teacher",`

​	`sayName:function(){`

​		`alert(this.name);`	

​	`}`

`}`

**每创建一个函数，会同时创建这个函数的 prototype （原型）属性和 constructor （构造函数） 属性**

在新的原型语法中，我们把  **Person.prototype** 设置为一个对象字面量形式创建出来的新对象。最终结果相同。

但是 **constructor** （构造函数）属性不再指向 **Person** 。在这个语法中，本质上是完全重写了默认的 prototype 对象，所以 **constructor** 属性也变成 新对象（**Person.prototype**） 的**constructor**属性（指向Object构造函数）。

如果**constructor**属性真的特别重要，可以**constructor：Person**这样直接让**constructor**属性直接指向**Person**构造函数

写法：

`Person.prototype = {`

​	`constructor：Person，`

​	`name : "Ni",`

​	`age :15,`

​	 `job:"teacher",`

​	`sayName:function(){`

​		`alert(this.name);`	

​	`}`

`}`

以上这种写法，会让 constructor 属性变成可枚举状态，原来的默认情况下是不可以枚举的。

所以我们可以用 **Object.defineProperty** 方法重构

`function Person(){`
`}`
`Person.prototype = {`
`name : "Nicholas",`
`age : 29,`
`job : "Software Engineer",`
`sayName : function () {`
`alert(this.name);`
`}`
`};`

`//重设构造函数，只适用于ECMAScript 5 兼容的浏览器`
`Object.defineProperty(Person.prototype, "constructor", {`
`enumerable: false,`
`value: Person`
`});`

###### 6.2.3.4原型的动态性

由于我们在原型查找值的过程本质上就是一次搜索，所以我们每次对原型对象的修改都可以从实例上反映出来。（即使是先创建实例，后修改原型对象，那这个实例也同样如此） 示例 如下：

`var friend = new Person();`
`Person.prototype.sayHi = function(){`
`alert("hi");`
`};`
`friend.sayHi(); //"hi"（没有问题！）`

尽管可以随时为原型添加属性和方法，并且修改能立即从实例中反映，但如果是重写整个原型对象就不一样了。当调用构造函数时会为实例创建一个**prototype**指针，而把原型修改为另一个对象就等于切断了构造函数与最初原型之间的联系。

**实例中的指针仅指向原型而非构造函数。**

`function Person(){`
`}`
`var friend = new Person();`
`Person.prototype = {`
`constructor: Person,`
`name : "Nicholas",`
`age : 29,`
`job : "Software Engineer",`
`sayName : function () {`
`alert(this.name);`
`}`
`};`

`var person1 = new Person();`

``friend.sayName(); //error`

`person1.sayName();//Nicholas`

如图所示：

![image-20210108154735782](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210108154735782.png)

图中可以看出重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；它们引用的仍然是最初的原型。

###### 6.2.3.5原生对象的原型

原型模式的重要性不仅体现在创建自定义类型方面，就连所有原生的引用类型，都是采用这种模式创建的。所有原生引用类型（Object、 Array、 String等等）都在其构造函数的原型上定义了方法。

例如：

`alert（typeof Array.prototype.sort） ；// function`

`alert（typeof String.prototype.sunstring）； //function`

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新的方法。可以像修改自定义对象的原型一样修改原生对象的原型，因此，可以随时添加方法。如下：

`String.prototype.star = function （text）{`

 `return this.indexOf（text） == 0；`

`}`                       **该方法判断传入的参数（text）是不是 位于 msg 字符串的开头位置**

`var msg = "hello world";`

`alert（msg.star("hello")）；// true`

**尽管可以这样做，但我们不推荐在产品化的程序中修改原生对象的原型。如果因**
**某个实现中缺少某个方法，就在原生对象的原型中添加这个方法，那么当在另一个支**
**持该方法的实现中运行代码时，就可能会导致命名冲突。而且，这样做也可能会意外**
**地重写原生方法。**



**indexOf**（）：

第一个参数是一个字符，查找这个字符在字符串中的**从前到后**位置，第二个参数是字符串的下标，表示从这个下标开始向后查找。

**lastindexOf**（）：

第一个参数是一个字符，查找这个字符在字符串中的**从后到前**位置，第二个参数是字符串的下标，表示从这个下标开始向前查找。

###### 6.2.3.6原型对象的问题

原型对象也不是没有缺点，首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值。但这不是原型最大的问题，原型模式最大的问题是由其共享的本性所导致的。

原型中很多属性是被实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去，毕竟（如前面的例子所示），通过在实例上添加一个同名属性，可以隐藏原型中的对应属性。然而，对于包含引用类型值的属性来说，问题就比较突出了。 如下：

`function Person(){`
`}`
`Person.prototype = {`
`constructor: Person,`
`name : "Nicholas",`
`age : 29,`
`job : "Software Engineer",`
`friends : ["Shelby", "Court"],`
`sayName : function () {`
`alert(this.name);`
`}`
`};`
`var person1 = new Person();`
`var person2 = new Person();`
`person1.friends.push("Van");`
`alert(person1.friends); //"Shelby,Court,Van"`
`alert(person2.friends); //"Shelby,Court,Van"`
`alert(person1.friends === person2.friends); //true`

**Person.prototype** 对象有一个名为friends 的属性，该属性包含一个字符串数组。然后，
创建了**Person** 的两个实例。接着，修改了**person1.friends** 引用的数组，向数组中添加了一个字符
串。由于**friends** 数组存在于**Person.prototype** 而非**person1** 中，所以刚刚提到的修改也会通过
person2.friends（与**person1.friends** 指向同一个数组）反映出来。假如我们的初衷就是像这样
在所有实例中共享一个数组，那么对这个结果我没有话可说。可是，实例一般都是要有属于自己的全部
属性的。而这个问题正是我们很少看到有人单独使用原型模式的原因所在。

##### 6.2.4组合使用构造函数和原型模式

创建自定义类型最常见的方式，是组合使用**构造函数**与**原型模式**。**构造函数**用于定义**实例属性**，而**原型模式**定义**方法和共享的属性**。结果  每个实例都有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存，另外，这种混成模式还支持向构造函数传递参数；如下：

`function Person(name, age, job){`
`this.name = name;`
`this.age = age;`
`this.job = job;`
`this.friends = ["Shelby", "Court"];`
`}                    // 构造函数`
`Person.prototype = {`
`constructor : Person,`
`sayName : function(){`
`alert(this.name);`
`}`
`}                   //原型模式`
`var person1 = new Person("Nicholas", 29, "Software Engineer");`
`var person2 = new Person("Greg", 27, "Doctor");`
`person1.friends.push("Van");`
`alert(person1.friends); //"Shelby,Count,Van"`
`alert(person2.friends); //"Shelby,Count"`
`alert(person1.friends === person2.friends); //false`
`alert(person1.sayName === person2.sayName); //true`

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性constructor 和方
法sayName()则是在原型中定义的。而修改了person1.friends（向其中添加一个新字符串），并不
会影响到person2.friends，因为它们分别引用了不同的数组。

##### 6.2.5动态原型模式

动态原型模式把所有的信息都封装在构造函数模式中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。也就是说可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

`function Person(name, age, job){`
`//属性`
`this.name = name;`
`this.age = age;`
`this.job = job;`

`//方法`
`if (typeof this.sayName != "function"){`
`Person.prototype.sayName = function(){`
`alert(this.name);`
`};`
`}`
`}`
`var friend = new Person("Nicholas", 29, "Software Engineer");`
`friend.sayName();`

在这里 **sayName** 方法不存在的情况下才会在**原型对象**中添加**sayName** 方法，此后，原型已经初始化，就不需要在做什么更改了，而根据原型的特性，在这里对原型做的更改，会立即反应到实例中。 

因此，可以说这种方法确实可以说非常完美，其中 if  语句检查的可以是初始化之后应该存在的任何属性和方法 不比用if  语句检查每个属性和每个方法，只要检查其中之一就可以了。对于采用这种模式创建的对象，还可以使用**instanceof** 操作符确定它的类型。

##### 6.2.6寄生构造函数模式

这种模式的基本思想是创建一个**函数**，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的**对象**；但从表面上看，这个函数就是一个普通的构造函数。

`function Person(name, age, job){`
`var o = new Object();`
`o.name = name;`
`o.age = age;`
`o.job = job;`
`o.sayName = function(){`
`alert(this.name);`
`};`
`return o;`
`}`
`var friend = new Person("Nicholas", 29, "Software Engineer");`
`friend.sayName();`

**Person** 函数创建了一个新对象，并以相应的属性和方法初始化该对象，然后又返回了这个对象。除了使用new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个return 语句，可以重写调用构造函数时返回的值。这个模式可以在特殊的情况下用来为对象创建构造函数。

---------------------------------------------------------------------------------------------------------------------------

假设我们想创建一个具有额外方法的特殊数组。由于不能直接修改**Array** 构造函数，因此可以使用这个模式。

`function SpecialArray(){`
`//创建数组`
`var values = new Array();`
`//添加值`
`values.push.apply(values, arguments);`
`//添加方法`
`values.toPipedString = function(){`
`return this.join("|");`
`};`
`//返回数组`
`return values;`
`}`
`var colors = new SpecialArray("red", "blue", "green");`
`alert(colors.toPipedString()); //"red|blue|green"`

关于**寄生构造函数模式**，有一点需要说明：首先，返回的对象与构造函数或者与构造函数的原型属性之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，不能依赖instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情
况下，不要使用这种模式。

##### 6.2.3.7稳妥构造函数模式

道格拉斯·克罗克福德（Douglas Crockford）发明了JavaScript 中的稳妥对象（durable objects）这
个概念。所谓**稳妥对象**，指的是没有**公共属性**，而且其方法也不引用this 的对象。稳妥对象最适合在
一些安全的环境中（这些环境中会禁止使用this 和new），或者在防止数据被其他应用程序（如Mashup
程序）改动时使用。

稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：

一是新创建对象的实例方法不引用this；

二是不使用new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面的Person 构造函数重写如下。

`function Person(name, age, job){`

``//创建要返回的对象`
`var o = new Object();`

`//可以在这里定义私有变量和函数`
`//添加方法`
`o.sayName = function(){`
`alert(name);`
`};`
`//返回对象`
`return o;`
`}`
注意，在以这种模式创建的对象中，除了使用sayName()方法之外，没有其他办法访问name 的值。
可以像下面使用稳妥的Person 构造函数。
`var friend = Person("Nicholas", 29, "Software Engineer");`
`friend.sayName(); //"Nicholas"`
这样，变量**friend** 中保存的是一个稳妥对象，而除了调用**sayName()**方法外，没有别的方式可
以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传
入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环
境——例如，ADsafe（www.adsafe.org）和Caja（http://code.google.com/p/google-caja/）提供的环境——
下使用。

#### 6.3：继承

继承有两种方式：**接口继承**和**实现继承**。接口继承只继承方法签名，而实现继承则继承实际的方法。如前所述，由于ECMAScript  中无法实习接口继承。 ECMAScript  中只支持实现继承，而且其实现继承主要是依靠原型链来实现的。

##### 6.3.1原型链继承

将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

**构造函数 原型 实例  之间的关系：每个构造函数都有一个原型对象（prototype），原型对象都包含有一个指向构造函数的指针（constructor），而实例都包含一个指向原型对象的内部指针。**

假如我们让原型对象等于另一个原型的实例，此时，原型对象将包含一个指向另一个原型的指针，相应的，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立，如此层层推进，就构成了实例与原型的链条。

实现原型链有一种基本模式，其代码大致如下。
`function SuperType(){`
`this.property = true;`
`}`

`SuperType.prototype.getSuperValue = function(){`
`return this.property;`
`};`
`function SubType(){`
`this.subproperty = false;`
`}`
`//继承了SuperType`
`SubType.prototype = new SuperType();`
`SubType.prototype.getSubValue = function (){`
`return this.subproperty;`
`};`
`var instance = new SubType();`
`alert(instance.getSuperValue()); //true`

以上代码定义了两个类型： **SuperType**  和  **SubType** 。 每个类型中分别有一个属性和方法，它们的主要区别是 **SubType**  继承了  **SuperType**， 而继承是通过创建**SuperType**的实例，并将该实例赋值给 **SubType**的原型对象（**SubType.prototype**） 实现的。  实现的本质是通过重写 原型对象，代之以新类型的实例。  也就是说原来存在于**SuperType**的属性和方法也通过继承的方式 也存在于**SubType** 中，在确认了继承的关系后，又给 **SubType.prototype**添加了一个方法，这样就在继承了 **SuperType** 的属性和方法的基础上又添加了一个新的方法。  如下图：

![image-20210109152416167](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210109152416167.png)



在这里没有使用**SubType**提供的默认原型，而是提供了一个新原型，这个原型就是 **SuperType** 实例，于是新原型不仅带有 **SuperType** 的所有属性和方法，其内部还带有指向 **SuperType** 原型的指针，于是： **instance**  指向 **SubType**的原型，**SubType** 的原型又指向 **SuperType** 的原型。 **getSuperValue（）**方法仍然存在于**SuperType.prototype** 里，但**property** 位于**SubType.prototype**中，这是因为 **getSuperType()** 是一个原型方法，而**property**是一个实例属性。

注意： instance.constructor 指向的是SuperType，这是因为SubType.prototype 被重写了的缘故。通过原型链继承，本质上扩展了原型搜索机制。当以读取模式访问一个实例属性的时候，会先搜索实例的同名属性，如果没有的话会向原型对象搜索，所以这里的搜索步骤为： 

- 搜索 **instance** 的 **getSuperValue**的方法
- 搜索**SubType.prototype** 中的 **getSuperValue** 方法
- 搜索**SuperType.prototype** 中的**getSuperValue** 方法

在找不到属性或方法的时候，直到搜索到原型链的顶端才会停下来。

###### 6.3.1.1 别忘记默认的原型

所有的引用类型默认继承Object ，而这个继承也是通过原型链实现的。所有函数的默认的原型都是Object 实例。

![image-20210109161837052](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210109161837052.png)

###### 6.3.1.2确定原型和实例的关系

有两种方法确定原型和实例的关系分别是  **instanceof()**  和  **isprototypeof()**

**instanceof()**:  判断某实例是不是某类型的实例。（ intance  instanceof  SuperType ）只有该类型或者该类型的原型链中包含这个实例都返回true。

**isprototypeof()**：判断某类型原型中是否包含某实例。（SuperType isprototypof instance）只有该类型原型或者原型链上有这个实例，都会返回true。

###### 6.3.1.3谨慎的定义方法

子类型有时候要更改原型原有的或者增加没有的 方法，但不管怎么样，给原型添加方法要放在替换实例的句子之后。

`function SuperType(){`
`this.property = true;`
`}`
`SuperType.prototype.getSuperValue = function(){`
`return this.property;`
`};`
`function SubType(){`
`this.subproperty = false;`
`}`
`//继承了SuperType`
`SubType.prototype = new SuperType();`
`//添加新方法`
`SubType.prototype.getSubValue = function (){`
`return this.subproperty;`
`};`
`//重写超类型中的方法`
`SubType.prototype.getSuperValue = function (){`
`return false;`
`};`
`var instance = new SubType();`
`alert(instance.getSuperValue()); //false`

还有就是不能用对象字面量（SubType.prototyp）创建原型方法，因为这样做会重写原型链。

`function SuperType(){`
`this.property = true;`
`}`
`SuperType.prototype.getSuperValue = function(){`
`return this.property;`
`};`
`function SubType(){`
`this.subproperty = false;`
`}`
`//继承了SuperType`
`SubType.prototype = new SuperType();`
`//使用字面量添加新方法，会导致上一行代码无效`
`SubType.prototype = {`
`getSubValue : function (){`
`return this.subproperty;`
`},`
`someOtherMethod : function (){`
`return false;`
`}`
`};`
`var instance = new SubType();`
`alert(instance.getSuperValue()); //error!`

###### 6.3.1.4原型链的问题

- 其中最主要的问题来自引用类型的值的原型，包含引用类型值的原型属性会被所有实例共享，而这也是为什么在构造函数中，而不是原型对象中定义属性的原因。在通过原型来实现继承时，原型实际上回变成另一个类型的实例，于是原来的实例属性也变成了原型属性。（简单理解就是通过实例修改原型的方法会导致后续的实例引用的是修改后的原型方法）

  `function SuperType(){`
  `this.colors = ["red", "blue", "green"];`
  `}`
  `function SubType(){`
  `}`
  `//继承了SuperType`
  `SubType.prototype = new SuperType();`
  `var instance1 = new SubType();`
  `instance1.colors.push("black");`
  `alert(instance1.colors); //"red,blue,green,black"`
  `var instance2 = new SubType();`
  `alert(instance2.colors); //"red,blue,green,black"`

- 在创建子类型的实例时，没办法向超类型的构造函数中传递参数，应该说是没办法在不影响所有原型实例的前提下给超类型的构造函数传递参数。

##### 6.3.2借用构造函数

借用构造函数（**constructor stealing**）的基本思想想当简单，即在子类型构造函数的内部调用超类型构造函数。而函数只不过是在特定环境运行代码的对象，因此可以通过 **call**（）和 **apply**（）方法在（将来）新建的对象上执行构造函数。

`function SuperType(){`
`this.colors = ["red", "blue", "green"];`
`}`
`function SubType(){`
`//继承了SuperType`
`SuperType.call(this);`
`}`
`var instance1 = new SubType();`
`instance1.colors.push("black");`
`alert(instance1.colors); //"red,blue,green,black"`
`var instance2 = new SubType();`
`alert(instance2.colors); //"red,blue,green"` 

我们是通过 call 或者 **apply** 方法在未来将要新创建的**SubType** 实例 的环境下调用**SuperType** 构造函数。这样一来，就会在新的SubType对象上执行 **SuperType**（）函数中定义的所有对象初始化代码。结果就是每个实例都有自己的color属性的副本。

###### 6.3.2.1传递参数

相对于原型链而言，借用构造函数有一个很大的优势，就是可以在子类型构造函数中向超类型构造函数传递参数。

`function SuperType(name){`
`this.name = name;`
`}`
`function SubType(){`
`//继承了SuperType，同时还传递了参数`
`SuperType.call(this, "Nicholas");`
`//实例属性`
`this.age = 29;`
`}`
`var instance = new SubType();`
`alert(instance.name); //"Nicholas";`
`alert(instance.age); //29`

**SuperType** 只接受一个**name**参数。该参数会直接赋值给一个属性，在 **SubType** 构造函数内部调用**Supertype** 函数的时候，实际是为**SubType** 的实例设置了 **name** 属性。为了 确保 **SuperType**不会重写子类型的属性，所以尽量在调用超类型构造函数之后，再添加子类型实例中的属性。

###### 6.3.2.2借用构造函数的问题

如果仅仅是用构造函数，那么也将无法避免构造函数中存在的问题——方法都在构造函数中定义，函数的复用性无从谈起。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。

##### 6.3.3组合继承

组合继承，也叫伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥两者之长的一种模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。如下：

`function SuperType(name){`
`this.name = name;`
`this.colors = ["red", "blue", "green"];`
`}`
`SuperType.prototype.sayName = function(){`
`alert(this.name);};`
`function SubType(name, age){`
`//继承属性`
`SuperType.call(this, name);`
`this.age = age;`
`}`
`//继承方法`
`SubType.prototype = new SuperType();`
`SubType.prototype.constructor = SubType;`
`SubType.prototype.sayAge = function(){`
`alert(this.age);`
`};`
`var instance1 = new SubType("Nicholas", 29);`
`instance1.colors.push("black");`
`alert(instance1.colors); //"red,blue,green,black"`
`instance1.sayName(); //"Nicholas";`
`instance1.sayAge(); //29`
`var instance2 = new SubType("Greg", 27);`
`alert(instance2.colors); //"red,blue,green"`
`instance2.sayName(); //"Greg";`
`instance2.sayAge(); //27`

SuperType 定义了两个属性 name 和 colors 。 SuperType的原型定义了一个sayName() 方法。SubType 构造函数在调用 SuperType 函数的时候传入了 name 参数，紧接着又定义了它自己的属性age 。 然后将SuperType的实例赋值给SubType的原型，然后又在该原型上定义了方法sayAge()，这样一来，就可以让两个不同的SubType实例既分别拥有自己的属性 —— 包括colors 属性，又可以使用相同的方法。

##### 6.3.4 原型式继承

这种方法并没有使用严格意义上的构造函数。想法是通过借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。

`function object(o){`
`function F(){}`
`F.prototype = o;`
`return new F();`
`}`

这个方法先是创建了一个临时性的构造函数，然后将传入的参数作为这个构造函数的原型，最后返回了这个临时类型的新实例。从本质上讲 **Object（）**对传入其中的对象执行了一次浅复制。如下：

`var person = {`
`name: "Nicholas",`
`friends: ["Shelby", "Court", "Van"]`
`};`
`var anotherPerson = object(person);`
`anotherPerson.name = "Greg";`
`anotherPerson.friends.push("Rob");`
`var yetAnotherPerson = object(person);`
`yetAnotherPerson.name = "Linda";`
`yetAnotherPerson.friends.push("Barbie");`
`alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"`

这种原型式继承，要求必须有一个对象可以作为另一个对象的基础。如果有这个一个对象的话，可以将它传递给Object 函数，然后再根据具体需求对得到的对象加以修改即可。

ECMAScript5 通过新增**Object.create()** 方法规范了原型式继承，这个方法接收两个参数，第一个是用作新对象原型的对象和（可选）一个为新对象定义额外属性的对象。在只传入第一个参数的情况下 Object.create() 方法和 Object()方法的行为相同。在传入了两个参数的时候行为过程如下：

`var person = {`
`name: "Nicholas",`
`friends: ["Shelby", "Court", "Van"]`
`};`
`var anotherPerson = Object.create(person, {`
`name: {`
`value: "Greg"`
`}`
`});`
`alert(anotherPerson.name); //"Greg"`

##### 6.3.5寄生式继承

寄生式继承是和原型式继承思路紧密相关的一种思路，并且同样也是克罗克福德推广的。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式增强对象，最后再像真的是它做了所有工作一样返回对象。如下：

`function createAnother(original){`
`var clone = object(original); //通过调用函数创建一个新对象`
`clone.sayHi = function(){ //以某种方式来增强这个对象`
`alert("hi");`
`};`
`return clone; //返回这个对象`
`}`

在这个例子中接收了一个参数，也就是将要作为新对象基础的对象，然后把这个对象传递给 Object 函数，将返回的结果赋值给clone。再为 clone 对象添加一个新方法sayHi，最后返回clone 对象。可以像下面这样使用 createAnother()函数：

`var person = {`
`name: "Nicholas",`
`friends: ["Shelby", "Court", "Van"]`
`};`
`var anotherPerson = createAnother(person);`
`anotherPerson.sayHi(); //"hi"`

**anotherPerson** 既有**person** 所有的属性和方法，也有自己从**createAnother** 哪里继承的 **sayHi()** 方法

##### 6.3.6寄生组合式继承

组合继承是js中最常用的继承模式，它的问题就是无论在什么情况下，都会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是在子类型原型内部。子类型最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数时重写这些属性。如下：

`function SuperType(name){`

`this.name = name;`

`this.colors = ["red","black"];`

`}`

`SuperType.prototype.sayName = function(){`

`alert(this.name);`

`}`

`function SubType(name,age){`

 `SuperType.call(this,name);`

`this.age = age;`

`}`

`SubType.prototype = new SuperType();`

`SubType.prototype.constructor = SubType;`

`SubType.prototype.sayAge = function(){`

`alert(this.age);`

`}`

所谓寄生组合式继承，即通过借用构造函数的来继承属性，通过原型链的混成形式来继承方法。其背后的思路是；不必为了制定子类型的原型而调用超类型的构造函数，我们所需要的的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后将结果指定给子类型的原型。寄生组合式继承的基本模式如下：

`function inheritPrototype(subType, superType){`
`var prototype = object(superType.prototype); //创建对象`
`prototype.constructor = subType; //增强对象`
`subType.prototype = prototype; //指定对象`
`}`

这个实例中的inheritPrototype()函数实现了寄生组合式继承的最简单形式。这个函数接收两个参数：第一个是子类型构造函数，第二个是超类型构造函数。在函数内部，第一个是创建超类型原型的一个副本。第二步是为创建的副本添加constructor 属性，从而弥补因重写原型而失去的默认的constructor属性。 最后一步是为创建的新对象赋值给子类型的原型。这样我们就可以用inheritPrototype()函数的语句，去替换前面例子中为子类型原型赋值的语句。如下：

`function SuperType(name){`
`this.name = name;`
`this.colors = ["red", "blue", "green"];`
`}`
`SuperType.prototype.sayName = function(){`
`alert(this.name);`
`};`
`function SubType(name, age){`
`SuperType.call(this, name);`
`this.age = age;`
`}`
`inheritPrototype(SubType, SuperType);`              

 **替换了  SubType.prototype = new Supertype(); **

​           **SubType.prototype.constructor = SubType;**
`SubType.prototype.sayAge = function(){`
`alert(this.age);`
`};`

![image-20210111151719103](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210111151719103.png)



这个例子的高效率提现在它只调用了一次SuperType 构造函数，并且因此避免了在 SubType.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeof() 。 

#### 6.4：小结

ECMAScript 支持面向对象编程，但不使用类或者接口。对象可以在执行代码的过程中创建和增强，因此具有动态性而非严格定义的实体。在没有类的情况下，可以采用下列模式创建对象。

- 工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来被构造函数模式取代
- 构造函数模式，可以创建自定义引用类型，可以像创建内置对象实例一样使用 new 操作符。不过，构造函数也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数。
- 原型模式，使用构造函数的prototype属性来指定那些应该共享的属性和方法。组合使用构造函数和原型模式时，使用构造函数定义实例属性，使用原型定义共享的属性和方法。

JavaScript 主要通过原型链实现继承，原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与基于类的继承很相似。原型链的问题是对象实例共享所有继承的属性和方法，因此不宜单独使用。解决这个问题的技术是借用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都具有自己的属性，同时还能保证只使用构造函数来定义类型。使用最多的继承模式是组合继承，这种模式使用
原型链继承共享的属性和方法，而通过借用构造函数继承实例属性。

- 原型式继承，可以再不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。
- 寄生式继承，与原型式继承非常相似，也是基于某个对象或某个信息创建一个对象，然后增强对象，最后返回对象。为了解决组合继承由于多次调用超类型函数而导致的低效率问题，可以将这个模式与组合模式一起使用。
- 寄生组合式继承，集寄生式继承和组合继承的优点于一身，是实现基于类型继承的最有效方式。

### 7 函数表达式

函数表达式是js中 既强大又容易令人困惑的特性。定义函数的方式有两种，一种是函数声明，一种是函数表达式。**函数声明**的语法是这样的：

`function functionName(arg0, arg1, arg2) {`
`//函数体`
`}`

**函数声明**的一个重要特征就是**函数声明提升**，意思是执行代码前会先读取函数声明，这样就意味着可以把函数声明放在调用它的语句后面，如下：

`sayHi();`
`function sayHi(){`
`alert("Hi!");`
`}   //并不会报错`

**函数表达式**有几种不同的语法形式，下面是最常见的一种：

`var functionName = function(arg0, arg1, arg2){`
`//函数体`
`};`

这种形式看起来好像是常规的变量赋值语句，即创建一个函数并将它赋值给变量 functionName。这种情况下创建的函数叫做匿名函数，因为function 后面没有跟标识符，匿名函数的name属性是空字符串。 函数表达式与其他表达式一样，使用前必须先赋值，在赋值前调用会报错。理解函数提升的关键就是理解函数声明与函数表达式之间的区别。例如：

`if(condition){`
`function sayHi(){`
`alert("Hi!");`
`}`
`} else {`
`function sayHi(){`
`alert("Yo!");`
`}`
`}`



`//可以这样做`
`var sayHi;`
`if(condition){`
`sayHi = function(){`
`alert("Hi!");`
`};`
`} else {`
`sayHi = function(){`
`alert("Yo!");`
`};`
`}`

两组代码中第一个不推荐使用，表面上看效果类似，但是在第一个在ECMAScript中属于无效语法，js引擎会尝试修正错误，将其转换为合理状态，大多数浏览器会返回第二个声明，忽略掉 condition。所以不推荐这么写， 而第二组代码使用函数表达式就不会有什么问题，不同的函数会通过condition被赋值给sayHi。

能够创建函数再赋值给变量，也就能把函数作为其他函数的值返回。如下：

`function createComparisonFunction(propertyName) {`
`return function(object1, object2){`
`var value1 = object1[propertyName];`
`var value2 = object2[propertyName];`
`if (value1 < value2){`
`return -1;`
`} else if (value1 > value2){`
`return 1;`
`} else {`
`return 0;`
`}`
`};`
`}`

createComparisonFunction()就返回了一个匿名函数。返回的函数可能会被赋值给一个变量，
或者以其他方式被调用；不过，在createComparisonFunction()函数内部，它是匿名的。在把函数
当成值来使用的情况下，都可以使用匿名函数。

#### 7.1 递归

递归函数是在一个函数通过名字调用自身的情况下构成的。如下：

`function factorial(num){`
`if (num <= 1){`
`return 1;`
`} else {`
`return num * factorial(num-1);`
`}`
`}`

这个函数虽然在表面看来没什么问题，但是进行以下的操作就会导致它出错。

`var anotherFactorial = factorial;`
`factorial = null;`
`alert(anotherFactorial(4)); //出错！`

以上代码是将 **factorial()**函数保存在变量 **anotherFactorial** 中，然后将 **factorial** 变量设置为null，结果指向原始函数的引用只剩下一个。但在接下来调用 **anotherFactorial ()**时，由于必须执行 **factorial()** ，而**factorial** 已经不再是函数，所以就会导致错误。在这种情况下，使用**arguments.callee** 可以解决这个问题。 arguments.callee 是一个指向正在执行的函数的指针，因此用它可以来实现对函数的递归调用，如下：

`function factorial(num){`
`if (num <= 1){`
`return 1;`
`} else {`
`return num * arguments.callee(num-1);`
`}`
`}`

通过使用**arguments.callee** 代替函数名，可以确保无论怎样调用函数都不会出问题。因此，在编写递归函数时，使用**arguments.callee** 总比使用函数名更保险。

但在严格模式下，不能通过脚本访问arguments.callee，访问这个属性会导致错误。不过，可
以使用命名函数表达式来达成相同的结果。例如：
`var factorial = (function f(num){`
`if (num <= 1){`
`return 1;`
`} else {`
`return num * f(num-1);`
`}`
`});`
以上代码创建了一个名为**f()**的命名函数表达式，然后将它赋值给变量factorial。即便把函数赋值给了另一个变量，函数的名字f 仍然有效，所以递归调用照样能正确完成。这种方式在严格模式和非严格模式下都行得通。

#### 7.2 闭包

**简单来说就是函数之间沟通的桥梁。**

有不少人总是搞不清匿名函数和闭包两个概念，因此经常混用。闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数，如下：

`function createComparisonFunction(propertyName) {`
`return function(object1, object2){`

`var value1 = object1[propertyName];`                 
`var value2 = object2[propertyName];`

`if (value1 < value2){`
`return -1;`
`} else if (value1 > value2){`
`return 1;`
`} else {`
`return 0;`
`}`
`};`
`}`

中间突出的两行代码是**内部函数（一个匿名函数）**的代码，这两行代码访问了外部函数中的变量 prototypName 。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量 prototypeName。之所以还能访问这个变量，是因为内部函数的作用域链中包含 **createComparisonFunction()** 的作用域。

在函数的执行过程中，为读取和写入变量的值，就需要在作用域链中查找变量。如下：

`function compare(value1, value2){`
`if (value1 < value2){`
`return -1;`
`} else if (value1 > value2){`
`return 1;`
`} else {`
`return 0;`
`}`
`}`
`var result = compare(5, 10);`

以上代码先定义了 **compare（）**函数，然后又在全局作用域中调用了它。当调用 **compare ()**时，会创建一个包含 **arguments** 、**value1** 和 **value2** 的活动对象。全局执行环境的变量对象（包含result和compare（）在**compare()**执行环境的作用域链中则处于第二位。

![image-20210112110356003](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210112110356003.png)

后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像 **compare()**函数这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建 **compare()**函数时，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部的 **[[Scope]]** 属性中。 当调用 **compare()** 函数时，会为函数创建一个执行环境，然后通过复制函数的 **[[Scope]]** 属性中的对象构建起执行环境的作用域链。。对于这个例子中**compare()**函数的执行环境而言，其作用域链中包含两个变量对象：**本地活动对象**和**全局变量对象**。显然，作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。但是闭包的情况不同：

在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在createComparisonFunction()中定义的所有变量。更为重要的是，createComparisonFunction()函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当createComparisonFunction()函数返回后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁，例如：
`//创建函数`
`var compareNames = createComparisonFunction("name");`
`//调用函数`
`var result = compareNames({ name: "Nicholas" }, { name: "Greg" });`
`//解除对匿名函数的引用（以便释放内存）`
`compareNames = null;`
首先，创建的比较函数被保存在变量compareNames 中。而通过将compareNames 设置为等null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域（除了全局作用域）也都可以安全地销毁了。

![image-20210112142826804](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210112142826804.png)

##### 7.2.1闭包与变量

作用域链的这种配置机制有一个副作用，闭包只能取得包含函数中任何变量的最后一个值。因为闭包保存的是整个变量对象，而不是某个特殊的变量。如下：

`function createFunctions(){`
`var result = new Array();`
`for (var i=0; i < 10; i++){`
`result[i] = function(){`
`return i;`
`};`
`}`
`return result;`
`}`

表面上看，似乎每个函数都应该返回自己的索引值，即，即位置0 的函数返回0，位置1 的函数返回1，以此类推。但是因为都是引用的 i ，而后面的i 的值会覆盖前面循环的值，所以最后每个函数内部i 的值都是10 。 我们可以通过创建另一个匿名函数强制性让闭包的行为符合预期。如下：

`function createFunctions(){`
`var result = new Array();`
`for (var i=0; i < 10; i++){`
`result[i] = function(num){`
`return function(){`
`return num;`
`};`
`}(i);`
`}`
`return result;`
`}`

在重写了前面的**createFunctions()**函数后，每个函数就会返回各自不同的索引值了。在这个版本中，我们没有直接把闭包赋值给数组，而是定义了一个匿名函数，并将立即执行该匿名函数的结果赋给数组。这里的匿名函数有一个参数num，也就是最终的函数要返回的值。在调用每个匿名函数时，我们传入了变量i。由于函数参数是按值传递的，所以就会将变量**i** 的当前值复制给参数**num**。而在这个匿名函数内部，又创建并返回了一个访问**num** 的闭包。这样一来，**result** 数组中的每个函数都有自己num 变量的一个副本，因此就可以返回各自不同的数值了。

##### 7.2.2 关于this对象

在闭包中使用 **this** 对象可能会导致一些问题，因为**this**对象是在运行时基于函数的执行环境绑定的：在全局函数中，**this**等于**window**，而当函数被作为某个对象的方法调用时，**this** 等于那个对象。

`var name = "The Window";`
`var object = {`
`name : "My Object",`
`getNameFunc : function(){`
`return function(){`
`return this.name;`
`};`
`}`
`};`
`alert(object.getNameFunc()()); //"The Window"（在非严格模式下）`

因为每个函数在被调用时都会自动获得两个特殊变量：this 和 **arguments**。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量。  不过把外部函数的**this** 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了：

`var name = "The Window";`
`var object = {`
`name : "My Object",`
`getNameFunc : function(){`

`var that = this;`
`return function(){`
`return that.name;`
`};`
`}`
`};`
`alert(object.getNameFunc()()); //"My Object"`

代码中突出的行展示了这个例子与前一个例子之间的不同之处。在定义匿名函数之前，我们把this对象赋值给了一个名叫**that** 的变量。而在定义了闭包之后，闭包也可以访问这个变量，因为它是我们在包含函数中特意声名的一个变量。即使在函数返回之后，**that** 也仍然引用着object，所以调用**object.getNameFunc()()**就返回了"**My Object**"。

##### 7.2.3内存泄漏

由于IE9 之前的版本对JScript 对象和COM 对象使用不同的垃圾收集例程，因此闭包在 IE 的这些版本中会出现一些特殊的问题，具体来说，如果闭包的作用域链中保存着一个 HTML 元素，那么就意味着该元素无法被销毁。如下：

`function assignHandler(){`
	`var element = document.getElementById("someElement");`
	`		element.onclick = function(){`
`					alert(element.id);`
`	};`
`}`

以上代码创建了一个作为 element 元素事件处理程序的闭包，而这个闭包则又创建了一个循环引用，由于匿名函数保存了一个对 assignHandler() 的活动对象的引用，因此会导致无法减少 element的引用数，所以只要匿名函数还在，element 的引用数至少是1，因此它所占用的内存就永远不会被回收。
`function assignHandler(){`
`var element = document.getElementById("someElement");`
`var id = element.id;`
`element.onclick = function(){`
`alert(id);`
`};`
`element = null;`
`}`

在这组代码中，通过把 **element.id** 的一个副本保存在一个变量中，并且在闭包中引用该变量消除了循环引用，由于闭包会引用包含函数的整个活动对象，而其中包含着**element** ，所以即使闭包不直接引用，在整个活动对象中也仍然会保存一个引用。因此有必要把 element 变量设置为 null。

#### 7.3 模仿块级作用域

JavaScript 中没有块级作用域的概念，这意味着在块语句中定义的变量，实际上是在包含函数中而非语句中创建的。如下：

`function outputNumbers(count){`
`for (var i=0; i < count; i++){`
`alert(i);`
`}`
`alert(i); //计数`
`}`

在js 中变量 **i**  是定义在 **ouputNumbers ()** 的活动对象中，因此从他有定义开始，就可以再函数内部随机访问它，即使在后面重新声明同一个变量也不会改变它的值。

js 从不会告诉你是否多次声明了同一个变量；遇到这种情况，它只会对后续的声明视而不见。匿名函数可以用了模仿块级作用域来避免这个问题。

`(function(){`
`//这里是块级作用域`
`})();`

`var someFunction = function(){`
`//这里是块级作用域`
`};`
`someFunction();`

函数表达式的后面可以跟圆括号。要将函数声明转换成函数表达式，只要像下面这样给它加上一对圆括号即可。

无论在什么地方，只要临时需要一些变量，就可以使用私有作用域，例如：
`function outputNumbers(count){`
`(function () {`
`for (var i=0; i < count; i++){`
`alert(i);`
`}`
`})();`
`alert(i); //导致一个错误！`
`}`

#### 7.4私有变量

严格来说， js 中没有私有成员的概念，所有属性都是公有的，不过有一个**私有变量**的概念：任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。**私有变量**包括函数的**参数**、**局部变量**和**在函数内部定义的其他函数**。

`function add(num1, num2){`
`var sum = num1 + num2;`
`return sum;`
`}`

其中 sum  num1 num2  都是私有变量，无法在函数外部访问，如果在函数内部创建一个闭包则可以通过作用域链访问这几个变量，利用这一点我们可以创建用于访问私有变量的公有方法—— **特权方法**；

我们把有权访问私有变量和私有函数的公有方法称为特权方法（privileged method）。有两种在对象上创建特权方法的方式。第一种是在构造函数中定义特权方法：

`function MyObject(){`
`//私有变量和私有函数`
`var privateVariable = 10;`
`function privateFunction(){`
`return false;`
`}`
`//特权方法`
`this.publicMethod = function (){`
`privateVariable++;`
`return privateFunction();`
`};`
`}`

在这个例子中只能用 **publicMethod()** 访问**privateVariable** 和 **privateFunction()**方法，没有任何办法直接访问。

利用私有成员和特权成员可以隐藏那些不应该被修改的属性：

`function Person(name){`
`this.getName = function(){`
`return name;`
`};`
`this.setName = function (value) {`
`name = value;`
`};`
`}`
`var person = new Person("Nicholas");`
`alert(person.getName()); //"Nicholas"`
`person.setName("Greg");`
`alert(person.getName()); //"Greg"`

在这里可用通过 set 和 get 特权方法赋值和访问私有变量 name ，而不可以直接访问。这两个办法是在构造函数内部定义的，它们作为闭包能够通过作用域链访问  name 。私有变量name在 Person 的每一个实例中都不相同，因为每次调用构造函数都会重新创建这两个办法。

缺点：只能通过**构造函数模式**来达到这个目的。构造函数模式的缺点是针对每个实例都会创建同样一组新方法，而使用**静态私有变量**来实现特权方法就可以避免这个问题。

##### 7.4.1静态私有变量

通过在私有作用域中定义私有变量或函数，同样也可以创建特权方法：

`(function(){`
`//私有变量和私有函数`
`var privateVariable = 10;`
`function privateFunction(){`
`return false;`
`}`
`//构造函数`
`MyObject = function(){`
`};`
`//公有/特权方法`
`MyObject.prototype.publicMethod = function(){`
`privateVariable++;`
`return privateFunction();`
`};`
`})();`

这个模式创建了一个私有作用域，并在其中封装了一个构造函数及相应的方法。在私有作用域中，首先定义了私有变量和私有函数，然后又定义了构造函数及其公有方法。**公有方法**是在**原型**上定义的，这一点体现了典型的**原型模式**。这个模式与在构造函数中定义特权方法的主要区别就在于私有变量和函数是由实例共享的。由于特权方法是在原型上定义的，因此所有实例都使用同一函数。而这个特权方法，作为一个闭包，总是保存着对包含作用域的应用。如下：

`(function(){`
`var name = "";`
`Person = function(value){`
`name = value;`
`};`
`Person.prototype.getName = function(){`
`return name;`
`};`
`Person.prototype.setName = function (value){`

`name = value;`
`};`
`})();`
`var person1 = new Person("Nicholas");`
`alert(person1.getName()); //"Nicholas"`
`person1.setName("Greg");`
`alert(person1.getName()); //"Greg"`
`var person2 = new Person("Michael");`
`alert(person1.getName()); //"Michael"`
`alert(person2.getName()); //"Michael"`

在这个例子中， **name** 变成一个静态的、由所有实例共享的属性，**Person** 构造函数与 **getName()** 和 setName()都可以正常访问，由于所有实例共享，所以在一个实例调用**setName()** 方法 或者 新建一个 **Person**实例都会赋予**name** 属性一个新值，结果就是所有实例都会返回相同的值。以这种方式创建**静态私有变量**会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。到底是使用实例变量，还是静态私有变量，最终还是要视你的具体需求而定。

##### 7.4.2 模块模式

前面的模式是用于为自定义类型创建私有变量和特权方法的。模块模式是为**单例**创建**私有变量**和**特权方法**。单例就是只有一个实例的对象。 js 是以对象字面量的方式来创建单例对象的。

`var singleton = {`
`name : value,`
`method : function () {`
`//这里是方法的代码`
`}`
`};`

模块模式通过为单例添加私有变量和特权方法能够使其等到增强，如下：

`var singleton = function(){`
`//私有变量和私有函数`
`var privateVariable = 10;`
`function privateFunction(){`
`return false;`
`}`

`//特权/公有方法和属性`
`return {`
`publicProperty: true,`
`publicMethod : function(){`
`privateVariable++;`
`return privateFunction();`
`}`
`};`
`}();`

这个模块模式使用了一个返回对象的匿名函数，在这个匿名函数内部定义了私有变量和函数，然后将一个对象字面量作为函数的值返回，返回的对象字面量中只包含可以公开的属性和方法。由于这个对象是在匿名函数内部定义的，因此它的**公有办法**有权访问**私有变量**和**函数**。这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的：

`var application = function(){`
`//私有变量和函数`
`var components = new Array();`
`//初始化`
`components.push(new BaseComponent());`
`//公共`
`return {`
`getComponentCount : function(){`
`return components.length;`
`},`
`registerComponent : function(component){`
`if (typeof component == "object"){`
`components.push(component);`
`}`
`}`
`};`
`}();`

在这里首先是创建了一个用于管理组件的 **application** 对象。在创建这个对象的过程中，首相声明了一个私有的**components** 数组，并向数组中添加了一个 **BaseComponent** 的新实例。而返回对象的**getComponentCount()**和**registerComponent()**方法都有权访问 数组 **components** 的特权方法。

简单来说，如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这个私有数据的方法，那么就可以试用模块模式。。以这种模式创建的每个单例都是Object 的实例，因为最终要通过一个对象字面量来表示它。事实上，这也没有什么；毕竟，单例通常都是作为全局对象存在的，我们不会将它传递给一个函数。因此，也就没有什么必要使用instanceof 操作符来检查其对象类型了。

##### 7.4.3增强的模块模式

有人进一步改进了模块模式，即在返回对象之前加入对其增强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性或方法对其加以增强的情况 如下：

`var singleton = function(){`
`//私有变量和私有函数`
`var privateVariable = 10;`
`function privateFunction(){`
`return false;`
`}`
`//创建对象`
`var object = new CustomType();`
`//添加特权/公有属性和方法`
`object.publicProperty = true;`
`object.publicMethod = function(){`
`privateVariable++;`
`return privateFunction();`
`};`
`//返回这个对象`
`return object;`
`}();`

如果前面演示模块模式的例子中的**application** 对象必须是**BaseComponent** 的实例，那么就可以使用以下代码。

`var application = function(){`
`//私有变量和函数`
`var components = new Array();`
`//初始化`
`components.push(new BaseComponent());`
`//创建application 的一个局部副本`
`var app = new BaseComponent();`
`//公共接口`
`app.getComponentCount = function(){`
`return components.length;`
`};`
`app.registerComponent = function(component){`
`if (typeof component == "object"){`
`components.push(component);`
`}`
`};`
`//返回这个副本`

`return app;`
`}();`

在这个重写后的应用程序（application）单例中，首先也是像前面例子中一样定义了私有变量。主要的不同之处在于命名变量app 的创建过程，因为它必须是BaseComponent 的实例。这个实例实际上是application 对象的局部变量版。此后，我们又为app 对象添加了能够访问私有变量的公有方法。最后一步是返回app 对象，结果仍然是将它赋值给全局变量application。

#### 7.5 小结

**函数表达式特点**：

- 函数表达式不同于函数声明。函数声明要求有名字，但函数表达式不需要。没有名字的函数表达式也叫做匿名函数。
- 在无法确定如何引用函数的情况下，递归函数就会变得比较复杂；
- 递归函数应该始终使用arguments.callee 来递归地调用自身，不要使用函数名——函数名可能会发生变化。

**当在函数内部定义了其他函数时，就创建了闭包。闭包有权访问包含函数内部的所有变量，原理如下**：

- 在后台执行环境中，闭包的作用域链包含着它自己的作用域、包含函数的作用域和全局作用域。
- 通常，函数的作用域及其所有变量都会在函数执行结束后被销毁。
- 但是，当函数返回了一个闭包时，这个函数的作用域将会一直在内存中保存到闭包不存在为止。

**使用闭包可以在js 中模仿块级作用域，要点如下**：

- 创建并立即调用一个函数，这样既可以执行其中的代码，又不会在内存中留下对该函数的引用。
- 结果就是函数内部的所有变量都会被立即销毁——除非将某些变量赋值给了包含作用域（即外部作用域）中的变量。

**闭包还可以用于在对象中创建私有变量，相关概念和要点如下**：

- 即使JavaScript 中没有正式的私有对象属性的概念，但可以使用闭包来实现公有方法，而通过公有方法可以访问在包含作用域中定义的变量。
- 有权访问私有变量的公有方法叫做特权方法。
- 可以使用构造函数模式、原型模式来实现自定义类型的特权方法，也可以使用模块模式、增强的模块模式来实现单例的特权方法。

JavaScript 中的函数表达式和闭包都是极其有用的特性，利用它们可以实现很多功能。不过，因为创建闭包必须维护额外的作用域，所以过度使用它们可能会占用大量内存。

### 8.BOM

**ECMAScript** 是 **JavaScript** 的核心，但要是在**web** 中使用 **JavaScript** 那么**BOM （浏览器对象模型）** 才是真正的核心。 **BOM** 提供了很多对象，用于访问浏览器的功能，这些功能与任何网页内容无关。W3C 为了把浏览器中 **JavaScript** 最基本的部分标准化，已经将**BOM** 的主要方面纳入了 **HTML5** 的规范中。

#### 8.1 window 对象

**BOM** 的核心对象是一个 **window** ，它表示浏览器的一个实例，既是通过**JavaScript** 访问浏览器窗口的一个接口，又是**ECMAScript** 规定的 **Global** 对象。 就是说在网页中定义的任何一个对象、变量、函数都以**window** 作为其 **Global**对象。因此有权访问**parseInt()**方法。

##### 8.1.1 全局作用域

由于**window**在**ECMAScript** 中扮演的是 **Global** 对象，所以在全局作用域中声明的变量、函数都会变成window对象的属性和方法。如下：

`var age = 29;`
`function sayAge(){`
`alert(this.age);`
`}`
`alert(window.age); //29`
`sayAge(); //29`
`window.sayAge(); //29`

有一点不同，定义的全局变量不能通过 delete 操作符删除，但是在window对象上定义的属性可以。如下：

`var age = 29;`
`window.color = "red";`
`//在IE < 9 时抛出错误，在其他所有浏览器中都返回false`
`delete window.age;`
`//在IE < 9 时抛出错误，在其他所有浏览器中都返回true`
`delete window.color; //returns true`
`alert(window.age); //29`
`alert(window.color); //undefined`

这是因为使用 **var** 语句添加的**window** 属性有一个名为 **[[Configurable]]** 特性，这个特性的值被设置为false，因此这样定义的属性不可以通过delete 操作符删除。另外尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在，如下：

`//这里会抛出错误，因为oldValue 未定义`
`var newValue = oldValue;`
`//这里不会抛出错误，因为这是一次属性查询`
`//newValue 的值是undefined`
`var newValue = window.oldValue;`

##### 8.1.2 窗口关系及框架

如果页面中包含框架，则每个框架都拥有自己的window对象，并且保存在 frames 集合中，在 frames 集合中，可以通过数值索引（从0开始，从左至右，从上到下）或者框架名称来访问相应的window 对象，每个window 对象都有一个name属性，其中包含框架的名称，如下：

`<html>`

<head>
<title>Frameset Example</title>
</head>

`<frameset rows="160,*">`
`<frame src="frame.htm" name="topFrame">`
`<frameset cols="50%,50%">`
`<frame src="anotherframe.htm" name="leftFrame">`
`<frame src="yetanotherframe.htm" name="rightFrame">`
`</frameset>`
`</frameset>`
`</html>`

以上代码创建了一个框架集，其中一个框架居上，两个框架居下。对这个例子而言，可以通过window.frames[0]或者**window.frames["topFrame"]**来引用上方的框架。不过，恐怕你最好使用**top** 而非**window** 来引用这些框架（例如，通过**top.frames[0]**）。因为**top** 对象始终指向**最高层的框架**，也就是浏览器窗口，使用它可以确保在一个框架中正确的访问另一个框架，因为对于在一个框架中编写的任何代码来说，其中的**window** 对象指向的都是那个框架的**特定实例**，而非**最高层的框架**。

![image-20210113111159792](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113111159792.png)



与top 相对的另一个window 对象是parent。parent 对象始终指向当前框架的直接上层框架。如下：

<html>

<head>
<title>Frameset Example</title>

</head>
<frameset rows="100,*">
<frame src="frame.htm" name="topFrame">
<frameset cols="50%,50%">
<frame src="anotherframe.htm" name="leftFrame">
<frame src="anotherframeset.htm" name="rightFrame">
</frameset>
</frameset>
</html>

这个框架集中的一个框架包含了另一个框架集(anotherframeset)，该框架集的代码如下所示。
<html>

<head>
<title>Frameset Example</title>
</head>

<frameset cols="50%,50%">
<frame src="red.htm" name="redFrame">
<frame src="blue.htm" name="blueFrame">
</frameset>
</html>

如果代码位于**redFrame**（或**blueFrame**）中，那么**parent** 对象指向的就是**rightFrame**。如果代码位于**topFrame** 中，则**parent** 指向的是**top**，因为**topFrame** 的直接上层框架就是最外层框架。

除非最高层窗口是 window.open（）打开的，否则window对象的name属性不会包含任何值。

与框架有关的最后一个对象是**self**，它始终指向window；实际上，**self** 和**window** 对象可以互换使用。引入**self** 对象的目的只是为了与**top** 和**parent** 对象对应起来，因此它不格外包含其他值。
所有这些对象都是**window** 对象的属性，可以通过**window.parent、window.top** 等形式来访问。同时，这也意味着可以将不同层次的**window** 对象连缀起来，例如**window** **.parent.parent.frames[0]**。

##### 8.1.3窗口位置

用来确定和修改window对象的属性和方法： **screenLeft** 和 **screenTop** 属性，分别表示窗口相对于屏幕左边和上边的位置。Firefox 则在screenX 和screenY 属性中提供相同的窗口位置信息，Safari 和Chrome 也同时支持这两个属性。Opera虽然也支持screenX 和screenY 属性，但与screenLeft 和screenTop 属性并不对应，因此建议大家不要在Opera 中使用它们。使用下列代码可以跨浏览器取得窗口左边和上边的位置。

`var leftPos = (typeof window.screenLeft == "number") ?`
`window.screenLeft : window.screenX;`
`var topPos = (typeof window.screenTop == "number") ?`
`window.screenTop : window.screenY;`

这个例子运用二元操作符首先确定screenLeft 和screenTop 属性是否存在，如果是（在IE、Safari、Opera 和Chrome 中），则取得这两个属性的值。如果不存在（在Firefox 中），则取得**screenX**和**screenY** 的值。

![image-20210113114847437](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113114847437.png)

使用**moveTo()**和**moveBy()**方法倒是有可能将窗口精确地移动到一个新位置。这两个方法都接收两个参数。

**moveTo**：简单理解就是移动到参数的位置。

**moveBy**：简单理解就是根据当前位置移动参数所给的值。 参考绝对定位和相对定位

##### 8.1.4窗口大小

跨浏览器确定一个窗口的大小不是一件简单的事。IE9+、Firefox、Safari、Opera 和Chrome 均为此提供了4 个属性：**innerWidth**、**innerHeight**、**outerWidth** 和**outerHeight**。

在一般浏览器中：**outerWidth** 和**outerHeight** 返回浏览器窗口本身的尺寸。而**innerWidth** 和**innerHeight**
则表示该容器中页面视图区的大小（减去边框宽度）在Chrome 中，**outerWidth**、**outerHeight** 与innerWidth、**innerHeight** 返回相同的值，即视口（viewport）大小而非浏览器窗口大小。

虽然最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小，如下所示。
`var pageWidth = window.innerWidth,`
`pageHeight = window.innerHeight;`
`if (typeof pageWidth != "number"){`
`if (document.compatMode == "CSS1Compat"){`
`pageWidth = document.documentElement.clientWidth;`
`pageHeight = document.documentElement.clientHeight;`
`} else {`
`pageWidth = document.body.clientWidth;`
`pageHeight = document.body.clientHeight;`
`}`
`}`

**window.innerWidth** 和window.innerHeight 的值分别赋给了pageWidth 和pageHeight。然后检查pageWidth 中保存的是不是一个数值；如果不是，则通过检查document.compatMode（这个属性将在第10 章全面讨论）来确定页面是否处于标准模式。

标准模式下使用**document.documentElement.clientWidth** 和**document.documentElement.client-Height** 

否则使用**document.body.clientWidth** 和**document.body.clientHeight** 的值。

对于移动设备，**window.innerWidth** 和**window.innerHeight** 保存着可见视口，也就是屏幕上可见页面区域的大小。移动IE 浏览器不支持这些属性

但通过**document.documentElement.client-Width** 和**document.documentElement.clientHeihgt** 提供了相同的信息。随着页面的缩放，这些值也会相应变化。

使用**resizeTo()** 和 **resizeBy()** 可以调整浏览器窗口的大小：

**resizeTo():**接受表示浏览器窗口新宽度和高度的值 的两个参数。

**resizeBy():**接受接收新窗口和原窗口的宽度和高度之差。

##### 8.1.5导航和打开窗口

使用 window.open() 方法既可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。这个方法接收四个参数： **要加载的 URL** 、 **窗口目标** 、**一个特性字符串** 、**一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值（只在不打开新窗口的情况下使用）**。

如果**为window.open()**传递了第二个参数，而且该参数是已有窗口或框架的名称，那么就会在具
有该名称的窗口或框架中加载第一个参数指定的URL。看下面的例子。

`//等同于< a href="http://www.wrox.com" target="topFrame"></a>`
`window.open("http://www.wrox.com/", "topFrame");`

如果有一个名叫"topFrame"的窗口或者框架，就会在该窗口或框架加载这个URL；否则，就会创建一个新窗口并将其命名为"topFrame"。此外，第二个参数也可以是下列任何一个特殊的窗口名称：_self、_parent、_top 或_blank。

###### 8.1.5.1 弹出窗口

如果 window.open() 传递的第二个参数并不是一个已经存在的窗口或框架，，那么该方法就会根据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口。第三个参数是一个逗号分隔的设置字符串，表示在新窗口都有哪些特性，可设置选项和 用法如下：

![image-20210113144921178](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113144921178.png)

![image-20210113144939657](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113144939657.png)

window.open()方法会返回一个指向新窗口的引用。引用的对象与其他window 对象大致相似，有些浏览器默认情况下可能不允许我们针对浏览器窗口调整大小或移动位置，但可以针对通过 window.open()创建的窗口调整大小或移动位置。

`var wroxWin = window.open("http://www.wrox.com/","wroxWindow",`
`"height=400,width=400,top=10,left=10,resizable=yes");`
`//调整大小`
`wroxWin.resizeTo(500,500);`
`//移动位置`
`wroxWin.moveTo(100,100);`
`调用close()方法还可以关闭新打开的窗口。`
`wroxWin.close();`

新创建的**window** 对象有个 **opener** 属性，其中保存着打开它的原始窗口对象。它只能再最外层的**window** 对象（top）中定义，而且指向调用 **window.open()** 的窗口或框架：

`var wroxWin = window.open("http://www.wrox.com/","wroxWindow",`
`"height=400,width=400,top=10,left=10,resizable=yes");`
`alert(wroxWin.opener == window); //true`

**弹出窗口**中有一个指针指向打开它的**原始窗口**，但**原始窗口**中并没有这样的指针指向**弹出窗口**。

有些浏览器（如IE8 和Chrome）会在独立的进程中运行每个标签页。当一个标签页打开另一个标签页时，如果两个window 对象之间需要彼此通信，那么新标签页就不能运行在独立的进程中。在Chrome中，将新创建的标签页的opener 属性设置为null，即表示在单独的进程中运行新标签页，如下所示。

`var wroxWin = window.open("http://www.wrox.com/","wroxWindow",`
`"height=400,width=400,top=10,left=10,resizable=yes");`
`wroxWin.opener = null;`

将**opener** 属性设置为null 就是告诉浏览器新创建的标签页不需要与打开它的标签页通信，因此可以在独立的进程中运行。标签页之间的联系一旦切断，将没有办法恢复。

###### 8.1.5.2安全限制

曾经因为广告商的滥用弹出窗口诱使客户去点击其中的广告，为了解决这个问题，有些浏览器开始在弹出窗口配置方面增加限制。

- Windows XP SP2 中的**IE6** 对弹出窗口施加了多方面的安全限制，包括不允许在屏幕之外创建弹出窗口、不允许将弹出窗口移动到屏幕以外、不允许关闭状态栏等。IE7 则增加了更多的安全限制，如不允许关闭地址栏、默认情况下不允许移动弹出窗口或调整其大小。
- **Firefox** 1 从一开始就不支持修改状态栏，因此无论给window.open()传入什么样的特性字符串，弹出窗口中都会无一例外地显示状态栏。Firefox 3 又强制始终在弹出窗口中显示地址栏。
- **Opera** 只会在主浏览器窗口中打开弹出窗口，但不允许它们出现在可能与系统对话框混淆的地方。
- 有的浏览器只根据用户操作来创建弹出窗口。这样一来，在页面尚未加载完成时调用**window.open()**的语句根本不会执行，而且还可能会将错误消息显示给用户。换句话说，只能通过单击或者击键来打开弹出窗口。
- 对于那些不是用户有意打开的弹出窗口，**Chrome** 采取了不同的处理方式。它不会像其他浏览器那样简单地屏蔽这些弹出窗口，而是只显示它们的标题栏，并把它们放在浏览器窗口的右下角。

###### 8.1.5.3 弹出窗口屏蔽程序

大多数浏览器都内置有弹出窗口屏蔽程序，而没有内置此类程序的也可以安装Yahoo！ Toolbal 等带有内置屏蔽程序的实用工具，结果就是用户可以将绝大多数不想看到弹出窗口屏蔽掉。

如果被**内置程序屏蔽**弹出窗口的时候， window.open() 很可能会返回 null 如下：

`var wroxWin = window.open("http://www.wrox.com", "_blank");`
`if (wroxWin == null){`
`alert("The popup was blocked!");`
`}`

如果是浏览器扩展或其他程序阻止的弹出窗口，那么window.open()通常会抛出一个错误。因此要想准确的检测出弹出窗口是否被屏蔽，必须在检测返回值的同时，将对 window.open() 调用封装在一个 try-catch 块中，如下：

`var blocked = false;`
`try {`
`var wroxWin = window.open("http://www.wrox.com", "_blank");`
`if (wroxWin == null){`
`blocked = true;`
`}`
`} catch (ex){`
`blocked = true;`
`}`
`if (blocked){`
`alert("The popup was blocked!");`
`}`

在任何情况下，以上代码都可以检测出调用window.open()打开的弹出窗口是不是被屏蔽了。但要注意的是，检测弹出窗口是否被屏蔽只是一方面，它并不会阻止浏览器显示与被屏蔽的弹出窗口有关的消息。

##### 8.1.6 间歇调用和超时调用

JavaScript 是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。前者是在指定的时间过后执行代码，而后者则是每隔指定的时间就执行一次代码。

超时调用 **setTimeout()**  用法：

`//不建议传递字符串！`
`setTimeout("alert('Hello world!') ", 1000);`
`//推荐的调用方式`
`setTimeout(function() {`
`alert("Hello world!");`
`}, 1000);`

调用**setTimeout()**之后，该方法会返回一个数值ID，表示超时调用。这个超时调用ID 是计划执行代码的唯一标识符，可以通过它来取消超时调用。要取消尚未执行的超时调用计划，可以调用clearTimeout()方法并将相应的超时调用ID 作为参数传递给它，如下所示。

`//设置超时调用`
`var timeoutId = setTimeout(function() {`
`alert("Hello world!");`
`}, 1000);`
`//注意：把它取消`
`clearTimeout(timeoutId);`

间歇调用**setInterval()**用法：

`//不建议传递字符串！`
`setInterval ("alert('Hello world!') ", 10000);`
`//推荐的调用方式`
`setInterval (function() {`
`alert("Hello world!");`
`}, 10000);`

调用**setInterval()**方法同样也会返回一个间歇调用ID，该ID 可用于在将来某个时刻取消间歇调用。要取消尚未执行的间歇调用，可以使用**clearInterval()**方法并传入相应的间歇调用ID。取消间歇调用的重要性要远远高于取消超时调用，因为在不加干涉的情况下，**间歇调用**将会一直执行到页面卸载。以下是一个常见的使用间歇调用的例子。

`var num = 0;`
`var max = 10;`
`var intervalId = null;`
`function incrementNumber() {`
`num++;`
`//如果执行次数达到了max 设定的值，则取消后续尚未执行的调用`
`if (num == max) {`
`clearInterval(intervalId);`
`alert("Done");`
`}`
`}`
`intervalId = setInterval(incrementNumber, 500);`

在这个例子中，变量num 每半秒钟递增一次，当递增到最大值时就会取消先前设定的间歇调用。这个模式也可以使用超时调用来实现，如下所示：

`var num = 0;`
`var max = 10;`
`function incrementNumber() {`
`num++;`
`//如果执行次数未达到max 设定的值，则设置另一次超时调用`
`if (num < max) {`
`setTimeout(incrementNumber, 500);`
`} else {`
`alert("Done");`
`}`
`}`
`setTimeout(incrementNumber, 500);`

可见，在使用**超时调用**时，没有必要跟踪超时调用ID，因为每次执行代码之后，如果不再设置另一次超时调用，调用就会自行停止。一般认为，使用**超时调用**来模拟**间歇调用**的是一种最佳模式。在开发环境下，很少使用真正的间歇调用，原因是后一个**间歇调用**可能会在前一个**间歇调用**结束之前启动。而像前面示例中那样使用**超时调用**，则完全可以避免这一点。所以，最好不要使用**间歇调用**。

##### 8.1.7系统对话框

浏览器通过 alert()  confirm()  prompt()  方法可以调用系统对话框向用户显示消息。系统对话框与在浏览器中显示的网页没有关系，也不包含 HTML 外观也不由 CSS 定义。显示系统框的时候代码是不运行的。

**alert()**: 显示一个包含文本和 ok 按钮的系统框。

**confirm()**: 显示一个有文本和 **确定**  **取消**按钮的系统框。用法：

`if (confirm("Are you sure?")) {`
`alert("I'm so glad you're sure! ");`
`} else {`
`alert("I'm sorry to hear you're not sure. ");`
`}`

**prompt()**：是通过调用 **prompt ()** 方法生成的，这是一个提示框，用于提示用户输入一些文本。还会有确定和取消按钮和一个文本输入域。如果用户单击了OK 按钮，则prompt()返回文本输入域的值；如果用户单击了Cancel 或没有单击OK 而是通过其他方式关闭了对话框，则该方法返回null。如下：

`var result = prompt("What is your name? ", "");`
`if (result !== null) {`
`alert("Welcome, " + result);`
`}`

![image-20210113161839848](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113161839848.png)

由于不涉及HTML、CSS 或JavaScript，因此它们是增强Web 应用程序的一种便捷方式。

除了上述三种对话框之外，Google Chrome 浏览器还引入了一种新特性。如果当前脚本在执行过程中会打开两个或多个对话框，那么从第二个对话框开始，每个对话框中都会显示一个复选框，以便用户阻止后续的对话框显示，除非用户刷新页面

![image-20210113161953182](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113161953182.png)

此外还有 **查找 window.find()**  和 **打印 window.print()** 两种系统框是异步的，因此不进入 Chrome的对话框计数器。

#### 8.2 location对象

**location** 是最有用的 BOM 对象之一，提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。**location**对象既是 **window** 对象的属性也是 document 对象的属性。**location** 对象的用处不只表现在它保存着当前文档的信息，还表现在它将**URL** 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。下表列出了location 对象的所有属性

![image-20210113162726777](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113162726777.png)

##### 8.2.1 查询字符串参数

尽管上面的属性可以访问到 location 对象的大多数信息，但其中访问URL 包含的**查询字符串**的属性并不方便尽管**location.search** 返回从问号到URL 末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然

`function getQueryStringArgs(){`
`//取得查询字符串并去掉开头的问号`
`var qs = (location.search.length > 0 ? location.search.substring(1) : ""),`
`//保存数据的对象`
`args = {},`
`//取得每一项`
`items = qs.length ? qs.split("&") : [],`
`item = null,`
`name = null,`

`value = null,`
`//在for 循环中使用`
`i = 0,`
`len = items.length;`
`//逐个将每一项添加到args 对象中`
`for (i=0; i < len; i++){`
`item = items[i].split("=");`
`name = decodeURIComponent(item[0]);`
`value = decodeURIComponent(item[1]);`
`if (name.length) {`
`args[name] = value;`
`}`
`}`
`return args;`
`}`

这个函数的第一步是先去掉查询字符串开头的问号。当然，前提是**location.search** 中必须要包含一或多个字符。然后，所有参数将被保存在args 对象中，该对象以字面量形式创建。接下来，根据和号（&）来分割查询字符串，并返回name=value 格式的字符串数组。下面的for 循环会迭代这个数组，然后再根据等于号分割每一项，从而返回第一项为参数名，第二项为参数值的数组。再使用**decodeURIComponent()**分别解码**name** 和**value**（因为查询字符串应该是被编码过的）。最后，将name 作为args 对象的属性，将value 作为相应属性的值。下面给出了使用这个函数的示例。

`//假设查询字符串是?q=javascript&num=10`
`var args = getQueryStringArgs();`
`alert(args["q"]); //"javascript"`
`alert(args["num"]); //"10"`

##### 8.2.2 位置操作

使用**location** 对象可以通过很多方式来改变浏览器的位置。首先，也是最常用的方式，就是使用**assign()**方法并为其传递一个URL，如下所示。
`location.assign("http://www.wrox.com");`
这样，就可以立即打开新URL 并在浏览器的历史记录中生成一条记录。如果是将**location.href**或**window.location** 设置为一个URL 值，也会以该值调用**assign()**方法。例如，下列两行代码与显式调用**assign()**方法的效果完全一样。

`window.location = "http://www.wrox.com";`
`location.href = "http://www.wrox.com";`

修改location 对象的其他属性也可以改变当前加载的页面，如下：

`//假设初始URL 为http://www.wrox.com/WileyCDA/`
`//将URL 修改为"http://www.wrox.com/WileyCDA/#section1"`
`location.hash = "#section1";`
`//将URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript"`
`location.search = "?q=javascript";`
`//将URL 修改为"http://www.yahoo.com/WileyCDA/"`
`location.hostname = "www.yahoo.com";`
`//将URL 修改为"http://www.yahoo.com/mydir/"`
`location.pathname = "mydir";`
`//将URL 修改为"http://www.yahoo.com:8080/WileyCDA/"`
`location.port = 8080;`
`每次修改location 的属性（hash 除外），页面都会以新URL 重新加载。`

当通过上述任何一种方式修改URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。要禁用这种行为，可以使用**replace()**方法。

**replace()**：只接受要导航到的URL 为参数，而且在调用之后，用户不能回到前一个页面。

**reload()**：重载当前显示的页面。如果要强制从服务器重新加载，传递参数 true。

**位于reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将reload()放在代码的最后一行。**

#### 8.3navigator 对象

**navigator** 对象是所有支持JavaScript 的浏览器所共有的。与其他BOM 对象的情况一样，每个浏览器中的**navigator** 对象也都有一套自己的属性。如下：

![image-20210113172755499](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113172755499.png)



![image-20210113172804942](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113172804942.png)

##### 8.3.1 检测插件 （已跳过）

可以用 **plugins** 数组检测浏览器中是否安装了特定的插件。该数组的每一项都包含以下属性：

- name：插件的名字。
- description：插件的描述。
- filename：插件的文件名。
- length：插件所处理的MIME 类型数量。

`//检测插件（在IE 中无效）`
`function hasPlugin(name){`
`name = name.toLowerCase();`
`for (var i=0; i < navigator.plugins.length; i++){`
`if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){`
`return true;`
`}`
`}`
`return false;`
`}`
`//检测Flash`
`alert(hasPlugin("Flash"));`
`//检测QuickTime`
`alert(hasPlugin("QuickTime"));`

这个 hasPlugin()函数接受一个参数：要检测的插件名。

第一步是将传入的名称转换为小写形式，以便于比较。然后，迭代plugins 数组，通过indexOf()检测每个name 属性，以确定传入的名称是否出现在字符串的某个地方。比较的字符串都使用小写形式可以避免因大小写不一致导致的错误。而传入的参数应该尽可能具体，以避免混淆。应该说，像**Flash** 和**QuickTime** 这样的字符串就比较具体了，不容易导致混淆。在Firefox、Safari、Opera 和Chrome 中可以使用这种方法来检测插件。

**每个插件对象本身也是一个MimeType 对象的数组，这些对象可以通过方括号语**
**法来访问。每个MimeType 对象有4 个属性：包含MIME 类型描述的description、**
**回指插件对象的enabledPlugin、表示与MIME 类型对应的文件扩展名的字符串**
**suffixes（以逗号分隔）和表示完整MIME 类型字符串的type。**

![image-20210113174226359](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210113174226359.png)



**plugins 集合有一个名叫refresh()的方法，用于刷新plugins 以反映最新安装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果将这个值设置为true，则会重新加载包含插件的所有页面；否则，只更新plugins集合，不重新加载页面。**

##### 8.3.2 注册处理程序

Firefox 2 为 navigator 对象新增了 **registerContentHandler()** 和**registerProtocolHandler()**方法，

**registerContentHandler()**方法接收三个参数：

- 要处理的MIME 类型
- 可以处理该MIME类型的页面的URL 
- 应用程序的名称

举个例子，要将一个站点注册为处理RSS 源的处理程序，可以使用如下代码。
navigator.registerContentHandler("application/rss+xml","http://www.somereader.com?feed=%s", "Some Reader");

第一个参数是RSS 源的MIME 类型。第二个参数是应该接收RSS 源URL 的URL，其中的%s 表示RSS 源URL，由浏览器自动插入。当下一次请求RSS 源时，浏览器就会打开指定的URL，而相应的Web 应用程序将以适当方式来处理该请求。

**registerProtocolHandler()**方法也接收三个参数：

- 要处理的协议（例如，mailto 或ftp）
- 处理该协议的页面的URL 
- 应用程序的名称。
- 例如，要想将一个应用程序注册为默认的邮件客户端，可以使用如下代码。

navigator.registerProtocolHandler("mailto","http://www.somemailclient.com?cmd=%s", "Some Mail Client");

两个一个是处理MIME类型（**registerContentHandler()**）一个是处理协议（**registerProtocolHandler()**）

#### 8.4screen对象

screen对象在编程中用处不大，用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等。每个浏览器中的screen 对象都包含着各不相同的属性，下表列出了所有属性及支持相应属性的浏览器。

![image-20210114093940127](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210114093940127.png)



这些信息经常集中出现在测定客户端能力的站点跟踪工具中，但通常不会用于英雄功能，不过有时候也可能会用到其中的信息来调整窗口大小。如下：

`window.resizeTo(screen.availWidth, screen.availHeight);`

许多浏览器会禁用调整浏览器窗口大小的能力，因此上面的代码不一定在所有环境下有效。

涉及移动设备的屏幕大小时，情况有点不一样。运行iOS 的设备始终会像是把设备竖着拿在手里一样，因此返回的值是768×1024。而Android 设备则会相应调用**screen.width** 和**screen.height** 的值。

#### 8.5 history 对象

history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起，出于安全考虑，开发人员无法获取客户浏览过的确切的URL地址，不过可以借用访问列表实现后退和前进。

**go()**方法：

`//后退一页`
`history.go(-1);`
`//前进一页`
`history.go(1);`
`//前进两页`
`history.go(2);`

`//跳转到最近的wrox.com 页面`
`history.go("wrox.com");`
`//跳转到最近的nczonline.net 页面`
`history.go("nczonline.net");`

**back()**和**forward()**：

`//后退一页`
`history.back();`
`//前进一页`
`history.forward();`

**history** 对象还有一个**length** 属性，保存着历史记录的数量，可以试用**history.length == 0** 判断用户是否已开始就打开了你的页面。

#### 8.6小结

浏览器对象模型（**BOM**） 以**window** 对象为衬托，表示浏览器窗口可见区域。

**window**对象还是ECMAScript 中的 **Global** 对象，所有的全局变量和函数都是它的属性，且所有原生的构造函数及其他函数也都存在于它的命名空间下。

BOM 的组成部分：

- 在使用框架时，每个框架都有自己的window对象以及原生构造函数及其他函数的副本，每个框架都保存在frames 集合中，可以通过位置或通过名称来访问。

- 有一些窗口指针，可以用来引用其它框架，包括父框架。

- **top** 对象始终指向最外围的框架，也就是整个浏览器端口。

- **parent**对象指向包含当前框架的 父级框架， self 对象回指window。

- 使用**location** 对象可以通过编程方式来访问浏览器的导航系统。设置相应的属性可以逐段或整体性的修改浏览器的URL

- 使用**replace()** 方法可以导航到一个新URL，同时该URL会替换浏览器历史记录中当前显示的页面。使用该方法后用户不能回到前一个页面。

- **reload()** ：重新加载当前显示的页面，如果不传入参数则会以最有效的方式重载，如果传入（true）就强制从服务器重新加载。

- **navigator**对象提供了与浏览器有关的信息，具体什么信息取决于用户的浏览器。也有（userAgent）公共属性。

- **screen** 保存着与客户端显示器有关的信息，一般用于站点分析。

- **history**对象可以访问用户记录列表并向前向后导航界面。也可以根据**length**属性判断用户是否第一个打开该页面。

  

### 9 客户端检测

每个浏览器有各自的长处，也有各自的缺点，即使是跨平台的浏览器，虽然从技术上看版本相同，也照样存在不一致性问题。检测浏览器的方法有很多，不过不到万不得已就不要使用客户端检测，只要有通用的方法就优先采用更通用的方法。

#### 9.1能力检测

最常用的就是能力检测（特性检测），能力检测的目标不是识别特定的浏览器，二十识别浏览器的能力。根据浏览器能力确定方案，如下

IE不存在 document.getElementById  方法时的检测代码

`function getElement(id){`
`if (document.getElementById){`
`return document.getElementById(id);`
`} else if (document.all){`
`return document.all[id];`

`} else {`
`throw new Error("No way to retrieve element!");`
`}`
`}`

先是判断 document.getElementById 方法是否可用，然后判断是否有那个 id  存在，最后如果两个都不存在则抛出错误

以下为错误用法

`function getWindowWidth(){`
`if (document.all){ //假设是IE`
`return document.documentElement.clientWidth; //错误的用法！！！`
`} else {`
`return window.innerWidth;`
`}`
`}`

因为document.all  存在也不一定是IE 也有可能是其他浏览器（Opera）

##### 9.1.1 更可靠的能力检测

能力检测对于想知道某个特性是否会按照适当方式行事（而不仅仅是某个特性存在）非常有用，上一节的例子用来判断对象是否存在，下面看一个对象是否支持排序：

`function isSortable(object){`
`return typeof object.sort == "function";`
`}`

尽可能用 **typeof** 进行检测

在IE8 及之前版本中，这个函数返回**false**，因为**typeof document.createElement** 返回 是"**object**"，而不是"**function**"。

在IE中， ActiveX 对象（只有IE 支持） 不使用typeof 测试某个属性就会导致错误，如下：

`//在IE 中会导致错误`
`var xhr = new ActiveXObject("Microsoft.XMLHttp");`
`if (xhr.open){ //这里会发生错误`
`//执行操作`
`}`

使用typeof 操作符会更靠谱一点，但IE对 typeof xhr.open 会返回 “unknown”，所以在浏览器环境下测试任何对象的某个特性是否存在要用以下函数：

`//作者：Peter Michaux`
`function isHostMethod(object, property) {`
`var t = typeof object[property];`
`return t=='function' ||  (!!(t=='object' && object[property])) ||  t=='unknown';`
`}`
`可以像下面这样使用这个函数：`
`result = isHostMethod(xhr, "open"); //true`
`result = isHostMethod(xhr, "foo"); //false`

目前使用 **isHostMethod()** 方法是比较可靠的，因为它考虑到了浏览器的怪异行为，但是由于宿主对象没有义务保持目前的实现方式不变，也不一定会模拟已有宿主对象的行为，所以这个函数以及其他函数都不能百分百的保证永远可靠。

##### 9.1.2 能力检测，不是浏览器检测

检测某个或某几个特性并不能确定浏览器，错误示例如下：

`//错误！还不够具体`
`var isFirefox = !!(navigator.vendor && navigator.vendorSub);`
`//错误！假设过头了`
`var isIE = !!(document.all && document.uniqueID);`

根据浏览器的不同将能力组合起来是更可取的方式如果你知道自己的应用程序需要使用某些特定的浏览器特性，那么最好是一次性检测所有相关特性，而不要分别检测。如下：

`//确定浏览器是否支持Netscape 风格的插件`
`var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);`
`//确定浏览器是否具有DOM1 级规定的能力`
`var hasDOM1 = !!(document.getElementById && document.createElement &&`
`document.getElementsByTagName);`

以上一个是检测浏览器是否支持 Netscapte 风格的插件， 另一个检测浏览器是否具备DOM1级所规定的能力。得到的布尔值可以在以后继续使用，从而节省重新检测能力的时间。

#### 9.2 怪癖检测

怪癖（也就是 bug）检测的目标是识别浏览器的特殊行为，是想检测浏览器存在什么缺陷。

IE8 及更早版本中存在一个bug，即如果某个实例属性与[[Enumerable]] 标记为false 的某个原型属性同名，那么该实例属性将不会出现在 for-in 循环中，可以用一下代码检测这个bug：

`var hasDontEnumQuirk = function(){`
`var o = { toString : function(){} };`
`for (var prop in o){`

`if (prop == "toString"){`
`return false;`
`}`
`}`
`return true;`
`}();`

在正确的ECMAScript 实现中，**toString** 应该在for-in 循环中作为属性返回。

另一个是Safari3 以前版本会枚举被隐藏的属性，如下：

`var hasEnumShadowsQuirk = function(){`
`var o = { toString : function(){} };`
`var count = 0;`
`for (var prop in o){`
`if (prop == "toString"){`
`count++;`
`}`
`}`
`return (count > 1);`
`}();`

如果浏览器存在这个bug，那么使用**for-in** 循环枚举带有自定义的**toString()**方法的对象，就会返回两个**toString** 的实例。

#### 9.3用户代理检测

**用户代理检测**通过检测用户代理字符串来确定实际使用的浏览器，在每一次的 HTTP 请求中，用户代理字符串是作为响应首部发送的，而且该字符串可以通过JavaScript 的navigator.userAgent 属性访问。在**服务器端**，通过检测用户代理字符串来确定用户使用的浏览器是一种常用而且广为接受的做法。而在客户端，用户代理检测一般被当作一种万不得已才用的做法，其优先级排在能力检测和（或）**怪癖检测**之后。

电子欺骗：指浏览器通过在自己的用户代理字符串加入一些错误或误导性信息，来达到欺骗服务器的目的。

##### 9.3.1 用户代理字符串的历史（具体已跳过）

HTTP规范明确规定，浏览器应该发送简短的用户代理字符串，指明浏览器的名称和版本号。 RFC2616（即 HTTP 1.1 协议规范）是这样描述用户代理字符串的：

“产品标识符常用于通信应用程序标识自身，由软件名和版本组成。使用产品标识符的大多数领域也允许列出作为应用程序主要部分的子产品，由空格分隔。按照惯例，产品要按照相应的重要程度依次列出，以便标识应用程序。”

上述规范进一步规定，用户代理字符串应该以一组产品的形式给出，字符串格式为：标识符/产品版本号。但是，现实中的用户代理字符串则绝没有如此简单。

##### 9.3.2用户代理字符串检测技术

考虑到历史原因以及现代浏览器中用户代理字符串的使用方式，通过用户代理字符串来检测特定的浏览器不是一件轻松的事，因此，首先要确定的往往是你需要多么具体的浏览器信息，一般情况下，知道呈现引擎和最低限度的版本就足以决定正确的操作方法，如下：

`if (isIE6 || isIE7) { //不推荐!!!`
`//代码`
`}`

以上代码如果出IE8 或者新版本就要更新，所以不推荐

`if (ieVer >=6){`
`//代码`
`}`

这个例子首先检测IE 的版本号是否至少等于6，如果是则执行相应操作。这样就可以确保相应的代码将来照样能够起作用。我们下面的浏览器检测脚本就将本着这种思路来编写。

###### 9.3.2.1 识别呈现引擎

确切知道浏览器的名字和版本号不如确切知道它使用的是什么呈现引擎。不同浏览器的引擎如果一样，那么它们将具备相同的功能和特性。我们要编写的脚本将主要检测五大呈现引擎：IE、Gecko、WebKit、KHTML 和Opera。

`var client = function(){`
`var engine = {`
`//呈现引擎`
`ie: 0,`
`gecko: 0,`
`webkit: 0,`
`khtml: 0,`
`opera: 0,`
`//具体的版本号`
`ver: null`
`};`
`//在此检测呈现引擎、平台和设备`
`return {`
`engine : engine`
`};`
`}();`

（后续要根据不同的浏览器和其版本做不同的判断）

###### 9.3.2.2 识别浏览器

大多数情况下，识别了浏览器的呈现引擎就足以为我们采取正确的操作提供依据了。可是，只有呈现引擎还不能说明存在所需的JavaScript 功能。苹果公司的Safari 浏览器和谷歌公司的Chrome 浏览器都使用WebKit 作为呈现引擎，但它们的JavaScript 引擎却不一样。在这两款浏览器中，client.webkit都会返回非0 值，但仅知道这一点恐怕还不够。对于它们，有必要像下面这样为client 对象再添加一些新的属性。

`var client = function(){`
`var engine = {`

`//呈现引擎`
`ie: 0,`
`gecko: 0,`
`webkit: 0,`
`khtml: 0,`
`opera: 0,`
`//具体的版本`
`ver: null`
`};`
`var browser = {`
`//浏览器`
`ie: 0,`
`firefox: 0,`
`safari: 0,`
`konq: 0,`
`opera: 0,`
`chrome: 0,`
`//具体的版本`
`ver: null`
`};`
`//在此检测呈现引擎、平台和设备`
`return {`
`engine: engine,`
`browser: browser`
`};`
`}();`

###### 9.3.2.3 识别平台

很多时候，只要知道呈现引擎就足以编写出适当的代码了。但在某些条件下，平台可能是必须关注
的问题。那些具有各种平台版本的浏览器（如Safari、Firefox 和Opera）在不同的平台下可能会有不同
的问题。目前的三大主流平台是Windows、Mac 和Unix（包括各种Linux）。为了检测这些平台，还需
要像下面这样再添加一个新对象。

`var client = function(){`
`var engine = {`
`//呈现引擎`
`ie: 0,`
`gecko: 0,`
`webkit: 0,`
`khtml: 0,`
`opera: 0,`
`//具体的版本号`
`ver: null`
`};`
`var browser = {`
`//浏览器`
`ie: 0,`
`firefox: 0,`
`safari: 0,`
`konq: 0,`
`opera: 0,`
`chrome: 0,`
`//具体的版本号`
`ver: null`
`};`
`var system = {`
`win: false,`
`mac: false,`
`x11: false`
`};`
`//在此检测呈现引擎、平台和设备`
`return {`
`engine: engine,`
`browser: browser,`
`system: system`
`};`
`}();`

###### 9.3.2.4 识别Windows 操作系统

![image-20210114170233267](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210114170233267.png)



###### 9.3.2.5识别移动设备

2006 年到2007 年，移动设备中Web 浏览器的应用呈爆炸性增长。四大主要浏览器都推出了手机版和在其他设备中运行的版本。要检测相应的设备，第一步是为要检测的所有移动设备添加属性，如下所示。

`var client = function(){`
`var engine = {`
`//呈现引擎`
`ie: 0,`
`gecko: 0,`
`webkit: 0,`
`khtml: 0,`
`opera: 0,`
`//具体的版本号`
`ver: null`
`};`
`var browser = {`
`//浏览器`
`ie: 0,`
`firefox: 0,`
`safari: 0,`
`konq: 0,`
`opera: 0,`
`chrome: 0,`
`//具体的版本号`
`ver: null`
`};`
`var system = {`
`win: false,`
`mac: false,`

`x11: false,`
`//移动设备`
`iphone: false,`
`ipod: false,`
`ipad: false,`
`ios: false,`
`android: false,`
`nokiaN: false,`
`winMobile: false };`
`//在此检测呈现引擎、平台和设备`
`return {`
`engine: engine,`
`browser: browser,`
`system: system`
`};`
`}();`

然后，通常简单地检测字符串"iPhone"、"iPod"和"iPad"，就可以分别设置相应属性的值了。

###### 9.3.2.6 识别游戏系统

除了移动设备之外，视频游戏系统中的Web 浏览器也开始日益普及。任天堂Wii 和Playstation 3 或者内置Web 浏览器，或者提供了浏览器下载。Wii 中的浏览器实际上是定制版的Opera，是专门为WiiRemote 设计的。Playstation 的浏览器是自己开发的，没有基于前面提到的任何呈现引擎。这两个浏览器中的用户代理字符串如下所示：

`Opera/9.10 (Nintendo Wii;U; ; 1621; en)`
`Mozilla/5.0 (PLAYSTATION 3; 2.00)`

##### 9.3.3 完整的代码

以下是完整的用户代理字符串检测脚本，包括检测**呈现引擎**、**平台**、**Windows 操作系统**、**移动设备和游戏系统**。

```
var client = function(){
//呈现引擎
var engine = {
ie: 0,
gecko: 0,
webkit: 0,
khtml: 0,
opera: 0,
//完整的版本号
ver: null
};
//浏览器
var browser = {
//主要浏览器
ie: 0,
firefox: 0,
safari: 0,
konq: 0,
opera: 0,

chrome: 0,
//具体的版本号
ver: null
};
//平台、设备和操作系统
var system = {
win: false,
mac: false,
x11: false,
//移动设备
iphone: false,
ipod: false,
ipad: false,
ios: false,
android: false,
nokiaN: false,
winMobile: false,
//游戏系统
wii: false,
ps: false
};
//检测呈现引擎和浏览器
var ua = navigator.userAgent;
if (window.opera){
engine.ver = browser.ver = window.opera.version();
engine.opera = browser.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
engine.ver = RegExp["$1"];
engine.webkit = parseFloat(engine.ver);
//确定是Chrome 还是Safari
if (/Chrome\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.chrome = parseFloat(browser.ver);
} else if (/Version\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.safari = parseFloat(browser.ver);
} else {
//近似地确定版本号
var safariVersion = 1;
if (engine.webkit < 100){
safariVersion = 1;
} else if (engine.webkit < 312){
safariVersion = 1.2;
} else if (engine.webkit < 412){
safariVersion = 1.3;
} else {
safariVersion = 2;
}
browser.safari = browser.ver = safariVersion;
}

} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp["$1"];
engine.khtml = browser.konq = parseFloat(engine.ver);
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
engine.ver = RegExp["$1"];
engine.gecko = parseFloat(engine.ver);
//确定是不是Firefox
if (/Firefox\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.firefox = parseFloat(browser.ver);
}
} else if (/MSIE ([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp["$1"];
engine.ie = browser.ie = parseFloat(engine.ver);
}
//检测浏览器
browser.ie = engine.ie;
browser.opera = engine.opera;
//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//检测Windows 操作系统
if (system.win){
if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
if (RegExp["$1"] == "NT"){
switch(RegExp["$2"]){
case "5.0":
system.win = "2000";
break;
case "5.1":
system.win = "XP";
break;
case "6.0":
system.win = "Vista";
break;
case "6.1":
system.win = "7";
break;
default:
system.win = "NT";
break;
}
} else if (RegExp["$1"] == "9x"){
system.win = "ME";
} else {
system.win = RegExp["$1"];
}
}
}
//移动设备

system.iphone = ua.indexOf("iPhone") > -1;
system.ipod = ua.indexOf("iPod") > -1;
system.ipad = ua.indexOf("iPad") > -1;
system.nokiaN = ua.indexOf("NokiaN") > -1;
//windows mobile
if (system.win == "CE"){
system.winMobile = system.win;
} else if (system.win == "Ph"){
if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
system.win = "Phone";
system.winMobile = parseFloat(RegExp["$1"]);
}
}
//检测iOS 版本
if (system.mac && ua.indexOf("Mobile") > -1){
if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
system.ios = parseFloat(RegExp.$1.replace("_", "."));
} else {
system.ios = 2; //不能真正检测出来，所以只能猜测
}
}
//检测Android 版本
if (/Android (\d+\.\d+)/.test(ua)){
system.android = parseFloat(RegExp.$1);
}
//游戏系统
system.wii = ua.indexOf("Wii") > -1;
system.ps = /playstation/i.test(ua);
//返回这些对象
return {
engine: engine,
browser: browser,
system: system
};
}();
```

##### 9.3.4 使用方法

用户代理检测是客户端检测的最后一个选择，一般用于以下情形：

- 不能直接准确地使用能力检测或怪癖检测。例如，某些浏览器实现了为将来功能预留的存根
  （stub）函数。在这种情况下，仅测试相应的函数是否存在还得不到足够的信息。
- 同一款浏览器在不同平台下具备不同的能力。这时候，可能就有必要确定浏览器位于哪个平台下。
- 为了跟踪分析等目的需要知道确切的浏览器。

#### 9.4 小结

客户端检测是 JavaScript 开发中最具有争议性的一个话题，由于浏览器存在差别，通常需要根据不同浏览器的能力分别编写不同的代码，下列为常用的检测方法（按需优先级）：

- **能力检测**：在编写代码之前先检测特定浏览器的能力。例如，脚本在调用某个函数之前，可能要先检测该函数是否存在。这种检测方法将开发人员从考虑具体的浏览器类型和版本中解放出来，让他们把注意力集中到相应的能力是否存在上。能力检测无法精确地检测特定的浏览器和版本。
- **怪癖检测**：怪癖实际上是浏览器实现中存在的bug，例如早期的WebKit 中就存在一个怪癖，即它会在for-in 循环中返回被隐藏的属性。怪癖检测通常涉及到运行一小段代码，然后确定浏览器是否存在某个怪癖。由于怪癖检测与能力检测相比效率更低，因此应该只在某个怪癖会干扰脚本运行的情况下使用。怪癖检测无法精确地检测特定的浏览器和版本。
- **用户代理检测**：通过检测用户代理字符串来识别浏览器。用户代理字符串中包含大量与浏览器有关的信息，包括浏览器、平台、操作系统及浏览器版本。用户代理字符串有过一段相当长的发展历史，在此期间，浏览器提供商试图通过在用户代理字符串中添加一些欺骗性信息，欺骗网站相信自己的浏览器是另外一种浏览器。用户代理检测需要特殊的技巧，特别是要注意Opera会隐瞒其用户代理字符串的情况。即便如此，通过用户代理字符串仍然能够检测出浏览器所用的呈现引擎以及所在的平台，包括移动设备和游戏系统。

在决定使用哪种客户端检测方法时，一般应优先考虑使用能力检测。怪癖检测是确定应该如何处理代码的第二选择。而用户代理检测则是客户端检测的最后一种方案，因为这种方法对用户代理字符串具有很强的依赖性。

### 10 DOM

**DOM**（文档对象模型）是针对**HTML**和**XML** 文档的一个 API（应用程序编程接口）。

#### 10.1节点层次

**DOM** 可以将任何**HTML** 或**XML** 文档描绘成一个由多层节点构成的结构。。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。

**文档节点**是每个文档的根节点。在这个例子中，文档节点只有一个子节点，即<html>元素，我们称之为文档元素。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文档只能有一个**文档元素**。

![image-20210118110043105](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210118110043105.png)

Document  文档节点   ——> 子节点    html   （文档元素）

##### 10.1.1 Node类型

DOM1 级定义了一个Node 接口，该接口将由DOM 中的所有节点类型实现。这个Node 接口在
JavaScript 中是作为Node 类型实现的；每个节点都有一个**nodeType** 属性，用于**表明节点的类型**。节点类型由在Node 类型中定义的下列12 个数值常量来表示，任何节点类型必居其一：

- Node.ELEMENT_NODE(1)；
- Node.ATTRIBUTE_NODE(2)；
- Node.TEXT_NODE(3)；
- Node.CDATA_SECTION_NODE(4)；
- Node.ENTITY_REFERENCE_NODE(5)；
- Node.ENTITY_NODE(6)；
- Node.PROCESSING_INSTRUCTION_NODE(7)；
- Node.COMMENT_NODE(8)；
- Node.DOCUMENT_NODE(9)；
- Node.DOCUMENT_TYPE_NODE(10)；
- Node.DOCUMENT_FRAGMENT_NODE(11)；
- Node.NOTATION_NODE(12)。



`if (someNode.nodeType == Node.ELEMENT_NODE){ //在IE 中无效`
`alert("Node is an element.");`
`}`

这个例子比较了someNode.nodeType 与Node.ELEMENT_NODE 常量。如果二者相等，则意味着someNode 确实是一个元素。然而，由于IE 没有公开Node 类型的构造函数，因此上面的代码在IE 中会导致错误。为了确保跨浏览器兼容，最好还是将nodeType 属性与数字值进行比较，如下所示：

`if (someNode.nodeType == 1){ //适用于所有浏览器`
`alert("Node is an element.");`
`}`

###### 10.1.1.1nodeName 和nodeValue 属性

这两个属性的值完全取决于节点的类型。在使用这两个值以前，最好是像下面这样先检测一下节点的类型。
`if (someNode.nodeType == 1){`
`value = someNode.nodeName; //nodeName 的值是元素的标签名`
`}`
在这个例子中，首先检查节点类型，看它是不是一个元素。如果是，则取得并保存**nodeName** 的值。
对于元素节点，**nodeName** 中保存的始终都是元素的标签名，而**nodeValue** 的值则始终为null。

###### 10.1.1.2节点关系

节点间的各种关系可以用传统的家族关系来描述，相当于把文档树比喻成家谱。在HTML 中，可以将<body>元素看成是<html>元素的子元素；以此类推

每个节点都有一个**childNodes** 属性，其中保存着一个**NodeList** 对象。**NodeList** 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。

虽然可以通过方括号语法来访问NodeList 的值，而且这个对象也有length 属性，但它并不是Array 的实例，下面的例子展示了如何访问保存在NodeList 中的节点——可以通过方括号，也可以使用item()
方法。
`var firstChild = someNode.childNodes[0];`
`var secondChild = someNode.childNodes.item(1);`
`var count = someNode.childNodes.length;`

**要注意length 属性表示的是访问NodeList 的那一刻，其中包含的节点数量。**

对**arguments** 对象（函数参数）使用**Array.prototype.slice()**方法可以将其转换为数组。而采用同样的方法，也可以将**NodeList** 对象转换为数组。来看下面的例子：

`//在IE8 及之前版本中无效`
`var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);`

要想在IE 中将NodeList 转换为数组，必须手动枚举所有成员：

`function convertToArray(nodes){`
`var array = null;`
`try {`
`array = Array.prototype.slice.call(nodes, 0); //针对非IE 浏览器`
`} catch (ex) {`
`array = new Array();`
`for (var i=0, len=nodes.length; i < len; i++){`
`array.push(nodes[i]);`
`}`
`}`
`return array;`  
`}`



**parentNode**：该属性指向文档树中的父节点。列表中第一个节点的**previousSibling**（上一个） 属性值为null，而列表中最后一个节点的**nextSibling** （下一个）属性的值同样也为null。父节点的**firstChild** 和**lastChild**属性分别指向其**childNodes** 列表中的第一个和最后一个节点。

![image-20210118140644201](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210118140644201.png)



所有节点都有的最后一个属性是ownerDocument，该属性指向表示整个文档的文档节点。这种关系表示的是任何节点都属于它所在的文档，任何节点都不能同时存在于两个或更多个文档中。通过这个属性，我们可以不必在节点层次中通过层层回溯到达顶端，而是可以直接访问文档节点。

###### 10.1.1.3操作节点

DOM 提供了一些操作节点的方法：

**appendChild()**：用于向**childNodes** 列表的末尾添加一个节点。更新完成后，appendChild()返回新增的节点。如果传入到**appendChild()**中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置。

**insertBefore()**：这个方法接受两个参数：要插入的节点和作为参照的节点。如果参照节点是null，则insertBefore()与appendChild()执行相同的操作。

**replaceChild()**：方法接受的两个参数是：要插入的节点和要替换的节点。

**removeChild()**：即要移除的节点。被移除的节点将成为方法的返回值。



前面介绍的四个方法操作的都是某个节点的子节点，也就是说，要使用这几个方法必须先取得父节点（使用**parentNode** 属性）。另外，并不是所有类型的节点都有子节点，如果在不支持子节点的节点上调用了这些方法，将会导致错误发生。

###### 10.1.1.4 其他方法

有两个方法是所有类型的节点都有的。

**cloneNode()**：用于创建调用这个方法的节点的一个完全相同的副本。cloneNode()方法接受一个布尔值参数，表示是否执行深复制。在参数为true的情况下，执行深复制，也就是复制节点及其整个子节点树；在参数为false 的情况下，执行浅复制，即只复制节点本身。

##### 10.1.2 Document类型

在浏览器中，**document** 对象是HTMLDocument（继承自Document 类型）的一个实例，表示整个HTML 页面。而且，**document** 对象是**window** 对象的一个属性，因此可以将其作为全局对象来访问。**Document** 节点具有下列特征：

- **nodeType** 的值为9；
- **nodeName** 的值为"#document"；
- **nodeValue** 的值为null；
- **parentNode** 的值为null；
- **ownerDocument** 的值为 null；
- 其子节点可能是一个**DocumentType**（最多一个）、**Element**（最多一个）**ProcessingInstruction**或**Comment**。

###### 10.1.2.1 文档的子节点

- 这个页面在经过浏览器解析后，其文档中只包含一个子节点，即<html>元素。可以通过**documentElement** 或**childNodes** 列表来访问这个元素，如下所示。
  `var html = document.documentElement; //取得对<html>的引用`
  `alert(html === document.childNodes[0]); //true`
  `alert(html === document.firstChild); //true`

- 作为HTMLDocument 的实例，document 对象还有一个body 属性，直接指向<body>元素。因为开发人员经常要使用这个元素，所以**document.body** 在JavaScript 代码中出现的频率非常高，其用法如下。
  `var body = document.body; //取得对<body>的引用`

  所有浏览器都支持**document.documentElement** 和**document.body** 属性。

- Document 另一个可能的子节点是**DocumentType**。通常将<!DOCTYPE>标签看成一个与文档其他
  部分不同的实体，可以通过doctype 属性（在浏览器中是document.doctype）来访问它的信息。
  `var doctype = document.doctype; //取得对<!DOCTYPE>的引用`




浏览器对**document.doctype** 的支持差别很大，可以给出如下总结。

- IE8 及之前版本：如果存在文档类型声明，会将其错误地解释为一个注释并把它当作Comment节点；而**document.doctype** 的值始终为null。
- IE9+及Firefox：如果存在文档类型声明，则将其作为文档的第一个子节点；document.doctype是一个DocumentType 节点，也可以通过**document.firstChild** 或**document.childNodes[0]**访问同一个节点。
- Safari、Chrome 和Opera：如果存在文档类型声明，则将其解析，但不作为文档的子节点。**document.doctype** 是一个**DocumentType** 节点，但该节点不会出现在document.childNodes 中。

###### 10.1.2.2 文档信息

作为HTMLDocument 的一个实例，**document** 对象还有一些标准的**Document** 对象所没有的属性。

**title**：通过这个属性可以取得当前页面的标题，也可以修改当前页面的标题并反映在浏览器的标题栏中。

**URL**：包含页面完整的URL（即地址栏中显示的URL）

**domain**：只包含页面的域名

**referrer**：保存着链接到当前页面的那个页面的URL，在没有来源页面的情况下，可能会包含空字符串。



在这3 个属性中，只有domain 是可以设置的。但由于安全方面的限制，也并非可以给domain 设置任何值。如果URL 中包含一个子域名，例如p2p.wrox.com，那么就只能将domain 设置为"wrox.com"（URL 中包含"www"，如www.wrox.com 时，也是如此）。不能将这个属性设置为URL 中不包含的域，

由于跨域安全限制， 来自不同子域的页面无法通过JavaScript 通信。而通过将每个页面的**document.domain** 设置为相同的值，这些页面就可以互相访问对方包含的JavaScript 对象了。

浏览器对domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设置为“紧绷的”（tight）。换句话说，在将document.domain 设置为"wrox.com"之后，就不能再将其设置回"p2p.wrox.com"，否则将会导致错误，如下面的例子所示。
`//假设页面来自于p2p.wrox.com 域`
`document.domain = "wrox.com"; //松散的（成功）`
`document.domain = "p2p.wrox.com"; //紧绷的（出错！）`

###### 10.1.2.3查找元素

**getElementById()**：根据ID 查找文档元素

**getElementsByTagName()**：根据标签名查找

**namedItem()**：HTMLCollection 对象还有一个方法，叫做namedItem()，使用这个方法可以通过元素的name特性取得集合中的项。

**getElementsByName()**：根据name查找

###### 10.1.2.4 特殊集合

除了属性和方法，document 对象还有一些特殊的集合。这些集合都是HTMLCollection 对象，为访问文档常用的部分提供了快捷方式，包括：

- document.anchors，包含文档中所有带name 特性的<a>元素；
- document.applets，包含文档中所有的<applet>元素，因为不再推荐使用<applet>元素，所以这个集合已经不建议使用了；
- document.forms，包含文档中所有的<form>元素，与document.getElementsByTagName("form")得到的结果相同；
- document.images，包含文档中所有的<img>元素，与document.getElementsByTagName("img")得到的结果相同；
- document.links，包含文档中所有带href 特性的<a>元素。

###### 10.1.2.5 DOM一致性检测

由于DOM 分为多个级别，也包含多个部分，因此检测浏览器实现了DOM的哪些部分就十分必要了。

**hasFeature()**：这个方法接受两个参数：要检测的DOM 功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该方法返回true，如下面的例子所示：
`var hasXmlDom = document.implementation.hasFeature("XML", "1.0");`

![image-20210118170309989](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210118170309989.png)

我们建议多数情况下，在使用DOM 的某些特殊的功能之前，最好除了检测**hasFeature()**之外，还同时使用能力检测。

###### 10.1.2.6文档写入

有一个document 对象的功能已经存在很多年了，那就是将输出流写入到网页中的能力。

**write()**：接受一个字符串参数，即要写入到输出流中的文本。

**writeln()**：接受一个字符串参数，即要写入到输出流中的文本，在字符串的末尾添加一个换行符（\n）。

可以使用write()和writeln()方法动态地包含外部资源，例如JavaScript 文件等。

<html>

<head>
<title>document.write() Example 3</title>
</head>
<body>

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"file.js\">" +
"<\/script>");
</script>      必须加转义符\
</body>
</html>

**open()**和**close()**分别用于打开和关闭网页的输出流。

##### 10.1.3 Element类型

Element 类型用于表现XML或HTML元素，提供了对元素标签名、子节点及特性的访问。Element 节点具有以下特征：

- nodeType 的值为1；
- nodeName 的值为元素的标签名；
- nodeValue 的值为null；
- parentNode 可能是Document 或Element；
- 其子节点可能是Element、Text、Comment、ProcessingInstruction、CDATASection 或EntityReference。

要访问元素的标签名，可以使用**nodeName** 属性，也可以使用**tagName** 属性；这两个属性会返回相同的值（使用后者主要是为了清晰起见）。

###### 10.1.3.1 HTML元素

HTMLElement 类型直接继承自Element 并添加了一些属性。添加的这些属性分别对应于每个HTML
元素中都存在的下列标准特性。

- **id**，元素在文档中的唯一标识符。
- **title**，有关元素的附加说明信息，一般通过工具提示条显示出来。
- **lang**，元素内容的语言代码，很少使用。
- **dir**，语言的方向，值为"ltr"（left-to-right，从左至右）或"rtl"（right-to-left，从右至左），也很少使用。
- **className**，与元素的class 特性对应，即为元素指定的CSS类。没有将这个属性命名为class，是因为class 是ECMAScript 的保留字



元素中指定的所有信息，都可以通过下列JavaScript 代码取得：
`var div = document.getElementById("myDiv");`
`alert(div.id); //"myDiv""`
`alert(div.className); //"bd"`
`alert(div.title); //"Body text"`
`alert(div.lang); //"en"`
`alert(div.dir); //"ltr"`
当然，像下面这样通过为每个属性赋予新的值，也可以修改对应的每个特性：

`div.id = "someOtherId";`
`div.className = "ft";`
`div.title = "Some other text";`
`div.lang = "fr";`
`div.dir ="rtl";`

![image-20210118175957309](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210118175957309.png)

![image-20210119091743455](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119091743455.png)

###### 10.1.3.2 取得特性

每个元素都有一或多个特性，这些特性的用途是给出相应元素或其内容的附加信息。

**getAttribute()**：检测标签元素的特性名，参数为class  name  id 等。但是如（style、onclick）两个特性虽然和属性名一样，但是用属性取得的值与 getAttribute() 返回的值并不相同。

`var div = document.getElementById("myDiv");`
`alert(div.getAttribute("id")); //"myDiv"`
`alert(div.getAttribute("class")); //"bd"`
`alert(div.getAttribute("title")); //"Body text"`

**style**特性值中包含的是CSS 文本，而通过属性来访问它则会返回一个对象。

**onclick** 特性中包含的是JavaScript 代码，如果通过getAttribute()访问，则会返回相应代码的字符串。而在访问onclick 属性时，则会返回一个JavaScript 函数（如果未在元素中指定相应特性，则返回null）

###### 10.1.3.3 设置特性

**setAttribute()**：这个方法接受两个参数：要设置的特性名和值，。如果特性已经存在，setAttribute()会以指定的值替换现有的值；

`div.setAttribute("id", "someOtherId");`
`div.setAttribute("class", "ft");`
`div.setAttribute("title", "Some other text");`

###### 10.1.3.4 attributes 属性

Element 类型是使用attributes 属性的唯一一个DOM 节点类型。attributes 属性中包含一个**NamedNodeMap**，与**NodeList** 类似，也是一个“动态”的集合。元素的每一个特性都由一个Attr节点表示，每个节点都保存在**NamedNodeMap** 对象中。**NamedNodeMap** 对象拥有下列方法。

- **getNamedItem(name)**：返回nodeName 属性等于name 的节点；
- **removeNamedItem(name)**：从列表中移除nodeName 属性等于name 的节点；
- **setNamedItem(node)**：向列表中添加节点，以节点的nodeName 属性为索引；
- **item(pos)**：返回位于数字pos 位置处的节点。

**attributes** 属性中包含一系列节点，每个节点的nodeName 就是特性的名称，而节点的**nodeValue**
就是特性的值。要取得元素的id 特性，可以使用以下代码。
`var id = element.attributes.getNamedItem("id").nodeValue;`

`var id = element.attributes["id"].nodeValue;`

也可以使用这种语法来设置特性的值，将其nodeValue 设置为新值，如下所示。

`element.attributes["id"].nodeValue = "someOtherId";`

调用**removeNamedItem()**方法与在元素上调用**removeAttribute()**方法的效果相同——直接删
除具有给定名称的特性。

下面的例子展示了两个方法间唯一的区别，即**removeNamedItem()**返回表示被删除特性的Attr 节点。
`var oldAttr = element.attributes.removeNamedItem("id");`



**setNamedItem()**：，通过这个方法可以为元素添加一个新特性，为此需要为它传入一个特性节点，如下所示。
`element.attributes.setNamedItem(newAttr);`

如果想要遍历元素的特性，attributes 属性可以派上用场。在需要将DOM 结构序列化为XML 或HTML 字符串时，多数都会涉及遍历元素特性。以下代码展示了如何迭代元素的每一个特性，然后将它们构造成**name="value" name="value"**这样的字符串格式。

`function outputAttributes(element){`
`var pairs = new Array(),`
`attrName,`
`attrValue,`
`i,`
`len;`
`for (i=0, len=element.attributes.length; i < len; i++){`
`attrName = element.attributes[i].nodeName;`
`attrValue = element.attributes[i].nodeValue;`
`pairs.push(attrName + "=\"" + attrValue + "\"");`
`}`
`return pairs.join(" ");`
`}`

通过attributes.length 属性，for 循环会遍历每个特性，将特性的名称和值输出为字符串。关于以上代码的运行结果，以下是两点必要的说明。
** 针对attributes 对象中的特性，不同浏览器返回的顺序不同。这些特性在XML 或HTML 代码中出现的先后顺序，不一定与它们出现在attributes 对象中的顺序一致。**
** IE7 及更早的版本会返回HTML 元素中所有可能的特性，包括没有指定的特性。换句话说，返回100 多个特性的情况会很常见。**

###### 10.1.3.5 创建元素

**document.createElement()**方法可以创建新元素。这个方法只接受一个参数，即要创建元素的标签名。

`var div = document.createElement("div");`

在使用createElement()方法创建新元素的同时，也为新元素设置了**ownerDocuemnt** 属性。此时，还可以操作元素的特性，为它添加更多子节点，以及执行其他操作。来看下面的例子。
`div.id = "myNewDiv";`
`div.className = "box";`

在IE 中可以以另一种方式使用createElement()，即为这个方法传入完整的元素标签，也可以包
含属性，如下面的例子所示。
`var div = document.createElement("<div id=\"myNewDiv\" class=\"box\"></div >");`

在新元素上设置这些特性只是给它们赋予了相应的信息。由于新元素尚未被添加到文档树中，因此
设置这些特性不会影响浏览器的显示。要把新元素添加到文档树，可以使用**appendChild()**、**insertBefore()**或**replaceChild()**方法。下面的代码会把新创建的元素添加到文档的<body>元素中。

`document.body.appendChild(div);`

一旦将元素添加到文档树中，浏览器就会立即呈现该元素。此后，对这个元素所作的任何修改都会实时反映在浏览器中。

###### 10.1.3.6元素的子节点

元素可以有任意数目的子节点和后代节点，因为元素可以是其他元素的子节点。元素的**childNodes** 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令。不同浏览器在看待这些节点方面存在显著的不同，以下面的代码为例。

![image-20210119140714475](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119140714475.png)

如果是IE 来解析这些代码，那么<ul>元素会有3 个子节点，分别是3 个<li>元素。但如果是在其他浏览器中，<ul>元素都会有7 个元素，包括3 个<li>元素和4 个文本节点（表示<li>元素之间的空白符）。如果像下面这样将元素间的空白符删除，那么所有浏览器都会返回相同数目的子节点。

![image-20210119141257389](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119141257389.png)

##### 10.1.4 Text 类型

文本节点由Text 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的**HTML** 字符，但不能包含HTML 代码。Text 节点具有以下特征：

- nodeType 的值为3；
- nodeName 的值为"#text"；
- nodeValue 的值为节点所包含的文本；
- parentNode 是一个Element；
- 不支持（没有）子节点。

可以通过**nodeValue** 属性或**data** 属性访问Text 节点中包含的文本，这两个属性中包含的值相同。对**nodeValue** 的修改也会通过data 反映出来，反之亦然。使用下列方法可以操作节点中的文本。

- **appendData(text)**：将text 添加到节点的末尾。
- **deleteData(offset, count)**：从offset 指定的位置开始删除count 个字符。
- **insertData(offset, text)**：在offset 指定的位置插入text。
- **replaceData(offset, count, text)**：用text 替换从offset 指定的位置开始到offset+count 为止处的文本。
- **splitText(offset)**：从offset 指定的位置将当前文本节点分成两个文本节点。
- **substringData(offset, count)**：提取从offset 指定的位置开始到offset+count 为止处的字符串。

除了这些方法之外，文本节点还有一个length 属性，保存着节点中字符的数目。而且，**nodeValue.length** 和**data.length** 中也保存着同样的值。
在默认情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须确实有内容存在。来看几个例子

![image-20210119142210913](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119142210913.png)

###### 10.1.4.1 创建文本节点

**document.createTextNode()**：，这个方法接受一个参数——要插入节点中的文本。与设置已有文本节点的值一样，作为参数的文本也将按照HTML 或XML 的格式进行编码。

一般情况下，每个元素只有一个文本子节点。不过，在某些情况下也可能包含多个文本子节点，如下面的例子所示。
`var element = document.createElement("div");`
`element.className = "message";`
`var textNode = document.createTextNode("Hello world!");`
`element.appendChild(textNode);`
`var anotherTextNode = document.createTextNode("Yippee!");`
`element.appendChild(anotherTextNode);`
`document.body.appendChild(element);`

如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。

###### 10.1.4.2 规范化文本节点

**normalize()**：能够将相邻文本节点合并。如果在一个包含两个或多个文本节点的父元素上调用**normalize()**方法，则会将所有文本节点合并成一个节点，结果节点的nodeValue 等于将合并前每个文本节点的**nodeValue** 值拼接起来的值。

`var element = document.createElement("div");`
`element.className = "message";`
`var textNode = document.createTextNode("Hello world!");`
`element.appendChild(textNode);`
`var anotherTextNode = document.createTextNode("Yippee!");`
`element.appendChild(anotherTextNode);`
`document.body.appendChild(element);`
`alert(element.childNodes.length); //2`
`element.normalize();`
`alert(element.childNodes.length); //1`
`alert(element.firstChild.nodeValue); // "Hello world!Yippee!"`

###### 10.1.4.3 分割文本节点

**splitText()**：这个方法会将一个文本节点分成两个文本节点，即按照指定的位置分割nodeValue 值。原来的文本节点将包含从开始到指定位置之前的内容，新文本节点将包含剩下的文本。

`var element = document.createElement("div");`
`element.className = "message";`
`var textNode = document.createTextNode("Hello world!");`
`element.appendChild(textNode);`
`document.body.appendChild(element);`
`var newNode = element.firstChild.splitText(5);`
`alert(element.firstChild.nodeValue); //"Hello"`
`alert(newNode.nodeValue); //" world!"`
`alert(element.childNodes.length); //2`

##### 10.1.5 Comment类型

注释在DOM中是通过Comment 类型来表示的。Comment 节点具有下列特征：

- nodeType 的值为8；
- nodeName 的值为"#comment"；
- nodeValue 的值是注释的内容；
- parentNode 可能是Document 或Element；
- 不支持（没有）子节点。

**Comment** 类型与**Text** 类型继承自相同的基类，因此它拥有除**splitText()**之外的所有字符串操作方法。与Text 类型相似，也可以通过**nodeValue** 或**data** 属性来取得注释的内容。

![image-20210119150706395](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119150706395.png)

另外，使用**document.createComment()**并为其传递注释文本也可以创建注释节点，如下面的例子所示。
var comment = document.createComment("A comment ");

##### 10.1.6 CDATASection 类型

CDATASection 类型只针对基于XML 的文档，表示的是CDATA 区域。与Comment 类似，CDATASection 类型继承自Text 类型，因此拥有除splitText()之外的所有字符串操作方法。CDATASection 节点具有下列特征：

- nodeType 的值为4；
- nodeName 的值为"#cdata-section"；
- nodeValue 的值是CDATA 区域中的内容；
- parentNode 可能是Document 或Element；
- 不支持（没有）子节点。



##### 10.1.7 DocumentType 类型

DocumentType 类型在Web 浏览器中并不常用，仅有Firefox、Safari 和Opera 支持它①。**Document-Type** 包含着与文档的doctype 有关的所有信息，它具有下列特征：

- nodeType 的值为10；
- nodeName 的值为doctype 的名称；
- nodeValue 的值为null；
- parentNode 是Document；
- 不支持（没有）子节点。

在DOM1 级中，DocumentType 对象不能动态创建，而只能通过解析文档代码的方式来创建。支持它的浏览器会把DocumentType 对象保存在document.doctype 中。DOM1 级描述了DocumentType 对象的3 个属性：name、entities 和notations。其中，

**name** 表示文档类型的名称；

**entities** 是由文档类型描述的实体的NamedNodeMap 对象；

**notations** 是由文档类型描述的符号的NamedNodeMap 对象。

通常，浏览器中的文档使用的都是HTML 或XHTML 文档类型，因而entities和notations 都是空列表（列表中的项来自行内文档类型声明）。但不管怎样，只有name 属性是有用的。这个属性中保存的是文档类型的名称，也就是出现在<!DOCTYPE 之后的文本。以下面严格型HTML4.01 的文档类型声明为例：

![image-20210119152511501](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119152511501.png)

##### 10.1.8 DocumentFragment类型

在所有节点类型中，只有DocumentFragment 在文档中没有对应的标记。DOM 规定文档片段
（document fragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。**DocumentFragment** 节点具有下列特征：

- nodeType 的值为11；
- nodeName 的值为"#document-fragment"；
- nodeValue 的值为null；
- parentNode 的值为null；
- 子节点可以是**Element**、**ProcessingInstruction**、**Comment**、**Text**、**CDATASection** 或**EntityReference**。

虽然不能把文档片段直接添加到文档中，但可以将它作为一个“仓库”来使用，即可以在里面保存将
来可能会添加到文档中的节点。要创建文档片段，可以使用**document.createDocumentFragment()**方法，如下所示：
var fragment = document.createDocumentFragment();

假设我们想为这个<ul>元素添加3 个列表项。如果逐个地添加列表项，将会导致浏览器反复渲染（呈
现）新信息。为避免这个问题，可以像下面这样使用一个文档片段来保存创建的列表项，然后再一次性将它们添加到文档中。
`var fragment = document.createDocumentFragment();`
`var ul = document.getElementById("myList");`
`var li = null;`
`for (var i=0; i < 3; i++){`
`li = document.createElement("li");`
`li.appendChild(document.createTextNode("Item " + (i+1)));`
`fragment.appendChild(li);`
`}`
`ul.appendChild(fragment);`

##### 10.1.9 Attr 类型

元素的特性在DOM 中以Attr 类型来表示。在所有浏览器中（包括IE8），都可以访问Attr 类型的**构造函数**和**原型**。从技术角度讲，特性就是存在于元素的**attributes** 属性中的节点。特性节点具有下列特征：

- nodeType 的值为2；
- nodeName 的值是特性的名称；
- nodeValue 的值是特性的值；
- parentNode 的值为null；
- 在HTML 中不支持（没有）子节点；
- 在XML 中子节点可以是Text 或EntityReference。

尽管它们也是节点，但特性却不被认为是DOM 文档树的一部分。开发人员最常使用的是**getAttribute()**、**setAttribute()**和**remveAttribute()**方法，很少直接引用特性节点。

Attr 对象有3 个属性：name、value 和specified。其中，name 是特性名称（与nodeName 的值相同），value 是特性的值（与nodeValue 的值相同），而specified 是一个布尔值，用以区别特性是在代码中指定的，还是默认的。

#### 10.2 DOM 操作技术

很多时候，DOM 操作都比较简明，因此用JavaScript 生成那些通常原本是用HTML 代码生成的内
容并不麻烦。不过，也有一些时候，操作DOM 并不像表面上看起来那么简单。由于浏览器中充斥着隐藏的陷阱和不兼容问题，用JavaScript 代码处理DOM 的某些部分要比处理其他部分更复杂一些。

##### 10.2.1 动态脚本

插入外部文件和直接插入JavaScript 代码。动态加载的外部JavaScript 文件能够立即运行，比如下面的<script>元素：

![image-20210119161342097](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119161342097.png)

![image-20210119161358446](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119161358446.png)

另一种指定JavaScript 代码的方式是行内方式，如下面的例子所示：

![image-20210119161429316](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119161429316.png)

##### 10.2.2动态样式

能够把CSS 样式包含到HTML 页面中的元素有两个。其中，<link>元素用于包含来自外部的文件，而<style>元素用于指定嵌入的样式。

我们以下面这个典型的<link>元素为例：
<link rel="stylesheet" type="text/css" href="styles.css">
使用DOM 代码可以很容易地动态创建出这个元素：
`var link = document.createElement("link");`
`link.rel = "stylesheet";`
`link.type = "text/css";`
`link.href = "style.css";`
`var head = document.getElementsByTagName("head")[0];`
`head.appendChild(link);`
以上代码在所有主流浏览器中都可以正常运行。需要注意的是，必须将<link>元素添加到<head>而不是<body>元素，才能保证在所有浏览器中的行为一致。整个过程可以用以下函数来表示：

`function loadStyles(url){`
`var link = document.createElement("link");`

`link.rel = "stylesheet";`
`link.type = "text/css";`
`link.href = url;`
`var head = document.getElementsByTagName("head")[0];`
`head.appendChild(link);`
`}`

##### 10.2.3  操作表格

![image-20210119161746006](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210119161746006.png)

##### 10.2.4 使用 NodeList

理解**NodeList** 及其“近亲”**NamedNodeMap** 和**HTMLCollection**，是从整体上透彻理解DOM的
关键所在。这三个集合都是“动态的”；换句话说，每当文档结构发生变化时，它们都会得到更新。因此，它们始终都会保存着最新、最准确的信息。

如果想要迭代一个**NodeList**，最好是使用length 属性初始化第二个变量，然后将迭代器与该变量进行比较，如下面的例子所示：

`var divs = document.getElementsByTagName("div"),`
`i,`
`len,`
`div;`
`for (i=0, len=divs.length; i < len; i++){`
`div = document.createElement("div");`
`document.body.appendChild(div);`
`}`



#### 10.3 小结

**DOM**是语言中立的**API**，用于访问和操作**HTML** 和**XML** 文档。DOM1 级将HTML 和XML 文档形象地看作一个层次化的节点树，可以使用JavaScript 来操作这个节点树，进而改变底层文档的外观和结构。
DOM 由各种节点构成，简要总结如下。

- 最基本的节点类型是Node，用于抽象地表示文档中一个独立的部分；所有其他类型都继承自Node。
- **Document** 类型表示整个文档，是一组分层节点的根节点。在JavaScript 中，document 对象是Document 的一个实例。使用document 对象，有很多种方式可以查询和取得节点。
- **Element** 节点表示文档中的所有HTML 或XML 元素，可以用来操作这些元素的内容和特性。
- 另外还有一些节点类型，分别表示**文本内容**、**注释**、**文档类型**、**CDATA 区域**和**文档片段**。

访问DOM 的操作在多数情况下都很直观，不过在处理<script>和<style>元素时还是存在一些复杂性。由于这两个元素分别包含脚本和样式信息，因此浏览器通常会将它们与其他元素区别对待。这些区别导致了在针对这些元素使用innerHTML 时，以及在创建新元素时的一些问题。



### 11  DOM扩展

对DOM 的两个主要的扩展是**Selectors API**（选择符API）和**HTML5**。而将某些常见做法及API 标准化一直是众望所归。此外，还有一个不那么引人瞩目的Element Traversal（元素遍历）规范，为DOM添加了一些属性。

#### 11.1 选择符API

根据CSS 选择符选择与某个模式匹配的DOM 元素。，jQuery（www.jquery.com）的核心就是通过CSS 选择符查询DOM文档取得元素的引用，从而抛开了**getElementById()**和**getElementsByTagName()**。

Selectors API Level 1 的核心是两个方法：**querySelector()**和**querySelectorAll()**。可以通过Document 及Element 类型的实例调用它们。目前已完全支持Selectors API Level 1的浏览器有IE 8+、Firefox 3.5+、Safari 3.1+、Chrome 和Opera 10+。

##### 11.1.1 querySelector()方法

querySelector()方法接收一个CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回null。请看下面的例子。

`//取得body 元素`
`var body = document.querySelector("body");`
`//取得ID 为"myDiv"的元素`
`var myDiv = document.querySelector("#myDiv");`
`//取得类为"selected"的第一个元素`
`var selected = document.querySelector(".selected");`
`//取得类为"button"的第一个图像元素`
`var img = document.body.querySelector("img.button");`

通过**Document** 类型调用querySelector()方法时，会在文档元素的范围内查找匹配的元素。

通过**Element** 类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。

##### 11.1.2 querySelectorAll()方法

**querySelectorAll()**方法接收的参数与**querySelector()**方法一样，都是一个CSS 选择符，但返回的是所有匹配的元素而不仅仅是一个元素。这个方法返回的是一个NodeList 的实例。

具体来说，返回的值是一个带有所有属性和方法的NodeList，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用NodeList 对象通常会引起的大多数性能问题。

只要传给**querySelectorAll()**方法的CSS 选择符有效，该方法都会返回一个NodeList 对象，而不管找到多少匹配的元素。如果没有找到匹配的元素，**NodeList** 就是空的。

`//取得某<div>中的所有<em>元素（类似于getElementsByTagName("em")）`
`var ems = document.getElementById("myDiv").querySelectorAll("em");`
`//取得类为"selected"的所有元素`
`var selecteds = document.querySelectorAll(".selected");`
`//取得所有<p>元素中的所有<strong>元素`
`var strongs = document.querySelectorAll("p strong");`

##### 11.1.3 matchesSelector()方法

这个方法接收一个参数，即CSS 选择符，如果调用元素与该选择符匹配，返回true；否则，返回false。看例子。
`if (document.body.matchesSelector("body.page1")){`
`//true`
`}`

使用这个方法，最好是编写一个包装函数。

`function matchesSelector(element, selector){`
`if (element.matchesSelector){`
`return element.matchesSelector(selector);`
`} else if (element.msMatchesSelector){`
`return element.msMatchesSelector(selector);`
`} else if (element.mozMatchesSelector){`
`return element.mozMatchesSelector(selector);`
`} else if (element.webkitMatchesSelector){`
`return element.webkitMatchesSelector(selector);`
`} else {`
`throw new Error("Not supported.");`
`}`
`}`
`if (matchesSelector(document.body, "body.page1")){`
`//执行操作`
`}`

#### 11.2 元素遍历

对于元素间的空格，IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样，就导致了在使用**childNodes** 和**firstChild** 等属性时的行为不一致。

Element Traversal API 为DOM元素添加了以下5 个属性。

- childElementCount：返回子元素（不包括文本节点和注释）的个数。
- firstElementChild：指向第一个子元素；firstChild 的元素版。
- lastElementChild：指向最后一个子元素；lastChild 的元素版。
- previousElementSibling：指向前一个同辈元素；previousSibling 的元素版。
- nextElementSibling：指向后一个同辈元素；nextSibling 的元素版。

#### 11.3 HTML5

对于传统HTML 而言，HTML5 是一个叛逆。所有之前的版本对JavaScript 接口的描述都不过三言两语，主要篇幅都用于定义标记，与JavaScript 相关的内容一概交由DOM 规范去定义。
而HTML5 规范则围绕如何使用新增标记定义了大量**JavaScript** API。其中一些API 与DOM 重叠，定义了浏览器应该支持的DOM扩展。

##### 11.3.1 与类相关的补充

为了让开发人员适应并增加对class 属性的新认识，HTML5 新增了很多API，致力于简化CSS 类的用法。

###### 11.3.1.1 getElementsByClassName()方法

**getElementsByClassName()**方法接收一个参数，即一个包含一或多个类名的字符串，返回带有指定类的所有元素的NodeList。

`//取得所有类中包含"username"和"current"的元素，类名的先后顺序无所谓`
`var allCurrentUsernames = document.getElementsByClassName("username current");`
`//取得ID 为"myDiv"的元素中带有类名"selected"的所有元素`
`var selected = document.getElementById("myDiv").getElementsByClassName("selected");`

###### 11.3.1.2 classList属性

在操作类名时，需要通过className 属性添加、删除和替换类名。

- add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
- contains(value)：表示列表中是否存在给定的值，如果存在则返回true，否则返回false。
- remove(value)：从列表中删除给定的字符串。
- toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

##### 11.3.2焦点管理

HTML5 也添加了辅助管理DOM 焦点的功能。首先就是**document.activeElement** 属性，这个属性始终会引用DOM 中当前获得了焦点的元素。元素获得焦点的方式有**页面加载**、**用户输入**（通常是通过按Tab 键）和在代码中调用**focus()**方法。来看几个例子。

另外就是新增了**document.hasFocus()**方法，这个方法用于确定文档是否获得了焦点。
`var button = document.getElementById("myButton");`

`button.focus();`
`alert(document.hasFocus()); //true`

通过检测文档是否获得了焦点，可以知道用户是不是正在与页面交互。

##### 11.3.3 HTMLDocument 的变化

HTML5 扩展了**HTMLDocument**，增加了新的功能。与HTML5 中新增的其他DOM 扩展类似，这些变化同样基于那些已经得到很多浏览器完美支持的专有扩展。

###### 11.3.3.1 readyState 属性

- loading，正在加载文档；
- complete，已经加载完文档。

使用document.readyState 的最恰当方式，就是通过它来实现一个指示文档已经加载完成的指示器。在这个属性得到广泛支持之前，要实现这样一个指示器，必须借助onload 事件处理程序设置一个标签，表明文档已经加载完毕。document.readyState 属性的基本用法如下。
`if (document.readyState == "complete"){`
`//执行操作`
`}`

###### 11.3.3.2 兼容模式

IE 为此给document 添加了一个名为**compatMode** 的属性，这个属性就是为了告诉开发人员浏览器采用了哪种渲染模式。

就像下面例子中所展示的那样，在**标准模式**下，**document.compatMode** 的值等于"**CSS1Compat**"，而在**混杂模式**下，**document.compatMode** 的值等于"**BackCompat**"。

`if (document.compatMode == "CSS1Compat"){`
`alert("Standards mode");`
`} else {`
`alert("Quirks mode");`
`}`

###### 11.3.3.3 head属性

作为对document.body 引用文档的<body>元素的补充，HTML5 新增了document.head 属性，引用文档的<head>元素。要引用文档的<head>元素，可以结合使用这个属性和另一种后备方法。
`var head = document.head || document.getElementsByTagName("head")[0];`

##### 11.3.4 字符集属性

TML5 新增了几个与文档字符集有关的属性。

**charset** 属性表示文档中实际使用的字符集，也可以用来指定新字符集。默认情况下，这个属性的值为"UTF-16"，但可以通过<meta>元素、响应头部或直接设置charset 属性修改这个值。来看一个例子。
`alert(document.charset); //"UTF-16"`
`document.charset = "UTF-8";`

**defaultCharset**表示根据默认浏览器及操作系统的设置当前文档默认的字符集应该是什么。

通过这两个属性可以得到文档使用的字符编码的具体信息，也能对字符编码进行准确地控制。

##### 11.3.5 自定义数据属性

HTML5 规定可以为元素添加非标准的属性，但要添加前缀data-，目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以data-开头即可。来看一个例子。

![image-20210120151019473](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210120151019473.png)

添加了自定义属性之后，可以通过元素的dataset 属性来访问自定义属性的值。**dataset** 属性的值是DOMStringMap 的一个实例，也就是一个名值对儿的映射。

`/本例中使用的方法仅用于演示`
`var div = document.getElementById("myDiv");`
`//取得自定义属性的值`
`var appId = div.dataset.appId;`
`var myName = div.dataset.myname;`
`//设置值`
`div.dataset.appId = 23456;`
`div.dataset.myname = "Michael";`
`//有没有"myname"值呢？`
`if (div.dataset.myname){`

`alert("Hello, " + div.dataset.myname);`
`}`

##### 11.3.6 插入标记

虽然DOM 为操作节点提供了细致入微的控制手段，但在需要给文档插入大量新HTML 标记的情况下，通过DOM操作仍然非常麻烦，因为不仅要创建一系列DOM 节点，而且还要小心地按照正确的顺序把它们连接起来。相对而言，使用插入标记的技术，直接插入HTML 字符串不仅更简单，速度也更快。以下与插入标记相关的DOM 扩展已经纳入了HTML5 规范。

###### 11.3.6.1  innerHTML属性

在读模式下，**innerHTML** 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的HTML 标记。在写模式下，innerHTML 会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点。

![image-20210120155334543](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210120155334543.png)

在写模式下，**innerHTML** 的值会被解析为DOM 子树，替换调用元素原来的所有子节点。因为它的值被认为是HTML，所以其中的所有标签都会按照浏览器处理HTML 的标准方式转换为元素。

innerHTML 字符串一开始（而且整个）就是一个“无作用域的元素”，所以这个字符串会变成空字符串。如果想插入这段脚本，必须在前面添加一个“有作用域的元素”，可以是一个文本节点，也可以是一个没有结束标签的元素如<input>。例如，下面这几行代码都可以正常执行：
`div.innerHTML = "_<script defer>alert('hi');<\/script>";`
`div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";`
`div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";`

只要使用innerHTML 从外部插入HTML，都应该首先以可靠的方式处理HTML。IE8 为此提供了**window.toStaticHTML()**方法，这个方法接收一个参数，即一个HTML 字符串；返回一个经过无害处理后的版本——从源HTML 中删除所有脚本节点和事件处理程序属性。下面就是一个例子：

`var text = "<a href=\"#\" onclick=\"alert('hi')\">Click Me</a>";`
`var sanitized = window.toStaticHTML(text); //Internet Explorer 8 only`
`alert(sanitized); //"<a href=\"#\">Click Me</a>"`

###### 11.3.6.2 outerHTML属性

在读模式下，**outerHTML** 返回调用它的元素及所有子节点的HTML 标签。在写模式下，outerHTML会根据指定的HTML 字符串创建新的DOM 子树，然后用这个DOM子树完全替换调用元素。

使用outerHTML 属性以下面这种方式设置值：
`div.outerHTML = "<p>This is a paragraph.</p>";`
这行代码完成的操作与下面这些DOM 脚本代码一样：
`var p = document.createElement("p");`
`p.appendChild(document.createTextNode("This is a paragraph."));`
`div.parentNode.replaceChild(p, div);`
结果，就是新创建的<p>元素会取代DOM 树中的<div>元素。

###### 11.3.6.3 insertAdjacentHTML () 方法

它接收两个参数：插入位置和要插入的HTML 文本。第一个参数必须是下列值之一：

- "**beforebegin**"，在当前元素之前插入一个紧邻的同辈元素；
- "**afterbegin**"，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
- "**beforeend**"，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；
- "**afterend**"，在当前元素之后插入一个紧邻的同辈元素。

`//作为前一个同辈元素插入`
`element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");`
`//作为第一个子元素插入`
`element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");`
`//作为最后一个子元素插入`
`element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");`
`//作为后一个同辈元素插入`
`element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");`

###### 11.3.6.4 内存与性能问题

挨个用**innerHTML** 出入会严重影响内存，所以用一下方法：

`var itemsHtml = "";`

`for (var i=0, len=values.length; i < len; i++){`
`itemsHtml += "<li>" + values[i] + "</li>";`
`}`
`ul.innerHTML = itemsHtml;`

##### 11.3.7 scrollIntoview()方法

**scrollIntoView()**可以在所有HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。如果给这个方法传入true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。如果传入false 作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口底部平齐。）

#### 11.4专有扩展

还有大量专有的DOM 扩展没有成为标准。但这并不是说它们将来不会被写进标准，而只是说在编写本书的时候，它们还是专有功能，而且只得到了少数浏览器的支持。

##### 11.4.1 文档模式

- IE5：以混杂模式渲染页面（IE5 的默认模式就是混杂模式）。IE8 及更高版本中的新功能都无法使用。
- IE7：以IE7 标准模式渲染页面。IE8 及更高版本中的新功能都无法使用。
- IE8：以IE8 标准模式渲染页面。IE8 中的新功能都可以使用，因此可以使用Selectors API、更多CSS2 级选择符和某些CSS3 功能，还有一些HTML5 的功能。不过IE9 中的新功能无法使用。
- IE9：以IE9 标准模式渲染页面。IE9 中的新功能都可以使用，比如ECMAScript 5、完整的CSS3以及更多HTML5 功能。这个文档模式是最高级的模式。

要强制浏览器以某种模式渲染页面，可以使用HTTP 头部信息X-UA-Compatible，或通过等价的<meta>标签来设置：

![image-20210120170231218](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210120170231218.png)

- Edge：始终以最新的文档模式来渲染页面。忽略文档类型声明。对于IE8，始终保持以IE8 标准模式渲染页面。对于IE9，则以IE9 标准模式渲染页面。
- EmulateIE9：如果有文档类型声明，则以IE9 标准模式渲染页面，否则将文档模式设置为IE5。
- EmulateIE8：如果有文档类型声明，则以IE8 标准模式渲染页面，否则将文档模式设置为IE5。
- EmulateIE7：如果有文档类型声明，则以IE7 标准模式渲染页面，否则将文档模式设置为IE5。
- 9：强制以IE9 标准模式渲染页面，忽略文档类型声明。
- 8：强制以IE8 标准模式渲染页面，忽略文档类型声明。
- 7：强制以IE7 标准模式渲染页面，忽略文档类型声明。
- 5：强制将文档模式设置为IE5，忽略文档类型声明。

##### 11.4.2 children属性

这个属性是HTMLCollection 的实例，只包含元素中同样还是元素的子节点。除此之外，children 属性与childNodes 没有什么区别，即在元素只包含元素子节点时，这两个属性的值相同。下面是访问children 属性的示例代码：

`var childCount = element.children.length;`
`var firstChild = element.children[0];`

##### 11.4.3 contains ()方法

以便不通过在DOM文档树中查找即可获得这个信息。调用**contains()**方法的应该是祖先节点，也就是搜索开始的节点，这个方法接收一个参数，即要检测的后代节点。如果被检测的节点是后代节点，该方法返回true；否则，返回false。以下是一个例子：

`alert(document.documentElement.contains(document.body)); //true`

使用DOM Level 3 **compareDocumentPosition()**也能够确定节点间的关系。返回一个表示该关系的位掩码（ bitmask）。下表列出了这个位掩码的值。

![image-20210120170624923](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210120170624923.png)

##### 11.4.4 插入文本

前面介绍过，IE 原来专有的插入标记的属性innerHTML 和outerHTML 已经被HTML5 纳入规范。但另外两个插入文本的专有属性则没有这么好的运气。这两个没有被HTML5 看中的属性是**innerText**和**outerText**。

###### 11.4.4.1 innerText 属性

读取值时，它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。

写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点。

设置innerText 永远只会生成当前节点的一个子文本节点，而为了确保只生成一个子文本节点，就必须要对文本进行HTML 编码。利用这一点，可以通过innerText 属性过滤掉HTML 标签。方法是将innerText 设置为等于innerText，这样就可以去掉所有HTML 标签，比如：
div.innerText = div.innerText;

###### 11.4.4.2 outerText属性

在读取文本值时，**outerText** 与innerText 的结果完全一样。

在写模式下，**outerText** 就完全不同了：**outerText** 不只是替换调用它的元素的子节点，而是会替换整个元素（包括子节点）。比如：
div.outerText = "Hello world!";
这行代码实际上相当于如下两行代码：
var text = document.createTextNode("Hello world!");
div.parentNode.replaceChild(text, div);

本质上，新的文本节点会完全取代调用outerText 的元素。此后，该元素就从文档中被删除，无法访问。

##### 11.4.5 滚动

HTML5 在将**scrollIntoView()**纳入规范之后，仍然还有其他几个专有方法可以在不同的浏览器中使用。下面列出
的几个方法都是对HTMLElement 类型的扩展，因此在所有元素中都可以调用。

- **scrollIntoViewIfNeeded(alignCenter)**：只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的alignCenter 参数设置为true，则表示尽量将元素显示在视口中部（垂直方向）。Safari 和Chrome 实现了这个方法。
- **scrollByLines(lineCount)**：将元素的内容滚动指定的行高，lineCount 值可以是正值，也可以是负值。Safari 和Chrome 实现了这个方法。
- **scrollByPages(pageCount)**：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。Safari 和Chrome 实现了这个方法。

希望大家要注意的是，**scrollIntoView()**和**scrollIntoViewIfNeeded()**的作用对象是元素的容器，而**scrollByLines()**和**scrollByPages()**影响的则是元素自身。下面还是来看几个示例吧。

`//将页面主体滚动5 行`
`document.body.scrollByLines(5);`

`//在当前元素不可见的时候，让它进入浏览器的视口`
`document.images[0].scrollIntoViewIfNeeded();`
`//将页面主体往回滚动1 页`
`document.body.scrollByPages(-1);`

#### 11.5 小结

虽然DOM 为与XML 及HTML 文档交互制定了一系列核心API，但仍然有几个规范对标准的DOM进行了扩展。这些扩展中有很多原来是浏览器专有的，但后来成为了事实标准，于是其他浏览器也都提供了相同的实现。本章介绍的三个这方面的规范如下。

- Selectors API，定义了两个方法，让开发人员能够基于CSS 选择符从DOM中取得元素，这两个方法是**querySelector()**和**querySelectorAll()**。
- Element Traversal，为DOM元素定义了额外的属性，让开发人员能够更方便地从一个元素跳到另一个元素。之所以会出现这个扩展，是因为浏览器处理DOM 元素间空白符的方式不一样。
- HTML5，为标准的DOM 定义了很多扩展功能。其中包括在**innerHTML** 属性这样的事实标准基础上提供的标准定义，以及为管理焦点、设置字符集、滚动页面而规定的扩展API。

### 12 DOM2和DOM3

DOM1级主要定义的是HTML 和XML 文档的底层结构。DOM2 和DOM3 级则在这个结构的基础上引入了更多的交互能力，也支持了更高级的XML 特性。分为许多模块（模块之间具有某种关联），分别描述了DOM 的某个非常具体的子集。

- DOM2 级核心（DOM Level 2 Core）：在1 级核心基础上构建，为节点添加了更多方法和属性。
- DOM2 级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图。
- DOM2 级事件（DOM Level 2 Events）：说明了如何使用事件与DOM文档交互。
- DOM2 级样式（DOM Level 2 Style）：定义了如何以编程方式来访问和改变CSS 样式信息。
- DOM2 级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历DOM 文档和选择其特定部分的新接口。
- DOM2 级 HTML（DOM Level 2 HTML）：在1 级HTML 基础上构建，添加了更多属性、方法和新接口。

#### 12.1 DOM变化

“DOM2 级视图”和“DOM2 级HTML”模块也增强了DOM 接口，提供了新的属性和方法。由于这两个模块很小，因此我们将把它们与“DOM2 级核心”放在一起，讨论基本JavaScript 对象的变化。可以通过下列代码来确定浏览器是否支持这些DOM 模块。

`var supportsDOM2Core = document.implementation.hasFeature("Core", "2.0");`
`var supportsDOM3Core = document.implementation.hasFeature("Core", "3.0");`
`var supportsDOM2HTML = document.implementation.hasFeature("HTML", "2.0");`
`var supportsDOM2Views = document.implementation.hasFeature("Views", "2.0");`
`var supportsDOM2XML = document.implementation.hasFeature("XML", "2.0");`

##### 12.1.1 针对XML命名空间的变化

有了XML 命名空间，不同XML 文档的元素就可以混合在一起，共同构成格式良好的文档，而不必担心发生命名冲突。从技术上说，HTML 不支持XML 命名空间，但XHTML 支持XML 命名空间。因此，本节给出的都是XHTML 的示例。

![image-20210121142131823](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210121142131823.png)

###### 12.1.1.1 Node类型的变化

在DOM2 级中，Node 类型包含下列特定于命名空间的属性。

- **localName**：不带命名空间前缀的节点名称。
- **namespaceURI**：命名空间URI 或者（在未指定的情况下是）null。
- **prefix**：命名空间前缀或者（在未指定的情况下是）null。

当节点使用了命名空间前缀时，其**nodeName** 等于prefix+":"+ localName。以下面的文档为例：

![image-20210121150001135](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210121150001135.png)

对于<html>元素来说，它的localName 和tagName 是"html"，namespaceURI 是"http://www.w3.org/1999/xhtml"，而prefix 是null。

对于<s:svg>元素而言，它的localName 是"svg"，tagName 是"s:svg"，namespaceURI 是"http://www.w3.org/2000/svg"，而prefix 是"s"。

DOM3 级在此基础上更进一步，又引入了下列与命名空间有关的方法。

- **isDefaultNamespace(namespaceURI)**：在指定的namespaceURI 是当前节点的默认命名空间的情况下返回true。
- **lookupNamespaceURI(prefix)**：返回给定prefix 的命名空间。
- **lookupPrefix(namespaceURI)**：返回给定namespaceURI 的前缀。

###### 12.1.1.2 Document 类型的变化

DOM2 级中的Document 类型也发生了变化，包含了下列与命名空间有关的方法。

- **createElementNS(namespaceURI, tagName)**：使用给定的tagName 创建一个属于命名空间namespaceURI 的新元素。
- **createAttributeNS(namespaceURI, attributeName)**：使用给定的attributeName 创建一个属于命名空间namespaceURI 的新特性。
- **getElementsByTagNameNS(namespaceURI, tagName)**：返回属于命名空间namespaceURI的tagName 元素的NodeList。

使用这些方法时需要传入表示命名空间的URI（而不是命名空间前缀），如下面的例子所示。
`//创建一个新的SVG 元素`
`var svg = document.createElementNS("http://www.w3.org/2000/svg","svg");`
`//创建一个属于某个命名空间的新特性`
`var att = document.createAttributeNS("http://www.somewhere.com", "random");`
`//取得所有XHTML 元素`
`var elems = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "*");`

###### 12.1.1.3 Element 类型的变化

“DOM2 级核心”中有关Element 的变化，主要涉及操作特性。新增的方法如下。

- **getAttributeNS(namespaceURI,localName)**：取得属于命名空间namespaceURI 且名为localName 的特性。
- **getAttributeNodeNS(namespaceURI,localName)**：取得属于命名空间namespaceURI 且名为localName 的特性节点。
- **getElementsByTagNameNS(namespaceURI, tagName)**：返回属于命名空间namespaceURI的tagName 元素的NodeList。
- **hasAttributeNS(namespaceURI,localName)**：确定当前元素是否有一个名为localName的特性，而且该特性的命名空间是namespaceURI。注意，“DOM2 级核心”也增加了一个hasAttribute()方法，用于不考虑命名空间的情况。
- **removeAttriubteNS(namespaceURI,localName)**：删除属于命名空间namespaceURI 且名为localName 的特性。
- **setAttributeNS(namespaceURI,qualifiedName,value)**：设置属于命名空间namespace-URI 且名为qualifiedName 的特性的值为value。
- **setAttributeNodeNS(attNode)**：设置属于命名空间namespaceURI 的特性节点。

###### 12.1.1.4 NameNodeMap 类型的变化

**NamedNodeMap** 类型也新增了下列与命名空间有关的方法。由于特性是通过NamedNodeMap 表示的，因此这些方法多数情况下只针对特性使用。

- **getNamedItemNS(namespaceURI,localName)**：取得属于命名空间namespaceURI 且名为localName 的项。
- **removeNamedItemNS(namespaceURI,localName)**：移除属于命名空间namespaceURI 且名为localName 的项。
- **setNamedItemNS(node)**：添加node，这个节点已经事先指定了命名空间信息。由于一般都是通过元素访问特性，所以这些方法很少使用。

##### 12.1.2 其他方面的变化

###### 12.1.2.1 DocumentType 类型的变化

DocumentType 类型新增了3 个属性：**publicId**、**systemId** 和**internalSubset**。前两个属性表示的是文档类型声明中的两个信息段，最后一个属性internalSubset，用于访问包含在文档类型声明中的额外定义。

###### 12.1.2.2 Document 类型的变化

Document 类型的变化中唯一与命名空间无关的方法是**importNode()**。这个方法的用途是从一个文档中取得一个节点，然后将其导入到另一个文档，使其成为这个文档结构的一部分。**importNode()**方法与Element **cloneNode()**方法非常相似，它接受两个参数：要复制的节点和一个表示是否复制子节点的布尔值。返回的结果是原来节点的副本，但能够在当前文档中使用。

`var newNode = document.importNode(oldNode, true); //导入节点及其所有子节点`
`document.body.appendChild(newNode);`

**createDocumentType()**：用于创建一个新的DocumentType节点，接受3 个参数：**文档类型名称**、**publicId**、**systemId**。

`var doctype = document.implementation.createDocumentType("html",`
`"-//W3C//DTD HTML 4.01//EN",`
`"http://www.w3.org/TR/html4/strict.dtd");`

**createDocument()**：这个方法接受3 个参数：针对文档中元素的**namespaceURI**、**文档元素的标签名**、**新文档的文档类型**ko

###### 12.1.2.3 Node类型的变化

Node 类型中唯一与命名空间无关的变化，就是添加了**isSupported()**方法。与DOM1级为**document.implementation** 引入的**hasFeature()**方法类似，isSupported()方法用于确定当前节点具有什么能力。这个方法也接受相同的两个参数：特性名和特性版本号。

![image-20210122102117968](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210122102117968.png)



DOM3 级引入了两个辅助比较节点的方法：**isSameNode()**（相同）和**isEqualNode()**（相等）。这两个方法都接受一个节点参数，并在传入节点与引用的节点相同或相等时返回true。所谓相同，指的是两个节点引用的
是同一个对象。所谓相等，指的是两个节点是相同的类型，

![image-20210122143202313](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210122143202313.png)

DOM3 级还针对为DOM 节点添加额外数据引入了新方法。其中，**setUserData()**方法会将数据指定给节点，它接受3 个参数：要设置的键、实际的数据（可以是任何数据类型）和处理函数。如下：

`document.body.setUserData("name", "Nicholas", function(){});`
`然后，使用getUserData()并传入相同的键，就可以取得该数据，如下所示：`
`var value = document.body.getUserData("name");`

传入setUserData()中的处理函数会在带有数据的节点被复制、删除、重命名或引入一个文档时调用，因而你可以事先决定在上述操作发生时如何处理用户数据。处理函数接受5 个参数：表示**操作类型的数值**（1 表示复制，2 表示导入，3 表示删除，4 表示重命名）、**数据键**、**数据值**、**源节点**和**目标节点**。

`var div = document.createElement("div");`
`div.setUserData("name", "Nicholas", function(operation, key, value, src, dest){`
`if (operation == 1){`
`dest.setUserData(key, value, function(){}); }`

`});`
`var newDiv = div.cloneNode(true);`
`alert(newDiv.getUserData("name")); //"Nicholas"`

###### 12.1.2.4 框架的变化

框架和内嵌框架分别用**HTMLFrameElement** 和**HTMLIFrameElement** 表示，它们在DOM2级中都有了一个新属性，名叫**contentDocument**。这个属性包含一个指针，指向表示框架内容的文档对象。

`var iframe = document.getElementById("myIframe");`
`var iframeDoc = iframe.contentDocument;`

#### 12.2 样式

在HTML 中定义样式的方式有3 种：

- 通过<link/>元素包含外部样式表文件、
- 使用<style/>元素定义嵌入式样式，
- 使用style 特性定义针对特定元素的样式。

##### 12.2.1 访问元素的样式

任何支持style 特性的HTML 元素在JavaScript 中都有一个对应的style 属性。这个style 对象是**CSSStyleDeclaration** 的实例，包含着通过HTML 的style 特性指定的所有样式信息，对于使用短划线（分隔不同的词汇，例如background-image）的CSS 属性名，必须将其转换成驼峰大小写形式，才能通过JavaScript 来访问。

![image-20210122151537702](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210122151537702.png)

###### 12.2.1.1 DOM样式属性和方法

“DOM2级样式”规范还为style 对象定义了一些属性和方法。这些属性和方法在提供元素的**style**特性值的同时，也可以修改样式。下面列出了这些属性和方法。

- **cssText**：如前所述，通过它能够访问到style 特性中的CSS 代码。

设置cssText 是为元素应用多项变化最快捷的方式，因为可以一次性地应用所有变化。

- **length**：应用给元素的CSS 属性的数量。

设计length 属性的目的，就是将其与item()方法配套使用，以便迭代在元素中定义的CSS 属性。

- **parentRule**：表示CSS 信息的CSSRule 对象。本节后面将讨论CSSRule 类型。
- **getPropertyCSSValue(propertyName)**：返回包含给定属性值的CSSValue 对象。
- **getPropertyPriority(propertyName)**：如果给定的属性使用了!important 设置，则返回"important"；否则，返回空字符串。
- **getPropertyValue(propertyName)**：返回给定属性的字符串值。
- **item(index)**：返回给定位置的CSS 属性的名称。
- **removeProperty(propertyName)**：从样式中删除给定属性。
- **setProperty(propertyName,value,priority)**：将给定属性设置为相应的值，并加上优先权标志（"important"或者一个空字符串）。

###### 12.2.1.2 计算的样式

**getComputedStyle()**：接受两个参数：要取得计算样式的元素和一个伪元素字符串（例如":after"）。如果不需要伪元素信息，第二个参数可以是null。

`var myDiv = document.getElementById("myDiv");`
`var computedStyle = document.defaultView.getComputedStyle(myDiv, null);`
`alert(computedStyle.backgroundColor); // "red"`
`alert(computedStyle.width); // "100px"`
`alert(computedStyle.height); // "200px"`
`alert(computedStyle.border); // 在某些浏览器中是"1px solid black"`

IE 不支持getComputedStyle()方法，但它有一种类似的概念。在IE 中，每个具有style 属性的元素还有一个currentStyle 属性。

![image-20210122164440043](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210122164440043.png)

##### 12.2.2 操作样式表

CSSStyleSheet 类型表示的是样式表，包括通过<link>元素包含的样式表和在<style>元素中定义的样式表。

- **disabled**：表示样式表是否被禁用的布尔值。这个属性是可读/写的，将这个值设置为true 可以禁用样式表。
- **href**：如果样式表是通过<link>包含的，则是样式表的URL；否则，是null。
- **media**：当前样式表支持的所有媒体类型的集合。与所有DOM 集合一样，这个集合也有一个length 属性和一个item()方法。也可以使用方括号语法取得集合中特定的项。如果集合是空列表，表示样式表适用于所有媒体。在IE 中，media 是一个反映<link>和<style>元素media特性值的字符串。
- **ownerNode**：指向拥有当前样式表的节点的指针，样式表可能是在HTML 中通过<link>或<style/>引入的（在XML 中可能是通过处理指令引入的）。如果当前样式表是其他样式表通过@import 导入的，则这个属性值为null。IE 不支持这个属性。
- **parentStyleSheet**：在当前样式表是通过@import 导入的情况下，这个属性是一个指向导入它的样式表的指针。
- **title**：ownerNode 中title 属性的值。
- **type**：表示样式表类型的字符串。对CSS 样式表而言，这个字符串是"type/css"。

**除了disabled 属性之外，其他属性都是只读的。**

- **cssRules**：样式表中包含的样式规则的集合。IE 不支持这个属性，但有一个类似的rules 属性。
- **ownerRule**：如果样式表是通过@import 导入的，这个属性就是一个指针，指向表示导入的规则；否则，值为null。IE 不支持这个属性。
- **deleteRule(index)**：删除cssRules 集合中指定位置的规则。IE 不支持这个方法，但支持一个类似的removeRule()方法。
- **insertRule(rule,index)**：向cssRules 集合中指定的位置插入rule 字符串。IE 不支持这个方法，但支持一个类似的addRule()方法。

###### 12.2.2.1 CSS规则

CSSRule 对象表示样式表中的每一条规则。实际上，CSSRule 是一个供其他多种类型继承的基类型，其中最常见的就是CSSStyleRule 类型，表示样式信息，CSSStyleRule 对象包括以下属性：

- **cssText**：返回整条规则对应的文本。由于浏览器对样式表的内部处理方式不同，返回的文本可能会与样式表中实际的文本不一样；Safari 始终都会将文本转换成全部小写。IE 不支持这个属性。
- **parentRule**：如果当前规则是导入的规则，这个属性引用的就是导入规则；否则，这个值为null。IE 不支持这个属性。
- **parentStyleSheet**：当前规则所属的样式表。IE 不支持这个属性。
- **selectorText**：返回当前规则的选择符文本。由于浏览器对样式表的内部处理方式不同，返回的文本可能会与样式表中实际的文本不一样（例如，Safari 3 之前的版本始终会将文本转换成全部小写）。在Firefox、Safari、Chrome 和IE 中这个属性是只读的。Opera 允许修改selectorText。
- **style**：一个CSSStyleDeclaration 对象，可以通过它设置和取得规则中特定的样式值。
- **type**：表示规则类型的常量值。对于样式规则，这个值是1。IE 不支持这个属性。

最常用的是 **style**  **selectorText** 和 **CSSText**，cssText 属性与style.cssText属性类似，但并不相同。前者包含选择符文本和围绕样式信息的花括号，后者只包含样式信息。cssText 是只读的，而style.cssText 也可以被重写。

![image-20210123102542072](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210123102542072.png)

###### 12.2.2.2 创建规则

DOM 规定，要向现有样式表中添加新规则，需要使用**insertRule()**方法。这个方法接受两个参数：**规则文本**和**表示在哪里插入规则的索引**。下面是一个例子。

`sheet.insertRule("body { background-color: silver }", 0); //DOM 方法`

**addRule()**：接收两必选参数：选择符文本和CSS样式信息；一个可选参数：插入规则的位置。

`sheet.addRule("body", "background-color: silver", 0); //仅对IE 有效`

要以跨浏览器的方式向样式表中插入规则，可以使用下面的函数。这个函数接受4 个参数：要向其中添加**规则的样式表**以及与addRule()相同的3 个参数，如下所示。

`function insertRule(sheet, selectorText, cssText, position){`
`if (sheet.insertRule){`
`sheet.insertRule(selectorText + "{" + cssText + "}", position);`
`} else if (sheet.addRule){`
`sheet.addRule(selectorText, cssText, position);`
`}`
`}`

`insertRule(document.styleSheets[0], "body", "background-color: silver", 0);`

###### 12.2.2.3 删除规则

从样式表中删除规则的方法是**deleteRule()**，这个方法接受一个参数：要删除的规则的位置。

`sheet.deleteRule(0); //DOM 方法`

`IE 支持的类似方法叫removeRule()，使用方法相同，如下所示：`
`sheet.removeRule(0); //仅对IE 有效`

跨浏览器函数：

`function deleteRule(sheet, index){`
`if (sheet.deleteRule){`
`sheet.deleteRule(index);`
`} else if (sheet.removeRule){`
`sheet.removeRule(index);`
`}`
`}`

##### 12.2.3 元素大小

本节介绍的属性和方法并不属于“DOM2 级样式”规范，但却与HTML 元素的样式息息相关。DOM中没有规定如何确定页面中元素的大小

###### 12.2.3.1 偏移量

首先要介绍的属性涉及**偏移量**（offset dimension），包括元素在屏幕上占用的所有可见的空间。元素的可见大小由其**高度**、**宽度**决定，包括**所有内边距**、**滚动条**和**边框大小**（注意，不包括外边距）

- **offsetHeight**：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、（可见的）水平滚动条的高度、上边框高度和下边框高度。
- **offsetWidth**：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
- **offsetLeft**：元素的左外边框至包含元素的左内边框之间的像素距离。
- **offsetTop**：元素的上外边框至包含元素的上内边框之间的像素距离。

![image-20210123150751008](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210123150751008.png)



`function getElementLeft(element){`
`var actualLeft = element.offsetLeft;`
`var current = element.offsetParent;`
`while (current !== null){`
`actualLeft += current.offsetLeft;`
`current = current.offsetParent;`
`}`
`return actualLeft;`
`}`

以上代码获取的是左偏移量，把**offsetLeft**换成**offsetTop**获取上偏移量

###### 12.2.3.2 客户区大小

元素的客户区大小（client dimension），指的是元素内容及其内边距所占据的空间大小。

**clientWidth** 和**clientHeight**。其中，clientWidth 属性是元素内容区宽度加上左右内边距宽度；clientHeight 属性是元素内容区高度加上上下内边距高度。

![image-20210123160856887](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210123160856887.png)

要确定浏览器视口大小，可以使用**document.documentElement** 或**document.body**（在IE7 之前的版本中）的
`clientWidth 和clientHeight。`
`function getViewport(){`
`if (document.compatMode == "BackCompat"){`
`return {`
`width: document.body.clientWidth,`
`height: document.body.clientHeight`
`};`
`} else {`
`return {`
`width: document.documentElement.clientWidth,`
`height: document.documentElement.clientHeight`
`};`
`}`
`}`

###### 12.2.3.3 滚动大小

最后要介绍的是滚动大小（scroll dimension），指的是包含滚动内容的元素的大小。

- **scrollHeight**：在没有滚动条的情况下，元素内容的总高度。
- **scrollWidth**：在没有滚动条的情况下，元素内容的总宽度。
- **scrollLeft**：被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
- **scrollTop**：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。

在确定文档的总高度时（包括基于视口的最小高度时），必须取得scrollWidth/clientWidth 和scrollHeight/clientHeight 中的最大值，才能保证在跨浏览器的环境下得到精确的结果。

`var docHeight = Math.max(document.documentElement.scrollHeight,`
`document.documentElement.clientHeight);`
`var docWidth = Math.max(document.documentElement.scrollWidth,`
`document.documentElement.clientWidth);`

通过scrollLeft 和scrollTop 属性既可以确定元素当前滚动的状态，也可以设置元素的滚动位置。

`function scrollToTop(element){`
`if (element.scrollTop != 0){`
`element.scrollTop = 0;`
`}`
`}`
这个函数既取得了scrollTop 的值，也设置了它的值。

###### 12.2.3.4 确定元素大小

**getBoundingClientRect()**：这个方法返回会一个矩形对象，包含4 个属性：left、top、right 和bottom。

IE8 及更早版本认为文档的左上角坐标是(2, 2)，而其他浏览器包括IE9 则将传统的(0,0)作为起点坐标。因此，就需要在一开始检查一下位于(0,0)处的元素的位置

`function getBoundingClientRect(element){`
`if (typeof arguments.callee.offset != "number"){`
`var scrollTop = document.documentElement.scrollTop;`
`var temp = document.createElement("div");`
`temp.style.cssText = "position:absolute;left:0;top:0;";`
`document.body.appendChild(temp);`
`arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;`
`document.body.removeChild(temp);`
`temp = null;`
`}`
`var rect = element.getBoundingClientRect();`
`var offset = arguments.callee.offset;`
`return {`
`left: rect.left + offset,`
`right: rect.right + offset,`
`top: rect.top + offset,`
`bottom: rect.bottom + offset`
`};`
`}`

#### 12.3 遍历

“DOM2 级遍历和范围”模块定义了两个用于辅助完成顺序遍历DOM 结构的类型：**NodeIterator**和**TreeWalker**。这两个类型能够基于给定的起点对DOM 结构执行深度优先（depth-first）的遍历操作。

DOM 遍历是深度优先的DOM 结构遍历，也就是说，移动的方向至少有两个（取决于使用的遍历类型）。遍历以给定节点为根，不可能向上超出DOM 树的根节点。以document 为根节点的DOM树进行深度优先遍历的先后顺序。

![image-20210125153232825](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210125153232825.png)

##### 12.3.1 NodeIterator

**NodeIterator** 类型是两者中比较简单的一个，可以使用**document.createNodeIterator()**方法创建它的新实例。这个方法接受下列4 个参数。

- **root**：想要作为搜索起点的树中的节点。
- **whatToShow**：表示要访问哪些节点的数字代码。
- **filter**：是一个NodeFilter 对象，或者一个表示应该接受还是拒绝某种特定节点的函数。
- **entityReferenceExpansion**：布尔值，表示是否要扩展实体引用。这个参数在HTML 页面中没有用，因为其中的实体引用不能扩展。

其中，whatToShow是一个位掩码，这个参数的值以常量形式在NodeFilter类型中定义，下面是常用的几个值：

**NodeFilter.SHOW_ALL**：显示所有类型 的节点
**NodeFilter.SHOW_ELEMENT**：显示元素节点
**NodeFilter.SHOW_TEXT**：显示文本节点
**NodeFilter.SHOW_COMMENT**：显示注释节点
**NodeFilter.SHOW_DOCUMENT**：显示文档节点

假设我们想要遍历<div>元素中的所有元素，那么可以使用下列代码。
`var div = document.getElementById("div1");`
`var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT,`
`null, false);`
`var node = iterator.nextNode();`
`while (node !== null) {`
`alert(node.tagName); //输出标签名`
`node = iterator.nextNode();`
`}`

也许用不着显示那么多信息，你只想返回遍历中遇到的<li>元素。很简单，只要使用一个过滤器
即可，如下面的例子所示。
`var div = document.getElementById("div1");`
`var filter = function(node){`
`return node.tagName.toLowerCase() == "li" ?`
`NodeFilter.FILTER_ACCEPT :`
`NodeFilter.FILTER_SKIP;`
`};`
`var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT,`
`filter, false);`
`var node = iterator.nextNode();`
`while (node !== null) {`
`alert(node.tagName); //输出标签名`
`node = iterator.nextNode();`
`}`

##### 12.3.2 TreeWalker

**TreeWalker** 是NodeIterator 的一个更高级的版本。除了包括**nextNode()**和**previousNode()**在内的相同的功能之外，这个类型还提供了下列用于在不同方向上遍历DOM 结构的方法。

- **parentNode()**：遍历到当前节点的父节点；
- **firstChild()**：遍历到当前节点的第一个子节点；
- **lastChild()**：遍历到当前节点的最后一个子节点；
- **nextSibling()**：遍历到当前节点的下一个同辈节点；
- **previousSibling()**：遍历到当前节点的上一个同辈节点。

创建TreeWalker 对象要使用**document.createTreeWalker()**方法，这个方法接受的4 个参数与**document.createNodeIterator()**方法相同：作为遍历起点的根节点、要显示的节点类型、过滤器和一个表示是否扩展实体引用的布尔值。

由于这两个创建方法很相似，所以很容易用**TreeWalker**来代替**NodeIterator**，如下面的例子所示。
`var div = document.getElementById("div1");`
`var filter = function(node){`
`return node.tagName.toLowerCase() == "li"?`
`NodeFilter.FILTER_ACCEPT :`
`NodeFilter.FILTER_SKIP;`
`};`
`var walker= document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT,`
`filter, false);`
`var node = iterator.nextNode();`
`while (node !== null) {`
`alert(node.tagName); //输出标签名`
`node = iterator.nextNode();`
`}`

在使用NodeIterator 对象时，NodeFilter.FILTER_SKIP 与NodeFilter.FILTER_REJECT 的作用相同：跳过指定的节点。

但在使用TreeWalker 对象时，NodeFilter.FILTER_SKIP 会跳过相应节点继续前进到子树中的下一个节点，而NodeFilter.FILTER_REJECT 则会跳过相应节点及该节点的整个子树。

`var div = document.getElementById("div1");`
`var walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null, false);`
`walker.firstChild(); //转到<p>`
`walker.nextSibling(); //转到<ul>`
`var node = walker.firstChild(); //转到第一个<li>`
`while (node !== null) {`
`alert(node.tagName);`
`node = walker.nextSibling();`
`}`

TreeWalker 类型还有一个属性，名叫**currentNode**，表示任何遍历方法在上一次遍历中返回的
节点。通过设置这个属性也可以修改遍历继续进行的起点，如下面的例子所示。

`var node = walker.nextNode();`
`alert(node === walker.currentNode); //true`
`walker.currentNode = document.body; //修改起点`

#### 12.4 范围

通过范围可以选择文档中的一个区域，而不必考虑节点的界限（选择在后台完成，对用户是不可见的）。

##### 12.4.1 DOM中的范围

DOM2 级在Document 类型中定义了**createRange()**方法。

**var range = document.createRange();**

与节点类似，新创建的范围也直接与创建它的文档关联在一起，不能用于其他文档。创建了范围之后，接下来就可以使用它在后台选择文档中的特定部分。

每个范围由一个**Range** 类型的实例表示，这个实例拥有很多属性和方法。下列属性提供了当前范围在文档中的位置信息。

- **startContainer**：包含范围起点的节点（即选区中第一个节点的父节点）。
- **startOffset**：范围在startContainer 中起点的偏移量。如果startContainer 是文本节点、注释节点或CDATA 节点，那么startOffset 就是范围起点之前跳过的字符数量。否则，startOffset 就是范围中第一个子节点的索引。
- **endContainer**：包含范围终点的节点（即选区中最后一个节点的父节点）。
- **endOffset**：范围在endContainer 中终点的偏移量（与startOffset 遵循相同的取值规则）。
- **commonAncestorContainer**：startContainer 和endContainer 共同的祖先节点在文档树中位置最深的那个。

###### 12.4.1.1 用DOM范围实现简单选择

要使用范围来选择文档中的一部分，最简的方式就是使用**selectNode()**或**selectNodeContents()**。

**selectNode()**方法选择整个节点，包括其子节点；而**selectNodeContents()**方法则只选择节点的子节点。

![image-20210125175331160](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210125175331160.png)

![image-20210125175337447](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210125175337447.png)

为了更精细地控制将哪些节点包含在范围中，还可以使用下列方法:

- **setStartBefore(refNode)**：将范围的起点设置在refNode 之前，因此refNode 也就是范围选区中的第一个子节点。同时会将startContainer 属性设置为refNode.parentNode，将startOffset 属性设置为refNode 在其父节点的childNodes 集合中的索引。
- **setStartAfter(refNode)**：将范围的起点设置在refNode 之后，因此refNode 也就不在范围之内了，其下一个同辈节点才是范围选区中的第一个子节点。同时会将startContainer 属性设置为refNode.parentNode，将startOffset 属性设置为refNode 在其父节点的childNodes 集合中的索引加1。
- **setEndBefore(refNode)**：将范围的终点设置在refNode 之前，因此refNode 也就不在范围之内了，其上一个同辈节点才是范围选区中的最后一个子节点。同时会将endContainer 属性设置为refNode.parentNode将endOffset 属性设置为refNode 在其父节点的childNodes集合中的索引。
- **setEndAfter(refNode)**：将范围的终点设置在refNode 之后，因此refNode 也就是范围选区
  中的最后一个子节点。同时会将endContainer 属性设置为refNode.parentNode，将
  endOffset 属性设置为refNode 在其父节点的childNodes 集合中的索引加1。

###### 12.4.1.2 用DOM 范围实现复杂选择

要创建复杂的范围就得使用**setStart()**和**setEnd()**方法。这两个方法都接受两个参数：一个参照节点和一个偏移量值。。对**setStart()**来说，参照节点会变成**startContainer**，而偏移量值会变成**startOffset**。对于**setEnd()**来说，参照节点会变成**endContainer**，而偏移量值会变成**endOffset**。

![image-20210126093534644](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210126093534644.png)



简单理解， **setStart()**和 **setEnd()** 的第二个参数就是需要开始和结束节点的下标，但是范围选择中的文本节点不包括**setEnd()** 的那个结束节点。

###### 12.4.1.3 操作DOM范围中的内容

在创建范围时 ，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档片段中。为了创建这个文档片段，**范围内容的格式**必须正确有效。

对于前面的例子而言，范围经过计算知道选区中缺少一个开始的<b>标签，因此就会在后台动态加
入一个该标签，同还会在前面加入一个表示结束的/b标签以结束"He"。

**deleteContents()**：能从文档中删除范围所包含的内容：

`var p1 = document.getElementById("p1");`
`helloNode = p1.firstChild.firstChild;`
`worldNode = p1.lastChild;`
`range = document.createRange();`

`range.setStart(helloNode, 2);`
`range.setEnd(worldNode, 3);`
`range.deleteContents();`

由于范围选区在修改底层DOM结构时能够保证格式良好，因此即使内容被删除了，最终的DOM结构依旧是格式良好的。

**extractContents()**：从文档中移除范围选区，返回范围的文档片段。利用这个返回的值，可以将范围的内容插入到文档中的其他地方。（简单理解为范围转移）

`var p1 = document.getElementById("p1");`
`helloNode = p1.firstChild.firstChild;`
`worldNode = p1.lastChild;`
`range = document.createRange();`
`range.setStart(helloNode, 2);`
`range.setEnd(worldNode, 3);`
`var fragment = range.extractContents();`
`p1.parentNode.appendChild(fragment);`

**cloneContents()**：创建范围对象的一个副本，然后在文档的其他地方插入该副本：

`var p1 = document.getElementById("p1"),`
`helloNode = p1.firstChild.firstChild,`
`worldNode = p1.lastChild,`
`range = document.createRange();`
`range.setStart(helloNode, 2);`
`range.setEnd(worldNode, 3);`
`var fragment = range.cloneContents();`
`p1.parentNode.appendChild(fragment);`

###### 12.4.1.4 插入DOM范围中的内容

使用**insertNode()**方法可以向范围选区的开始处插入一个节点。

除了向范围内部插入内容之外，还可以环绕范围插入内容，此时就要使用**surroundContents()**方法。这个方法接受一个参数，即环绕范围内容的节点。

在环绕范围插入内容时，后台会执行下列步骤。
(1) 提取出范围中的内容（类似执行extractContent()）；
(2) 将给定节点插入到文档中原来范围所在的位置上；
(3) 将文档片段的内容添加到给定节点中。

`var p1 = document.getElementById("p1");`
`helloNode = p1.firstChild.firstChild;`
`worldNode = p1.lastChild;`
`range = document.createRange();`
`range.selectNode(helloNode);`
`var span = document.createElement("span");`
`span.style.backgroundColor = "yellow";`
`range.surroundContents(span);`

###### 12.4.1.5 折叠DOM范围

使用**collapse()**方法来折叠范围，这个方法接受一个参数，一个布尔值，表示要折叠到范围的哪一端。参数true 表示折叠到范围的起点，参数false 表示折叠到范围的终点。要确定范围已经折叠完毕，可以检查collapsed 属性，如下所示：
`range.collapse(true); //折叠到起点`
`alert(range.collapsed); //输出true`

![image-20210129171536896](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210129171536896.png)

###### 12.4.16 比较DOM范围

