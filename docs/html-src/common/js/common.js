document.addEventListener("DOMContentLoaded", function () {

    //input text reset
    inputTextReset();

    // 드롭다운 (gnb & breadcrumb)
    initDropdowns();

    //파일 찾기
    inputFileUpload();

    // 탭메뉴 (모드 탭 함수)
    tabMenuInit();
    tabMenuInitLine();
    tapInTabInit();
    
    //아코디언(QnA) 함수
    qnaInit();

    //추천상품 스와이프
    swiperTicketGoods();

    //티켓 자세히 보기
    ticketView(); 

    // 마이페이지 - 체험학습 예약내역 문의 
    resvInfoAcc();

    //팝업 내부 스크롤 시 타이틀 쉐도우 추가
    const scrollPops = document.querySelectorAll(".modPopup .popCont");
    scrollPops.forEach(function(scrollPop, idx){
        scrollPop.addEventListener("scroll",function(event){
            if(this.scrollTop >= 1){
                this.previousElementSibling.classList.add("shadow");
            }else{
                this.previousElementSibling.classList.remove("shadow");
            }

        });
    })


    /* Header - pc 마우스오버 & 탭 키 */
    const gnbArea = document.querySelector('.gnbArea');
    const depth1Items = document.querySelectorAll('.gnbArea .depth1List');

    // 모든 하위메뉴 숨기기
    function hideAllMenus() {
        document.querySelectorAll('.gnbArea .depth2Area').forEach(menu => {
            menu.style.display = 'none';
        });
        gnbArea.classList.remove('active');
    }

    // 해당 메뉴 보이기
    function showMenu(item) {
        hideAllMenus();
        
        const subMenu = item.querySelector('.gnbArea .depth2Area');
        if (subMenu) {
            subMenu.style.display = 'block';
            gnbArea.classList.add('active');
        }
    }

    // 이벤트 추가
    depth1Items.forEach(item => {
        // 마우스 오버
        item.addEventListener('mouseenter', () => showMenu(item));
        // 탭으로 포커스
        item.addEventListener('focusin', () => showMenu(item));
    });

    // 메뉴 영역 벗어나면 숨기기
    if(gnbArea){
        gnbArea.addEventListener('mouseleave', hideAllMenus);
        gnbArea.addEventListener('focusout', (e) => {
            if (!gnbArea.contains(e.relatedTarget)) {
                hideAllMenus();
            }
        });
        
        /* header - pc 사이트맵 */
        const sitemap = document.querySelector('.sitemap');
        const openBtn = document.querySelector('.sitemapArea .openBtn');
        const closeBtn = document.querySelector('.sitemapArea .closeBtn');

        // 모바일 사이즈 체크
        function isMobileSize() {
            return window.innerWidth <= 1279;
        }
        // 열기
        openBtn.addEventListener('click', () => {
            sitemap.classList.add('active');
            document.body.style.overflow = 'hidden';
            openBtn.setAttribute('aria-expanded', 'true');
            // 모바일 사이즈에서 안 열리게
            if (isMobileSize()) {
                return;
            }
        });
        // 닫기
        closeBtn.addEventListener('click', () => {
            sitemap.classList.remove('active');
            document.body.style.overflow = '';
            openBtn.setAttribute('aria-expanded', 'false'); 
            openBtn.focus();
        });
        // 화면 크기 변경시 모바일에서 자동으로 닫기
        window.addEventListener('resize', () => {
            if (isMobileSize() && sitemap.classList.contains('active')) {
                closeBtn.click();
            }
        });
        
        /* header - mobile 전체메뉴 열기 */
        const moOpenBtn = document.querySelector('.sitemapArea .moOpenBtn'); 
        const moMenu = document.querySelector('.moMenuArea');       
        const moCloseBtn = document.querySelector('.moMenuArea .MoCloseBtn'); 

        // 열기
        moOpenBtn.addEventListener('click', () => {
            moMenu.classList.add('active');       
            document.body.style.overflow = 'hidden'; 
            moOpenBtn.setAttribute('aria-expanded', 'true');
        });

        // 닫기
        moCloseBtn.addEventListener('click', () => {
            moMenu.classList.remove('active');        
            document.body.style.overflow = '';         
            moOpenBtn.setAttribute('aria-expanded', 'false');
            moOpenBtn.focus();                  
        });


        /* header - mobile 전체메뉴 섹션 스크롤 */
        const navButtons = document.querySelectorAll('.naviBox .naviItem');
        const titleEls = document.querySelectorAll('.moMenuBody .section .title');

        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.dataset.target;
                const targetSection = document.getElementById(targetId);
                if (!targetSection) return;

                const titleEl = targetSection.querySelector('.moMenuBody .title') || targetSection;
                titleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

                setActiveButtonById(targetId);
            });
        });

        // active 버튼 업데이트 함수
        function setActiveButtonById(id) {
                navButtons.forEach(btn => {
                if (btn.dataset.target === id) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');

                    const container = btn.closest('.naviArea');
                    if (container) {
                        // 현재 가로 스크롤 위치
                        const scrollLeft = container.scrollLeft;
                        // 버튼이 컨테이너 왼쪽에 위치하도록 조정
                        const targetLeft = btn.offsetLeft;
                        container.scrollTo({
                            left: targetLeft, // 버튼이 왼쪽 끝으로 오게
                            behavior: 'smooth'
                        });
                    }
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                }
            });
        }

        // 스크롤에 따라 active 갱신
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target.closest('.moMenuBody .section');
                    if (section && section.id) {
                        setActiveButtonById(section.id);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '-210px 0px -50% 0px',
            threshold: 0.01
        });

        titleEls.forEach(title => observer.observe(title));


        /* header - pc 메뉴 검색 */
        const srchArea = document.querySelector('.srchArea');
        const srchBtn = document.querySelector('.quickArea .srchBtn');
        const srchClose = document.querySelector('.srchArea .srchCloseBtn');
        const srchInput = document.querySelector('.srchArea .srchInput');
        const gnb = document.querySelector('.cptGnb'); 

        srchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            srchArea.classList.add('active');
            gnb.classList.add('active'); // 추가

            srchInput.focus(); // 포커스이동
        });

        srchClose.addEventListener('click', () => {
            srchArea.classList.remove('active');
            gnb.classList.remove('active'); //추가 

            srchBtn.focus(); // 포커스이동
        });
    }

    selectBicycle(); //자전거 에약


    /* 승차권 > 승차권예약 > 공항철도 추천상품 - 버튼 클릭시 스크롤 이동 */
    const targetBoxes = [
    document.querySelector('.cptProduct .detailBox'),
        document.querySelector('.cptProduct .guideBox'),
        document.querySelector('.cptProduct .methodBox')
    ];

    document.querySelectorAll('.cptProduct .tabName').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabGroup = btn.closest('.cptProduct .tabSwiper') || btn.closest('.cptProduct .modTab');
            const groupButtons = tabGroup
            ? tabGroup.querySelectorAll('.cptProduct .tabName')
            : document.querySelectorAll('.cptProduct .tabName');

            const idx = Array.from(groupButtons).indexOf(btn);
            if (idx === -1 || !targetBoxes[idx]) return;

            // 다른 스크립트에서 걸어준 tabName에 .on 전부 제거
            groupButtons.forEach(b => b.classList.remove('on', 'active'));

            // 부드럽게 해당 섹션으로 이동
            targetBoxes[idx].scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    langSelect(); //인트로 언어

    // cptNav 모바일 메뉴
    navMoInit();
});



