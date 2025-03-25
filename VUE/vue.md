# 1.谈谈你对vue的理解
官方：Vue是一套用于构建用户界面的渐进式框架，Vue的核心库只关注视图层
![alt text](image.png)
## 1.1 声明式框架
命令式和声明式的区别
* JQ都是命令式的，命令式框架重要特点就是关注过程
* 声明式更关注结果
```javascript
#### 
let numbers = [1,2,3,4,5]
let total = 0
for(let i = 0; i<numbers.length; i++){
    total += numbers[i]
}
console.log(total)
##############
let total12 = numbers.reduce(function(memo,current){
    return memo + current
},0)
```
## 1.2 MVVM 
Model-View-ViewModel
![alt text](image-1.png)
1. 将模型（Model）转化成视图（View），即将后端传递的数据转化成所看到的页面，实现的方式是：数据绑定。
2. 将视图（View）转化成模型（Model），即将所看到的页面转化成后端的数据，实现的方式是：DOM 事件监听。当这两个方向的数据转换都实现时，我们称之为数据的双向绑定。
Model-View-Controller
![alt text](image-2.png)
![alt text](image-3.png)
backbone+underscore+jquery
MVVM 与 MVC 最大的区别就是：MVVM 实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（双向绑定）。
## 1.3 虚拟dom
传统更新页面，拼接一个完整的字符串innerHTML全部重新渲染，添加虚拟dom后可以比较新旧虚拟节点，找到变化在进行更新。虚拟dom就是一个对象用来描述真实dom
## 1.4 区分编译时（打包）和运行（浏览器）时
* Vue的渲染核心就是调用渲染（render）方法将虚拟dom渲染成真实dom
* 专门写个编译时可以将模板编译成虚拟dom
## 1.5 组件化
实现高内聚、低耦合、单项数据流
* 组件化开发能大幅提高应用开发效率、测试性、复用性等
* 降低更新范围，值重新渲染变化的组件
# 2谈谈你对SPA的理解
* SPA（single page application）默认情况下VUE和react都只有一个html，并且提供一个挂载点，最终打包后会再此页面中引入对应的资源。切换页面时通过监听路由的变化，渲染对应的页面。CSR Client side Rendering。不好实现SEO搜索引擎优化
* MPA（multi-page application）多页面应用，多个html页面。每个页面必须重复加载、js、css等相关资源。（服务端返回完整的html，同时数据也可以再后端进行获取一并返回模板引擎）。多页应用跳转需要整页资源刷新。SSR Server Side Rendering。首次渲染速度较慢.
## 解决方案
* 静态页面预渲染（static Site Generation）SSG，在构建时生成完整的html页面。（在打包的时候，现将页面放到浏览器中运行一下，将HTML保存起来），仅适合静态页面网站，变化率不高的网站
* SSR+CSR，首屏采用服务端渲染方式，后续交互采用客户端渲染方式。NuxtJS
# 3 为什么要使用虚拟DOM
## 3.1
* virtual DOM 就是用金属对象来描述真实DOM，是对真实DOM的抽象，由于直接操作DOM性能低但是js层的操作效率高， 可以将DOM操作转化成对象操作，最终通过diff算法对比差异进行更新DOM
* 不依赖真实平台环境从而可以实现跨平台
## 1.2 vdom如何生成的
* 在vue中尝尝回味组件编写模板 - template
* 模板会被编译器编译为渲染函数 -render
* 挂在过程中会调用render函数，返回的对象就是虚拟dom
* 在后续的patch过程中进一步转化为真实dom
## Vdom如何做diff
* 挂在过程结束后，会记录vdom - oldvnode
* 当样影视数据发生变化事，将会引起组件重新render，此时就会生成新的vdom - newVnode
* 使用old和new做diff
# 谈一谈对VUE组件化的理解
**核心组成：模板、属性、事件、插槽、生命周期**
组件化的好处：高内聚、可复用、可组合
* 组件化开发能大幅提高应用开发效率、测试性、复用性等
* 降低更新范围，值重新渲染变化的组件
  补充：
  * Vue中的每个组件都有一个渲染函数watcher、effect
  * 数据室响应式的、数据变化后汇之星watcher或者effect
  * 组件要合理的划分、如果不拆分组件，那更新的时候整个页面都要重新更新
  * 如果过分的拆组件会导致watcher、effect产生过多也会遭成性能浪费
