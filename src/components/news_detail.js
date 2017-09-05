import React,{Component} from 'react';
import {Row,Col,BackTop} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';
import NewsImageBlock from './news_image_block';
import NewsComments from './news_comments'

export default class NewsDetail extends Component {

  /*点击页面中的每条新闻的题目，跳转到新闻详情的界面，
  * 此界面包含三个组件
  * 新闻详情，评论列表，表单（提交评论和收藏文章）
  *
  * 新闻详情：通过发送请求，获取新闻的具体内容，发送请求是通过路有链接中的请求参数的值
  * {this.props.params.xx}
  * */

 state = {
   news:{}
 };

 //因为每点击一次新的新闻，要重新发一次请求获取对应的新闻详情
  //即页面中，会改变请求链接的参数，所以使用一个方法 componentWillReceiveProps ()
  //但是页面中的初始显示的时候，需要componentDidMount ()

  componentDidMount () {
    const uniquekey =this.props.params.xx
    this.getNewsDetail(uniquekey)
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps)
    // this.getNewsDetail(newProps.xx)-----------------？？？？？？？？？？？？？
    this.getNewsDetail(newProps.params.xx)

  }

  getNewsDetail = (uniquekey)=>{
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`;
    axios.get(url)
      .then(response => {
        const news = response.data;
        this.setState({news});

        //请求到数据时，要设置网页的标题，网页的标题正是请求的详细新闻的题目
        document.title = news.title;
      })
  }



  render (){
    const type = this.props.params.type;
    const uniquekey = this.props.params.xx;
    const {news} = this.state
    return (
        <div>
          <Row>
            <Col span={1}></Col>
            <Col span={16} className='container'>
              {/*<div>{请求回来的新闻详情的数据}</div>*/}
              {/*请求道德数据是一个包含页面的字符串，react提供了一个强大的标签-用来将字符串解析成页面*/}
              <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
              <NewsComments uniquekey={uniquekey}></NewsComments>
            </Col>
            <Col span={6}>
              <NewsImageBlock type={type} count={22} cardTitle="相关新闻" cardWidth="100%" imageWidth='132px'></NewsImageBlock>
            </Col>
            <Col span={1}></Col>
          </Row>
          <BackTop />
        </div>
      )
  }
}

