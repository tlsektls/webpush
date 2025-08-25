import $ from 'jquery';

window.addEventListener('load', () => {
  
});

/**
 * 공통함수
 */
const Utils = (function () {
  
  init();
  /**
   * Initialize (Only Once)
   */
  function init() {
    setHeaderEvent();
    // setTooltip();
    // setTableCheckbox();
  }
  /**
   * Set Header Tab Event For Accessibility
   */
  function setHeaderEvent() {
    const $btnMobileMenu = $('.navbar-nav.mobile li:not(.mr-12) a');
    const $mobileMenu = $('.navbar.mobile');
    const $navItem = $('.layout-header .navbar-nav .nav-item');
    const $navLink = $('.navbar-brand, .layout-header .navbar-nav li > a');
  
    // #region mobile menu event
    $btnMobileMenu.on('click', () => {
      $('.layout-header').append('<div class="header-backdrop modal-backdrop fade"></div>');
      $mobileMenu.addClass('active');
      $mobileMenu.addClass('visible');
      setTimeout(() => {
        $('.header-backdrop').addClass('show');
      }, 100);
    });
    $(document).on('click', '.header-backdrop, .btn-navbar-close', () => {
      $('.header-backdrop').removeClass('show');
      $mobileMenu.removeClass('active');
      setTimeout(() => {
        $('.header-backdrop').remove();
        $mobileMenu.removeClass('visible');
      }, 300);
    });
    // #endregion mobile menu event
    // #region tab event
    $navItem.on('focusin', function () {
      removeMenuActive();
      $(this).addClass('active');
    });
    $navItem.on('click', function () {
      // $navItem.removeClass('active-only');
      // $(this).addClass('active-only');
      $(this).removeClass('active');
    });
    $navLink.on('focusin', function () {
      removeMenuActive();
    });
    $(document).on('mousedown', function () {
      removeMenuActive();
    });
    $('.layout-main, .layout-footer').on('focusin', function () {
      removeMenuActive();
    });
    function removeMenuActive() {
      $('.layout-header .navbar-nav .nav-item').removeClass('active');
    }
    // #endregion tab event
  }
  return {
    /**
     * Set Datepicker
     */
    setDatepicker() {
      // let $datepicker = $('.datepicker');
      // $datepicker.datepicker({ dateFormat: 'yy년 m월 d일' });
      // $datepicker.datepicker().datepicker('setDate', 'today');

      // daterangepicker
      let $daterangepicker = $('.custom-daterangepicker');
      $daterangepicker.each(function () {
        const d = new Date();

        // 오늘날의 년, 월, 일 데이터
        const day = d.getDate();
        const month = d.getMonth();
        const weekAgo = new Date(new Date().setDate(day - 7));
        const monthAgo = new Date(new Date().setMonth(month - 1));

        $(this).daterangepicker({
          autoUpdateInput: false,
          // startDate: new Date(monthAgo),
          endDate: new Date(),
          locale: {
            format: 'YYYY-MM-DD',
            separator: ' ~ ',
            applyLabel: '확인',
            cancelLabel: '취소',
          },
          ranges: {
            오늘: [new Date(), new Date()],
            '7일 전': [weekAgo, new Date()],
            '30일 전': [monthAgo, new Date()],
          },
        });
        $(this).on('apply.daterangepicker', function (ev, picker) {
          $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
        });
        $(this).on('focus', function () {
          $('[data-range-key="Custom Range"]').text('맞춤');
        });
        $(this).data('daterangepicker').setStartDate(monthAgo);
        $(this).val(Utils.dateFormatter(monthAgo).dash + ' ~ ' + Utils.dateFormatter(new Date()).dash);
      });
    },
    /**
     * Set Tooltip
     */
    setTooltip() {
      $(document).on('mouseenter', '[data-toggle="tooltip"]', function () {
        $(this).tooltip({
          content: function () {
            return $(this).prop('title');
          },
        });
        $(this).tooltip('open');
      });
    },
    /**
     * Set Table Checkbox
     */
    setTableCheckbox() {
      $(document).on('change', '.ta-table-wrap input.all', (e) => {
        let $tableWrap = $(e.target).parents('.ta-table-wrap');
        let $eachCheckboxList = $tableWrap.find('input.each');
        $eachCheckboxList.prop('checked', $(e.target).prop('checked'));
      });
      $(document).on('change', '.ta-table-wrap input.each', (e) => {
        let $tableWrap = $(e.target).parents('.ta-table-wrap');
        let $allCheckbox = $tableWrap.find('input.all');
        let $eachLength = $tableWrap.find('input.each').length;
        let $eachCheckedLength = $tableWrap.find('input.each:checked').length;
        if ($eachLength == $eachCheckedLength) {
          $allCheckbox.prop('checked', true);
        } else {
          $allCheckbox.prop('checked', false);
        }
      });
    },
    /**
     * Set Validation
     */
    setValidation() {
      let elements = document.querySelectorAll('input, textarea');

      for (let i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function () {
          // e.target.setCustomValidity(' ');
          elements[i].classList.remove('is-valid');
          elements[i].classList.add('is-invalid');
        };
        elements[i].oninput = function (e) {
          // e.target.setCustomValidity('');
          if (e.target.required) {
            // 비밀번호 pattern 재설정(사용자 수정을 제한하기 위해)
            if(e.target.type == 'password' && e.target.id != 'idOldPassword') {
              e.target.pattern = '^.*(?=^.{8,}$)(?=.*\\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&\\*\\-_+=<>?{}\\[\\]\\/\\|\\\\]).*$';
            }
            if (e.target.validity.valid) {
              elements[i].classList.remove('is-invalid');
              elements[i].classList.add('is-valid');
            } else {
              elements[i].classList.remove('is-valid');
              elements[i].classList.add('is-invalid');
            }
          }
        };
      }
    },
    /**
     * Start Loading
     */
    startLoading() {
      let wrapElmnt = document.querySelector('.spinner-wrap');
      let contentWrap = document.querySelector('#content');

      if (wrapElmnt) {
        wrapElmnt.dataset.task = Number(wrapElmnt.dataset.task) + 1;
      } else {
        wrapElmnt = document.createElement('div');
        wrapElmnt.classList.add('spinner-wrap');
        wrapElmnt.dataset.task = 1;
        let loadingElmnt = document.createElement('div');
        loadingElmnt.classList.add('spinner-border');
        let span = document.createElement('span');
        span.classList.add('sr-only');
        span.innerHTML = 'Loading...';
        loadingElmnt.appendChild(span);
        wrapElmnt.appendChild(loadingElmnt)

        contentWrap.appendChild(wrapElmnt);
      }
    },
    /**
     * End Loading
     */
    endLoading() {
      setTimeout(function () {
        let wrapElmnt = document.querySelector('.spinner-wrap');

        if(wrapElmnt) {
          let taskCount = wrapElmnt.dataset.task;

          if (taskCount > 1) {
            wrapElmnt.dataset.task = Number(wrapElmnt.dataset.task) - 1;
          } else {
            wrapElmnt.style.opacity = 0;
            setTimeout(function () {
              wrapElmnt.remove();
            }, 300);
          }
        }
      }, 300);
    },
    /**
     * Number to KRW format
     * ex) 1000000 -> 1,000,000
     * @param {Number} value
     * @returns {String}
     */
    numberFormatter(value) {
      if (value != '' && value != null && typeof value == 'number') {
        value = String(value).replace(/[^\d]+/g, '').replace(/(^0+)/, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
      } else {
        value = 0;
      }
      return value === '' ? 'NaN' : value;
    },
    /**
     * Get input[type=file] detail
     * @param {Element} elmnt
     * @returns {Object}
     */
    getFileDetail(elmnt) {
      //파일 경로.
      let filePath = elmnt.value;
      //전체경로를 \ 나눔.
      let filePathSplit = filePath.split('\\');
      // 파일 전체명
      let originalFileName = filePathSplit[filePathSplit.length - 1];
      //파일확장자 앞 .의 index
      let lastDot = originalFileName.lastIndexOf('.');
      //파일명 : .으로 나눈 앞부분
      let fileName = originalFileName.substring(0, lastDot);
      //파일 확장자 : .으로 나눈 뒷부분
      let fileExt = originalFileName.substring(lastDot + 1, originalFileName.length).toLowerCase();
      //파일 크기
      let fileSize = elmnt.files[0].size;

      let object = {
        originalName: originalFileName,
        name: fileName,
        ext: fileExt,
        size: fileSize,
      };

      return object;
    },
    /**
     * Byte to size
     * return ex) 5 GB
     * @param {Number} byte
     * @returns {String}
     */
    byteFormatter(byte) {
      let sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'];
      if (byte == 0) return '0 Byte';
      let i = parseInt(Math.floor(Math.log(byte) / Math.log(1024)));
      return Math.round(byte / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    /**
     * Set date format
     * @param {String} date
     * @returns {Object}
     */
    dateFormatter(date) {
      if ((date == '' || date == null) && typeof date == 'string') {
        return '';
      }
      const addZero = (num, digits) => {
        let zero = '';
        num = num.toString();

        if (num.length < digits) {
          for (let i = 0; i < digits - num.length; i++) {
            zero += '0';
          }
        }
        return zero + num;
      };
      let newDate = new Date(date);

      let yyyy = newDate.getFullYear();
      let mm = addZero(newDate.getMonth() + 1, 2);
      let m = newDate.getMonth() + 1;
      let dd = addZero(newDate.getDate(), 2);
      let d = newDate.getDate();

      let object = {
        slash: yyyy + '/' + mm + '/' + dd,
        dot: yyyy + '.' + mm + '.' + dd,
        dash: yyyy + '-' + mm + '-' + dd,
        word: yyyy + '년 ' + m + '월 ' + d + '일',
        time: yyyy + '-' + mm + '-' + dd + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds(),
      };

      return object;
    },
    /**
     * Get elapsed time
     * @param {String} date
     * @returns {Object}
     */
    getElapsedTime(date) {
      const start = new Date(date);
      const end = new Date(); // 현재 날짜
      
      const diff = (end - start) / 1000; // 경과 시간
    
      const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
      ];
      
      // 년 단위부터 알맞는 단위 찾기
      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);
        
        // 큰 단위는 0보다 작은 소수 단위 나옴
        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      
      // 모든 단위가 맞지 않을 시
      return "방금 전";
    },
    getPercent(totalNum, num) {
      return Math.round((num / totalNum) * 100 * 100) / 100;
    },
    getShortNumber(num, digits) {
      var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
      var decimal;

      for(var i=units.length-1; i>=0; i--) {
          decimal = Math.pow(1000, i+1);

          if(num <= -decimal || num >= decimal) {
              return +(num / decimal).toFixed(digits) + units[i];
          }
      }

      return num;
    }
  }
})();

export default Utils;
