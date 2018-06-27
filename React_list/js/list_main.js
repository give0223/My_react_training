import React from 'react';
import ReactDOM from 'react-dom';
import {Redux,createStore} from 'redux';
// import React_redux from 'react-redux';

class MyHead extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <li>Hello,React-{this.props.level}</li>;
  }
}

class MyHeadList extends React.Component{
  constructor(props){
    super(props);
    //React 狀態使用 Redux 取得狀態
    this.state = store.getState();
  }

  render(){
    let cells=[];
    for(let i = 0; i < this.state.max; i++) {
      cells.push(<MyHead level={i}/>);
    }
    return <ul onClick={this.update.bind(this)}>{cells}</ul>;    
  }
  //用此方法呼叫Redux的dispatch並聯動reducer的action方法更新狀態
  update(){
    store.dispatch({
      type:'ChangeMax',
      max:5
    });
  }
  //React連結Redux更新狀態
  refresh(){
    //從Redux中取得狀態給React更新狀態
    this.setState(store.getState());
  }
  componentDidMount(){
    //當Redux的狀態有變化時,會呼叫refresh方法
    this.unsubscribe = store.subscribe(this.refresh.bind(this));
  }
  componentWillUnmount(){
    //清除Redux連接
    this.unsubscribe();
  }
}

// Redux 程式
let store;
let reducer = function(state, action) {
  switch (action.type) {
    case "ChangeMax":
        return {max:action.max};
    default:
        return state;
  }
};

window.addEventListener('load', () =>{
  //利用Redux 初始化狀態
  store = createStore(reducer,{max:3});
  //React 畫面初始
  ReactDOM.render(<MyHeadList/>,document.body);
});