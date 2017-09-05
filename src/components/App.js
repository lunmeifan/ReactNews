import React,{Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../componentsCss/pc.css'

export default class App extends Component {
  render (){
    return (
      <div>
          <Header/>
          {/*显示当前的路由组件*/}
          {this.props.children}
          <Footer/>
      </div>
    )
  }
}