//자전거 에약
function selectBicycle(){
    document.querySelectorAll('.btnBicycle').forEach(function(btn) {
        btn.addEventListener('click', function(){
            document.querySelectorAll('.btnBicycle').forEach(b => b.classList.remove('on'));
            this.classList.add('on');
        });
    });
}

/* 드롭다운 (gnb & breadcrumb) */
function initDropdowns() {
    const dropdowns = document.querySelectorAll(".comDropdown");

    if(!dropdowns) return;

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".btnDrop");
        const menu = dropdown.querySelector(".dropMenu");
        if (!btn || !menu) return;

        // 초기 상태
        btn.setAttribute("title", "열림");
        menu.style.display = "none";

        // 닫기
        const close = () => {
            btn.setAttribute("title", "열림");
            menu.style.display = "none"; 
            btn.classList.remove("open");
        };

        // 열기
        const open = () => {
            // 드롭다운 2개일때, 하나만 열리도록 처리
            dropdowns.forEach(d => {
                if (d !== dropdown) {
                    const b = d.querySelector(".btnDrop");
                    const m = d.querySelector(".dropMenu");
                    if (b && m) {
                        b.setAttribute("title", "열림");
                        m.style.display = "none";
                        b.classList.remove("open");
                    }
                }
            });

            // 자기 자신 열기
            btn.setAttribute("title", "닫힘");
            menu.style.display = "block";
            btn.classList.add("open");

        };

        // 토글 메뉴 클릭
        const toggle = () => (btn.getAttribute("title") === "닫힘" ? close() : open());
        btn.addEventListener("click", e => { 
            e.stopPropagation(); 
            toggle(); 
        });

        // 외부 클릭 시 닫기
        document.addEventListener("click", e => { 
            if (!dropdown.contains(e.target)) close(); 
        });

        // 드롭다운 메뉴 마지막에서 tab키 누르면 닫기
        const items = menu.querySelectorAll("li a, li button, li [tabindex]:not([tabindex='-1'])");
        if (items.length > 0) {
            const lastItem = items[items.length - 1];
            lastItem.addEventListener("keydown", e => {
                if (e.key === "Tab" && !e.shiftKey) { 
                    close(); 
                }
            });
        }

    });
}


//파일 찾기
function inputFileUpload(){
    //파일찾기
    const uploadFiles = document.querySelectorAll(".fileBox .uploadBtn");
    uploadFiles.forEach(function(uploadFile,idx){
        uploadFile.addEventListener("change",function(event){
            const fileBox = parentsElementFind(this, "fileBox");
            let fileName;
            if(window.FileReader){
                fileName = this.files[0].name;
                //console.log(fileName);
            } else {
                //console.log("noFileReader");
                //var filename = $(this).val().split('/').pop().split('\\').pop();
                //var filename = this.val().split('/').pop().split('\\').pop();
            }
            fileBox.querySelector(".textBox").innerText = fileName;
            fileBox.classList.add("on");
        });
    });

    //파일찾기 취소
    const delFiles = document.querySelectorAll(".fileBox .fileDel");
    delFiles.forEach(function(delFile,idx){
        delFile.addEventListener("click",function(event){
            const fileBox = parentsElementFind(this, "fileBox");
            fileBox.querySelector(".uploadBtn").value = "";
            fileBox.querySelector(".textBox").innerText = "";
            fileBox.classList.remove("on");
        });
    });
}

// ------------------------------- 팝업 함수 ------------------------------- //
let popupTriggerBtn = null;
//팝업 열기
function openPopup($popName){
    document.querySelector("#"+$popName).classList.add("on");

    //팝업 포커스 이동
    popupTriggerBtn = event.currentTarget;
    const closeButton = document.querySelector("#"+$popName+" .btnPopClose");
    closeButton.focus();
}
//팝업 닫기
function closePopup($popName){
    document.querySelector("#"+$popName).classList.remove("on");

    // 저장된 버튼으로 포커스 복귀
    if (popupTriggerBtn) {
        popupTriggerBtn.focus();
        popupTriggerBtn = null;
    }
}