# 既然Vue通过数据劫持可以精准探测数据变化，威慑呢么还要虚拟DOM进行diff检测差异
Vue内部设计原因导致的，vue设计的是每个组件一个water，没有采用一个属性对应一个watcher。这样会导致大量的watcher的产生而且浪费内存，如果粒度过低也无法精准检测变化。所以才用diff算法+组件级watcher
# 请说一下对响应式数据的理解
## 1.1 如何实现响应式数据
数组和对象类型当值变化是如何劫持到。对象内部通过defineReactive方法(定义响应式)，使用Object.defineProperty 将属性进行劫持（只会劫持已经存在的属性），数组则是通过重写数组方法来实现。多层对象是通过递归来实现劫持。Vue3 则采用proxy
### 1.1.1
基本实现原理

1. 属性拦截：通过Object.defineProperty(obj,prop,desctiptor)的 get和set描述符，拦截属性的读取和修改操作。当访问改属性时，触发自定义逻辑（如依赖收集和视图更新）
2. 递归劫持嵌套对象：
对于嵌套对象属性，需递归调用劫持逻辑。例如，若属性值为对象，则对该子对象再次调用 observe() 方法，确保深层属性也能被监听
3. 数组的特殊处理：Object.defineProperty 无法直接监听数组索引变化（如 arr[0] = 1），因此需通过重写数组原型方法（如 push、pop 等），在调用这些方法时手动触发更新

#### Object.defineProperty()
```javascript
// 对对象的每个属性调用 defineReactive 函数：
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}
// 定义劫持逻辑
function defineReactive(obj, key, val) {
  observe(val); // 递归处理嵌套对象
  // Object.defineProperty()是JavaScript提供的一个核心方法，允许为对象的属性定义属性描述符。当使用get和set作为描述符时，它们会覆盖默认的属性访问行为
  Object.defineProperty(obj, key, {
    get() {
      // get方法：当读取属性时，JavaScript引擎会自动调用此函数，返回其返回值作为属性值
      console.log('读取属性:', key);
      return val;
    },
    set(newVal) {
      // set方法：当修改属性时，引擎会调用此函数，并将新值作为参数传入，开发者可在其中处理赋值逻辑
      if (newVal === val) return;
      console.log('更新属性:', key, '新值:', newVal);
      val = newVal;
      observe(newVal); // 新值为对象时继续劫持
      updateView(); // 触发视图更新
    }
  });
}
// 劫持数组方法以触发更新：
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift'].forEach(method => {
  arrayMethods[method] = function(...args) {
    const result = arrayProto[method].apply(this, args);
    updateView(); // 调用原生方法后触发更新
    return result;
  };
});

// 将数组的原型指向重写后的对象
if (Array.isArray(target)) {
  target.__proto__ = arrayMethods;
}

// 实例
let data = { name: '小明', info: { age: 20 }, likes: ['编程'] };
observe(data);

data.name = '小红'; // 触发 set → 输出 "更新属性: name"
data.info.age = 25; // 触发嵌套对象的 set → 输出 "更新属性: age"
data.likes.push('运动'); // 触发重写的数组方法 → 输出 "视图更新"
data.newProp = '测试'; // 无响应（需手动处理）
```
![alt text](image-4.png)
![alt text](image-5.png)

#### Proxy
* ES6新增的元变成特性，用于创建一个对象的代理，拦截并自定义对象的基本操作。
* 拦截13种对象操作（如读写属性、删除属性、方法调用等）
* 兼容性：ES6+，不支持IE11及更低版本
  
