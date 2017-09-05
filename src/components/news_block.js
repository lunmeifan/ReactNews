import React,{Component,PropTypes} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';



export default class  NewsBlock extends Component{

  /*新闻信息有两个状态
  * 一个是没有请求到数据  ； 一个是请求到数据后在页面显示数据
  * 所以需要设置一个初始状态
  * 请求数据时，要根据路有链接中的参数，
  * 通过postman查看 请求参数 type和 count
  * 所以要在使用此组件的js中，将type和count作为属性传递过来
  *
  * 请求数据从componentDidmount(){}回调函数中读取
  * */

  static propsTypes ={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }

  state = {
    newsArr :null
  }

  componentDidMount (){
  //  当请求数据成功时，将被重新修改状态中的数据，将请求得来的数据方法状态中的newsArr中，并以数组形式存放
    /*请求数据第一步：指定url
    * */
    const {type,count} = this.props;

    const  url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;

    axios.get(url)
      .then(response => {
           //  取到所有的数据，但是在此组件中，要显示在页面上的数据，只需要几个属性
        const result = response.data;

        const newsArr = result.map(({uniquekey,title}) => ({uniquekey,title}));

        //将取到的数据重新设置状态
        this.setState({newsArr});

      })

  }

  render () {
    const {newsArr} = this.state;
    const {type} = this.props;

    const list = !newsArr
      ? <p>没有请求到数据</p>
      :(
        <ul>
          {
            newsArr.map((item,index) => (
              <li key={index}><Link to={`/news_detail/${item.uniquekey}/${type}`}>{item.title}</Link></li>
            ))
          }
        </ul>
        )

    return (
      <Card>
        {
          list
        }
      </Card>
    )
  }
}
