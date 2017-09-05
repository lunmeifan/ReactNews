import React,{Component} from 'react';
import {Row,Col,Menu,Button,Icon,Modal,Tabs,Form,Input,message} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

//Modal - 对话框
import logo from '../images/logo.png';

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class Header extends Component {

    state = {
        username:null,
        show :false
    };

    //初次加载页面时，应该现象浏览器总读取一下username的值，从localstorage中获取
  componentDidMount () {
    const username = localStorage.getItem('username');//key-username
    if(username){
      this.setState({username});
    }
  }


  showModal= (event)=> {
      if(event.key === 'logout'){
        this.setState({show:true})
      }

  };

  setModalVisible= () =>{
    this.setState({show:false})
  };

  loginout = (islogin,event)=>{

    // 阻止表单提交的默认行为
    event.preventDefault()

    //当点击登录或注册按钮时，要获取输入框中的内容，再根据输入框中的内容发送请求

    const {username,password,r_userName,r_password,r_password2} = this.props.form.getFieldsValue();//返回的是一个对象，对应的是在包裹input标签时，每个标识符对应一个输入框的内容

    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
    if(islogin){
        url += `action=login&username=${username}&password=${password}` ;

    }else {
       url +=`action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_password2}`
    }

    axios.get(url)
      .then(response => {

        // 清除输入的数据--?????????????????????????????????????????
        this.props.form.resetFields()

        const result = response.data;//获取返回的数据

        console.log(result);
        //若有数据返回说明，用户名和密码正确，并且登陆成功，将用户名重新设置状态
        if(islogin){
          if(!result){
            message.error('用户名或密码错误');
          }else {
            message.success('登陆成功');
            const username = result.NickUserName;
            const userId = result.UserId;

            //更新状态
            this.setState({username});

            //并将取到的用户名和用户id存入到localStorage中
            localStorage.setItem('username',username);
            localStorage.setItem('userId',userId);
          }
        }else {
          message.success('注册成功')
        }
      })

    //表单操作完成后，将会话框关闭，即重新设置会话框的显示状态
    this.setState({show:false});
  }


  logout2 = ()=>{
    this.setState({username:null});

    //移除storage中的数据
    localStorage.removeItem('username');
    localStorage.removeItem('userId');


  }


  render (){
    const {username,show} = this.state;


    const log = username
      ? (<MenuItem className="register" key='login'>
            <Button type='primary'>{username}</Button>&nbsp;&nbsp;
            <Link to="/user_center">
              <Button type='dashed'>个人中心</Button>
            </Link>&nbsp;&nbsp;
            <Button onClick={this.logout2}>登出</Button>
        </MenuItem>)
      :(<MenuItem className="register" key='logout'><Icon type="appstore"/>登录/注册</MenuItem>)

    return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo.."/>React News
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" defaultSelectedKeys={['top']} onClick={this.showModal} >
              <MenuItem key='top'><Icon type="appstore"/>头条</MenuItem>
              <MenuItem key='shehui'><Icon type="appstore"/>社会</MenuItem>
              <MenuItem key='guonei'><Icon type="appstore"/>国内</MenuItem>
              <MenuItem key='guoji'><Icon type="appstore"/>国际</MenuItem>
              <MenuItem key='yule'><Icon type="appstore"/>娱乐</MenuItem>
              <MenuItem key='tiyu'><Icon type="appstore"/>体育</MenuItem>
              <MenuItem key='keji'><Icon type="appstore"/>科技</MenuItem>
              <MenuItem key='shishang'><Icon type="appstore"/>时尚</MenuItem>
              {log}
            </Menu>
            <Modal
              title="个人中心"
              visible={show}
              onOk={this.setModalVisible}
              onCancel={this.setModalVisible}
              okText="关闭"
            >
              <Tabs type="card" onChange={()=> this.props.form.resetFields() }>
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.loginout.bind(this,true)}>
                    <FormItem label='用户名'>
                      {this.props.form.getFieldDecorator('username')(<Input type='text' placeholder="'请输入用户名"/>)}
                    </FormItem>
                    <FormItem label='密码'>
                      {this.props.form.getFieldDecorator('password')(<Input type='password' placeholder="'请输入密码"/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.loginout.bind(this,false)}>
                    <FormItem label='用户名'>
                      {this.props.form.getFieldDecorator('r_userName')(<Input type='text' placeholder="'请输入用户名"/>)}
                    </FormItem>
                    <FormItem label='密码'>
                      {this.props.form.getFieldDecorator('r_password')(<Input type='password' placeholder="'请输入密码"/>)}
                    </FormItem>
                    <FormItem label='确认密码'>
                      {this.props.form.getFieldDecorator('r_password2')(<Input type='password' placeholder="'再次确认密码"/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
 }


export default Form.create()(Header)