```javascript
const proxy = new Proxy(target,{
  get(target,prop,value){
    /*拦截属性读取 */
  }，
  set(){
    /*拦截属性读取*/
  }
  // 其他拦截器：deleteProperty，has，ownKeys等
})

// 典型用途
const data = {count:0};

const proxy = new Proxy(data,{
  get(target,prop){
    console.log(`读取 ${prop}`);
    return Reflect.get(target,prop);
  },
  set(target,prop,value){
    return Reflect.set(target, prop,value)
  }
})
```
#### Reflect
Reflect 的方法与 Object 的某些方法功能相似，但行为更规范。Reflect提供了一套统一的对象操作接口，如属性获取、属性设置、函数调用等。在Vue响应式原理中，这有助于保持代码的规范性和可维护性，使得在处理对象的各种操作时，有一个标准的方式来进行操作和拦截。

# VUE中如何进行依赖收集

## 1.1 依赖收集的流程
* 每个属性都拥有自己的dep属性，存放他所以来的watcher，当属性变化后会通知自己对应的watcher区就更新
* 默认在初始化的时候会调用render函数，此时会触发属性依赖收集 dep.depend
* 当属性发生修改是会触发watcher更新dep.notify（）
* ![alt text](image-6.png)
### Dep类
Dep 是依赖收集的核心，它的主要作用是管理所有的 Watcher。Dep 类中有一个静态属性 target，它指向当前正在计算的 Watcher，保证了同一时间全局只有一个 Watcher 被计算。Dep 类中还有一个 subs 属性，它是一个 Watcher 的数组，用来存储所有依赖这个 Dep 的 Watcher。

1. 静态属性 target
Dep 类中有一个静态属性 target。这个属性的作用是指向当前正在计算的 Watcher，它的存在保证了在同一时间内全局只有一个 Watcher 被计算。你可以把它想象成一个焦点，告诉系统当前需要关注哪个 Watcher。
2. subs 属性
另一个属性是 subs，它是一个存储 Watcher 的数组。这意味着 Dep 类实际上就是对 Watcher 的管理者。当数据发生变化时，Dep 就会通知所有依赖于它的 Watcher 进行更新，而这些 Watcher 则会负责相应的视图更新。
3. 方法：addSub 和 removeSub
addSub 方法用于将 Watcher 添加到 subs 数组中，而 removeSub 方法则是用来从 subs 数组中移除对应的 Watcher。
4. 方法：depend 和 notify
* depend 方法的作用是在计算属性或者渲染过程中建立依赖关系。如果当前存在正在计算的 Watcher（即 Dep.target 存在），那么就会将当前的 Dep 与该 Watcher 建立关联。
* notify 方法则是在数据发生变化时通知所有依赖这个 Dep 的 Watcher 执行更新操作。它遍历 subs 数组中的所有 Watcher，并逐一触发它们的更新方法。


#### 举例
假设有一个用户界面，其中包含一个数字输入框和一个显示框。输入框中的值会影响显示框中的内容。我们希望在输入框的值改变时，显示框能够自动更新。

```javascript
class Dep {
  constructor() {
    this.subs = []; // 存储所有依赖这个Dep的Watcher
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this); // 将当前Dep与正在计算的Watcher关联起来
    }
  }

  notify() {
    this.subs.forEach(watcher => {
      watcher.update(); // 通知所有依赖这个Dep的Watcher进行更新
    });
  }
}

Dep.target = null; // 全局的当前正在计算的Watcher

class Watcher {
  constructor() {
    Dep.target = this;
  }

  addDep(dep) {
    dep.subs.push(this); // 将当前Watcher加入到Dep的subs数组中
  }

  update() {
    // 执行更新操作
  }
}

// 示例用法
let dep = new Dep();
let watcher = new Watcher();
dep.depend(); // 将当前Dep与正在计算的Watcher关联起来
dep.notify(); // 通知所有依赖这个Dep的Watcher进行更新

```

* Dep类和Watcher类是数据响应式系统的核心，理解其原理对于理解Vue等前端框架的工作原理非常重要。
* 在实际项目中，可以根据具体需求对Dep类和Watcher类进行定制和扩展，以满足不同的业务场景需求。

#### watcher类

