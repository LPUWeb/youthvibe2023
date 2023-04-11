
//onload

window.onload = async function() {

    document.getElementById('burger_menu_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });

    document.getElementById('burger_menu_close_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });
    const events_route = "https://youthvibe.harshbanjare.me/api/events/meta";

    const events_req = await fetch(events_route);
    const events_data = await events_req.json();
    console.log(events_data);


    
    for(const event of events_data){
        console.log(event['name']);
        let group = event["Category"]
        group = group ? group : "mega_technical";
        group = group.toLowerCase();
        const parent_container = document.getElementById(group);
        console.log(group);

        const card = `
        <div class="event-card">
        <article class="card card--1">
            <div class="card__img" style="background-image: url('${event["Backdrop"]}')"></div>
            <a href="#" class="card_link">
                <div class="card__img--hover" style="background-image: url('${event["Backdrop"]}')"></div>
            </a>
            <div class="card__info">
                <span class="card__category"> ${event["Event Type"]} | ${event["Date"]} | ${event["Time"]}

                </span>
                <h3 class="card__title">${event["Name"]}</h3>
                <span class="card__by"> <a href="/event.html?id=${event["id"]}" class="card__author" title="author">View Event</a></span>
            </div>
        </article>
    </div>
    `
        parent_container.innerHTML += card;
        
    }
}
