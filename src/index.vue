<template>
  <!-- App -->
  <div id="app">
    <f7-login-screen :opened="showLogin" theme="orange">
      <f7-pages>
        <f7-page login-screen class="bgi">
          <f7-block>
            <f7-grid class="form-bg">
              <f7-col>
                <f7-login-screen-title>RFID救生衣管理系统</f7-login-screen-title>
                <f7-list form>
                  <f7-list-item class="form-item">
                    <f7-label floating style="color: #fff; width: 25%;">工号：</f7-label>
                    <f7-input type="text" v-model="loginData.jobNumber"/>
                  </f7-list-item>
                  <f7-list-item class="form-item">
                    <f7-label floating style="color: #fff; width: 25%;">密码：</f7-label>
                    <f7-input type="password" v-model="loginData.password"/>
                  </f7-list-item>
                </f7-list>
              </f7-col>
            </f7-grid>
            <f7-grid>
              <f7-col>
                <f7-button bg="orange" color="white" @click="onSubmit">登陆</f7-button>
              </f7-col>
            </f7-grid>
          </f7-block>
        </f7-page>
      </f7-pages>
    </f7-login-screen>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Pages -->
        <f7-pages>
          <f7-page class="bgi">
            <!-- Material Theme Navbar -->
            <f7-navbar theme="orange">
              <f7-nav-left>
                <f7-link>
                  <f7-icon f7="gear_fill"></f7-icon>
                </f7-link>
              </f7-nav-left>
              <f7-nav-center sliding>救生衣管理系统</f7-nav-center>
              <f7-nav-right>
                <f7-link @click="showLogin=true"><!-- 正式项目替换成logout -->
                  <f7-icon f7="login"></f7-icon>
                </f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <f7-grid>
                <f7-col>
                  <f7-button bg="blue" color="white" href="/flightNumber/" >救生衣快速盘点</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
            <f7-block>
              <f7-grid>
                <f7-col>
                  <f7-button bg="blue" color="white" href="/about/" >救生衣精确盘点</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
            <f7-block>
              <f7-grid>
                <f7-col>
                  <f7-button bg="blue" color="white" href="/about/" >救生衣座位绑定</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
            <f7-block>
              <f7-grid>
                <f7-col>
                  <f7-button bg="blue" color="white" href="/about/" >救生衣信息查询</f7-button>
                </f7-col>
              </f7-grid>
            </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
import fetch from './fetch';
import {BASE_URL} from './api/url.js'

export default {
	data(){
		return {
			loginData: {
				jobNumber: '',
				password: ''
			},
      showLogin: false
		}
	},
  created(){
    let self = this;

    /* 验证是否登录 */
    fetch(BASE_URL.GET_TOKEN)
      .then(function(res){
        if(res.token){
          self.showLogin = false;
        }else{
          self.showLogin = true;
        }
      })
      .catch(function(err){
        self.$f7.alert('请重新登录！', '网络错误');
        self.showLogin = false; // 对接请改为true
      })
  },
	methods: {
		onSubmit(){
      let self = this;
			if(self.checkForm()){
        /* login代码，对接打开 */
        /*fetch(BASE_URL.LOGIN, self.loginData)
          .then(function(res){
            if(res.success) {
              self.showLogin = false;
              self.loginData.jobNumber = '';
              self.loginData.password = '';
            }else{
              self.$f7.alert(res.msg, '登录失败');
            }
          })
          .catch(function(err){
            self.$f7.alert('登录错误，请稍后重试！', '登录失败');
          })*/

        /* 本地调试代码，对接请删除 */
        self.showLogin = false;
        self.loginData.jobNumber = '';
        self.loginData.password = '';
			}
		},
    logout(){
      let self = this;
      fetch(BASE_URL.LOGOUT)
        .then(function(res){
          if(res.success){
            self.showLogin = true;
          }else{
            self.$f7.alert(res.msg, '错误');
          }
        })
        .catch(function(err){
          self.$f7.alert(err, '错误');
        })
    },
		checkForm(){
			if(this.loginData.jobNumber == ''){
				this.$f7.alert('请填写工号！', '提示');
				return false;
			}else if(this.loginData.password == ''){
				this.$f7.alert('请填写密码！', '提示');
				return false;
			}else if(this.loginData.password.length != 6 || !(/^[0-9]+$/.test(this.loginData.password))){
				this.$f7.alert('密码必须为6位数字！', '提示');
				return false;
			}

			return true;
		}
	}
}
</script>

<style>
	.login-screen-content{
		background-color: transparent;
	}
  .form-bg{
    background-color: rgba(255, 255, 255, .5);
    border-radius: 5px;
    margin-top: 6rem;
    margin-bottom: 2rem;
  }
  .login-screen-title{
    font-size: 2rem;
    font-weight: bold;
    color: rgb(18, 77, 97);
  }
  .form-item{
    background-color: rgba(0, 0, 0, .2);
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>