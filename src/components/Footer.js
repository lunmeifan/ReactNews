import React,{Component} from 'react';
import {Row,Col} from 'antd';
export default class Footer extends Component {
  render (){
    return (
      <footer>
        <Row>
          <Col span={1}></Col>
          <Col span={22} style={{textAlign:'center', padding: '20px'}}>
            2017 ReactNews. All Rights Reserved.
          </Col>
          <Col span={1}></Col>
        </Row>
      </footer>)
  }
}
