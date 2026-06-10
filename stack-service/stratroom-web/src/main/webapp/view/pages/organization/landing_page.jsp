<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<c:set var="contextroot" value="${pageContext.request.contextPath}" />
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta content="width=device-width, initial-scale=1" name="viewport" />
		<title>StratRoom</title>
		<link href="assets/css/file-upload.css" rel="stylesheet">
		<link href="assets/css/orgchartnewbasic.css" rel="stylesheet">
		<link href="assets/css/swiper-bundle.min.css" rel="stylesheet"/>





	</head>

    <style>
.card-priorities {
  background-color: transparent;
  border: 0;
}
.card-priorities .card-header {
  background-color: transparent;
  border: 0;
  padding-left: 0;
  padding-right: 0;
}
.card-priorities .card-body {
  padding-left: 0;
  padding-right: 0;
}
.card-priorities .card-footer {
  background-color: transparent;
  border: 0;
  padding-left: 0;
  padding-right: 0;
}

.hero-content.hero-card {
  font-size: 13px;
  font-weight: 400;
  display: flex;
  gap: 8px;
  align-items: center;
}
.hero-content.hero-card > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--stratroom-white);
}
.hero-content.hero-card .hero-avatar {
  position: relative;
}
.hero-content.hero-card .hero-avatar .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 3px;
  cursor: pointer;
  border-radius: 50rem;
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 8px;
}

/* .hero-img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6c757d; 
}

.profileImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.profileInitials {
    width: 100%;
    height: 100%;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
} */




/* Ensure the wrapper keeps things tight */
.hero-avatar {
    width: 52px;
    height: 52px;
    display: inline-block;
}

/* .hero-content.hero-card .hero-img {
  width: 52px;
  height: 52px;
  border-radius: 50rem;
  overflow: hidden;
} */
.hero-content.hero-card h4 {
  margin-bottom: 0;
  font-size: 1rem;
}
.hero-content.hero-card small {
  white-space: normal;
  line-height: 1.2;
}
        .theme-option {
            border-width: 2px;
            cursor: pointer;
            transition: 0.3s ease;
        }

        .theme-option.active {
            border-color: var(--stratroom-primary);
            box-shadow: 0 0 10px rgba(var(--stratroom-primary-rgb), 0.5);
        }

        [dir="rtl"] .theme-option .card-img-top {
            transform: scaleX(-1);
        }


        .profile-wrapper {
    position: relative;
    width: 52px;
    height: 52px;
}

.user-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    object-fit: cover;
}

