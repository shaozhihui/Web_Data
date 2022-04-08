### Hook

#### 简介

​		class 不能很好的压缩，并且会使热重载出现不稳定的情况，**使你在非 class 的情况下可以使用更多的 React 特性。** 

简单来说在函数组件内部可以使用class组件的react 特性。

用于处理组件之间复杂状态逻辑。

#### useState

可以在函数组件内自定义使用react 特性的状态机（state）。

##### 示例

 `const [count, setCount] = useState(0);`

##### **解译**

在函数内部定义一个 名为 count的状态机变量，以及一个对应修改count值的 setCount 函数。***用法参考setDate***

#### useEffect

简单来说是 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

对组件内部的一些副作用操作进行优化。

##### 不需要清除的副作用的示例

```
useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

##### 解译

相当于是在`componentDidMount` 和 `componentDidUpdate` 两个声明周期都执行了一次 `document.title = You clicked ${count} times`, 意为该函数组件每次调用的时候都会执行 `document.title = You clicked ${count} times`。

##### 需要清除的副作用的示例

```
useEffect(() => {    
  	function handleStatusChange(status) {      
  		setIsOnline(status.isOnline);    
  	}    
  	ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);       
  	return function cleanup() {     
    	ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);    
    };  
});
```

##### 解译

Effect返回（return）的是一个会执行清除动作的函数，内部是取消订阅的操作，防止内存泄露。

返回的函数会在react执行清除的时候调用。

##### 副作用的概念

 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

##### 对比使用class组件声明周期的优势

在class组件中，当我们的组件在屏幕中渲染后，如果这个时候props里面订阅的数据发生改变，那么我们的组件内的数据是不会及时更新的，然而这个时候如果没有及时更新数据就在组件删除的周期中使用清除原有数据时，会有清除错误数据（因为数据更新没有及时同步）导致内存泄露或崩溃的问题。

在函数组件内使用hook可以及时更新数据（因为数据流是自上向下的且调用新的effect 时会对前一个effect进行清理），此默认行为避免了class 组件中因为没有及时处理更新逻辑而导致常见的bug。

##### 通过跳过effect进行性能优化

因为每次渲染的时候都会对effect进行清理或执行的操作会导致性能问题。

##### 示例

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

##### 解译

这个时候传入[count] 作为第二参数，这个时候会把count 和重新渲染d前的count 的值做严格对比，如果更新后的count ===  更行前的count，那么这个effect将不会执行，反之则执行，通过传入key的方式对effect频繁调用的方式进行优化。

**使用该优化方法时要注意的地方**：确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。 如果传入的是空数组，那么effec 只会渲染一次，保存内部的初始值。

#### 使用规则

- **不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层调用他们。
- 只在 React 函数中调用 Hook
  - ✅ 在 React 的函数组件中调用 Hook
  - ✅ 在自定义 Hook 中调用其他 Hook (我们将会在[下一页](https://react.docschina.org/docs/hooks-custom.html) 中学习这个。)

