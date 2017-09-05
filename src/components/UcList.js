import React,{Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

export default class UcList extends Component {

  state ={
    shoucangList :[],
  };


  componentDidMount () {
    const userId = localStorage.getItem('userId');
    const shoucangUrl = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(shoucangUrl)
      .then(response =>{
        const result = response.data;
        console.log(result);
        const shoucangList = result.map(({Title,uniquekey})=>({Title,uniquekey}));
        this.setState({shoucangList});
      })
  }


  render () {
    //获取当前用户的收藏数组
    const {shoucangList} =this.state;

    const shoucang = !(shoucangList.length)
      ? <p>您还没有收藏任何的新闻，快去收藏一些新闻吧。</p>
      : (
        shoucangList.map((item, index) => (<Card key={index} title={item.uniquekey} extra={<Link to={`/news_detail/${item.uniquekey}/top`}>查看</Link>}>{item.Title}</Card>))
      )

    return (
      <div>
        {
          shoucang
        }
      </div>
      )


  }

}
