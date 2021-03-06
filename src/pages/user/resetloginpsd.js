import React, { Component} from 'react'
import Navbar from '../common/navbar';
import { hashHistory} from 'react-router';
import {message,Modal} from 'antd';
import Api from '../api';
import  "../../css/resetpsd.scss"


export default class ResetLoginPsd extends Component {
  constructor(props) {
    super(props);

  }

  handlesubmit(){
    const user = JSON.parse(sessionStorage.getItem("user"));
    let oldPsd=document.getElementById("oldPsd").value;
    let newPsd=document.getElementById("newPsd").value;
    let makesurePsd=document.getElementById("comfimPsd").value;
    const PSW=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;

    if(!oldPsd){
      message.config({
        top: 50,
        duration: 1,
        });
      message.error('请输入正确的旧密码');
      return false;
    }else if(oldPsd===newPsd){
      message.config({
        top: 50,
        duration: 1,
        });
      message.error('修改前和修改后的密码不能一样');
      return false;
    }else if(newPsd===""||makesurePsd===""){
      message.config({
        top: 50,
        duration: 1,
        });
      message.error('请输入您的新密码和确认密码')
    } else if(!PSW.test(newPsd)){
      message.config({
        top: 50,
        duration: 1,
        });
      message.error('密码长度为6-15位字母数字混合,不能为纯数字或纯字母');
    }else if(newPsd!==makesurePsd){
      message.config({
        top: 50,
        duration: 1,
        });
      message.error('新密码跟确认密码不一样');
      return false;
    }else {
      Api("c=user&a=resetPwd&remind=0",{
        user_id:user.user_id,
        password:newPsd,
        old_pwd:oldPsd,
      },(res)=>{
        if(res.errno===0){
          Modal.success({
            title:'提示',
            content:'修改登陆密码成功,点击确定后请重新登陆',
            onOk(){
            sessionStorage.removeItem("user");
            hashHistory.push("login");
          }

          })
        }else{
          Modal.info({
            title:'提示',
            content:res.errstr,
          })
        }

      });
      return true;
    }

  }

  render() {
    return (
      <div>
        <Navbar back="back" title="修改登陆密码"/>
          <div className="resetPsd">
            <ul>
              <li>
                <span>旧的登陆密码</span>
                <input id="oldPsd" type="password" placeholder="(6-15位字母和数字)"/>
              </li>
              <li>
                <span>新的登陆密码</span>
                <input id="newPsd" type="password" placeholder="(6-15位字母和数字)"/>
              </li>
              <li>
                <span>确认登陆密码</span>
                <input id="comfimPsd" type="password" placeholder="(6-15位字母和数字)"/>
              </li>
            </ul>
            <p>提示:如果您忘记密码请与客服联系</p>
            <input className="submit_btn" type="button" value="确定" onClick={()=>{this.handlesubmit()}}/>
          </div>
      </div>
    );
  }
}
