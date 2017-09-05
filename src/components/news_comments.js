import React, {Component, PropTypes} from 'react'
import {Form, Card, Input, Button, notification} from 'antd'
import axios from 'axios'

const FormItem = Form.Item;

class NewsComments extends Component {


  state = {
    comments:[],
  }

  componentDidMount () {

    const {uniquekey} = this.props;
    this.showComments(uniquekey)

  }

  /*更新路由链接，相对应的news_comments的父组件（newsDetails）传输的属性值发生改变。重新发送请求，重新渲染页面*/
  componentWillReceiveProps (newProps) {
   // console.log(newProps)
    this.showComments(newProps.uniquekey)
   // console.log(newProps.uniquekey)
  }

  showComments = (uniquekey) =>{
    const url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response =>{
        const result = response.data;
        const comments = result.map(({uniquekey,UserName,Comments,datetime})=>({uniquekey,UserName,Comments,datetime}));
        this.setState({comments})
      })
  }


/*点击收藏文章按钮 - 收藏文章*/

  handleClick = ()=> {
    const userId = localStorage.getItem('userId');
    if(!userId) {
      alert('请先登陆')
      return
    }
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`

    axios.get(url)
      .then(response => {
        notification.success({message:'收藏文章成功'})
      })

  }

  /*点击提交评论
  * 获取表单内的内容，然后发送请求，更新评论列表，提示提交评论成功，清空input框中的内容
  * 更新评论列表-重新发一次请求，来请求评论列表的数据-即再执行一次coponentDidMount（）
  * */

  handleSubmit = () => {
    const userId = localStorage.getItem('userId');
    if(!userId) {
      alert('请先登陆')
      return
    }
    const {uniquekey} = this.props
    const {getFieldValue,resetFields} = this.props.form;
    const content = getFieldValue('content');
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
    axios.get(url)
      .then(response =>{

        //重新发请求更新评论列表
        this.componentDidMount();
        //提示提交评论成功
        notification.success({message:'提交评论成功'})
        //清空输入框
        resetFields();
      })
  }



  render () {
    const {comments} = this.state;
    const {getFieldDecorator} = this.props.form;

    const commentsL = !(comments.length)
      ? <p>暂时还没有任何评论</p>
      : (
        comments.map((item,index) =>(
          <Card key={index} title={item.UserName} extra={`发布于${item.datetime}`}>
            <p>{item.Comments}</p>
          </Card>
        ))
        )

    return (
      <div style={{padding:'10px'}}>
        {
          commentsL
        }
        <Form onSubmit={this.handleSubmit}>
          <FormItem label='请输入您的评论'>
            {
               getFieldDecorator('content')(
                 <Input type='textarea' placeholder="请输入评论内容"></Input>
              )
            }
          </FormItem>

          <Button type='primary' htmlType='submit'>提交评论</Button>
          <Button type='primary' onClick={this.handleClick}>收藏文章</Button>
        </Form>


      </div>
    )
  }
}

export default Form.create()(NewsComments)