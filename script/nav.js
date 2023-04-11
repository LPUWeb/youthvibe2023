
const nav_html = `
<div class="logo">
    <img src="assets/yv_latest.png" alt="YV 2023">
</div>
<ul class="nav-links">
    <li><a href="index.html">HOME</a></li>
    <li><a target="_blank" href="https://lpu.in">ABOUT LPU</a></li>
    <li><a href="tour.html">TOUR</a></li>
    <li><a href="schedule.html">SCHEDULE</a></li>

    <li><a href="events.html">EVENTS</a></li>
    <li><a href="faqs.html">FAQs</a></li>
    <li><a href="sponsors.html">SPONSORS</a></li>
    <li><a href="contactus.html">CONTACT US</a></li>
    <li><a href="register.html"><button class="call-to-action"> REGISTER</button></a></li>
</ul>
<div class="burger" id="burger_menu_btn">
    <img src="assets/icons8-menu-rounded-100.png" alt="nav">
</div>
<div class="nav-slide-in" id="burger_menu">
    <div class="nav-close" id="burger_menu_close_btn">
        <h1 style="font-size: 3rem;">&times;</h1>
    </div>
    <ul class="nav-slide-links">
        <li><a href="index.html">HOME</a></li>
        <li><a target="_blank" href="https://lpu.in">ABOUT LPU</a></li>
        <li><a href="tour.html">TOUR</a></li>
        <li><a href="schedule.html">SCHEDULE</a></li>

        <li><a href="events.html">EVENTS</a></li>
        <li><a href="faqs.html">FAQs</a></li>
        <li><a href="sponsors.html">SPONSORS</a></li>
        <li><a href="contactus.html">CONTACT US</a></li>
        <li><a href="register.html"><button class="call-to-action"> REGISTER</button></a></li>
    </ul>
</div>
`

document.getElementById('navigation').innerHTML = nav_html;

window.onload = function () {
    

    document.getElementById('burger_menu_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });

    document.getElementById('burger_menu_close_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });


}