// ------------------------------- 팝업 함수 (S 버전) ------------------------------- //
let popupTriggerBtn2 = null;

// 팝업 열기
function openPopup2($popName, event) {
    document.querySelector("#" + $popName).classList.add("on");

    // 팝업 포커스 이동
    popupTriggerBtn2 = event.currentTarget;
    const closeButton2 = document.querySelector("#" + $popName + " .btnPopCloseS");
    closeButton2.focus();
}

// 팝업 닫기
function closePopup2($popName) {
    document.querySelector("#" + $popName).classList.remove("on");

    // 저장된 버튼으로 포커스 복귀
    if (popupTriggerBtn2) {
    popupTriggerBtn2.focus();
    popupTriggerBtn2 = null;
    }
}



//갤러리 팝업 - start
function gallSwiperStart($num){
    //모바일, 태블릿, PC 모두 슬라이드
    let gallSwiper = new Swiper(".comGallery .gallPop", {
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            prevEl: ".comGallery .gallPop .swiperDirt .prev",
            nextEl: ".comGallery .gallPop .swiperDirt .next",
        },
    });
    // 슬라이드 변경 시 .popTitle 업데이트
    gallSwiper.on('slideChange', function () {
        updatePopTitle(gallSwiper);
    });

    // 최초 진입 시에도 .popTitle 업데이트
    gallSwiper.on('init', function () {
        updatePopTitle(gallSwiper);
    });

    gallSwiper.update();
    if(typeof $num === "number" && !isNaN($num)){
        gallSwiper.slideTo($num, 0);
        updatePopTitle(gallSwiper);
    }
}
function openGallery($popName,$num = 0){
    document.querySelector("#"+$popName).classList.add("on");
    gallSwiperStart($num);

    //팝업 포커스 이동
    popupTriggerBtn = event.currentTarget;
    const closeButton = document.querySelector("#"+$popName+" .btnPopClose");
    closeButton.focus();
}
// .popTitle 업데이트 함수
function updatePopTitle(swiper) {
    // 현재 활성화된 슬라이드에서 .imgTxt em의 텍스트 추출
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;
    const em = activeSlide.querySelector('.imgTxt em');
    const title = em ? em.textContent : '';
    // .modPopup 안의 .popTitle에 텍스트 삽입
    const popTitle = document.querySelector('.modPopup .popTitle');
    if (popTitle) popTitle.textContent = title;
}
//갤러리 팝업 - end


//알럿
let alertTriggerBtn = null;
function openAlert($altName){
    document.querySelector("#"+$altName).classList.add("on");
    
    //알럿 포커스 이동
    alertTriggerBtn = event.currentTarget;
    const closeButton = document.querySelector("#"+$popName+" .btnArtClose");
    closeButton.focus();
}
function closeAlert($altName){
    document.querySelector("#"+$altName).classList.remove("on");

    // 저장된 버튼으로 포커스 복귀
    if (alertTriggerBtn) {
        alertTriggerBtn.focus();
        alertTriggerBtn = null;
    }
}

// ------------------------------- input text reset 함수 ------------------------------- //
function inputTextReset(){
    let btnResets = document.querySelectorAll('.btnReset');
    btnResets.forEach(function(btn){
        btn.addEventListener('click', function(){
            btn.parentNode.querySelector('.iptText').value = "";
            fnValid.check();
        })
    })
}

