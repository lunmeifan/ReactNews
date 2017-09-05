import React,{Component} from 'react';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import '../componentsCss/mobile.css';

export default class MobileApp extends Component {

  render (){
    return (
      <div>
        <MobileHeader></MobileHeader>
        {this.props.children}
        <Footer></Footer>
      </div>
    )
  }


}