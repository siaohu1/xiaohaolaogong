<template>
  <navbar style="background: #4271A4">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand" ></a>
    <!--<ul class="nav navbar-nav d-md-down-none">-->
      <!--<li class="nav-item">-->
        <!--<a class="nav-link navbar-toggler sidebar-toggler"  @click="sidebarMinimize">&#9776;</a>-->
      <!--</li>-->
     <!---->
    <!--</ul>-->

    <!--<ul class="nav navbar-nav d-md-down-none">-->
      <!---->
       <!--<li class="nav-item header-item">-->
  <!---->

          <!--<router-link tag="div" to='/'  style="height:55px;" class="nav-link">-->
            <!--<p><Icon type="compose" size='30' color="#2d8cf0"></Icon></p>-->
            <!--<p  style="color:white"> 留言管理 </p>-->
        <!--</router-link> -->
      <!--</li>-->
        <!--<li class="nav-item header-item">-->
        <!---->
        <!--<router-link tag="div" to='/home1'  style="height:55px;" class="nav-link">-->
            <!--<p><Icon type="stats-bars" size='30' color="#2d8cf0"></Icon></p>-->
            <!--<p  style="color:white"> 浏览排行 </p>-->
        <!--</router-link> -->


      <!--</li>-->

   <!--<li class="nav-item header-item">-->
        <!--&lt;!&ndash;   &ndash;&gt;-->

        <!--<Dropdown>-->
      <!--<router-link tag="div" to='/'  style="height:55px;" class="nav-link">-->
            <!--<p><Icon type="android-cloud" size='30' color="#2d8cf0"></Icon></p>-->
            <!--<p  style="color:white"> 云服务器 </p>-->
        <!--</router-link>-->
        <!--<DropdownMenu slot="list">-->
            <!--<DropdownItem>Linux</DropdownItem>-->
            <!--<DropdownItem>Mac OS X</DropdownItem>-->
            <!--<DropdownItem>Windows</DropdownItem>-->
            <!---->
            <!--<DropdownItem>Core OS</DropdownItem>-->
        <!--</DropdownMenu>-->
    <!--</Dropdown>-->



      <!--</li>-->


        <!--<li class="nav-item header-item">-->
      <!---->

         <!--<router-link tag="div" to='/home1'  style="height:55px;" class="nav-link">-->
            <!--<p><Icon type="trophy" size='30' color="#2d8cf0"></Icon></p>-->
            <!--<p  style="color:white"> 销量排行 </p>-->
        <!--</router-link> -->


      <!--</li>-->



     <!---->
    <!--</ul>-->


    <ul class="nav navbar-nav ml-auto">
      
      <!--<li class="nav-item d-md-down-none">-->
        <!--<a class="nav-link" ><Icon type="android-notifications" size="20"></Icon><span class="badge badge-pill badge-danger">5</span></a>-->
      <!--</li>-->


      <Dropdown class="nav-item">
        <a href="javascript:void(0)">
           <span slot="button">
          <img src="static/img/avatars/person.png" class="img-avatar" alt="o" style="width: 50px;height: 50px;">
          <span class="d-md-down-none" style="color: white;">admin</span>
          </span>
        </a>
        <Dropdown-menu slot="list">
            <!--<Dropdown-item>-->
              <!--<p class="dropdown-itemp"><Icon type="alert"></Icon>Updates<span class="badge badge-info">42</span></p>-->

            <!---->
            <!--</Dropdown-item>-->
            <!--<Dropdown-item>-->
              <!--<p class="dropdown-itemp"><Icon type="chatbox-working"></Icon>Messages<span class="badge badge-success">42</span></p>-->

            <!--</Dropdown-item>-->
             <!--<Dropdown-item>-->
              <!--<p class="dropdown-itemp">  <Icon type="chatbox-working"></Icon>Messages<span class="badge badge-danger">42</span></p>-->

           <!--</Dropdown-item>-->
              <Dropdown-item divided>
                  <router-link to="/key">

                  <p class="dropdown-itemp"><Icon type="android-contact"></Icon>
                  {{$t('m.API_Management')}}
                  </p>
                  </router-link>

              </Dropdown-item>
            <Dropdown-item >
                <router-link to="/resetpassword">
                    <p class="dropdown-itemp"><Icon type="android-settings"></Icon>{{$t('m.Password')}}</p>
                </router-link>

              </Dropdown-item>
            <Dropdown-item > <a  @click="changeLanguage"  ><p  class="dropdown-itemp"><Icon type="earth"></Icon>
                {{$t('m.English')}}
            </p></a></Dropdown-item>
                 <Dropdown-item > <a href="" @click="Logout"  ><p  class="dropdown-itemp"><Icon type="power"></Icon>{{$t('m.Logout')}}</p></a></Dropdown-item>

        </Dropdown-menu>
    </Dropdown>

 
      <li class="nav-item d-md-down-none">
        <a class="nav-link navbar-toggler aside-menu-toggler" >
            <!--&#9776;-->
            <Icon type="trophy" style="color: white"></Icon>
        </a>
      </li>
    </ul>
  </navbar>
</template>
<script>

import navbar from './Navbar'

export default {
  name: '',
  data(){
    return{
      lang:'zh-CN',
    }
  },
  components: {
    navbar,
    
  },
  methods: {
    changeLanguage(){
      this.$confirm('确定切换语言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.lang)
        if ( this.lang === 'zh-CN' ) {
          this.lang = 'en-US';
          this.$i18n.locale = this.lang;//关键语句
        }else {
          this.lang = 'zh-CN';
          this.$i18n.locale = this.lang;//关键语句
        }
      }).catch(() => {
        this.$message({
          type: 'info',
        });
      });
    },
    Logout(e){
         e.preventDefault();
         this.$store.dispatch('LogOut').then(() => {
                this.$router.push({ path: '/login' });
              }).catch(err => {
                this.$message.error(err);
              });
    },
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  }
}
</script>

<style type="text/css" scoped>
  .dropdown-itemp{
    text-align: left;
    font-size: 15px;
    padding: 10px;
  }
 .header-item .ivu-dropdown-item{
  padding: 15px;
}
  .header-item{
    width: 130px;
    /*background-color: #20a8d8;*/
    /*background-color: white;*/

    height: 55px;
    
    
  }
  .header-item a{
        color:white !important;

  }

</style>