// ------------------------------- 탭메뉴 함수 ------------------------------- //
//모드 탭 함수
function tabMenuInit(){
    //모드탭의 수
    const modTabs = document.querySelectorAll(".modTab");
    if(modTabs.length==0) return;
    modTabs.forEach(function(modTab,tabIdx,elements){
        const tabmenus = modTab.querySelectorAll(".tabName");
        const tabConts = modTab.querySelectorAll(".tabCont");

        //모드탭 내의 메뉴 수
        tabmenus.forEach(function(tabmenu,menuIdx,inElements){
            tabmenu.addEventListener("click", function(event){
                inElements.forEach(function(inElement){
                    inElement.classList.remove("on");
                    inElement.setAttribute("title", "탭메뉴");
                });
                this.classList.add("on");
                this.setAttribute("title", "선택 된 탭메뉴");
                if(tabConts.length > 1){    //탭 콘텐츠가 1개뿐이면 메뉴만 작동(콘텐츠 변경X)
                    tabConts.forEach(function(tabCont,contIdx){
                        tabCont.classList.remove("on");
                        if(menuIdx == contIdx){
                            tabCont.classList.add("on");
                            //console.log(inTabLine.length != undefined);
                            //직통열차 이용안내 전용
                            if(inTabLine && Array.isArray(inTabLine)) { //승차권확인 > 제휴서비스 등과 오류방지
                                inTabLine.forEach(function(val){
                                    val.update();
                                });
                            }
                        }
                    })
                }
            });
        });
    });

    tabMenuSwiper();
}
function tabMenuSwiper(){
    //모바일, 태블릿, PC 모두 슬라이드
    let tabSwiperAll = new Swiper(".tabSwiper.toAll", {
        focusableElements: false,
        slidesPerView: "auto",
        touchStartPreventDefault: false,
        roundLengths: true,
        navigation: {
            prevEl: ".tabSwiper.toAll ~ .tabDirection .tabBtn.alignL button",
            nextEl: ".tabSwiper.toAll ~ .tabDirection .tabBtn.alignR button",
        },
    });
 
    //BreakPoint
    const tabMo = window.matchMedia('(max-width: 768px)');      //모바일 분기
    const tabTa = window.matchMedia('(max-width: 1279px)');     //태블릿 분기
    let tabSwiperMob;
    let tabSwiperTab;
   
    function tabSwiperMobAction($bln){
        if($bln){
            tabSwiperMob = new Swiper(".tabSwiper.toMob", {
                focusableElements: false,
                slidesPerView: "auto",
                touchStartPreventDefault: false,
                roundLengths: true,
                // navigation: {
                //     prevEl: ".tabSwiper.toMob ~ .tabDirection .tabBtn.alignL button",
                //     nextEl: ".tabSwiper.toMob ~ .tabDirection .tabBtn.alignR button",
                // },
            });
        }else{
            if(tabSwiperMob && document.querySelector(".tabSwiper.toMob")){
                tabSwiperMob.destroy();
                tabSwiperMob = undefined;
            }
        }
    }
    function tabSwiperTabAction($bln){
        if($bln){
            tabSwiperTab = new Swiper(".tabSwiper.toTab", {
                focusableElements: false,
                slidesPerView: "auto",
                touchStartPreventDefault: false,
                roundLengths: true,
                // navigation: {
                //     prevEl: ".tabSwiper.toTab ~ .tabDirection .tabBtn.alignL button",
                //     nextEl: ".tabSwiper.toTab ~ .tabDirection .tabBtn.alignR button",
                // },
            });
        }else{
            if(tabSwiperTab && document.querySelector(".tabSwiper.toTab")){
                tabSwiperTab.destroy();
                tabSwiperTab = undefined;
            }
        }
    }
 
    if(tabMo.matches) {
        //console.log("모바일");
        tabSwiperMobAction(true);
    } else {
        //console.log("모바일아님");
        tabSwiperMobAction(false);
    }
    if(tabTa.matches) {
        //console.log("태블릿");
        tabSwiperTabAction(true);
    } else {
        //console.log("태블릿아님");
        tabSwiperTabAction(false);
    }
 
    tabMo.addListener(function(){
        if(tabMo.matches) {
            //console.log("모바일");
            tabSwiperMobAction(true);
        } else {
            //console.log("모바일아님");
            tabSwiperMobAction(false);
        }
    });
    tabTa.addListener(function(){
        if(tabTa.matches) {
            //console.log("태블릿");
            tabSwiperTabAction(true);
        } else {
            //console.log("태블릿아님");
            tabSwiperTabAction(false);
        }
    });
}
//탭내 탭
function tapInTabInit(){
    //모드탭의 수
    const modTabs = document.querySelectorAll(".tabInTab");
    if(modTabs.length == 0) return;
    modTabs.forEach(function(modTab,tabIdx,elements){
        const tabmenus = modTab.querySelectorAll(".inTabName");
        const tabConts = modTab.querySelectorAll(".inTabCont");
        const servItems = modTab.querySelectorAll(".inTabServ");

        //모드탭 내의 메뉴 수
        tabmenus.forEach(function(tabmenu,menuIdx,inElements){
            tabmenu.addEventListener("click", function(event){
                inElements.forEach(function(inElement){
                    inElement.classList.remove("on");
                    inElement.setAttribute("title", "탭내 탭메뉴");
                });
                this.classList.add("on");
                this.setAttribute("title", "선택 된 탭 내 탭메뉴");

                //탭 메뉴에 따라 다른 리스트로 노출되는 경우
                servItems.forEach(function(servItem,servIdx){
                    //console.log(menuIdx);
                    if(menuIdx==0){
                        servItem.classList.add("on");
                    } else {
                        if(servItem.classList.contains("type" + menuIdx)){
                            servItem.classList.add("on");
                        }else{
                            servItem.classList.remove("on");
                        }
                    }
                })

                //탭내 탭메뉴에 따라 컨텐츠가 여러개인 경우
                if(tabConts.length > 1){    //탭 콘텐츠가 1개뿐이면 메뉴만 작동(콘텐츠 변경X)
                    tabConts.forEach(function(tabCont,contIdx){
                        tabCont.classList.remove("on");
                        if(menuIdx == contIdx){
                            tabCont.classList.add("on");
                        }
                    })
                }
            });
        });
    });
    inTabLine = swiperInTabLine();
}
var inTabLine;
function swiperInTabLine() {
    const inTabSwiperEls = document.querySelectorAll('.tabInTab .inTabSwiper');
    if (!inTabSwiperEls.length) return [];
    return Array.from(inTabSwiperEls).map(function(el) {
        const tabInTab = el.closest('.tabInTab');
        const swiper = new Swiper(el, {
            focusableElements: false,
            slidesPerView: "auto",
            spaceBetween: 4,
            loop: false,
            navigation: {
                nextEl: tabInTab.querySelector('.swiperDirt .dirtBox.next .btnDirt'),
                prevEl: tabInTab.querySelector('.swiperDirt .dirtBox.prev .btnDirt'),
            },
        });

        // sticky 스크롤 스파이
        if (tabInTab.classList.contains('sticky')) {
            const inTabMenus = tabInTab.querySelectorAll('.inTabMenu .inTabItem');
            const sectionEls = tabInTab.querySelectorAll('.inTabContainer [id]');
            if (sectionEls.length) {
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const targetId = entry.target.id;
                            inTabMenus.forEach(function(item, idx) {
                                const btn = item.querySelector('.inTabName');
                                const btnId = btn.getAttribute('onclick').match(/moveScroll\('([^']+)'\)/);
                                if (btnId && btnId[1] === targetId) {
                                    inTabMenus.forEach(function(i) {
                                        i.querySelector('.inTabName').classList.remove('on');
                                        i.querySelector('.inTabName').setAttribute('title', '탭메뉴');
                                    });
                                    btn.classList.add('on');
                                    btn.setAttribute('title', '선택 된 탭메뉴');
                                    swiper.slideTo(idx, 300);
                                }
                            });
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '-10% 0px -85% 0px',
                    threshold: 0
                });
                sectionEls.forEach(function(sec) { observer.observe(sec); });
            }
        }

        return swiper;
    });
}

