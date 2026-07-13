document.addEventListener("DOMContentLoaded", function () {
    //모드탭의 수
    const mainTab = document.querySelectorAll(".trainTab ul li a");
    if(mainTab) {
        mainTab.forEach(function(){
            const position = document.querySelector(".mainInner .leftBox");
            const tabItem = document.querySelectorAll(".trainTab ul li a");
            const tabCont = document.querySelectorAll(".tabCont > div");
            const linkCont  = document.querySelectorAll(".quickLink > ul");

            const exp = document.querySelector(".tabCont > .expressTrain");
            const stnd = document.querySelector(".tabCont > .standardTrain");
            const expLink = document.querySelector(".quickLink > ul.express");
            const stndLink = document.querySelector(".quickLink > ul.standard");

            const tabTa = window.matchMedia('(max-width: 1279px)');
            
            //모드탭 내의 메뉴 수
            tabItem.forEach(function(tabmenu,menuIdx,inElements){
                tabmenu.addEventListener("click", function(event){
                    inElements.forEach(function(inElement){
                        inElement.classList.remove("active");
                        inElement.setAttribute("title", "탭메뉴");
                    });
                    this.classList.add("active");
                    this.setAttribute("title", "선택 된 탭메뉴");
                    
                    tabCont.forEach(function(content,contIdx){
                        content.classList.remove("on");
                        if(menuIdx == contIdx){
                            content.classList.add("on");
                        }
                    })
                    

                    linkCont.forEach(function(link, linkIdx){
                        link.classList.remove("on");
                        if(menuIdx == linkIdx){
                            link.classList.add("on");
                        }
                    })

                    if (this.classList.contains("express")){
                        position.classList.remove("tabStandard");
                        position.classList.add("tabExpress");    
                        if(!tabTa.matches) {
                            fadeOut(stnd, 100);
                            fadeIn(exp, 100);
                            fadeOut(stndLink, 100);
                            fadeIn(expLink, 100, "flex");
                        }else{
                            stnd.setAttribute("style","display:none; opactiy:0;")
                            exp.setAttribute("style","display:block; opactiy:1;")
                            stndLink.setAttribute("style","display:none; opactiy:0;")
                            expLink.setAttribute("style","display:flex; opactiy:1;")
                        }
                    } else if (this.classList.contains("standard")){
                        position.classList.remove("tabExpress");
                        position.classList.add("tabStandard");
                        if(!tabTa.matches) {
                            fadeOut(exp, 100);
                            fadeIn(stnd, 100);
                            fadeOut(expLink, 100);
                            fadeIn(stndLink, 100, "flex");
                        }else{
                            exp.setAttribute("style","display:none; opactiy:0;")
                            stnd.setAttribute("style","display:block; opactiy:1;")
                            expLink.setAttribute("style","display:none; opactiy:0;")
                            stndLink.setAttribute("style","display:flex; opactiy:1;")
                        }
                    }
                });
            });
        });
    }

    //fade in
    function fadeIn(element, duration, dsp="block"){
        let opacity = 0;
        element.style.display = dsp;
        element.style.opacity = opacity;
        let action = setInterval(function(){
            opacity += 10/duration;
            element.style.opacity = opacity;
            if(opacity >= 1){
                clearInterval(action);
            }
        }, 10);
    }

    //fade out
    function fadeOut(element, duration){
        let opacity = 1;
        element.style.opacity = opacity;
        let action = setInterval(function(){
            opacity -= 10/duration;
            element.style.opacity = opacity;
            if(opacity <= 0){
                clearInterval(action);
                element.style.display = "none";
            }
        }, 10);
    }

    function mainSlide() {
        const masinSlide = new Swiper('.bannerArea > .banCover > .banInner', {
            direction: 'horizontal',
            loop: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            on: {
                init: function () {
                    updateFocus(this);
                },
                slideChangeTransitionStart: function () {
                    updateFocus(this);
                }
            },
        });
        function updateFocus(swiperInstance){
            // slides가 배열이 아닐 수 있으므로 Array.from으로 안전하게 변환한 뒤 순회
            var slides = swiperInstance.slides || [];

            // 모든 슬라이드 내의 포커스 요소(a, button 등)를 찾아서 탭 차단
            Array.from(slides).forEach(function(slide){
                const focusableElements = slide.querySelectorAll('a, button, input');
                focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
            });
            
            // 현재 활성화된 슬라이드(또는 보이는 슬라이드) 내 요소만 탭 허용
            const activeSlide = Array.from(slides)[swiperInstance.activeIndex];
            // 만약 한 화면에 여러 슬라이드가 보인다면(slidesPerView > 1), 
            // .swiper-slide-visible 클래스를 가진 모든 요소를 대상으로 처리하세요.
            const activeFocusables = activeSlide.querySelectorAll('a, button, input');
            //activeFocusables.forEach(el => el.setAttribute('tabindex', '0'));
            activeFocusables.forEach(el => {
                el.setAttribute('tabindex', '0');

                // [추가] 포커스가 들어왔을 때 자동재생 멈춤
                el.onfocus = function() {
                    swiperInstance.autoplay.stop();
                };

                // [추가] 포커스가 나갔을 때 자동재생 다시 시작
                el.onblur = function() {
                    if(!play.classList.contains("on")){
                        swiperInstance.autoplay.start();
                        //console.log("플레이버튼이 노출되지 않았습니다. 즉 일시정지 상태가 아니라서 플레이합니다.");
                    }else{
                        //console.log("일시정지 상태라서 멈춤 그대로 둡니다.");
                    }
                };
            });
        }
        
        var play = document.querySelector("#playBtn");
        var pause = document.querySelector("#pauseBtn");
        // console.log(play);
        // console.log(pause);
        if(play) {
            play.addEventListener('click',function(){
                masinSlide.autoplay.start();
                play.classList.remove("on");
                pause.classList.add("on");
            });
        }

        if(pause) {
            pause.addEventListener('click',function(){
                masinSlide.autoplay.stop();
                pause.classList.remove("on");
                play.classList.add("on");
            });
        }
    }

    mainSlide();

    const headerBox = document.querySelector(".layoutTop");
    
    //console.log(headerBox);
    if (!headerBox) {
        //console.error("headerBox 요소를 찾을 수 없습니다.");
    }

    window.addEventListener("scroll",function(){      
       //console.log("스크롤 이벤트 발생");

        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //console.log("현재 스크롤 위치:", scrollTop);

        if (scrollTop >= 1) {
            headerBox.classList.add("scr");
        } else {
            headerBox.classList.remove("scr");
        }
    });
    
});