Watcher 是一个用来计算表达式的类。在 Watcher 的构造函数中，它会执行表达式，这个表达式可能会触发数据的 getter，从而进行依赖收集。Watcher 类中还有一个 addDep 方法，它会将当前的 Watcher 添加到 Dep 的 subs 数组中。

```javascript
class Watcher {
  getter;
  ...
  // Watcher 类有一个构造函数，它接受两个参数：vm 和 expression。在构造函数中，将传入的 expression 赋值给 getter 属性，并立即调用 get 方法。
  constructor (vm, expression){
    ...
    this.getter = expression;
    this.get();
  }
  get () {
    // get 方法是 Watcher 类中最关键的方法之一。当 Watcher 被创建时，会立即调用 get 方法。
    // 在 get 方法内部，会将当前的 Watcher 推入一个全局的位置（通过 pushTarget 函数），然后执行 expression，这个 expression 可能是一个函数或者计算属性的表达式。
    pushTarget(this);
    // 在执行过程中，会触发对应数据的 getter，从而建立起依赖关系，并且触发了依赖收集过程。
    value = this.getter.call(vm, vm)
    ...
    return value
  }
  addDep (dep){
        ...
    // addDep 方法用于将当前的 Watcher 添加到指定的 Dep 实例中，建立起 Watcher 和 Dep 之间的关联。
    // 这样，在数据变化时，Dep 就能够通知到相应的 Watcher 进行更新操作。
    dep.addSub(this)
  }
  ...
}
function pushTarget (_target) {
  Dep.target = _target
}

```

#### VUE类
Vue 类是 Vue 的入口，它的主要作用是初始化 Vue 应用。在 Vue 类的初始化过程中，会对组件的 data 进行初始化，将普通的 JavaScript 对象变成响应式对象。在这个过程中，会进行依赖收集。

依赖收集的过程如下：
1. 首先，Vue 会对组件的 data 进行初始化，将普通的 JavaScript 对象变成响应式对象。
2. 然后，Vue 会实例化一个 Watcher，并执行 Watcher 的 get 方法。
3. 在 get 方法中，Watcher 会执行表达式，这个表达式可能会触发数据的 getter，从而进行依赖收集。
4. 在 getter 中，会调用 Dep.target.addDep(this)，将当前的 Watcher 添加到数据的 Dep 的 subs 数组中。
5. 这样，当数据发生变化时，Dep 就可以通过 subs 数组，找到所有依赖这个数据的 Watcher，并通知它们数据发生了变化。

# Vue.set方法是如何实现的
## 核心实现原理
### 1.响应式系统的局限性
Vue 2.x 的响应式基于 Object.defineProperty，初始化时仅对已存在的对象属性进行劫持。若直接通过 obj.newProp = value 添加新属性，Vue 无法检测到变化，因为新属性未被劫持
### 2.Vue.set 的核心逻辑
Vue.set 的源码实现主要分为以下步骤
* 数组处理：若目标是数组且索引合法，调用重写的 splice 方法（触发视图更新）
* 对象已有属性：若属性已存在，直接赋值（响应式系统会自动触发更新）
* 非响应式对象：若目标对象未被 Vue 观测（无 __ob__ 属性），直接赋值返回
* 响应式对象新增属性：
  1. 通过 defineReactive 将新属性转换为响应式（利用 Object.defineProperty 劫持 getter/setter）
  2. 手动触发依赖更新：调用 ob.dep.notify()，通知所有依赖该对象的 Watcher 重新渲染视图

``` javascript
export function set(target,key,val){
  if(
    process.env.NODE_ENV !== "production" &&(isUndef(target) || isPrimitive(target))
  ) {
    warn(
      'Cannot set reactive property on undefined, null or primitive value: ${target}'
    );
  }
  //
  if (Array.isArray(target) && isValidArrayIndex(key)){
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val)
  }
  //
  if (key in target && !(key in Object.prototype)){
    traget[key] = val;
    return val;
  }
  //
  const ob = target.__ob__;
  if (target._isVue|| (ob && ob.vmCount)){
    
  }
}
```