function tabMenuInitLine(){
    //모드탭의 수
    const modTabs = document.querySelectorAll(".modTabLine");
    if(modTabs.length == 0) return;
    modTabs.forEach(function(modTab,tabIdx,elements){
        const tabmenus = modTab.querySelectorAll(".tabName");
        const tabConts = modTab.querySelectorAll(".tabCont");

        //모드탭 내의 메뉴 수
        tabmenus.forEach(function(tabmenu,menuIdx,inElements){
            tabmenu.addEventListener("click", function(event){
                inElements.forEach(function(inElement){
                    inElement.classList.remove("on");
                    inElement.setAttribute("title", "탭메뉴");
                });
                this.classList.add("on");
                this.setAttribute("title", "선택 된 탭메뉴");
                if(tabConts.length > 1){    //탭 콘텐츠가 1개뿐이면 메뉴만 작동(콘텐츠 변경X)
                    tabConts.forEach(function(tabCont,contIdx){
                        tabCont.classList.remove("on");
                        if(menuIdx == contIdx){
                            tabCont.classList.add("on");
                        }
                    })
                }
            });
        });
    });
    swiperTabLine();
}
let swiperLineTab;
function swiperTabLine() {
    swiperLineTab = new Swiper('.modTabLine .tabSwiper', {
        focusableElements: false,
        slidesPerView: "auto",
        spaceBetween: 4,
        //slideToClickedSlide: true,
        //direction: 'vertical',
        loop: false,
        navigation: {
            nextEl: '.modTabLine .swiperDirt .dirtBox.next .btnDirt',
            prevEl: '.modTabLine .swiperDirt .dirtBox.prev .btnDirt',
        },
    });

    /*
    const nextBtn = document.querySelector(".swiperDirt .next");
    const prevBtn = document.querySelector(".swiperDirt .prev");
    nextBtn.addEventListener("click",function(event){
        const currentIndex = swiperLineTab.activeIndex;
        const clickMenu = tabMenus[currentIndex];//.querySelector(".tabName");
        console.log(clickMenu);
        clickMenu.click();
    });
    prevBtn.addEventListener("click",function(event){

    });
    */

    //라인탭에 sticky가 있을 때
    const sticky = document.querySelector(".modTabLine.sticky");
    if(sticky){
        const tabTitles = document.querySelectorAll(".modTabLine .tabContianer .comTitH2");
        const tabMenus = document.querySelectorAll(".modTabLine .tabMenu .tabItem");
        // 스크롤에 따라 active 갱신
        const observer = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){   
                if (entry.isIntersecting) {
                    const fullId = entry.target.id;
                    const numberPart = extractNumberFromId(fullId);
                    swiperLineTab.slideTo(numberPart-1, 300); 
                    tabMenus.forEach(function(menu,idx){
                        menu.querySelector(".tabName").classList.remove("on");
                        //console.log(idx);
                        //console.log(numberPart);
                        if(numberPart-1 == idx) {
                            menu.querySelector(".tabName").classList.add("on");
                        }
                    });
                }
            });
        },{
            root: null,
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0
        });
        tabTitles.forEach(tabMenu => observer.observe(tabMenu));
    }
}

function moveScroll($id) {
    const targetElement = document.getElementById($id);
    const offset = 100; // 원하는 여백 (픽셀)

    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

        // 최종 스크롤 위치 = targetPosition - offset
        window.scrollTo({
            top: targetPosition - offset,
            behavior: 'smooth'
        });
    }
}

// ID에서 숫자만 추출하는 헬퍼 함수
function extractNumberFromId(idString) {
    if (!idString) return null;
    const match = idString.match(/\d+/);
    return match ? parseInt(match[0], 10) : null; // 숫자로 변환하여 반환
}

// ------------------------------- 아코디언(QnA) 함수 ------------------------------- //
//아코디언(QnA) 함수
function qnaInit(){
    const modAccos = document.querySelectorAll(".modAccordion");
    modAccos.forEach(function(modAcco,modIdx){

        // allOpen: 스크립트 동작 안함, CSS로 모두 열린 상태 유지
        if(modAcco.classList.contains("allOpen")) return;

        const accoItems = modAcco.querySelectorAll(".qnaBox");
        const isUpDown = modAcco.classList.contains("upDown");

        accoItems.forEach(function(accoItem,itemIdx,elements){
            const accoBtn = accoItem.querySelector(".question");
            const accoCont = accoItem.querySelector(".answer");
            accoBtn.addEventListener("click",function(){
                const isOn = this.classList.contains("on");

                if(isUpDown) {
                    // 열려있는 다른 항목 모두 닫기
                    accoItems.forEach(function(otherItem){
                        const otherBtn = otherItem.querySelector(".question");
                        const otherCont = otherItem.querySelector(".answer");
                        if(otherBtn.classList.contains("on")){
                            otherBtn.classList.remove("on");
                            otherBtn.setAttribute("aria-expanded","false");
                            slideUp(otherCont,300);
                        }
                    });
                    // 이미 열려있던 항목이면 닫은 채로 종료
                    if(isOn) return;
                } else {
                    if(isOn){
                        this.classList.remove("on");
                        this.setAttribute("aria-expanded","false");
                        slideUp(accoCont,300);
                        return;
                    }
                }

                this.classList.add("on");
                this.setAttribute("aria-expanded","true");
                slideDown(accoCont,300);
            });
        });
    });
}

// // ------------------------------- 아코디언 함수 ------------------------------- //
// //모드 아코디언 함수
// function accordionInit(){
//     const modAccos = document.querySelectorAll(".modAccordion");
//     modAccos.forEach(function(modAcco,modIdx){
//         const accoItems = modAcco.querySelectorAll(".accoArea");
//         accoItems.forEach(function(accoItem,itemIdx,elements){
//             const accoBtn = accoItem.querySelector(".accoTitle");
//             const accoCont = accoItem.querySelector(".accoBody");
//             accoBtn.addEventListener("click",function(){
//                 if(this.classList.contains("on")){
//                     this.classList.remove("on");
//                     this.setAttribute("title", "답변 닫힘");
//                     slideUp(accoCont,300);
//                     return;
//                 }
//                 this.classList.add("on");
//                 this.setAttribute("title", "답변 열림");
//                 slideDown(accoCont,300);
//             });
//         });
//     });
// }


