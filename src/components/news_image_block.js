import React,{Component} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

export default class NewsImageBlock extends Component{


  /*页面中有三个区域放置带图片的新闻列表
  但是这三个区域的图片大小，容器宽度，卡片容器标题都是不同的
  请求数据要根据type的属性值 国际、娱乐、国内分别请求


  每个Card区域分两种状态，一种是请求到数据，一种是没有请求到数据
 吧请求到的数放置到一个数组中
  * */


  state = {
    imageArr :null
  }



  componentDidMount () {

    const {type,count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then(response =>{
        const result = response.data;
        const imageArr = result.map(
          ({uniquekey, title, author_name, thumbnail_pic_s})=>({uniquekey, title, author_name, thumbnail_pic_s}
          ));
        this.setState({imageArr})
      })

  }







  render () {
    const {cardTitle,cardWidth,imageWidth,type}=this.props
    const {imageArr} = this.state;

    const imageStyle={
      width:imageWidth,
      height: '90px',
      display: 'block'
    };
    const titleStyle = {
      width:imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }

    const imageList = !imageArr
      ?<p>没有请求到数据</p>
      :(
        imageArr.map((item,index) => (
          <div key={index}  className="imageblock">
            <Link to={`/news_detail/${item.uniquekey}/${type}`}>
              <div>
                <img src={item.thumbnail_pic_s} style={imageStyle}/>
              </div>
              <div className="custom-card">
                <h3 style={titleStyle}>{item.title}</h3>
                <p>{item.author_name}</p>
              </div>
            </Link>
          </div>))
       )

    return (<Card title={cardTitle} style={{width:cardWidth}} className="topNewsList">
      {
        imageList
      }
    </Card>)
  }

}
