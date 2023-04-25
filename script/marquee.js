  $(document).ready(function() {

      document.getElementById("marquee").innerHTML = `
            <div>YOUTHVIBE 2023 is here!</div>
            <div>LPU's Global Open Fest            </div>
            <div><a style="text-decoration: none;" href="https://linktr.ee/youthvibe23" target="_blank">Register Now</a></div>
    `;

      $(".owl-carousel").owlCarousel({ //Basic Speeds
          slideSpeed: 200,
          paginationSpeed: 800,

          //Autoplay
          autoPlay: true,
          goToFirst: true,
          goToFirstSpeed: 1000,

          // Navigation
          navigation: false,
          navigationText: ["prev", "next"],
          pagination: true,
          paginationNumbers: true,

          // Responsive
          responsive: true,
          items: 1,
          itemsDesktop: [1199, 1],
          itemsDesktopSmall: [980, 1],
          itemsTablet: [768, 1],
          itemsMobile: [479, 1]
      });



  });
