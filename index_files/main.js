'use strict'

var page = {
    init: function () {
        this.bindEvent();
        this.initSearch();
        this.initCheckboxSelects();
        this.initHomeHotSpecialists();
        this.initHomeNews();
        this.initHomeReadGoodReviewsBox();
    },

    bindEvent: function () {
        // init tabs
        $('.tabs-container').each(function (i, tabsContainer) {
            tabsContainer = $(tabsContainer);
            var allTab = tabsContainer.find('.tab');
            var allTabItem = tabsContainer.find('.tab-item');
            var allTabContent = tabsContainer.find('.tab-content');
            allTab.on('click', function (e) {
                var tab = $(e.target).closest('.tab');

                allTab.removeClass('active');
                tab.addClass('active');

                allTabContent.removeClass('active');
                tabsContainer.find(tab.attr('data-target')).addClass('active');
            });
            allTabItem.on('click', function (e) {
                var tabItem = $(e.target).closest('.tab-item');
                console.log(tabItem.size());
                allTabItem.removeClass('active');
                tabItem.addClass('active');

                allTabContent.removeClass('active');
                tabsContainer.find(tabItem.attr('data-target')).addClass('active');
            });
        });

        // P26 left-tabs click
        $('.d-flex .left_tab').on('click', function () {
          var i = $(this).index(),
            color = $(this).css("background-color");
          $(".share-part").css("border-color", color);
          $(this).addClass("active").siblings().removeClass("active");
          $(".specialistselect .tab-item").eq(i).show().siblings(".tab-item").hide();
        });

        //P19-21 responsive screen down click
        $('.doctor-info').find('.fa-chevron-down').on('click',function () {
           var content = $(this).parent('div').siblings('div');
           content.toggleClass('on');
        });

    },

    // 下拉提示层
    initSearch: function () {
    typeof $.typeahead === 'function' && $.typeahead({
      input: ".js-typeahead",
      minLength: 1,
      maxItem: 15,
      dynamic: true,
      order: "asc",
      hint: true,
      group: true,
      display: ["name", "name_en", "specialist", "area", "display"],
      backdrop: {
        "background-color": "#fff"
      },
      // template:"{{name}} / {{name_en}} / {{specialist}} / {{area}} / {{display}}",
      // 插入圖片
      template: function (query, item) {

        if(item.group == "關鍵字"){

          return '{{name}}';

        }else if (item.group == "醫生") {

          return '{{name}} / {{name_en}} / {{specialist}} / {{area}}'
            + '<img src="./images/icon/good.png" style="margin-right:10px;width:30px;position:absolute;right:40px;">'+ '<span style="position:absolute;right:30px"></span>';

        }else if(item.group == "相关文章"){

          return '{{title}}';

        }else if(item.group == "诊所"){

          return '{{clinic_name}}';

        }else if(item.group == "专科"){

          return '{{name}}';
        }
      },
      emptyTemplate: 'No result for "{{query}}"',
      source: {
        '關鍵字': {
          ajax: {
            url: "http://goodoctor.nickyshunli.cn/zh-hk/test/{{query}}",
            dataType: "json",
            path: "keyword",
          }
        },

        '醫生': {
          ajax: {
            url: "http://goodoctor.nickyshunli.cn/zh-hk/test/{{query}}",
            dataType: "json",
            path: "doctor",
          }
        },

        '相关文章': {
          ajax: {
            url: "/zh-hk/keyword/{{query}}",
            dataType: "json",
            path: "topic",
          }
        },

        '专科': {
          ajax: {
            url: "/zh-hk/keyword/{{query}}",
            dataType: "json",
            path: "special",
          }
        },

        '诊所': {
          ajax: {
            url: "/zh-hk/keyword/{{query}}",
            dataType: "json",
            path: "clinic",
          }
        }
      },
      callback: {
        // 按下向上箭头或向下箭头时输入文本不会改变
        onNavigateBefore: function (node, query, event) {
          if (~[38, 40].indexOf(event.keyCode)) {
            event.preventInputChange = true;
          }
        },
        // 下拉提示层跳转链接
        onClick: function (node, a, item, event) {

          if(item.group=='醫生'){
            window.open(
              "doctor/detail/" +
              item.id
            );
          }else if(item.group=='诊所'){
            window.open(
              "clinic/detail/" +
              item.id
            );
          }else if(item.group=='相关文章'){
            window.open(
              "topic/detail/" +
              item.id
            )
          }
        },
      }
    });
  },

    // 专科分类
    initCheckboxSelects: function () {
        $('.checkbox-select').each(function (i, checkboxSelect) {
            checkboxSelect = $(checkboxSelect);
            var allCheckbox = checkboxSelect.find('.tab-content input[type=checkbox]');
            var allmore = checkboxSelect.find('.checkbox_more');
            var allList = checkboxSelect.find('.west-medicine-list');
            var btnCancel = checkboxSelect.find('.btn-cancel');
            var btnConfirm = checkboxSelect.find('.btn-confirm');

            checkboxSelect.find('.tabs-container').css('display','block');

            //stop closing the dropdwon menu when click in the dropdown menu
            checkboxSelect.find('.dropdown-menu').on('click', function (e) {
                e.stopPropagation();
            });

            btnCancel.on('click', function(){
                allList.removeClass('more').css('display','block');
                allList.find('li.checkbox_more').css('display','block');
                btnCancel.css('display','none')
                btnConfirm.css('display','block');
            });

            btnConfirm.on('click', function(){
              checkboxSelect.find('.dropdown-menu').removeClass('show');
            });

            //update the value showing in the input div
            function updateSelect(checkboxSelect) {
                var value = '';
                var selectGroupCheckboxs = checkboxSelect.find('.tab-content input[type=checkbox][data-is-select-group="true"]:checked');
                var allCheckbox = checkboxSelect.find('.tab-content input[type=checkbox]:checked');

                //function which push single checkbox data-value into the variable value
                function pushValue(value, checkbox) {
                    if (value !== '') {
                        value += ';';
                    }
                    return value + $(checkbox).closest('label').find('span').html();
                }

                //check is there any select group checkbox
                if (selectGroupCheckboxs.length > 0) {
                    selectGroupCheckboxs.each(function (i, selectGroupCheckbox) {
                        value = pushValue(value, selectGroupCheckbox);
                        //remove any checkbox that belong to the selectGroupCheckbox
                        allCheckbox = allCheckbox.filter(':not([data-group=\'' + $(selectGroupCheckbox).attr('data-group') + '\'])');
                    });
                }

                allCheckbox.each(function (i, checkbox) {
                    value = pushValue(value, checkbox);
                });

                checkboxSelect.find('.input').html(value === '' ? checkboxSelect.find('.input').attr('data-placeholder') : value);
            }

            updateSelect(checkboxSelect);
            allCheckbox.on('change', function (e) {
                var checkbox = $(e.target).closest('input[type=checkbox]');
                var imgSrc = checkbox.closest('label').siblings('img');
                var flag = checkbox.is(':checked');
                var section = checkbox.closest('ul.west-medicine-item').siblings('.section').find('i');
                var checkSelect = checkbox.closest('ul.west-medicine-item').find('input[type=checkbox]:checked');
                imgSrc.attr('src', flag ? './images/icon/tupian2.png' : './images/icon/tupian1.png');
                if(checkSelect.size()<=0){
                    section.removeClass('active');
                }else{
                    section.addClass('active');
                }
                if (checkbox.attr('data-is-select-group') === 'true') {
                    //get all checkbox belong to the specific group
                    var allGroupCheckbox = checkboxSelect.find('input[type=checkbox][data-group=\'' + checkbox.attr('data-group') + '\']');
                    //check all or uncheck all
                    checkbox.is(':checked') ? allGroupCheckbox.prop('checked', true) : allGroupCheckbox.prop('checked', false);
                } else if (checkbox.attr('data-group') !== undefined) {
                    var selectGroupCheckbox = checkboxSelect.find('input[type=checkbox][data-is-select-group="true"][data-group=\'' + checkbox.attr('data-group') + '\']');
                    selectGroupCheckbox.prop('checked', false);
                }
                updateSelect(checkboxSelect);
            });
            allmore.on('click', function(e){
                var checkboxList = $(e.target).closest('li.west-medicine-list');
                $(this).css('display','none');
                checkboxList.addClass('more');
                checkboxList.siblings('li').css('display','none');
                btnConfirm.css('display','none');
                btnCancel.css('display','block');
            })
        });

    },

    initHomeHotSpecialists: function () {
        var homeHotSpecialists = $('.home-hot-specialists');
        var allIconSpecialist = homeHotSpecialists.find('.icon-specialist');

        allIconSpecialist.on('click', function (e) {
            //
            var targetEl = $(e.target);
            if (targetEl.closest('.icon-grey-cross').length > 0) {
                targetEl.closest('.icon-specialist').removeClass('active');
                homeHotSpecialists.removeClass('active');
                return;
            }
            if (targetEl.closest('.search-box').length === 0) {
                allIconSpecialist.removeClass('active');
                targetEl.closest('.icon-specialist').addClass('active');
                homeHotSpecialists.addClass('active');
            }
        });
    },

    initHomeNews: function () {
        var homeNews = $('.home-news');
        var allTab = homeNews.find('.tab');

        var homeNewsSwiper = new Swiper('.home-news .swiper-container', {
            speed: 1000,
            spaceBetween: 100,
            on: {
                slideChange: function slideChange() {
                    var tab = homeNews.find('.tab[data-slide-index=' + this.activeIndex + ']');
                    // var color = __WEBPACK_IMPORTED_MODULE_2_color___default()(tab.css('color'));
                    //add active class to active tab
                    allTab.removeClass('active');
                    tab.addClass('active');
                    //pass new css variable value
                    var currentColor = tab.css('background-color');
                    var index = this.activeIndex;
                    var darkenColor = "#a6d080";
                    switch (index) {
                        case 0:
                            darkenColor = "#a6d080";
                            break;
                        case 1:
                            darkenColor = "#33b4bf";
                            break;
                        case 2:
                            darkenColor = "#dba015";
                            break;
                        case 3:
                            darkenColor = "#e04d4e";
                            break;
                        case 4:
                            darkenColor = "#0ea8cb";
                            break;
                        case 5:
                            darkenColor = "#d3876a";
                            break;
                    }
                    var linearColor = "repeating-linear-gradient(-45deg, " + currentColor + "," + currentColor + " 8px, " + darkenColor + " 8px," + darkenColor + " 16px)";
                    if ($.support.msie) {
                        linearColor = "-ms-repeating-linear-gradient(-45deg, "+currentColor+","+currentColor+" 8px, "+darkenColor+" 8px,"+darkenColor+" 16px)";
                    }
                    else if ($.support.mozilla) {
                        linearColor = "-moz-repeating-linear-gradient(-45deg, "+currentColor+","+currentColor+" 8px, "+darkenColor+" 8px,"+darkenColor+" 16px)";
                    }
                    else if ($.support.webkit) {
                        linearColor = "-webkit-repeating-linear-gradient(-45deg, " + currentColor + "," + currentColor + " 8px, " + darkenColor + " 8px," + darkenColor + " 16px)";
                    }
                    else if ($.support.opera) {
                        linearColor = "-o-repeating-linear-gradient(-45deg, " + currentColor + "," + currentColor + " 8px, " + darkenColor + " 8px," + darkenColor + " 16px)";
                    }
                    $('.swiper-border').css("background", linearColor);
                    $('.news-swiper .btn-prev').css("background-color", currentColor);
                    $('.news-swiper .btn-next').css("background-color", currentColor);
                }
            }
        });

        allTab.on('click', function (e) {
            return homeNewsSwiper.slideTo($(e.target).closest('.tab').attr('data-slide-index'));
        });

        homeNews.find('.btn-prev').on('click', function () {
            return homeNewsSwiper.slidePrev();
        });
        homeNews.find('.btn-next').on('click', function () {
            return homeNewsSwiper.slideNext();
        });
    },

    initHomeReadGoodReviewsBox: function () {
        var homeReadGoodReviewsBox = $('.home-read-good-reviews-box');

        var swiper = new Swiper('.home-read-good-reviews-box .swiper-container', {
            speed: 1000,
            spaceBetween: 100
        });

        homeReadGoodReviewsBox.find('.btn-prev').on('click', function () {
            return swiper.slidePrev();
        });
        homeReadGoodReviewsBox.find('.btn-next').on('click', function () {
            return swiper.slideNext();
        });
    }
};

$(function () {
    page.init();
})