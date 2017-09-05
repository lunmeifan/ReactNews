import React,{Component} from 'react';
import {Button,Icon,Modal,Tabs,Form,Input,message} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

//Modal - 对话框
import logo from '../images/logo.png';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MobileHeader extends Component {


  state = {
    username:'',
    visible: false,
  }

 componentWillMount (){
   const username = localStorage.getItem('username');
   if (username) {
     //更新状态
     this.setState({username})
   }
 }

  showModal = (visible)=>{
    this.setState({visible});
  }

  loginout = (isLogin)=>{


  }


  render (){

    const {username,visible} = this.state;
    const {getFieldDecorator,getFieldValue,resetFields} = this.props.form

    const useruser = username
      ? <Link to='/user_center'><Icon type="inbox"/></Link>
      : <Icon type="setting" onClick={this.showModal.bind(this,true)} />


    return (
      <div id="mobileheader">
        <header>
          <div>
            <Link to="/">
              <img src={logo} alt=  ".."/>
              <span>React News2</span>
            </Link>
            {useruser}
          </div>
        </header>
        <Modal title="用户中心"
               visible={visible}
               onOk={this.showModal.bind(this,false)}
               onCancel={this.showModal.bind(this,false)}
               okText='关闭'>
          <Tabs>
            <TabPane key="1">
              <Form onSubmit={this.loginout.bind(this,true)}>
                <FormItem label='用户名'>
                  {
                    getFieldDecorator('userName')(<Input placeholder="请输入用户名"/>)
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('password')(<Input placeholder="请输入密码"/>)
                  }
                </FormItem>
                <Button type='primary' htmlType='submit'>登录</Button>
              </Form>
            </TabPane>
            <TabPane key="2">
              <Form onSubmit={this.loginout.bind(this,false)}>
                <FormItem label='用户名'>
                  {
                    getFieldDecorator('re_userName')(<Input type='text' placeholder="请输入用户名"/>)
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('re_password')(<Input type='password' placeholder="请输入密码"/>)
                  }
                </FormItem>
                <FormItem label='再次确认密码'>
                  {
                    getFieldDecorator('re_password2')(<Input type='password' placeholder="请确认输入密码"/>)
                  }
                </FormItem>
                <Button type='primary' htmlType='submit'>注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}



export default Form.create()(MobileHeader)
