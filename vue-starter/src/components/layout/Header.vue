<template>
  <header class="layout-header">
    <div class="container">
      <nav class="navbar desktop">
        <h1 class="d-flex align-items-center">
          <router-link to="/" class="navbar-brand">
            <img src="@/assets/images/logo/logo.png" alt="로고">
          </router-link>
        </h1>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav desktop">
            <li class="nav-item dropdown">
              <div class="nav-link px-20">MENU 1</div>
              <div class="dropdown-menu pt-16">
                <div class="dropdown-wrap">
                  <router-link to="#" class="dropdown-item">SUB MENU 1</router-link>
                  <router-link to="#" class="dropdown-item">SUB MENU 2</router-link>
                  <router-link to="#" class="dropdown-item">SUB MENU 3</router-link>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <router-link to="#" class="nav-link px-20" role="button">MENU 2</router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="#" class="nav-link px-20" role="button">MENU 3</router-link>
            </li>
            <!-- 비 로그인 -->
            <li>
              <router-link to="/login" class="btn btn-primary ml-20">
                <i class="material-icons mr-6">lock</i>
                로그인
              </router-link>
            </li>
            <!-- 로그인 -->
            <!-- <li class="nav-item line-none dropdown mx-12">
              <router-link to="/mypage" class="btn login nav-link px-8" role="button">
                <i class="material-icons mr-6">person</i>
                <span class="mr-6">홍길동</span>
                <i class="material-icons">expand_more</i>
              </router-link>
              <div class="dropdown-menu pt-16">
                <div class="dropdown-wrap">
                  <router-link to="#" class="dropdown-item">내정보</router-link>
                  <a href="javascript:void(0)" class="dropdown-item">로그아웃</a>
                </div>
              </div>
            </li> -->
          </ul>
          <ul class="navbar-nav mobile">
            <li>
              <router-link to="/login" class="btn btn-primary">
                로그인
              </router-link>
              <!--<a href="javascript:void(0)">
                <i class="material-icons">menu</i>
              </a>-->
            </li>
          </ul>
        </div>
      </nav>
      <nav class="navbar mobile">
        <ul class="navbar-nav">
          <li class="nav-top d-flex align-items-center justify-content-between mb-24">
            <div class="d-flex align-items-center">
              <!-- 비 로그인시 -->
              <div class="info">
                <span>하단 로그인 버튼을 통해</span>
                <p>로그인을 해주세요.</p>
              </div>
              <!-- 로그인시 -->
              <!-- <div class="icon">
                <i class="material-icons">person</i>
              </div>
              <div class="info">
                <span>반갑습니다.</span>
                <p>홍길동</p>
              </div> -->
            </div>
            <button type="button" class="btn-navbar-close btn-icon">
              <i class="material-icons fs-32">close</i>
              <span class="sr-only">메뉴 닫기</span>
            </button>
          </li>
          <li class="nav-item">
            <div class="accordion" id="navbarNav">
              <b-card no-body>
                <b-card-header header-tag="header" class="mb-0" role="tab">
                  <b-button block v-b-toggle.navItem1 variant="white">
                    <span>마이페이지</span>
                    <i class="material-icons">expand_more</i>
                  </b-button>
                </b-card-header>
                <b-collapse id="navItem1" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <router-link to="#" class="btn-navbar-close">내정보</router-link>
                  </b-card-body>
                </b-collapse>
              </b-card>
              <b-card no-body>
                <b-card-header header-tag="header" class="mb-0" role="tab">
                  <router-link to="#" class="btn text-left collapsed btn-navbar-close">
                    <span>MENU 2</span>
                  </router-link>
                </b-card-header>
              </b-card>
              <b-card no-body>
                <b-card-header header-tag="header" class="mb-0" role="tab">
                  <router-link to="#" class="btn text-left collapsed btn-navbar-close">
                    <span>MENU 3</span>
                  </router-link>
                </b-card-header>
              </b-card>
            </div>
          </li>
          <!-- 비 로그인시 -->
          <li class="nav-bottom">
            <router-link to="#" class="login btn-navbar-close">
              <i class="material-icons mr-6">lock</i>로그인
            </router-link>
          </li>
          <!-- 로그인시 -->
          <!-- <li class="nav-bottom">
            <router-link to="#" class="btn btn-icon btn-navbar-close logout">
              <i class="material-icons mr-6">logout</i>로그아웃
            </router-link>
          </li> -->
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      
    }
  },
}
</script>
