import {createStore} from 'redux';
import React,{Component} from 'react';
import { createAction } from 'redux-actions';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux';
import { combineReducers } from 'redux';
//组件
class Counter extends Component{
    componentDidMount(){
        console.log(this)
    }
    render(){
        return (
            <div>
                <span>{this.props.value}</span>
                <button onClick={this.props.increase}>+</button>
                <button onClick={this.props.decrease}>-</button>
            </div>
        )
    }
}

//reducer
const  initialState={
    count:0
};
const inc='increase';
const decsf='decrease';
//原来是下面的这种写法是好用的
/*[inc]:(state)=>{
    //count=state.count+1;
    return {count:state.count+1}
},*/
// 下面是跟一个函数
const obj={
    [inc]:add,
    [decsf]:dec
};
//reducer
const counter = (state=initialState,action)=>{
    const handler = obj[action.type];
    return handler ? handler(state, action) : state;
};
function add(state,action) {
    var value= state.count+1
   return {count:value}
}
function dec(state, action) {
    var value=state.count-1
    return {count:value}
}

//createAction 会返回一个函数
const increase=createAction(inc)
const decrease=createAction(decsf);
const actions={increase,decrease};
const mapDispatchToProps=actions;

// 谨记：以下两种写法是 这种store的  没有combineReducer  这是第一种store
/*let store=createStore(counter);
console.log(store);*/
//第一中写法 放开的时候不要忘了更改 组件上的value
/*const mapStateToProps = (state)=>{
    //返回一个对象， 这个对象会作为组件的属性
    return {
        value:state.count
    }
};*/
//第二种写法 放开的时候不要忘了更改 组件上的value
/*const mapStateToProps = ({count})=>{
    return {
        value:count
    }
};*/



//combineReducers 参数需要是一个对象
//----------------------------------第二种store------------------------------------------------------
const makeReducer=()=>combineReducers({counter})
 let store = createStore(makeReducer());
console.log(store);
// 看来就是 可以
const mapStateToProps = ({ counter }) => ({
    value: counter.count,
});
//为什么不支持这种写法 肯定是那个地方出错了 是可以的 只是配置美好已经尝试了
/*const mapStateToProps=(state)=>({
        ...state.count
})*/
/*const mapStateToProps=({state})=>({
    ...state.counter
})*/
/*const mapStateToProps=({counter})=>({
    ...counter
})*/
let App = connect(mapStateToProps,mapDispatchToProps)(Counter);
//首先是一个函数 然后通过es6对象解构的方式赋值

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#app')
);