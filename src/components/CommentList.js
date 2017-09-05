import React,{Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

export default class CommentList extends Component {

  state ={
    commentList :[],
  };


  componentDidMount () {
    const userId = localStorage.getItem('userId');
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response =>{
        const result = response.data;
        console.log(result);
        const commentList = result.map(({Comments,uniquekey,datetime})=>({Comments,uniquekey,datetime}));
        this.setState({commentList});
      })
  }


  render () {
    //获取当前用户的收藏数组
    const {commentList} =this.state;

    const commentList2 = !(commentList.length)
      ? <p>您还没有评论任何的新闻，快去发表一些评论吧。</p>
      : (
        commentList.map((item, index) => (<Card key={index} title={`于${item.data}评论了文章${item.uniquekey}`} extra={<Link to={`/news_detail/${item.uniquekey}/top`}>查看</Link>}>{item.Comments}</Card>))
      )

    return (
      <div>
        {
          commentList2
        }
      </div>
    )


  }

}