// // ------------------------------- 아코디언 리스트 함수 ------------------------------- //
// //모드 아코디언 리스트 함수
// function accordionListInit(){
//     const modAccos = document.querySelectorAll(".modAccordionList");
//     modAccos.forEach(function(modAcco,modIdx){
//         const accoItems = modAcco.querySelectorAll(".accoArea");
//         accoItems.forEach(function(accoItem,itemIdx,elements){
//             const accoBtn = accoItem.querySelector(".accoTitle");
//             const accoCont = accoItem.querySelector(".accoBody");

//             accoBtn.addEventListener("click",function(){
//                 elements.forEach(function(element, eleIdx){
//                     if(element.classList.contains("on")){
//                         element.classList.remove("on");
//                         element.querySelector('dt button').setAttribute("title", "답변 닫힘");
//                         slideUp(element.querySelector(".accoBody"),300);
//                     }else if(itemIdx == eleIdx){
//                         element.classList.add("on");
//                         element.querySelector('dt button').setAttribute("title", "답변 열림");
//                         slideDown(element.querySelector(".accoBody"),300);
//                     }
//                 });
//             });
//         });
//     });
// }
// ------------------------------- 모션 함수 ------------------------------- //

//fade in
function fadeIn(element, duration){
    let opacity = 0;
    element.style.display = "block";
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

//fade toggle
function fadeToggle(element, duration){
    element.style.display == "block" ? fadeOut(element, duration) : fadeIn(element, duration);
}

//slide function (slideUp)
function slideUp(element, duration) {
    let height = element.scrollHeight;
    let interval = 10; // millidurationonds per frame
    let steps = Math.ceil(duration / interval);
    let stepHeight = height / steps;
    let currentStep = 0;

    let slideUpInterval = setInterval(function() {
        currentStep++;
        element.style.height = (height - stepHeight * currentStep) + "px";
        if (currentStep >= steps) {
            clearInterval(slideUpInterval);
            element.style.display = "none";
            element.style.height = ""; // 높이를 초기화하여 다시 제대로 작동하도록 합니다.
        }
    }, interval);
}

//slide function (slideDown)
function slideDown(element, duration) {
    element.style.display = "block";
    element.style.height = "0px"; // 이 부분을 수정하여 초기 높이를 0으로 설정합니다.
    let height = element.scrollHeight;
    let interval = 10; // millidurationonds per frame
    let steps = Math.ceil(duration / interval);
    let stepHeight = height / steps;
    let currentStep = 0;

    let slideDownInterval = setInterval(function() {
        currentStep++;
        element.style.height = (stepHeight * currentStep) + "px";
        if (currentStep >= steps) {
            clearInterval(slideDownInterval);
            element.style.height = ""; // 높이를 초기화하여 다시 제대로 작동하도록 합니다.
        }
    }, interval);
}

// ------------------------------- 기타 함수 ------------------------------- //
//parents 엘리먼트 찾기
function parentsElementFind(my, findElement){
    let parentElement = my.parentNode;
    for(let i = 0;i<=20;++i){
        if(!parentElement.classList.contains(findElement)){
            parentElement = my.parentNode.parentNode;
        }else{
            return parentElement;
        }
    }
}

// ------------------------------- datePicker ------------------------------- //

//날짜
function datePicker(startIpt, startCont){
    let datepicker = new tui.DatePicker('#'+startCont, {
        date: new Date(),
        input: {
            element: '#'+ startIpt,
            format: 'yyyy-MM-dd'
        },
        language: 'ko',
        type: 'date',
        usageStatistics: false // 권장: 구글 분석기 비활성화
    });
}
//날짜 + 시간
function timePicker(startIpt, startCont){
    let datepicker = new tui.DatePicker('#'+startCont, {
        date: new Date(),
        input: {
            element: '#'+ startIpt,
            format: 'yyyy-MM-dd HH:mm A'
        },
        timePicker: true,
    });
}
//datePicker("datepicker-input","wrapper");

//날짜 기간~기간
function datePickerTo(startIpt, startCont, endIpt, endCont){
    let today = new Date();
    let picker = tui.DatePicker.createRangePicker({
        startpicker: {
            date: today,
            input: '#'+ startIpt,
            container: '#'+ startCont
        },
        endpicker: {
            date: today,
            input: '#'+ endIpt,
            container: '#'+ endCont
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ],
        format: 'YYYY-MM-dd',
        type: 'date',
        usageStatistics: false // 권장: 구글 분석기 비활성화
    });

    picker.on('change:end', () => {
        //console.log(123);
    })
}
//날짜 기간+시간 ~ 기간+시간
function timePickerTo(startIpt, startCont, endIpt, endCont){
    let today = new Date();
    let picker = tui.DatePicker.createRangePicker({
        startpicker: {
            date: today,
            input: '#'+ startIpt,
            container: '#'+ startCont
        },
        endpicker: {
            date: today,
            input: '#'+ endIpt,
            container: '#'+ endCont
        },
        selectableRanges: [
            [today, new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]
        ],
        format: 'YYYY-MM-dd HH:mm',
        timePicker: true
    });

    picker.on('change:end', () => {
        //console.log(123);
    })
}

function schedule() {
    var chk = document.querySelectorAll(".schedTable table td .frmGroup input[type='checkbox']");
    
    chk.forEach(function(type){
        type.addEventListener('click', function(){
            if(this.checked){
                // alert('체크');
                var target = this.closest('tbody');

                if(type.classList.contains('blue')){
                    var blue = target.querySelectorAll('.minCov > .blue');
                    blue.forEach(function(element){
                        element.classList.add('on');
                    })

                } else if (type.classList.contains('green')){
                    var green = target.querySelectorAll('.minCov > .green');
                    green.forEach(function(element){
                        element.classList.add('on');
                    })
                } else if (type.classList.contains('red')){
                    var red = target.querySelectorAll('.minCov > .red');
                    red.forEach(function(element){
                        element.classList.add('on');
                    })
                } else {
                    var chkBox = target.querySelectorAll(".frmGroup li input[type='checkbox']");
                    var allMin = target.querySelectorAll('.minCov > span');
                    chkBox.forEach(function(element){
                        element.checked = true;
                    })

                    allMin.forEach(function(element){
                        element.classList.add('on');
                    })
                }
            }else{
                // alert('체크해제');
                var target = this.closest('tbody');

                if(type.classList.contains('blue')){
                    var blue = target.querySelectorAll('.minCov > .blue');
                    blue.forEach(function(element){
                        element.classList.remove('on');
                    })

                } else if (type.classList.contains('green')){
                    var green = target.querySelectorAll('.minCov > .green');
                    green.forEach(function(element){
                        element.classList.remove('on');
                    })
                } else if (type.classList.contains('red')){
                    var red = target.querySelectorAll('.minCov > .red');
                    red.forEach(function(element){
                        element.classList.remove('on');
                    })
                } else {
                    var chkBox = target.querySelectorAll(".frmGroup li input[type='checkbox']");
                    var allMin = target.querySelectorAll('.minCov > span');
                    chkBox.forEach(function(element){
                        element.checked = false;
                    })

                    allMin.forEach(function(element){
                        element.classList.remove('on');
                    })
                }
            }
        })
    })
}

//열차시간선택 슬라이드 탭
function timeTable() {
    return new Swiper('.timeGroup', {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
            nextEl: '.directGroup .btnDirect.next',
            prevEl: '.directGroup .btnDirect.prev',
        },
        // 2. 개별 input에 포커스가 갔을 때 해당 슬라이드로 이동시키는 로직
        on: {
            init: function () {
                const swiper = this;
                // 슬라이드 내의 모든 input 요소를 찾습니다.
                const inputs = swiper.el.querySelectorAll('input[type="radio"]');
                
                inputs.forEach((input, index) => {
                    input.addEventListener('focus', () => {
                        // 해당 input이 속한 슬라이드의 인덱스로 이동
                        // slideTo(index, speed)
                        swiper.slideTo(index);
                    });
                });
            },
        },
    });
}
// function updateTimeTableSwiper(index = 0) {
//     if (timeTabSlide) {
//         timeTabSlide.update();
//         timeTabSlide.slideTo(index);
//         //console.log("Swiper가 성공적으로 업데이트되었습니다.");
//     } else {
//     }
// }
// function goToSlide(index, speed = 300, runCallbacks = true) {
//     if (timeTabSlide) {
//         timeTabSlide.slideTo(index, speed, runCallbacks);
//     } else {
//         //console.log("Swiper 인스턴스가 초기화되지 않았습니다.");
//     }
// }