/* Initials avatar */
.initials-avatar {
    background-color: #e0e0e0; /* light grey */
    color: #333;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

/* Settings button inside avatar */
.profile-settings-btn {
    position: absolute;
    bottom: -6px;
    right: -6px;
    width: 26px;
    height: 26px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

    </style>

    <style>
        .mySwiper {
            /* padding: 20px 10px; */
            border-radius: 6px;
        }

        .mySwiper .swiper-slide {
            display: flex;
            height: auto;
        }

        .mySwiper .swiper-slide .card {
            width: 100%;
            flex-grow: 1;
        }

        .text-card-main {
            min-height: 120px;
        }

.blur-overlay {
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   pointer-events: none;
  &::before{
    content: "";
     position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
    /* Much darker on left side */
-webkit-mask-image: linear-gradient(to right, 
  rgba(0, 0, 0, 1) 0%,     /* solid black start */
  rgba(0, 0, 0, 1) 40%,    /* keep solid black up to 40% */
  rgba(0, 0, 0, 0.8) 55%,  /* begin fading */
  rgba(0, 0, 0, 0.3) 70%, 
  rgba(0, 0, 0, 0) 100%    /* full transparent end */
);

mask-image: linear-gradient(to right, 
  rgba(0, 0, 0, 1) 0%, 
  rgba(0, 0, 0, 1) 40%, 
  rgba(0, 0, 0, 0.8) 55%, 
  rgba(0, 0, 0, 0.3) 70%, 
  rgba(0, 0, 0, 0) 100%
);
  }


}

.profileInitials_top {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #0d6efd;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

    </style>
	<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

	<body class="light">
		<!-- <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}"> -->


		<div style="display: none;">
			<jsp:include page="../common/right-navigation.jsp"></jsp:include>
		</div>

		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<header id="header" class="header shadow-sm">

			<jsp:include page="../common/left-navigation.jsp"></jsp:include>
		</header>
	<main>
        <section class="py-3 hero-section theme-default">
             <div class="blur-overlay" id="heroSection"
                style="background: url(/stratroom/images/landing-bg.jpg) right top no-repeat;background-size: cover;">
            </div>
            <div class="container-lg">

                    <div class="d-flex justify-content-between align-items-center">

                    <div class="hero-content hero-card mb-3">
                        

                        <!-- <div class="hero-avatar">
    <span class="hero-img-top">
        <img class="profileImage_top d-nonetop"
             loading="lazy"
             width="52"
             height="52"
             alt="User Image"
             style="object-fit:cover;border-radius:50%;">

        <div class="profileInitials_top d-nonetop" style="display: none;"></div>
    </span>

    <button class="btn btn-sm btn-primary rounded-circle"
            data-bs-toggle="offcanvas"
            data-bs-target="#themeOffcanvas">
        <i data-lucide="settings" style="width:14px;height:14px;"></i>
    </button>
</div> -->

<div class="user-image user-active">

                      </div>

                        <div>
                            <h4>Hi <span id="employeeNameData"></span></h4>
                            <small>welcome to your Multi-Governance Portal</small>
                        </div>

                    </div>
                    <div class="d-flex gap-1" style="margin-top: -35px;">
                    <!-- Department Dropdown (populated via API) -->
                     
<select id="deptrepotees" name="department" class="form-select" 
        style="border-radius: 5px; border: 1px solid #dddd; appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: none;width: 161px;">
    <option value="">Choose department</option>
</select>

<select id="pageType" name="pageType" class="form-select" 
        style="border-radius: 5px; border: 1px solid #dddd; appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: none;">
    <option value="">Choose pageType</option>
    <option value="STRATEGYMAP">Strategy Map</option>
    <option value="INITIATIVEMAP">Initiative Map</option>
    <option value="RADAR">Risk Radar</option>
    <option value="SCORECARDDASHBOARD">Scorecard Dashboard</option>
    <option value="RISKDASHBOARD">Risk Dashboard</option>
    <option value="INITIATIVEDASHBOARD">Initiative Dashboard</option>
    <option value="COMPLIANCEDASHBOARD">Compliance Dashboard</option>
    <option value="AUDITDASHBOARD">Audit Dashboard</option>
</select>

<select id="pages" name="pages" class="form-select"
        style="border-radius: 5px; border: 1px solid #dddd; appearance: none; -webkit-appearance: none; -moz-appearance: none; background-image: none;">
    <option value="">Choose Pages</option>
</select>
                        <button class="btn btn-sm btn-light rounded-pill" data-bs-target="#profileModal"
                            data-bs-toggle="modal"><span data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Profile"><i data-lucide="circle-user"
                                    style="width:16px; height:16px;"></i></span></button>
                        <button class="btn btn-sm btn-light rounded-pill" data-bs-target="#aboutModal"
                            data-bs-toggle="modal"><span data-bs-toggle="tooltip" data-bs-placement="top"
                                title="About Me"><i data-lucide="target"
                                    style="width:16px; height:16px;"></i></span></button>

                    </div>

                </div>
                  <div class="row">
                    <div class="col-12 col-lg-9">

                        <div class="card card-priorities custom-card">
                            <div class="card-header">
                                <h5 class="card-title" style="--stratroom-card-title-color:#fff">My Priorities</h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex flex-column gap-2">

                                    <!-- Overview -->
                                    <div class="overview-section" dir="ltr">
                                        <div class="swiper mySwiper">
                                            <div class="swiper-wrapper">
                                                <div class="swiper-slide">
                                                    <div class="card text-start text-card text-card-main border">
                                                        <div
                                                            class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                                            <div class="icon">
                                                                <i data-lucide="trophy"
                                                                    style="width: 18px; height: 18px;"></i>
                                                            </div>

                                                        </div>
                                                        <div class="card-body p-2">
                                                            <h4 class="card-title">Meetings</h4>
                                                            <h5 class="amount mb-1" id="totalMeetings"></h5>
                                                            <div class="d-flex gap-2 align-items-center mt-auto">
                                                                <div class="amount-trend"></div>
                                                                <div class="d-flex gap-1 ms-auto">

                                                                  <span class="icon goal">
    <img id="meeting-action-btn" width="24" height="24" 
         src="/stratroom/images/risk-red-i.svg" 
         alt="goal">
</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="swiper-slide">
                                                    <div class="card text-start text-card text-card-main border">
                                                        <div
                                                            class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
                                                            <div class="icon">
                                                                <i data-lucide="trophy"
                                                                    style="width: 18px; height: 18px;"></i>
                                                            </div>

                                                        </div>
                                                        <div class="card-body p-2">
                                                            <h4 class="card-title">Total Task</h4>
                                                            <h5 class="amount mb-1" id="totalTaskNumber">0</h5>
                                                            <div class="d-flex gap-2 align-items-center mt-auto">
                                                               <h4 class="amount-trend">
                                                                <span id="totalCompleteddata"></span>
                                                                </h4>
                                                                <h4 class="amount-trend">
                                                                    <span id="totalProgressed"></span>
                                                                </h4>
                                                                <div class="d-flex gap-1 ms-auto">

                                                                    <span class="icon goal">
                                                                        <img width="24" height="24" id="task-action-btn"
                                                                            src="/stratroom/images/risk-red-i.svg"
                                                                            alt="goal">
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Swiper navigation -->
                                            <div class="swiper-button-next"></div>
                                            <div class="swiper-button-prev"></div>
                                            <div class="swiper-pagination"></div>
                                        </div>

                                    </div>

                                    <!-- initiative  -->
                                      <div class="initiative-section" dir="ltr">
                                        <div class="swiper mySwiper">
                                  <div class="swiper-wrapper" id="initiative-swiper-wrapper"></div>

                                  
                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-pagination"></div>
                                  </div>
                                  </div>


                                    <!-- risk -->
                                 <div class="risk-section" dir="ltr">
    <div class="swiper mySwiper">
        <div class="swiper-wrapper" id="riskSwiperWrapper"></div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>


                                    <!-- KPI -->
                                       <div class="kpi-section" dir="ltr">
                                        <div class="swiper mySwiper">
                                  
                                        <div class="swiper-wrapper" id="kpi-swiper-wrapper">
                                            
                                        </div>

                                        

                                        <div class="swiper-button-next"></div>
                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-pagination"></div>
                                       </div>
                                       </div>

                                   

                                </div>




                            </div>


                        </div>

                    </div>



                </div>
            </div>

        </section>
        <section class="empowers-section py-4 py-lg-5 d-none">
            <div class="container-lg">
                <div class="c-head text-center mb-5">
                    <span class="text-primary fs-6">StratRoom</span>
                    <h3 class="h2 fw-bold">Empowers you with </h3>
                </div>

                <div class="c-body grid gap-3">

                    <div class="g-col-12 g-col-md-6">
                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Effortless Strategy Execution</h5>
                                <p class="card-text">Our platform is flexible, ready-to-run, and easily managed by
                                    business users. Create and cascade Business & Financial plans, Budget Models,
                                    Forecasts, and reports.</p>
                            </div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-md-6">
                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Actionable Insights</h5>
                                <p class="card-text">Gain real-time insights into performance with interactive
                                    dashboards and reports. Identify trends and make data-driven decisions for
                                    continuous improvement.</p>
                            </div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-md-6">
                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Holistic Performance Management</h5>
                                <p class="card-text">StratRoom goes beyond traditional metrics. Manage initiatives,
                                    risks, operations, and resources for a truly comprehensive view of your performance
                                    landscape.</p>
                            </div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-md-6">
                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Streamlined Collaboration</h5>
                                <p class="card-text">Promote alignment and accountability across all levels. StratRoom
                                    fosters communication and facilitates actions to drive peak performance and
                                    successful strategy execution.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-md-6">
                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Built for Business Users</h5>
                                <p class="card-text">StratRoom empowers business users across industries with intuitive
                                    features. Save time and resources compared to building and maintaining in-house
                                    applications.</p>
                            </div>
                        </div>
                    </div>

                    <div class="g-col-12 g-col-md-6">

                        <div class="card card-sm h-100">
                            <div class="p-3 pb-0">
                                <div
                                    class="icon-shape icon-lg bg-dark text-light-primary rounded-circle text-center d-inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor"
                                        class="bi bi-lightning-fill text-white" viewBox="0 0 16 16">
                                        <path
                                            d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Out-of-the-Box Ready</h5>
                                <p class="card-text">Get started quickly with Stratroom’s pre-configured features. No
                                    extensive setup is required, allowing you to focus on strategic initiatives and
                                    organizational growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            </div>

        </section>
    </main>
		  <footer class="col-12 text-center py-2 copyright">
        <p data-translate="footer.copyright" class="mb-0">Copyright &copy; <span id="year"></span>
            <strong>StratRoom</strong>
        </p>

        <script>
            document.getElementById("year").textContent = new Date().getFullYear();
        </script>

    </footer>


		 <div class="modal custom-modal fade" id="profileModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Profile</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body p-0">

                            <div class="d-flex flex-column justify-content-center text-center gap-2 p-3 bg-primary rounded mb-3"
                                style="--stratroom-bg-opacity:0.1">
                               <div class="user-card justify-content-center">
                                      
                                        <div class="user-imageprofile user-active">
                                        </div>
                                    </div>

                                <div>
                                    <p class="mb-0 text-muted" id="nameEmployee"></p>
                                    <p class="mb-0 text-muted" id="departmentNameData"></p>
                                   
                                </div>
                            </div>
                            <div>
                                <div class="grid gap-0 mb-3 grid-from-box">
                                    <div class="form-group g-col-6">
                                        <label class="form-label">Reporting to</label>
                                        <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                                            <li class="avatar avatar-xs pull-up" title="Grae">
                                                <img src="/stratroom/images/usrbig1.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-group g-col-6 text-end">
                                        <label class="form-label">Direct Reportees</label>
                                        <ul
                                            id="reporteeList" class="list-unstyled d-flex align-items-center justify-content-end avatar-group mb-0">
                                            <!-- <li class="avatar avatar-xs pull-up" title="User">
                                                <img src="/stratroom/images/usrbig1.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>
                                            <li class="avatar avatar-xs pull-up" title="User">
                                                <img src="/stratroom/images/usrbig6.jpg" class="rounded-circle"
                                                    width="24" height="24">
                                            </li>
                                            <li class="avatar avatar-xs pull-up" href="#attendess-list"
                                                data-bs-toggle="modal">
                                                <span class="avatar-initial rounded-circle" data-bs-toggle="tooltip"
                                                    data-bs-placement="top" data-bs-original-title="0 more">+0</span>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <div class="form-group g-col-6">
                                        <label class="form-label">Overall Score</label>
                                        <p class="form-control-plaintext" id="consensualRatingValuee">0</p>
                                        
                                    </div>
                                    <!-- <div class="form-group g-col-6 text-end">
                                        <label class="form-label">Score</label>
                                        <p class="form-control-plaintext"></p>
                                    </div> -->
                                </div>
                                <div class="mb-3">
                                    <div class="grid gap-0 grid-from-box">
                                        <div class="form-group g-col-6">
                                            <label class="form-label">Self Rating</label>
                                            <p class="form-control-plaintext"  id="selfRatinggg">
                                                0</p>
                                        </div>
                                        <div class="form-group g-col-6 text-end">
                                            <label class="form-label">Manager Rating</label>
                                            <p class="form-control-plaintext" id="managerRatingg">
                                               0 </p>
                                        </div>
                                        <div class="form-group g-col-6">
                                            <label class="form-label">Consensual Rating</label>
                                            <p class="form-control-plaintext" id="consensualRatingg">
                                               0</p>
                                        </div>
                                        <!-- <div class="form-group g-col-6 text-end">
                                            <label class="form-label">Direct Reports Rating</label>
                                            <p class="form-control-plaintext"><i data-lucide="star" class="text-warning"
                                                    style="width: 14px; height: 14px;fill: var(--stratroom-warning);"></i>
                                                3/5</p>
                                        </div> -->
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <h6 class="mb-2">Personal Details</h6>
                                    <div class="grid gap-0 grid-from-box">
                                        <div class="form-group g-col-12">
                                            <label class="form-label"><i data-lucide="phone" class="text-muted me-1"
                                                    style="width: 14px; height: 14px;"></i>
                                                Phone</label>
                                            <p class="form-control-plaintext" id="phoneNumber"></p>
                                        </div>
                                        <div class="form-group g-col-12">
                                            <label class="form-label"><i data-lucide="mail" class="text-muted me-1"
                                                    style="width: 14px; height: 14px;"></i>
                                                </label>
                                            <p class="form-control-plaintext" id="emailAddressData"></p>
                                        </div>
                                        <div class="form-group g-col-12">
                                            <label class="form-label"><i data-lucide="map-pin" class="text-muted me-1"
                                                    style="width: 14px; height: 14px;"></i>
                                                Address</label>
                                            <p class="form-control-plaintext" id="address"></p>
                                        </div>

                                    </div>
                                </div>
                                <div class="mb-3">
                                    <h6 class="mb-2">Job Details</h6>
                                    <div class="grid gap-0 grid-from-box">
                                        <div class="form-group g-col-6">
                                            <label class="form-label">Designation</label>
                                            <p class="form-control-plaintext" id="designation"></p>
                                        </div>
                                        <div class="form-group g-col-6">
                                            <label class="form-label">Grade</label>
                                            <p class="form-control-plaintext" id="roleId"></p>
                                        </div>
                                        <div class="form-group g-col-6">
                                            <label class="form-label" >Department</label>
                                            <p class="form-control-plaintext" id="nameDepartment"></p>
                                        </div>
                                        <div class="form-group g-col-6">
                                            <label class="form-label">Date of Joining</label>
                                            <p class="form-control-plaintext" id="dateOfJion"></p>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>

	 <!-- about modal :::::::::::::::::::::::::::::::::::::::: -->
    <div class="modal custom-modal fade" id="aboutModal" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Mission, Vision, Values</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">
                            <div class="grid gap-3">
                                <input type="hidden" id="missionVisionValueId" />
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="mission"
                                            class="form-label d-flex gap-2 mb-2 align-items-center fs-5 fw-bold"><span>
                                                <i data-lucide="target"
                                                    style="width: 18px; height: 18px;"></i></span>Mission</label>
                                        <textarea class="form-control" autocomplete="off" name="mission" id="mission"
                                            cols="" rows="6"
                                            placeholder="Mission" readonly></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="vision"
                                            class="form-label d-flex gap-2 mb-2 align-items-center fs-5 fw-bold"><span>
                                                <i data-lucide="eye"
                                                    style="width: 18px; height: 18px;"></i></span>Vision</label>
                                        <textarea class="form-control" autocomplete="off" name="vision" id="vision"
                                            cols="" rows="6"
                                            placeholder="Vision" readonly></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="values"
                                            class="form-label d-flex gap-2 mb-2 align-items-center fs-5 fw-bold"><span>
                                                <i data-lucide="gem"
                                                    style="width: 18px; height: 18px;"></i></span>Values</label>
                                        <textarea class="form-control" autocomplete="off" name="values" id="values"
                                            cols="" rows="6"
                                            placeholder="values" readonly></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary"  aria-label="Close" onclick="enableMissionVisionEdit()">
                        Edit
                    </button>
                    <button class="btn btn-primary" value="Save" onclick="savemissionvisionvalue()">Save
                    </button>

                </div>

            </div>
        </div>
    </div>
    <!-- about modal END -->


	    <!-- Bootstrap Offcanvas -->
    <div style="--stratroom-offcanvas-width: 260px;" class="offcanvas offcanvas-end" tabindex="-1" id="themeOffcanvas"
        aria-labelledby="themeOffcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="themeOffcanvasLabel">Customize Theme</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">

            <h6 class="mb-2">Profile</h6>
            <div class="hero-content hero-card mb-3">
              <!-- <div class="hero-avatar position-relative">
                <span class="hero-img">
                    <img class="profileImage d-none"
                        loading="lazy"
                        width="52"
                        height="52"
                        alt="User Image" />

                    <div class="profileInitials d-none"></div>
                </span>

                 <input type="file" id="profileUploadImage" accept="image/*" class="d-none">

                <label class="btn btn-sm btn-primary rounded-circle position-absolute"
                    for="profileUploadImage"
                    style="bottom:-5px; right:-5px;">
                    <i data-lucide="pencil" style="width:14px;height:14px;"></i>
                </label>
               </div> -->


<div class="user-imageside user-active">

                      </div>


            </div>


            <h6 class="mb-2">Themes</h6>
            <div class="row g-2">
                <!-- Default Theme -->
                <div class="col-6">
                    <div class="theme-option card active"
                        onclick="setBgImage('/stratroom/images/landing-bg.jpg')">
                        <img src="/stratroom/images/landing-bg.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Default</small>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/global-leadership-01.jpg')">
                        <img src="/stratroom/images/global-leadership-01.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small class="">Global Leadership 01</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/global-leadership-02.jpg')">
                        <img src="/stratroom/images/global-leadership-02.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Global Leadership 02</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card" onclick="setBgImage('/stratroom/images/skyline-01.jpg')">
                        <img src="/stratroom/images/skyline-01.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Skyline 01</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card" onclick="setBgImage('/stratroom/images/skyline-02.jpg')">
                        <img src="/stratroom/images/skyline-02.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Skyline 02</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/abstract-network-01.jpg')">
                        <img src="/stratroom/images/abstract-network-01.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Abstract Network 01</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/abstract-network-02.jpg')">
                        <img src="/stratroom/images/abstract-network-02.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Abstract Network 02</small>
                        </div>
                    </div>
                </div>

                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/compliance-doc-01.jpg')">
                        <img src="/stratroom/images/compliance-doc-01.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Compliance Doc 01</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/security-lock-01.jpg')">
                        <img src="/stratroom/images/security-lock-01.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Security Lock 01</small>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="theme-option card"
                        onclick="setBgImage('/stratroom/images/security-lock-02.jpg')">
                        <img src="/stratroom/images/security-lock-02.jpg" class="card-img-top">
                        <div class="card-body p-1 text-center text-truncate">
                            <small>Security Lock 02</small>
                        </div>
                    </div>
                </div>





                <!-- Upload Your Own -->
                <!-- <div class="col-6">
        <label class="theme-option card cursor-pointer">
          <input type="file" accept="image/*" onchange="uploadCustomBg(event)" hidden>
          <img src="./assets/images/upload-icon.png" class="card-img-top">
          <div class="card-body p-1 text-center text-truncate">
            <small>Upload</small>
          </div>
        </label>
      </div> -->
            </div>
        </div>
    </div>


	    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        id="initatives-add-modal" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Initiative Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <div class="card-body">
                            <div class="grid gap-3">
                                <!-- <div class="g-col-12 g-col-md-2">
                  <div class="form-group">
                    <label for="Initiative_id" class="form-label">ID</label>
                    <input type="text" class="form-control" name="Initiative_show_id" id="Initiative_show_id" disabled
                      placeholder="ID">
                  </div>
                </div> -->
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Initiative_name" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="Initiative_name"
                                            name="Initiative_name" placeholder="Name" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="Initiative_description" class="form-label">Description</label>
                                        <textarea class="form-control modal-custom-textarea" id="Initiative_description"
                                            name="Initiative_description" placeholder="Description" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Initiative_owner" class="form-label">Owner</label>
                                        <select id="Initiative_owner" name="Initiative_owner"
                                            class="form-select modal-custom-select" data-placeholder="Select Owner">
                                            <option value="" disabled selected>Select Owner</option>
                                            <option value="2241">Nizam Goolam</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Initiative_Department" class="form-label">Department</label>
                                        <select id="Initiative_Department" name=""
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select a Department">
                                            <option value="" disabled selected>Select a Department</option>
                                            <option value="1049" data-select2-id="4">CEO OFFICE</option>
                                            <option value="1050" data-select2-id="11">Internal Audit</option>
                                            <option value="1051" data-select2-id="12">Risk Management</option>
                                            <option value="1052" data-select2-id="13">Human Resource</option>
                                            <option value="1053" data-select2-id="14">Public Affairs</option>
                                            <option value="1054" data-select2-id="15">Board Secretary</option>
                                            <option value="1055" data-select2-id="16">Technical Division (CTO)</option>
                                            <option value="1056" data-select2-id="17">Spectrum Planning and Assignment
                                            </option>
                                            <option value="1057" data-select2-id="18">Spectrum Monitoring, Standards and
                                                Technology</option>
                                            <option value="1058" data-select2-id="19">Information and Communications
                                                Technology (ICT)</option>
                                            <option value="1059" data-select2-id="20">Telecom Services(CRO)</option>
                                            <option value="1060" data-select2-id="21">Postal Servicess</option>
                                            <option value="1061" data-select2-id="22">Licensing andCompliance</option>
                                            <option value="1062" data-select2-id="23">Economic Affairs(CEAO)</option>
                                            <option value="1063" data-select2-id="24">Economics and Tarriff Regulation
                                            </option>
                                            <option value="1064" data-select2-id="25">Competition and Research</option>
                                            <option value="1065" data-select2-id="26">Corporate Services(CFO)</option>
                                            <option value="1066" data-select2-id="27">Finance</option>
                                            <option value="1067" data-select2-id="28">Procurement and Administration
                                            </option>
                                            <option value="1068" data-select2-id="29">Executive Secretary </option>
                                            <option value="1069" data-select2-id="30">Internal Audit - Intern</option>
                                            <option value="1070" data-select2-id="31">Admistrative Assistant TD/HR
                                            </option>
                                            <option value="1071" data-select2-id="32">IT Engineer</option>
                                            <option value="1072" data-select2-id="33">IT Service Desk Engineer</option>
                                            <option value="1073" data-select2-id="34">Engineer Networks and Systems
                                            </option>
                                            <option value="1074" data-select2-id="35">IT - Intern</option>
                                            <option value="1075" data-select2-id="36">Administrative Assistant</option>
                                            <option value="1076" data-select2-id="37">Accountant Revenue</option>
                                            <option value="1077" data-select2-id="38">Accountant - Payments</option>
                                            <option value="1078" data-select2-id="39">Procurement Officer</option>
                                            <option value="1079" data-select2-id="40">Operations &amp; Facilities
                                                Officer</option>
                                            <option value="1083" data-select2-id="41">Cleaner</option>
                                            <option value="1084" data-select2-id="42">Administrative Assistant</option>
                                            <option value="1085" data-select2-id="43">Postal Services Intern</option>
                                            <option value="1086" data-select2-id="44">Licencing Officer</option>
                                            <option value="1087" data-select2-id="45">Broadcasting Officer</option>
                                            <option value="1088" data-select2-id="46">Compliance Officer </option>
                                            <option value="1089" data-select2-id="47">Administrative Assistant - ESD
                                            </option>
                                            <option value="1090" data-select2-id="48">Research Officer</option>
                                            <option value="1091" data-select2-id="49">Data Analyst </option>
                                            <option value="1092" data-select2-id="50">ESD30 - Intern</option>
                                            <option value="1093" data-select2-id="51">Economist</option>
                                            <option value="1094" data-select2-id="52">ESD20 - Intern</option>
                                            <option value="1095" data-select2-id="53">Engineer Spectrum Planning and
                                                Assigment</option>
                                            <option value="1096" data-select2-id="54">Engineer Sepctrum Monitoring
                                            </option>
                                            <option value="1097" data-select2-id="55">Engineer Technology Standards and
                                                Numbering</option>
                                            <option value="1098" data-select2-id="56">Messenger/Driver 1</option>
                                            <option value="1099" data-select2-id="57">Messenger/Driver 2</option>
                                            <option value="1100" data-select2-id="58">Receptionist</option>
                                            <option value="1115" data-select2-id="59">test department </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="scorecard" class="form-label">Scorecard</label>
                                        <select id="scorecard" name="scorecard" class="form-select modal-custom-select"
                                            data-placeholder="Select a Scorecard">
                                            <option value="" disabled selected>Select a Scorecard</option>
                                            <option value="2696">Corporate Scorecard</option>
                                            <option value="2604">CEO SCORECARD</option>
                                            <option value="2515">RI CEO Scorecard</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="perspective" class="form-label">Perspective</label>
                                        <select id="perspective" name="perspective"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select a Perspective">


                                            <option value disabled="" selected="" data-select2-id="67">Select a
                                                Perspective</option>
                                            <option value="3470" data-name="EFFICIENT REGULATOR" data-select2-id="69">
                                                EFFICIENT REGULATOR</option>
                                            <option value="3471" data-name="POSITIVE CONSUMER EXPERIENCE"
                                                data-select2-id="70">POSITIVE CONSUMER EXPERIENCE</option>
                                            <option value="3472" data-name="HEALTHY LCA BRAND" data-select2-id="71">
                                                HEALTHY LCA BRAND</option>
                                            <option value="3473" data-name="TRUSTED REGULATORY SYSTEM"
                                                data-select2-id="72">TRUSTED REGULATORY SYSTEM</option>
                                            <option value="3474"
                                                data-name="AVAILABLE, ACCESSIBLE AND AFFORDABLE COMMUNICATION SERVICES"
                                                data-select2-id="73">AVAILABLE, ACCESSIBLE AND AFFORDABLE COMMUNICATION
                                                SERVICES</option>
                                        </select>
                                    </div>
                                </div>


                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="objective" class="form-label">Objective</label>
                                        <select id="objective" name="objective" class="form-select modal-custom-select"
                                            data-placeholder="Select an Objective">
                                            <option value disabled selected data-select2-id="76">Select an Objective
                                            </option>
                                            <option value="8843" data-objective-id="SOB2.1" data-select2-id="78">
                                                SAFEGUARD CONSUMER RIGHTS
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="KPI" class="form-label">KPI</label>
                                        <select id="KPI" name="KPI" class="form-select modal-custom-select"
                                            data-placeholder="Select an KPI">
                                            <option value="" disabled="" selected="" data-select2-id="81">Select an KPI
                                            </option>
                                            <option value="22449"> # Promote consumer education and awareness</option>
                                            <option value="22454"> # Facilitate the protection of private data</option>
                                            <option value="22457"> # Consumer Experience</option>
                                            <option value="22458"> % Improve consumer satisfaction rating from 30% to
                                                80% by 31 March 2026</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Initiative_start_end_date" class="form-label">Planned Start Date/End
                                            Date</label>
                                        <input type="date" class="form-control date-range-picker" data-language="en"
                                            name="Initiative_start_end_date" id="Initiative_start_end_date"
                                            placeholder="Planned Start Date/End Date" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="actual_start_end_date" class="form-label">Actual Start Date/End
                                            Date</label>
                                        <input type="date" class="form-control date-range-picker" data-language="en"
                                            name="actual_start_end_date" id="actual_start_end_date"
                                            placeholder="Actual Start Date/End Date" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="statusTypeobjective" class="form-label">Status</label>
                                        <select id="statusTypeobjective" name="statusTypeobjective"
                                            class="form-select modal-custom-select" aria-invalid="false">
                                            <option value="" selected disabled>Select Status</option>
                                            <option value="not_started">Not Started</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="delayed">Delayed</option>
                                            <option value="on_hold">On Hold</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="Initiative_progress">Progress (%)</label>
                                        <input type="number" min="0" max="100" class="form-control browser-default"
                                            name="Initiative_progress" id="Initiative_progress"
                                            placeholder="Progress (%)" value="0">
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="kpi_fields" class="form-label">Manual Status</label>
                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input green" type="radio" name="status"
                                                    id="statusGreen" value="green">
                                                <label class="form-check-label" for="statusGreen">Green</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input orange" type="radio" name="status"
                                                    id="statusOrange" value="orange">
                                                <label class="form-check-label" for="statusOrange">Orange</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input red" type="radio" name="status"
                                                    id="statusRed" value="red">
                                                <label class="form-check-label" for="statusRed">Red</label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="kpi_fields" class="form-label">Data Fields</label>

                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="dfActual">
                                                <label class="form-check-label" for="dfActual">Actual</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="dfTarget">
                                                <label class="form-check-label" for="dfTarget">Target</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="dfBudget">
                                                <label class="form-check-label" for="dfBudget">Budget</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="dfForecast">
                                                <label class="form-check-label" for="dfForecast">Forecast</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="kpi_fields" class="form-label">Amount</label>

                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="amTotal">
                                                <label class="form-check-label" for="amTotal">Total</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="amUtillized">
                                                <label class="form-check-label" for="amUtillized">Utillized</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="amBalance">
                                                <label class="form-check-label" for="amBalance">Balance</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save">Save</button>
                    <div class="modal-audit">

                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div class="text">Arun</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div class="text">Karthik</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  my-risks edit modal :::::::::::::::::::::::::::::::::::::::: -->


    <div class="modal custom-modal fade" tabindex="-1" id="risk-edit-modal" data-bs-backdrop="static"
        data-bs-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Risk Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="grid gap-3">
                                <div class="g-col-12 g-col-md-3">
                                    <div class="form-group">
                                        <label for="riskedit-code" class="form-label">Risk Code</label>
                                        <input type="text" class="form-control" name="riskedit-code" id="riskedit-code"
                                            placeholder="Risk Code" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-9">
                                    <div class="form-group">
                                        <label for="riskedit-name" class="form-label">Name</label>
                                        <input type="text" class="form-control" name="riskedit-name"
                                            placeholder="Name" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="riskedit-description" class="form-label">Description</label>
                                        <textarea class="form-control" id="riskedit-description"
                                            placeholder="Description" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-department" class="form-label">Department</label>
                                        <select id="riskedit-department" name="riskedit-department"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select Department">>
                                            <option value="" selected disabled>Select Department</option>
                                            <option value="ceo">CEO</option>
                                            <option value="zimra">ZIMRA</option>
                                            <option value="customer_services">Customer Services</option>
                                            <option value="marketing">Marketing</option>
                                            <option value="operations">Operations</option>
                                            <option value="project_services">Project Services</option>
                                            <option value="compliance">Compliance</option>
                                            <option value="service_delivery">Service Delivery</option>
                                            <option value="product">Product</option>
                                            <option value="india">India</option>
                                            <option value="kenya">Kenya</option>
                                            <option value="south_africa">South Africa</option>
                                            <option value="usa">USA</option>
                                            <option value="dubai">Dubai</option>
                                            <option value="ministry_of_agriculture">Ministry of Agriculture</option>
                                            <option value="country_sales">Country Sales</option>
                                            <option value="digital_sales">Digital Sales</option>
                                            <option value="web_platform">Web Platform</option>
                                            <option value="mobile_platform">Mobile Platform</option>
                                            <option value="business_development">Business Development</option>
                                            <option value="public_service_commission">Public Service Commission</option>
                                            <option value="board_of_hr">Board of HR</option>
                                            <option value="pre_sales">Pre-sales</option>
                                            <option value="ied_strategy">IED Strategy</option>
                                            <option value="trainer">TRAINER</option>
                                            <option value="administration_officers">Administration Officers</option>
                                            <option value="auxiliary_staff">Auxiliary Staff</option>
                                            <option value="lhda_chief_executive">LHDA Chief Executive</option>
                                            <option value="development_and_operation_division">Development and Operation
                                                Division</option>
                                            <option value="phase_ii_division">Phase II Division</option>
                                            <option value="social_development_and_environmental_division">Social
                                                Development and Environmental Division</option>
                                            <option value="corporate_services">Corporate Services</option>
                                            <option value="division4">Division4</option>
                                            <option value="lesotho_communications_authority">Lesotho Communications
                                                Authority (LCA)</option>
                                            <option value="manager_human_capital">Manager Human Capital</option>
                                            <option value="public_affair_manager">Public Affair Manager</option>
                                            <option value="chief_technology_officer">Chief Technology Officer</option>
                                            <option value="chief_finance_officer">Chief Finance Officer</option>
                                            <option value="chief_regulatory_officer">Chief Regulatory Officer</option>
                                            <option value="operations_duplicate">Operations</option>
                                            <option value="sales">SALES</option>
                                            <option value="ukm">UKM</option>
                                            <option value="sales_assistant">SALES ASSISTANT</option>
                                            <option value="hradmin">HRADMIN</option>
                                            <option value="branding">BRANDING</option>
                                            <option value="infra">INFRA</option>
                                            <option value="budget_planning">BUDGET PLANNING</option>
                                            <option value="accounting">ACCOUNTING</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-relatedParties" class="form-label">Related Parties</label>
                                        <select id="riskedit-relatedParties" class="form-select modal-custom-select"
                                            data-placeholder="Select Cause">
                                            <option value="" selected disabled>Related Parties</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-impactCategory" class="form-label">Risk Impact
                                            Category</label>
                                        <select id="riskedit-impactCategory" name="riskedit-impactCategory"
                                            class="form-select modal-custom-select"
                                            data-placeholder="Select Risk Impact Category">
                                            <option value="" selected disabled>Risk Impact Category</option>
                                            <option value="business">Business</option>
                                            <option value="business_continuity">Business Continuity</option>
                                            <option value="financial">Financial</option>
                                            <option value="governance">Governance</option>
                                            <option value="human_resource">Human Resource</option>
                                            <option value="technology">Technology</option>
                                            <option value="stakeholders">Stakeholders</option>
                                            <option value="operation">Operation</option>
                                            <option value="reputation">Reputation</option>
                                            <option value="strategic">Strategic</option>
                                            <option value="law">Law</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-impact" class="form-label">Impact</label>
                                        <select id="riskedit-impact" name="risk-mpact"
                                            class="form-select modal-custom-select" data-placeholder="Select Impact">
                                            <option value="" selected disabled>Select Impact</option>
                                            <option value="insignificant">Insignificant</option>
                                            <option value="major">Major</option>
                                            <option value="minor">Minor</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="catastrophic">Catastrophic</option>

                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-likelihood" class="form-label">Likelihood</label>
                                        <select id="riskedit-likelihood" name="" class="form-select modal-custom-select"
                                            data-placeholder="Select Likelihood">
                                            <option value="">Select Likelihood</option>
                                            <option value="rare">Rare</option>
                                            <option value="likely">Likely</option>
                                            <option value="unlikely">Unlikely</option>
                                            <option value="possible">Possible</option>
                                            <option value="almost_certain">Almost Certain</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-riskScore" class="form-label">Risk Score</label>
                                        <input type="text" class="form-control" id="riskedit-riskScore"
                                            placeholder="Risk Score" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-status" class="form-label">Status</label>
                                        <input type="text" class="form-control" placeholder="Status" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="riskedit-Context" class="form-label">Context</label>
                                        <div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="riskeditKPI">
                                                <label class="form-check-label" for="riskeditKPI">KPI</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="riskeditKPI">
                                                <label class="form-check-label" for="riskeditKPI">POS</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="riskeditISO">
                                                <label class="form-check-label" for="riskeditISO">ISO</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox"
                                                    id="riskeditInformationAsset">
                                                <label class="form-check-label"
                                                    for="riskeditInformationAsset">Information Asset</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="riskeditOthers">
                                                <label class="form-check-label" for="riskeditOthers">Others</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-pos" class="form-label">POS</label>
                                        <input type="text" class="form-control" id="riskedit-pos" placeholder="POS" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-iso" class="form-label">ISO</label>
                                        <input type="text" class="form-control" id="riskedit-iso" placeholder="ISO" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-informationAsset" class="form-label">Information
                                            Asset</label>
                                        <input type="text" class="form-control" id="riskedit-informationAsset"
                                            placeholder="Information Asset" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-businessImpact" class="form-label">Business
                                            Impact(KPI)</label>
                                        <input type="text" class="form-control" id="riskedit-businessImpact"
                                            placeholder="Business Impact(KPI)" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="riskedit-financialImpact" class="form-label">Financial
                                            Impact</label>
                                        <input type="number" class="form-control" id="riskedit-financialImpact"
                                            placeholder="Financial Impact" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="riskedit-others" class="form-label">Others</label>
                                        <textarea class="form-control" placeholder="Others" rows="3"
                                            id="riskadd-others"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-dateRaised" class="form-label">Date Raised</label>
                                        <input type="date" class="form-control date-picker" data-language="en"
                                            name="riskedit-dateRaised" id="riskedit-dateRaised"
                                            placeholder="Select Date" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-dateCompleted" class="form-label">Date Completed</label>
                                        <input type="date" class="form-control date-picker"
                                            name="riskedit-dateCompleted" id="riskedit-dateCompleted"
                                            placeholder="Select Date" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-4">
                                    <div class="form-group">
                                        <label for="riskedit-nextAssessment" class="form-label">Next Assessment</label>
                                        <input type="date" class="form-control date-picker"
                                            name="riskedit-nextAssessment" id="riskedit-nextAssessment"
                                            placeholder="Select Date" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save">Save</button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div class="text">Arun</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div class="text">Karthik</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- my-risks edit modal END -->

	<div id="kpi-des-modal" class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">KPI Description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card custom-card border-0">
                        <form class="card-body" id="sub_initative_Form">
                            <div class="grid gap-3">
                                <div class="g-col-12 g-col-md-3">
                                    <div class="form-group">
                                        <label for="kpiDesId" class="form-label">ID</label>
                                        <input type="text" class="form-control" name="kpiDesId" id="kpiDesId"
                                            placeholder="ID" />
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-9">
                                    <div class="form-group">
                                        <label for="kpiDesName" class="form-label">Name</label>
                                        <input type="text" class="form-control" name="kpiDesName" id="kpiDesName"
                                            placeholder="Name" />
                                    </div>
                                </div>
                                <div class="g-col-12">
                                    <div class="form-group">
                                        <label for="kpiDesDescription" class="form-label">Description</label>
                                        <textarea class="form-control" id="kpiDesDescription" placeholder="Description"
                                            rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="kpiDesOwner" class="form-label">Owner</label>
                                        <select id="kpiDesOwner" name="kpiDesOwner"
                                            class="form-select modal-custom-select" data-placeholder="Select Owner">
                                            <option value selected disabled hidden>Select Owner</option>
                                            <option>Trump</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="g-col-12 g-col-md-6">
                                    <div class="form-group">
                                        <label for="kpiDesStatus" class="form-label">Status</label>
                                        <select id="kpiDesStatus" name="kpiDesStatus"
                                            class="form-select modal-custom-select" data-placeholder="Select Status">
                                            <option value selected disabled hidden>Select Status</option>
                                            <option>Manual</option>
                                            <option>Weighted</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save">Save
                    </button>
                    <div class="modal-audit">

                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div class="text">Arun</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div class="text">Karthik</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div class="text">Oct 02, 2019</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


	
    <!-- KPI Story Card modal :::::::::::::::::::::::::::::::::::::::: -->
 <div class="modal custom-modal fade" id="kpi-story-card-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog"
 aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
 <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
     <div class="modal-content">
         <div class="modal-header">
             <h4 class="modal-title">KPI Story Card</h4>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>

         <div class="modal-body">
             <div class="card custom-card table-card">

                 <div class="card-body">
                     <div class="row-table">
                         <div class="row">
                             <div class="col-12 col-form-text">
                                 <div class="user-image">
                                     <!-- <img src="/startroom/images/user1.jpg" width="72" height="72"
                                         class="rounded-circle"> -->
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">KPI Name</label>
                             <div class="col-md-9 col-form-text">
                                 <p><span id="kpiName"></span></p>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Alignment
                                 Objectives</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-dark" id="objectiveName">Increase net revenue by 15%</span>
                                    
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Owner</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-green" id="ownerName"></span>
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Target Audience</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-red">N/A</span>
                                     
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Current Actual</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-yellow" id="actualValue"></span></div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Target</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-blue" id="targetValue"></span>
                                 </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Measurement Method</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-orange">N/A</span>
                                     
                                 </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Strategic
                                 Initiatives</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-info" id="initiatives">N/A</span> </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Timelines</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-secondary">N/A</span>
                
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Reporting Frequency</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2">
                                     <span class="badge rounded-pill label-bg-green" id="reportFrequency"></span>
                                
                                 </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Success Criteria</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-orange">N/A</span> </div>
                             </div>
                         </div>
                         <div class="row">
                             <label for="staticEmail" class="col-md-3 col-form-label">Risks</label>
                             <div class="col-md-9 col-form-text">
                                 <div class="d-flex flex-wrap gap-2"><span
                                         class="badge rounded-pill label-bg-red" id="riskData"></span> </div>
                             </div>
                         </div>

                         <div class="row">
                             <label for="supportNeeded" class="col-md-3 col-form-label">Support Needed</label>
                             <div class="col-md-9 col-form-text">
                                 <textarea class="form-control" id="supportNeeded" rows="3"></textarea>
                             </div>
                         </div>
                         <div class="row">
                             <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                             <div class="col-md-9 col-form-text">
                                 <textarea class="form-control" id="remarks" rows="3"></textarea>
                             </div>
                         </div>

                        
                     </div>

                 </div>
             </div>
         </div>
         <div class="modal-footer">
             <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal"
                 aria-label="Close">
                 Cancel
             </button>
             <button class="btn btn-primary" value="Save" onclick="handleSaveStoryCard()">Save
             </button>

         </div>
     </div>
 </div>
</div>
    <!-- KPI Story Card END -->

    <!-- Risk  Story Card modal :::::::::::::::::::::::::::::::::::::::: -->
    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="risk-story-card-modal"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Risk Story Card</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-3">
                    <div class="card custom-card table-card">
                        <div class="card-body">
                            <div class="row-table">
                                <div class="row">
                                    <div class="col-12 col-form-text">
                                        <div class="user-image">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Risk Name</label>
                                    <div class="col-md-9 col-form-text">
                                        <p><span id="riskName"></span></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Description</label>
                                    <div class="col-md-9 col-form-text">
                                        <p><span id="riskDescription"></span></p>
                                    </div>
                                </div>

                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Category</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2">
                                            <span class="badge rounded-pill bg-dark" id="riskCategory"></span>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Impact</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2" id="riskImpact">
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Likelihood</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2">
                                            <span class="badge rounded-pill bg-primary" id="riskLikelihood"></span>

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Mitigation Actions</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2" id="riskPlanList">
                                            

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Owner</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2">
                                            <span class="badge rounded-pill bg-danger" id="riskOwnerName"></span>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Status</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2">
                                            <span class="badge rounded-pill bg-dark" id="riskStatus"></span>
                                        </div>
                                    </div>
                                </div>




                                <div class="row">
                                    <label for="supportNeeded" class="col-md-3 col-form-label">Support Needed</label>
                                    <div class="col-md-9 col-form-text">
                                        <textarea class="form-control" id="risksupportNeeded" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                                    <div class="col-md-9 col-form-text">
                                        <textarea class="form-control" id="riskRemarks" rows="3"></textarea>
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" onclick="riskStoryCardSave()">Save
                    </button>

                </div>
            </div>
        </div>
    </div>
    <!-- Risk Story Card END -->

    <!-- Initiative  Story Card modal :::::::::::::::::::::::::::::::::::::::: -->
    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false"
        id="initiative-story-card-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Strategic Initiative Story Card</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-3">
                    <div class="card custom-card table-card">
                        <div class="card-body">
                            <div class="row-table">
                                <div class="row">
                                    <div class="col-12 col-form-text">
                                        <div class="user-image">
                                     <!-- <img src="/startroom/images/user1.jpg" width="72" height="72"
                                         class="rounded-circle"> -->
                                 </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Initiative Name</label>
                                    <div class="col-md-9 col-form-text">
                                        <p><span id="initiativeNameValue"></span></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Description</label>
                                    <div class="col-md-9 col-form-text">
                                        <p><span id="initiativeDescriptionValue" class="badge rounded-pill bg-info"></span></p>
                                    </div>
                                </div>

                                <div class="row">
                                    <label for="goal" class="col-md-3 col-form-label">Category</label>
                                    <div class="col-md-9 col-form-text">
                                         <p><span id="initiativeCategoryValue" class="badge rounded-pill bg-primary"></span></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="whyItMatters" class="col-md-3 col-form-label">Why It Matters</label>
                                    <div class="col-md-9 col-form-text">
                                        <textarea class="form-control" id="whyItMatters"
                                            rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="keyActions" class="col-md-3 col-form-label">Key Actions</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2" id="successMeasuresContainer">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Success Measures</label>
                                     <div class="col-md-9 col-form-text" id="keyActionsContainer">
                                       
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Owner</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2">
                                            <span class="badge rounded-pill bg-danger" id="initiativeOwnerValue"></span>
                                            
                                        </div>
                                    </div>
                                </div>






                                <div class="row">
                                    <label for="staticEmail" class="col-md-3 col-form-label">Timelines</label>
                                    <div class="col-md-9 col-form-text">
                                        <div class="d-flex flex-wrap gap-2"><span
                                               class="badge rounded-pill bg-dark" id="initiativeTimeLine"></span>
                                           
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <label for="supportNeeded" class="col-md-3 col-form-label">Support Needed</label>
                                    <div class="col-md-9 col-form-text">
                                        <textarea class="form-control" id="initiativesupportNeeded" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="remarks" class="col-md-3 col-form-label">Remarks</label>
                                    <div class="col-md-9 col-form-text">
                                        <textarea class="form-control" id="initiativeremarks" rows="3"></textarea>
                                    </div>
                                </div>

                                <!-- <div class="row">
                 
                  <div class="col-12">
                    <div class="form-btn-line">
                      <button class="btn btn-primary  initative_save_btn" value="Save">
                        Save
                      </button>
                    </div>
                  </div>
                </div> -->
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" onclick="handleInitiativeStoryCardSave()">Save
                    </button>

                </div>
            </div>
        </div>
    </div>
    <!-- Initiative Story Card END -->

		<div class="floating-box shadow-sm">
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg"
						width="18" height="18" alt="organization"></span></a>
			<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
						height="18" alt="organization"></span></a>
		</div>

		<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

		<!-- Modal Structure -->
		<div class="modal custom-modal fade" id="add-org" data-backdrop="static" data-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Create Org</h4>
						<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="card custom-card border-0">
							<div class="card-body">
								<div class="grid gap-3">

									<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
									<input type="hidden" name="dept_parentid" id="dept_parentid" />
									<input type="hidden" name="deptmode" id="deptmode" />
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label">Department</label>
											<input type="text" class="form-control browser-default" name="orgdept"
												id="orgdept" placeholder="Department">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label">Department ID</label>
											<input type="text" class="form-control browser-default" name="editorgdeptid"
												id="editorgdeptid" placeholder="Department ID">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label">Owner</label>
											<select class="form-select select-dropdown-edit-org w-100 select2"
												name="ownernamemapping" id="ownername" data-placeholder="Select Owner"
												style="width: 100%;">
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label">Email</label>
											<input type="text" class="form-control browser-default" name="deptemailadd"
												id="deptemailadd" placeholder="Email">
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label">Members</label>
											<select
												class="userdept-name-multi-selectadd form-select select-dropdown-add-org w-100 select2"
												style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
												data-placeholder="Select Member" multiple="multiple"
												name="namemapping[]">

											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="ScorecardEdit" class="form-label">Scorecard</label>
											<select class="form-select select-dropdown-edit-org w-100"
												id="deptuserscorecard" name="deptuserscorecard"
												data-placeholder="Select Scorecard">
												<option value="" disabled selected hidden>
													Select Scorecard
												</option>

											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="InitiativeEdit" class="form-label">Initiative</label>
											<select class="form-select select-dropdown-edit-org w-100"
												id="deptuserinitiative" name="deptuserinitiative"
												data-placeholder="Select Initiative">
												<option value="" disabled selected hidden>
													Select Initiative
												</option>
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="KPIEdit" class="form-label">KPI</label>
											<select class="form-select select-dropdown-edit-org w-100" id="deptuserkpi"
												name="deptuserkpi" data-placeholder="Select KPI">
												<option value="" disabled selected hidden>
													Select KPI
												</option>
											</select>

										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="RiskEdit" class="form-label">Risk</label>
											<select class="form-select select-dropdown-edit-org w-100" id="deptuserrisk"
												name="deptuserrisk" data-placeholder="Select Risk">
												<option value="" disabled selected hidden>
													Select Risk
												</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close">
							Cancel
						</button>
						<button class="btn btn-primary" value="Save" onclick="return createdeptEmployee()">Save</button>
					</div>
				</div>
			</div>
		</div>


		<!--  org-add modal :::::::::::::::::::::::::::::::::::::::: -->

		<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal fade" id="edit-org" data-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Edit Org</h4>
						<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form class="card custom-card border-0">
							<div class="card-body">
								<div class="grid gap-3">

									<input type="hidden" name="dept_new_id1" id="dept_new_id1" />
									<input type="hidden" name="dept_parentid" id="dept_parentid" />
									<input type="hidden" name="deptmode" id="deptmode" />
									<input type="hidden" id="updatedeptId">
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label">Department</label>
											<input type="text" class="form-control browser-default" name="editorgdept"
												id="editorgdept" placeholder="Department">
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="sub_initative_progress" class="form-label">Department ID</label>
											<input type="text" class="form-control browser-default"
												name="editorgdeptidValue" id="editorgdeptidValue"
												placeholder="Department ID" readonly>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label">Owner</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="ownernamemapping" id="ownernameValue"
												data-placeholder="Select Owner" style="width: 100%;">


											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="" class="form-label">Email</label>
											<input type="text" class="form-control browser-default" id="emialIdValue"
												placeholder="Email" readonly>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="boardTypeEdit" class="form-label">Members</label>
											<select
												class="userdept-name-multi-select form-select select-dropdown-edit-org w-100 select2"
												style="width: 100%;" name="boardTypeCreate" id="boardTypeEdit"
												data-placeholder="Select Member" multiple="multiple"
												name="namemapping[]">

											</select>
										</div>
									</div>

									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="ScorecardEdit" class="form-label">Scorecard</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserscorecardValue" id="deptuserscorecardValue"
												data-placeholder="Select Scorecard" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Scorecard
												</option>

											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="InitiativeEdit" class="form-label">Initiative</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserinitiativeValue" id="deptuserinitiativeValue"
												data-placeholder="Select Initiative" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Initiative
												</option>
											</select>
										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="KPIEdit" class="form-label">KPI</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserkpiValue" id="deptuserkpiValue"
												data-placeholder="Select KPI" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select KPI
												</option>
											</select>

										</div>
									</div>
									<div class="g-col-12 g-col-md-6">
										<div class="form-group">
											<label for="RiskEdit" class="form-label">Risk</label>
											<select class="form-select select-dropdown-edit-org w-100"
												name="deptuserriskValue" id="deptuserriskValue"
												data-placeholder="Select Risk" style="width: 100%;">
												<option value="" disabled selected hidden>
													Select Risk
												</option>
											</select>

										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close">
							Cancel
						</button>
						<button class="btn btn-primary" value="Save" onclick="updateEmployeeDept()">Save</button>
					</div>
				</div>
			</div>
		</div>

		<!--  org-edit modal :::::::::::::::::::::::::::::::::::::::: -->

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal custom-delete-modal fade" id="delete-modal" data-backdrop="static"
			data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
				<div class="modal-content">
					<div class="modal-body">
						<div class="card custom-card delete-card border-0">
							<div class="card-body">

								<div class="delete-box">
									<h4 class="title">Do you really want to delete?</h4>
									<div class="btn-wrap">
										<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
											data-bs-dismiss="modal" aria-label="Close">
											Cancel
										</button>
										<button class="btn btn-sm btn-danger rounded-pill orgDeleteconfirm"
											value="Yes">Delete</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		<div class="modal custom-modal custom-delete-modal fade" id="dragmap-modal" data-backdrop="static"
			data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
			aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px">
				<div class="modal-content">
					<div class="modal-body">
						<div class="card custom-card delete-card border-0">
							<div class="card-body">

								<div class="delete-box">
									<h4 class="title">Do you really want to save the changes?</h4>
									<div class="btn-wrap">
										<button type="button" class="btn btn-sm btn-label-secondary rounded-pill"
											data-bs-dismiss="modal" aria-label="Close">
											Cancel
										</button>
										<button class="btn btn-sm btn-primary rounded-pill dragMapconfirm"
											value="Yes">Save</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>


		

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->


		<!--  org-view modal :::::::::::::::::::::::::::::::::::::::: -->

		<div class="modal custom-modal fade" id="org-view" tabindex="-1" role="dialog"
			aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Organisation Tracker</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="card controlpanel-container org-structure-tab-container">
							<div class="grid gap-0 control-panel-tabs org-structure-tabs">
								<div id="org-tracker-tabs" class="dropdown control-panel-wrap  g-col-12 g-col-lg-3"></div>


								<!-- data displyed here -->
								<div class="tab-content g-col-12 g-col-lg-9" id="v-pills-tabContent">
									<div class="tab-pane fade show active" id="v-pills-general" role="tabpanel"
										aria-labelledby="v-pills-general-tab" tabindex="0">
										
											<div id="org-tracker-tab-section-data"></div>
										
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- org-view END -->

		<!-- File Validate Form -->
		<div class="modal custom-modal fade" id="org-import" tabindex="-1" role="dialog"
			aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">File Upload</h4>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="card-header-progress">
							<ul class="form-progressbar w-100">
								<li>Upload</li>
								<li>Validation</li>
								<li>Import</li>
							</ul>
						</div>

						<input type="hidden" id="orgimportmethodtype">


						<div id="file-upload" class="card custom-card">
							<div class="card-body grid gap-3">

								<div class="g-col-12">
									<div class="form-group">
										<label for="importCategory" class="form-label">Import Category</label>
										<select class="form-select select-dropdown-file-upload w-100"
											name="importCategory" id="uploadcategory"
											data-placeholder="Select Import Category">
											<option value="" disabled selected hidden>
												Select Import Category
											</option>
											<option value="Organisation Import">Organisation</option>
											<option value="ETLUpload">Data Upload</option>
											<option value="XLSUpload">Excel File Upload</option>
											<option value="Scorecard Import">Scorecard</option>
											<option value="InitiativeDataLoad">Initiatives Data Load</option>
											<option value="InitiativeBudgetLoad">Initiatives Budget Load</option>
											<option value="Initiative Import">Initiatives & Projects</option>
											<option value="Risk Import">Risk</option>
										</select>
									</div>
								</div>
								<div class="g-col-12 dropzone-wrapper">
									<div class="form-group dropzone-desc">
										<label for="" class="form-label">Upload File</label>
										<label for="login" class="upload-label upload-box">
											<div class="upload">Choose a file or drag it here.</div>
											<input type="file" id="login" class="dropzone">
										</label>
									</div>


								</div>
							</div>
							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-primary initative_save_btn ms-auto"
										id="next-btn-1">
										Next
									</button>
								</div>
							</div>
						</div>

						<div class="card custom-card" id="file-validate" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12 img-center">

									<img src="/stratroom/images/not-verified.png" alt="not-verified" />
									<div class="error-div">
										<table class="error-table">
											<thead>
												<tr>
													<th style="width: 150px">Row</th>
													<th>Error</th>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>
								</div>
								<div class="card-footer">
									<div class="d-flex justify-content-between form-line">
										<button type="button" class="btn btn-label-secondary btn-default1"
											id="prev-btnerror">
											Previous
										</button>
										<!-- <button class="btn btn-primary initative_save_btn" id="next-btn-2">
                Next
              </button> -->
									</div>
								</div>


							</div>

						</div>

						<div class="card custom-card" id="file-next-btn" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12">
									<div class="text-center">
										<img src="/stratroom/images/success.png" alt="Verified" width="140" />
									</div>
								</div>
							</div>
							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-label-secondary btn-default1" id="prev-btnone">
										Previous
									</button>
									<button class="btn btn-primary initative_save_btn" id="next-btn-2">
										Next
									</button>
								</div>
							</div>
						</div>

						<div class="card custom-card" id="file-save" style="display: none">
							<div class="card-body grid gap-3">
								<div class="g-col-12">
									<div class="text-center">
										<img src="/stratroom/images/success.png" alt="Verified" width="140" />
									</div>
								</div>
							</div>

							<div class="card-footer">
								<div class="d-flex justify-content-between form-line">
									<button type="button" class="btn btn-label-secondary" id="prev-btn2">
										Previous
									</button>
									<button class="btn btn-primary initative_save_btn" id="done-btn"
										data-bs-dismiss="modal" aria-label="Close">
										Done
									</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!--  delete modal :::::::::::::::::::::::::::::::::::::::: -->

		<link href="assets/css/pickr.min.css" rel="stylesheet">
		<link href="assets/css/daterangepicker.min.css" rel="stylesheet">
		<link href="assets/css/jquery-ui.min.css" rel="stylesheet">
		<link href="assets/css/select2.min.css" rel="stylesheet" />

		<!-- Plugins Js -->
		<script src="js/app.min.js"></script>
		<!-- Custom Js -->
		<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
		<script src="js/admin.js"></script>
		<script src="js/file-preview.js"></script>
		<script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
		<script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>
		<!-- Knob Js -->
		<script src="${contextroot}/js/jquery-ui.min.js"></script>
		<script src="js/moment.js"></script>
		<script src="js/pages/animated.js"></script>
		<script src="js/jquery.editable.min.js"></script>
		<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
		<script src="js/jquery-resize.js"></script>
		<script src="js/datepickerair.js"></script>
		<script src="js/datepicker.en.js"></script>
		<script src="${contextroot}/js/widgets.js"></script>
		<script src="${contextroot}/js/notify.js"></script>
		<script src="js/initial.js"></script>
		<script src="js/custom/jquery.orgchart.js"></script>
		<script src="js/custom/org_structure.js"></script>
		<script src="${contextroot}/js/select2.min.js"></script>

		<script src="js/custom/swiper-bundle.min.js"></script>






		<script type="text/javascript">
			$(document).ready(function () {

				$('#org-import').on('show.bs.modal', function () {
					console.log('Modal is opening - clear data now');

					$('#uploadcategory').val('');


					$('#login').val('');

					$('#file-validate').hide();
					$("#file-save").hide();
					$("#file-next-btn").hide();
					$("#file-upload").show();

				});

				if ($("#userrolename").val() == "Super User" || $("#userrolename").val() == "Admin") {
					if ($("#userPrincipal").val() != $("#userPrincipalnavigate").val()) {
						$(".subusermenuname").text('Organization');
						$(".subuserlink").addClass("homepageHighlight");
						if ($(".topmenubreadcrumb").length) {
							$(".topmenubreadcrumb").show();
						}
						if ($(".sidebarNavigate").length) {
							$(".sidebarNavigate").show();
						}
					}
				}
				$('.orgchartuserimage').initial({ charCount: 2, height: 30, width: 30, fontSize: 18 });
				var currZoom = $("#chart-container").css("zoom");
				if (currZoom == "normal") currZoom = 1;

				$(".zoomIn").click(function () {
					currZoom *= 1.2;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOff").click(function () {
					$("#chart-container").css("zoom", 1);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
				$(".zoomOut").click(function () {
					currZoom *= 0.8;
					$("#chart-container").css("zoom", currZoom);
					$("#chart-container").css(
						"-moz-transform",
						"Scale(" + currZoom + ")"
					);
					$("#chart-container").css("-moz-transform-origin", "0 0");
				});
			});

			$(document).on("keypress", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}
				/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				}*/
				else {
					if (checkexistspan == 1 && attrID != "email_add") {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}

			}).on("keyup", ".required", function () {
				var elementVal = $(this).val();
				var currentElement = $(this);
				var spanerrorMsg = "This field is required";
				var attrID = $(currentElement).attr("id");
				var checkexistspan = $(currentElement).next().length;
				var minchar = 1;
				var maxchar = 200;
				if (attrID != undefined && attrID != "" && attrID == "email_add") {
					minchar = 6;
					maxchar = 200;
				}
				if (checkexistspan == 1) {
					$(currentElement).next().remove();
				}
				if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
					spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
					$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
				} else {
					if (checkexistspan == 1) {
						var currenttext = $(currentElement).next().text();
						$(currentElement).next().remove();
					}
				}
			});

			function getEmployeeObj() {
				var curr = $("#currency").find(':selected').attr('data-currency');
				var imageUpdate = $("#upload_link1").attr("src");
				if (imageUpdate == "/stratroom/images/media.png") {
					imageUpdate = "";
				}
				if ($("#upload_link1").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"id": $("#org_new_id").val(),
					"name": $("#name_add").val(),
					"title": $('#desg_add').val(),
					"dept": $("#dept_add").val(),
					"email": $("#email_add").val(),
					"phoneNumber": $("#org_phone").val(),
					//	"kpiname": $("#org_kpiname").val(),
					"location": $("#location_add").val(),
					"currency": $("#currency").val(),
					"currencySymbol": curr,
					"image": imageUpdate,
					"deptUniqueId": $("#deptuniqueid").val()
				}
				return employeeObj;
			}

			function getdeptEmployeePagesObj() {

				var employeeObj = [];

				if ($("#deptuserscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#deptuserscorecard").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#deptuserinitiative").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#deptuserkpi").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				if ($("#deptuserrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#deptuserrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#deptuserrisk").val(),
						"empId": $("#dept_emp_show_id").val()
					});
				}

				return employeeObj;
			}


			function getNewEmployeeObj() {
				var imagesrc = $("#upload_link2").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link2").attr("data-imageset") == "notset") {
					imageUpdate = "";
				}
				var employeeObj = {
					"name": $("#name_add1").val(),
					"title": $('#desg_add1').val(),
					"dept": $("#dept_add1").val(),
					"deptUniqueId": $("#dept_id_add1").val(),
					//"kpiname": $("#kpi_name_add1").val(),
					"kpiname": "",
					"email": $("#email_add1").val(),
					"location": $("#location_add1").val(),
					"image": imagesrc

				}
				return employeeObj;
			}

			function updateformvalidationerrorreset() {
				$("#edit_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow").remove();
				});
				$("#emailerrorshow").hide();
			}

			function updateEmployee() {
				//console.log($("#upload_link1").attr("src"));
				updateformvalidationerrorreset();
				var employeeObj = getEmployeeObj();
				var validationFlag = formvalidationorg("#edit_org_structure_form");
				var emailaddress = $("#email_add").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}
				/*var drogdropid 	=	$("#currentimgdivid").val();
				if(drogdropid !=	undefined && drogdropid !=	""){
					$("div #"+drogdropid).find(".org_box_top img").attr('src',employeeObj.image);
				}*/
				var emailaddress = $("#email_add").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow").css('display', 'none').html("");
					}
				}

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/editEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}

			function getEmployeePagesObj() {

				var employeeObj = [];

				if ($("#userscorecard").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userscorecard").val(),
						"type": "SCORECARD",
						"typeName": "SCORECARD",
						"typeId": $("#userscorecard").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userinitiative").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userinitiative").val(),//$("#userinitiative").find(':selected').data('pageid')
						"type": "INITIATIVE",
						"typeName": "INITIATIVE",
						"typeId": $("#userinitiative").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userkpi").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userkpi").find(':selected').data('pageid'),
						"type": "KPI",
						"typeName": "KPI",
						"typeId": $("#userkpi").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				if ($("#userrisk").val() != "") {
					employeeObj.push({
						"active": 0,
						"pageId": $("#userrisk").val(),
						"type": "RISK",
						"typeName": "RISK",
						"typeId": $("#userrisk").val(),
						"empId": $("#emp_show_id").val()
					});
				}

				return employeeObj;
			}

			function updatePageEmployee() {
				//updateformvalidationerrorreset();
				var employeeObj = getEmployeePagesObj();

				var methodType = 'post';
				$.ajax({
					url: "/stratroom/pageLink/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						location.reload(true);
						//updateemployeeaftercall(employeeObj.image,employeeObj.id);
						$("#close-org-aside").click();
					},
					error: readErrorMsg
				});
			}


			$(document).on('keydown', function (e) {
				if (e.keyCode == 27) { // ESC
					$("#close-org-aside").click();
				}
			});

			$("#editorgdeptid").on('keypress focusout blur', function () {
				$("#deptiduniqeueerrorshow").hide();
				if ($(this).prop("readonly")) {
					return false;
				}
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}

				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");

					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#deptiduniqeueerrorshow").hide();
								//$("#editorgdeptid").next().append('<span id="deptiduniqeueerrorshow" style="color: red; display: none"></span>');
								//$("#deptiduniqeueerrorshow").css('display', 'none').html("");
							} else {
								$(".editdeptidSelect").append('<p id="deptiduniqeueerrorshow" style="color:red">Dept Id is already taken</p>');
							}
						}
					});
				}
			});

			/*$("#dept_id_add1").on('keypress focusout blur', function () {
				$("#employeedepterrorshow1").hide();
				
				var deptuniname = $(this).val();
				var currentElement = $(this);
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (deptuniname == "" || deptuniname == undefined || deptuniname == " " || deptuniname == 0)) {
					$(currentElement).next().text('');
				}
	
				if (deptuniname != "" && deptuniname != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#employeedepterrorshow1").show();
					$.ajax({
						url: "findByDeptUniqueId?deptUniqueId=" + deptuniname,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.status != "Active" && data.status != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#employeedepterrorshow1").css('display', 'none').html("");
							} else {
								$("#employeedepterrorshow1").html("Dept Id is already taken");
							}
						}
					});
				}
			});*/


			$(document).on('blur', "#email_add", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#edit-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow").css('display', 'none').html("");
							} else {
								$("#emailerrorshow").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(document).on('blur', "#email_add1", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}

				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $("#add-org-object");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$("#emailerrorshow1").css('display', 'block');
					$.ajax({
						url: "checkEmail?email=" + emailAddredd + "&empId=" + empId,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$("#emailerrorshow1").css('display', 'none').html("");
							} else {
								$("#emailerrorshow1").css('display', 'block').html("Email address is already taken");
							}
						}
					});
				}
			});

			$(".dept_struct_add_btn").mouseover(function () {
				if ($("#orgdept").is(":focus")) {
					$("#orgdept").trigger("blur");
				}
				if ($("#editorgdeptid").is(":focus")) {
					$("#editorgdeptid").trigger("blur");
				}
				if ($("#deptiduniqeueerrorshow").css('display') == "none") {
					$(".dept_struct_add_btn").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$(document).on('blur', "#orgdept", function () {
				var emailAddredd = $(this).val();
				var currentElement = $(this);
				//var empId = $("#org_new_id1").val();
				var checkexistspan = $(currentElement).next().length;
				if (checkexistspan == 1 && (emailAddredd == "" || emailAddredd == undefined || emailAddredd == " " || emailAddredd == 0)) {
					$(currentElement).next().text('');
				}
	
				if (emailAddredd != "" && emailAddredd != undefined) {
					var addBtn = $(".dept_struct_add_btn");
					$(addBtn).attr("disabled", true).css("cursor", "not-allowed");
					$.ajax({
						url: "checkDept?deptName=" + emailAddredd,
						contentType: "application/json",
						async: false,
						success: function (data) {
							if (data.success != undefined && data.success != "") {
								$(addBtn).removeAttr("disabled").css("cursor", "pointer");
								$(this).next().remove();
							} else {
								$("#orgdept").after('<span style="color: red">Department is already taken</span>');
							}
						}
					});
				}
			});*/

			$("#edit-org-object").mouseover(function () {
				if ($("#email_add").is(":focus")) {
					$("#email_add").trigger("blur");
				}
			});

			$("#add-org-object").mouseover(function () {
				if ($("#email_add1").is(":focus")) {
					$("#email_add1").trigger("blur");
				}
				if ($("#dept_id_add1").is(":focus")) {
					$("#dept_id_add1").trigger("blur");
				}
				if ($("#employeedepterrorshow1").css('display') != "none") {
					$("#add-org-object").attr("disabled", true).css("cursor", "not-allowed");
				}
			});

			/*$("#email_add").blur(function(){
				if($("#email_add").val().length >= 6){
					if($("#email_add").is(":focus")){
						$("#email_add").trigger("blur");
					}
				}
			});*/

			function formvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;
					/*if(checkexistspan 	==	1){
						$(currentElement).next().remove();
					}*/

					if (attrID != undefined && attrID != "" && attrID == "email_add") {
						minchar = 6;
						maxchar = 200;
					}

					if (elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
					else {
						if (checkexistspan == 1 && attrID != "email_add") {
							$(currentElement).next().remove();
						}
					}

				});
				return validationFlag;
			}

			function addformvalidationerrorreset() {
				$("#add_org_structure_form span[style='color: red']").each(function () {
					$(this).not("#emailerrorshow1").remove();
				});
				$("#emailerrorshow1").hide();
			}


			function getNewdeptEmployeeObj() {
				var imagesrc = $("#upload_link_dept").attr("src");
				if (imagesrc == "/stratroom/images/media.png") {
					imagesrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAIVBMVEXMzMyWlpbFxcWjo6O+vr63t7ecnJyqqqqbm5uxsbGampoKZyAaAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAU0lEQVRIiWNgGAWjYBQMd8Bk7KCITGMAZqeAQgZ2zwAwjQ2wmYU6ArVDaGyA0aWTkYHBFEpjM0FpoaABUzGExqaAJdmBkYFdNQBMj4JRMAoGOwAAPNIL2qWeApgAAAAASUVORK5CYII=";
					imagesrc = "";
				}
				if ($("#upload_link_dept").attr("data-imageset") == "notset") {
					imagesrc = "";
				}
				var dept = "";
				if ($("#deptmode").val() == "add") {
					dept = $("#orgdept").val();
				} else {
					//dept	=	$("#editorgdept option:selected").text();
					dept = $("#editorgdept").val();
				}

				var employeeObj = {
					"owner": $("#ownername").val(),
					"empIdList": $(".userdept-name-multi-selectadd").val(),
					"scorecardPageId": $('#deptuserscorecard').val(),
					"initiativePageId": $("#deptuserinitiative").val(),
					"kpiId": $("#deptuserkpi").val(),
					"riskPageId": $("#deptuserrisk").val(),
					"emailAddress": $("#deptemailadd").val(),
					"deptParentId": $("#dept_parentid").val(),
					"deptUniqueId": $("#editorgdeptid").val(),
					"deptName": dept,
					"deptImage": imagesrc

				}
				return employeeObj;
			}

			function createEmployee() {
				addformvalidationerrorreset();
				var validationFlag = formvalidationorg("#add_org_structure_form");
				var emailaddress = $("#email_add1").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#emailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#emailerrorshow1").css('display', 'none').html("");
				}

				if (validationFlag == true) {
					return false;
				}

				var emailaddress = $("#email_add1").val();
				if (emailaddress != "" && emailaddress != undefined && emailaddress != " " && emailaddress != 0) {
					if (!validateEmail(emailaddress)) {
						$("#emailerrorshow1").css('display', 'block').html("Please enter valid emailAddress");
						return false;
					} else {
						$("#emailerrorshow1").css('display', 'none').html("");
					}
				}

				var employeeObj = getNewEmployeeObj();
				employeeObj.pid = $("#org_new_id").val();
				var methodType = 'post';

				$.ajax({
					url: "/stratroom/createEmployee/",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						//console.log("employee hass been created..");
						location.reload(true);
						//callaftercreatedemployee(employeeObj.image, data.employeeId);
						//$("#close-org-aside1").click();
					},
					error: readErrorMsg
				});
			}

			function adddeptformvalidationerrorreset() {
				$("#add_dept_structure_form span[style='color: red']").each(function () {
					$(this).remove();
				});
				$("#deptemailerrorshow1").hide();
			}

			function deptformvalidationorg(formElement) {
				var validationFlag = false;
				$(formElement + " .required").each(function (index, value) {
					var spanerrorMsg = "This field is required";
					var elementVal = $(this).val();
					var currentElement = $(this);
					var attrID = $(currentElement).attr("id");
					var checkexistspan = $(currentElement).next().length;
					var minchar = 3;
					var maxchar = 200;

					if (attrID != undefined && attrID != "" && attrID == "deptemailadd") {
						minchar = 6;
						maxchar = 200;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && (!$(this).hasClass("owner-name") && !$(this).hasClass("userdept-name-multi-select"))) {
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}
					/*else if (elementVal.length != 0 && elementVal != undefined && elementVal != "" && (elementVal.length < minchar || elementVal.length >= maxchar)) {
						spanerrorMsg = "This field length should be greater than " + minchar + " and less than " + maxchar;
						$(currentElement).after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && ($(this).hasClass("owner-name"))) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("editdeptelem")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}

					if ((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")) {
						$(currentElement).next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}


					/*if((elementVal == undefined || elementVal == "" || elementVal == " " || elementVal == 0) && $(this).hasClass("userdept-name-multi-select")){
						$(".userdept-name-multi-select").next().after('<span style="color: red">' + spanerrorMsg + '</span>');
						validationFlag = true;
					}*/
				});
				return validationFlag;
			}

			function createdeptEmployee() {
				adddeptformvalidationerrorreset();
				if ($("#orgdept").is(":visible") == true) {
					$("#deptmode").val('add');
				} else {
					$("#deptmode").val('edit');
				}
				var validationFlag = deptformvalidationorg("#add_dept_structure_form");

				/*var emailaddress = $("#deptemailadd").val();
				if (emailaddress == "" || emailaddress == undefined || emailaddress == " " || emailaddress == 0) {
					$("#deptemailerrorshow1").css('display', 'block').html("This field is required");
					validationFlag = true;
				} else {
					$("#deptemailerrorshow1").css('display', 'none').html("");
				}*/

				if (validationFlag == true) {
					return false;
				}

				var employeeObj = getNewdeptEmployeeObj();
				if ($("#deptmode").val() == "add") {
					if (employeeObj.deptParentId == undefined || employeeObj.deptParentId == "" || employeeObj.deptParentId == null) {
						$.notify("Department Parent id is missing", {
							style: 'success',
							className: 'graynotify'
						});
						return false;
					}
				}


				var methodType = 'post';
				/*if($("#dept_new_id1").val() !=	""){
					methodType = 'put';
				}*/

				if ($("#deptmode").val() == "edit") {
					methodType = 'put';
					employeeObj.deptId = $("#updatedeptId").val();
				}

				console.log(employeeObj, "employeeObj");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: methodType,
					contentType: "application/json",
					data: JSON.stringify(employeeObj),
					success: function (data, status) {
						console.log(JSON.stringify(employeeObj));
						console.log("dept hass been created..");
						//	location.reload(true);
						/*if($("#deptmode") == "add"){
							callafterdeptcreatedemployee(employeeObj.image, data.deptId);
						}else{
							updatedeptaftercall(employeeObj.image, data.deptId);
						}*/
						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}

			function validateEmail(email) {
				var regexPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return regexPattern.test(String(email).toLowerCase());
			}

		</script>
		<script src="${contextroot}/js/chosen.jquery.min.js"></script>
		<script type="text/javascript" src="${contextroot}/js/notify.js"></script>

		<script src="${contextroot}/js/initial.js"></script>
        <script src="js/custom/landingPage.js"></script>
		


		<script type="text/javascript">

			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
			//script.src = "http://jsonip.com?callback=DisplayIP";
			script.crossorigin = "anonymous";
			document.getElementsByTagName("head")[0].appendChild(script);

			function DisplayIP(response) {
				localStorage.setItem('systemip', response.ip)
			}



			// var toggler = document.getElementsByClassName("caret");
			// var i;

			// for (i = 0; i < toggler.length; i++) {
			//   toggler[i].addEventListener("click", function () {
			//     this.parentElement.querySelector(".nested").classList.toggle("active");
			//     this.classList.toggle("caret-down");
			//   });
			// }

		</script>

		<script>
			$(function () {
				function updateSortableEmptyState() {
					$(".nested-area").each(function () {
						if ($(this).children(".nested-item").length == 0) {
							if ($(this).find("li.sortable-empty").length == 0) {
								$(this).prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}
						}
					});
				}

				// Initial check for empty lists
				updateSortableEmptyState();

				$(".nested-area").sortable({
					items: "> .nested-item:not(.non-draggable-parent)", // Allow sorting for draggable items only
					handle: ".org-box", // Handle for dragging
					connectWith: ".nested-area", // Allow connected sorting between nested areas
					placeholder: "ui-sortable-placeholder", // Placeholder during sorting

					start: function (event, ui) {
						ui.item.addClass("dragging-highlight");

						// Check and update sortable-empty class for the source list
						updateSortableEmptyState();
					},

					stop: function (event, ui) {
						ui.item.removeClass("dragging-highlight");

						// Check and update sortable-empty class for the target list
						updateSortableEmptyState();
					},

					receive: function (event, ui) {
						$(this).find("li.sortable-empty").remove();
					},

					update: function () {
						updateSortableEmptyState();
					},

					over: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							if ($parent.find("li.sortable-empty").length == 0) {
								$parent.prepend('<li class="sortable-empty"></li>'); // Change append → prepend
							}

						}
					},

					out: function (event, ui) {
						let $parent = ui.placeholder.parent();
						if ($parent.children(".nested-item:not(.ui-sortable-placeholder)").length == 0) {
							$parent.find("li.sortable-empty").remove();
						}
					}
				});

				// Prevent dragging for non-draggable items explicitly
				// $(".nested-item.non-draggable").on("mousedown", function (e) {
				//   e.stopPropagation(); // Prevent dragging
				// });
			});


			$("#boardTypeEdit").select2({
				width: '100%',
				placeholder: "Select Department",
				// //allowClear: true,
				// dropdownParent: $('#add-user')
			});



			//Update Employee Dept
			function updateEmployeeDept() {
				const payload = {
					owner: $("#ownernameValue").val(),
					empIdList: $(".userdept-name-multi-select").val(),
					scorecardPageId: $('#deptuserscorecardValue').val(),
					initiativePageId: $("#deptuserinitiativeValue").val(),
					kpiId: $("#deptuserkpiValue").val(),
					riskPageId: $("#deptuserriskValue").val(),
					emailAddress: $("#emialIdValue").val(),
					deptParentId: $("#dept_parentid").val(),
					deptUniqueId: $("#editorgdeptidValue").val(),
					deptName: $("#editorgdept").val(),
					deptImage: "",
					deptId: $("#updatedeptId").val()
				}

				console.log(payload, "payload");

				$.ajax({
					url: "/stratroom/addDepartmentMapping",
					type: "put",
					contentType: "application/json",
					data: JSON.stringify(payload),
					success: function (data, status) {
						console.log("dept hass been created..");

						$("#close-dept-aside1").click();
						location.reload(true);
					},
					error: readErrorMsg
				});
			}


			$(document).on('click', '#done-btn', function () {
				location.reload(true);
			});


			function handleOrgView() {
				
				console.log("function clicked");
				var daterange2 = $("#datePeriod").val();

				$.ajax({
					url: "/stratroom/allDepartmentListByLoginUser",
					type: "GET",
					data: { datePeriod: daterange2 },
					success: function (data) {
						console.log(data, "data");

						if (data.length > 0) {

							var html = '';

							html += '<div id="dropdownMenuButtonWrap" >';
							html += '<ul class="dropdown-menu" id="v-pills-tab" role="tablist" aria-orientation="vertical">';

							for (var i = 0; i < data.length; i++) {
								var deptName = data[i].name;
								var safeId = "v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + "-tab"; // Sanitize for ID
								var targetId = "#v-pills-" + deptName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

								html += '<button class="card nav-link" id="' + safeId + '" data-bs-toggle="pill" ';
								html += 'data-bs-target="' + targetId + '" type="button" role="tab" aria-controls="' + targetId.substring(1) + '" ';
								html += 'aria-selected="false" ';
								html += 'onclick="handleDepartmentClick(\'' + deptName.replace(/'/g, "\\'") + '\')">';
								html += '<span class="nav-text">' + deptName + '</span>';
								html += '</button>';
							}

							html += '</ul>';
							html += '</div>';


							$("#org-tracker-tabs").empty().append(html);


							var orgModal = new bootstrap.Modal(document.getElementById('org-view'));
							orgModal.show();
						}
					},
					error: function (xhr, status, err) {
						console.error("Error fetching department list:", err);
						$("#v-pills-tab").html('<div class="text-danger px-3">Failed to load data</div>');

						openOrgModalWithContent([]);
					}
				});
			}



			function handleDepartmentClick(deptName) {
				$("#org-tracker-tab-section-data").empty();
				console.log("Department clicked:", deptName);
				var daterange2 = $("#datePeriod").val();
				$.ajax({
					url: "/stratroom/orgTrackList?flagType=" + deptName + "&datePeriod=" + daterange2 + "&id=" + deptName,
					type: "GET",
					success: function (data) {
						console.log(data, "suceessssss");
					var html = '<div class="control-panel-content">';
    html += '<div class="mb-2 section-title">';
    html += '<h5>CEO</h5>';
    html += '</div>';
    html += '<div class="org-structure-table">';
    html += '<table class="table table-bordered organisationTracker" style="width: 100%;">';
    html += '<thead class="text-center">';
    html += '<tr>';
    html += '<th>Parent</th>';
    html += '<th>Owner</th>';
    html += '<th>Department</th>';
    html += '<th>Email</th>';
    html += '<th>Pages</th>';
    html += '<th>From Date</th>';
    html += '<th>To Date</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    // Loop through the data and create a row for each item
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        html += '<tr>';
        html += '<td>' + (item.parentName || '') + '</td>';
        html += '<td>' + (item.ownerName || '') + '</td>';
        html += '<td>' + (item.designation || '') + '</td>';
        html += '<td>' + (item.email || '') + '</td>';
        html += '<td>' + (item.pages || '') + '</td>';
        html += '<td>' + (item.fromDate || '') + '</td>';
        html += '<td>' + (item.toDate || '') + '</td>';
        html += '</tr>';
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';
    html += '</div>';


    $("#org-tracker-tab-section-data").append(html);

					}
				});
			}



		</script>

		 <script>
        document.addEventListener("DOMContentLoaded", function () {

            // Detect direction preference
            const swiperDir =
                localStorage.getItem("dir") ||
                document.documentElement.getAttribute("dir") ||
                "ltr";


            const initiativeSection = document.querySelector(".initiative-section");
            if (initiativeSection) initiativeSection.setAttribute("dir", swiperDir);
            const riskSection = document.querySelector(".risk-section");
            if (riskSection) riskSection.setAttribute("dir", swiperDir);
            const kpiSection = document.querySelector(".kpi-section");
            if (kpiSection) kpiSection.setAttribute("dir", swiperDir);
            const overviewSection = document.querySelector(".overview-section");
            if (overviewSection) overviewSection.setAttribute("dir", swiperDir);

            const swiper = new Swiper(".mySwiper", {
                slidesPerView: 2,
                spaceBetween: 8,
                loop: false,
                rtl: swiperDir === "rtl", // 👈 Automatically set RTL mode
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                pagination: {
                    enabled: false,
                    el: ".swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    // 0: { slidesPerView: 2 },
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 }
                }
            });

            // re-render Lucide icons
            lucide.createIcons();
        });
    </script>


    <script>
        document.querySelectorAll('.date-picker').forEach(function (el) {
            const pickerId = el.getAttribute('id'); // Get the element’s ID
            flatpickr(`#${pickerId}`, {
                dateFormat: "M j, Y",  // Example: Oct 23, 2025
                allowInput: true
            });
        });
        document.querySelectorAll('.date-range-picker').forEach(function (el) {
            const pickerId = el.getAttribute('id'); // Find the element's ID
            flatpickr(`#${pickerId}`, {
                mode: "range",
                dateFormat: "M j, Y",
                // defaultDate: ["2025-08-12", "2025-08-13"],
                onClose: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 2) {
                        const start = instance.formatDate(selectedDates[0], "M j, Y");
                        const end = instance.formatDate(selectedDates[1], "M j, Y");
                        el.value = `${start} to ${end}`; // Set formatted value in input
                    }
                }
            });
        });
        $('.modal-custom-select').each(function () {
            let $this = $(this);
            $this.select2({
                width: "100%",
                dropdownParent: $this.closest('.modal')
            });
        });
    </script>


    <script>
        $("#widget_type").change(function () {
            var value = $(this).val();
            $(".widget").hide();
            if (value) $("." + value).show();
        }).change();
    </script>


	</body>