import React,{Component} from 'react';
import {Tabs,Col,Row} from 'antd';
import UcList from './UcList';
import CommentList from './CommentList';
import HeadShot from './headShot'



const TabPane =Tabs.TabPane;


export default class UserCenter extends Component {


  /*获取个人中心、
  通过发送请求，请求道用户的收藏文章列表和评论列表
  第一步，做获取收藏列表
  * */


  render (){
    return (
       <div>
         <Row>
           <Col span={1}></Col>
           <Col span={22}>
             <Tabs>
               <TabPane key={1} tab="我的收藏列表">
                 <UcList></UcList>
               </TabPane>
               <TabPane key={2} tab="我的评论列表">
                 <CommentList/>
               </TabPane>
               <TabPane key={3} tab="头像设置">
                 <HeadShot></HeadShot>
               </TabPane>
            </Tabs></Col>
           <Col span={1}></Col>
         </Row>
       </div>
      )
  }
}