//추천상품 스와이프
function swiperTicketGoods (){
    if(!document.querySelector('.ticketGoodsList.swiper-container')) {return;}
    const swiperLineTab = new Swiper('.ticketGoodsList.swiper-container', {
        focusableElements: false,
        allowTouchMove: true,
        slidesPerView: "auto",
        spaceBetween: 28,
        //slideToClickedSlide: true,
        //direction: 'vertical',
        loop: false,
        breakpoints: {
            1280: {
                enabled: false, // 스와이프 기능 비활성화
                allowTouchMove: false,
                spaceBetween: 0,
                // slidesPerView를 기본값으로 되돌리거나, 필요에 따라 조정할 수 있습니다.
                // slidesPerView: 'auto', 
            }
        },
        on: {
            breakpoint: function () {
                this.slideTo(0,0)
            }
        }
    });
}

//티켓 자세히 보기
function ticketView() {
    const tickets = document.querySelectorAll(".comTicketInfo");
    if(!tickets) return;
    tickets.forEach(function(ticket, idx) {
        const btnRadio = ticket.querySelector(".infoRadio .iptChk");
        const btnMore = ticket.querySelector(".btn.gLine");
        const content = ticket.querySelector(".infoCont");
        if(!btnMore) return;

        if(btnRadio){
            btnMore.addEventListener("click", function(e){
                btnRadio.checked == true ? btnRadio.checked = false : btnRadio.checked = true;
                btnRadio.dispatchEvent(new Event('change'));
                //ticketDetail(content, e.target);
            });
        }else{
            btnMore.addEventListener("click", function(e){
                e.target.classList.toggle("on");
            });
        }
    });
}


//결제카드 목록 슬라이드
function cardList () {
    return new Swiper('.cardList .cardSlide', {
        slidesPerView: "auto",
        spaceBetween: 20,
        navigation: {
            nextEl: '.cardList .slideOption .next',
            prevEl: '.cardList .slideOption .prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 20,
            },
            0: {
                spaceBetween: 12,
            }
        },        
    });
}

function ticketDetail($active, $btn) {
    $active.classList.toggle("on");
    if($active.classList.contains("on")) {
        $btn.innerText = "간략보기";
    }else{
        $btn.innerText = "상세보기";
    }
}
/*
function ticketView() {
    const tickets = document.querySelectorAll(".ticketInfo");
    if(!tickets) return;
    tickets.forEach(function(ticket, idx) {
        const btnMore = ticket.querySelector(".btn.gLine");
        const content = ticket.querySelector(".infoCont");
        btnMore.addEventListener("click", function(e){
            ticketDetail(content, e.target);
        });
    });
}
function ticketDetail($active, $btn) {
    $active.classList.toggle("on");
    if($active.classList.contains("on")) {
        $btn.innerText = "간략보기";
    }else{
        $btn.innerText = "상세보기";
    }
}
*/
//datePickerTo("startpicker-input", "startpicker-container", "endpicker-input", "endpicker-container");


// 추천상품 상세 (스와이프 슬라이드)
function productSlide() {
    let productSlide = new Swiper('.productSlide', {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
            nextEl: '.arrowBox .btnArrow.next',
            prevEl: '.arrowBox .btnArrow.prev',
        },
        // pagination: {
        //     el: ".swiper-pagination", 
        //     clickable: true,
        // },
    });
}

function ticketSlide() {
    // var ww = document.documentElement.clientWidth;
    // if (ww < 1280) {
    //     let ticketSlide = new Swiper('.ticketCov', {
    //         slidesPerView: "auto",
    //         spaceBetween: 0,
    //         navigation: {
    //             nextEl: '.arrBox .btnArrow.next',
    //             prevEl: '.arrBox .btnArrow.prev',
    //         },
    //         pagination: {
    //             el: ".swiper-pagination", 
    //             type: 'fraction',
    //         }
    //     });
    // } else if (ww >= 1280) {
        
    // }
    let ticketSlide = new Swiper('.ticketCov', {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
            nextEl: '.arrBox .btnArrow.next',
            prevEl: '.arrBox .btnArrow.prev',
        },
        pagination: {
            el: ".swiper-pagination", 
            type: 'fraction',
        },
        breakpoints: {
            1280: {
                enabled: false, // 스와이프 기능 비활성화
                allowTouchMove: false,
                spaceBetween: 0,
                // slidesPerView를 기본값으로 되돌리거나, 필요에 따라 조정할 수 있습니다.
                // slidesPerView: 'auto', 
            }
        },
        on: {
           
            breakpoint: function () {
                this.slideTo(0,0)
            }
        }
    });
}


// 마이페이지 - 체험학습 예약내역 문의 
function resvInfoAcc() {
    const triggers = document.querySelectorAll('.trig');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const li = this.closest('li');
            const cont = this.nextElementSibling; 

            const isOpen = li.classList.contains('on');

            // 모두 닫기
            document.querySelectorAll('li.on').forEach(openLi => {
                openLi.classList.remove('on');
                openLi.querySelector('.listCont').style.display = 'none';
            });

            // 원래 닫혀 있으면 열기
            if (!isOpen) {
                li.classList.add('on');
                cont.style.display = 'block';
            }
        });
    });
}



// 마이페이지 (스와이프 슬라이드)
function mypageSlide() {
    let productSlide = new Swiper('.mypageSlide', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.arrowBox .btnArrow.next',
            prevEl: '.arrowBox .btnArrow.prev',
        },
        pagination: {
            el: '.mypageSlide .swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return number;
            },
            formatFractionTotal: function (number) {
                return number;
            },
        },
    });
}


function agAcc() {
    const agBtn = document.querySelectorAll('.accBtn'); // 모든 버튼 선택
    const agBox = document.querySelectorAll('.accordion'); //모든 아코디언 항목

    agBtn.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const pLi = this.parentElement;
            const cont = this.nextElementSibling;

            if(pLi.classList.contains("on")){
                agBox.forEach(function(content){
                    content.classList.remove("on");
                })
            }else{
                agBox.forEach(function(content){
                    content.classList.remove("on");
                })
                pLi.classList.add("on");
            }
        });
    });
}

// ------------------------------- cptNav 모바일 메뉴 ------------------------------- //
function navMoInit() {
    const hamBtn = document.querySelector('.cptNav .navHamBtn');
    if (!hamBtn) return;

    const panel = document.querySelector('.cptNav .navMoPanel');
    const dim = panel.querySelector('.moDim');
    const closeBtn = panel.querySelector('.moPanelClose');

    function openPanel() {
        panel.classList.add('on');
        document.body.style.overflow = 'hidden';
        hamBtn.setAttribute('aria-expanded', 'true');
        closeBtn.focus();
    }

    function closePanel() {
        panel.classList.remove('on');
        document.body.style.overflow = '';
        hamBtn.setAttribute('aria-expanded', 'false');
        hamBtn.focus();
    }

    hamBtn.addEventListener('click', openPanel);
    dim.addEventListener('click', closePanel);
    closeBtn.addEventListener('click', closePanel);

    // 아코디언
    panel.querySelectorAll('.moPanelDrop').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const depth = this.nextElementSibling;
            const isOn = this.classList.contains('on');

            // 열린 항목 닫기
            panel.querySelectorAll('.moPanelDrop.on').forEach(function(other) {
                if (other !== btn) {
                    other.classList.remove('on');
                    other.setAttribute('aria-expanded', 'false');
                    slideUp(other.nextElementSibling, 200);
                }
            });

            if (isOn) {
                this.classList.remove('on');
                this.setAttribute('aria-expanded', 'false');
                slideUp(depth, 200);
            } else {
                this.classList.add('on');
                this.setAttribute('aria-expanded', 'true');
                slideDown(depth, 200);
            }
        });
    });
}

//인트로 언어
function langSelect(){
    const lang = document.querySelector(".lang");
    const langBtn = document.querySelector(".lang .btnLang");

    if(!lang) {return;}

    langBtn.addEventListener("click", function(event){
        lang.classList.toggle("on");
    });
    
    // 문서 전체 클릭 시 감지
    document.addEventListener("click", function (event) {
        // 클릭된 요소가 lang 영역 내부에 포함되어 있지 않다면 'on' 제거
        if (!lang.contains(event.target)) {
            lang.classList.remove("on");
        }
    });
}