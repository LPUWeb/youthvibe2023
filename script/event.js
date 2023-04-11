window.onload = async function() {
    document.getElementById('burger_menu_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });

    document.getElementById('burger_menu_close_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });
    const id = window.location.search.split("=")[1];
    const events_route = `https://youthvibe.harshbanjare.me/api/events/`+id;
    
    const events_req = await fetch(events_route);
    const events_data = await events_req.json();
    console.log(events_data);

    let venue, total_prize, team_size, time_limit, registration_fee, rules, judging_criterion, general_guidelines, poster;



    if(events_data['venue']){
        venue = `<li>Venue: <span class="venue">${events_data['venue']}</span></li>`
    }else{
        venue = ''
    }

    if(events_data['Prizes Worth']){
       total_prize = `<li>Total Prize Pool: <span id="total_prize">${events_data['Prizes Worth']}</span></li>`

    }else{
        total_prize = ''
    }

    team_size = events_data['Team Size'] ? `<li>Team Size: <span id="team_size">${events_data['Team Size']}</span></li>
    `:``;

    time_limit = events_data['Time Limit'] ? `<li>Time Limit : <span id="time_limit">${events_data['Time Limit']}</span></li>
    `:``;

    registration_fee = events_data['Registration Fee'] ? `<li>Registration Fee: <span id="registration_fee">${events_data['Registration Fee']}</span></li>
    `:``;

    rules = events_data['Rules'] ? `<li> Rules :
    <ol id="rules">
        ${events_data['Rules'].map(rule => `<li>${rule}</li>`).join('')}
    </ol>
</li>`:``;

    judging_criterion = events_data['Judging Criterion'] ? `<li>
    Judging Criterion:
    <ul id="judging_criterion">
        ${events_data['Judging Criterion'].map(criterion => `<li>${criterion}</li>`).join('')}
    </ul>
</li>`:``;
 
    general_guidelines = events_data['General Guidelines'] ? `<li>
    General Guidelines:
    <ul id="general_guidelines">
        ${events_data['General Guidelines'].map(guideline => `<li>${guideline}</li>`).join('')}
    </ul>
</li>`:``;

    //replace all _ with space
    const category = events_data['Category'].replace(/_/g, ' ');

    const container = `
    <div class="container">

    <div class="title"
        style="background-image: url('${events_data['Backdrop']}');">
        <div class="backdrop">
            <h1 id="name">${events_data['Name']}</h1>
            <span class="event-tags"><span id="category">${category}</span> | <span id="date">${events_data['Date']}</span>
                | <span id="time">${events_data['Time']}</span></span>
        </div>
    </div>
    <div class="metadata">

        <div class="left">
            <div class="poster-container">
                <img src="${events_data["Image URL"]}" id="poster" alt="" srcset="">
            </div>
        </div>
        <div class="right">
            <ul>
                ${venue}
                ${total_prize}
                ${team_size}
                ${time_limit}
                ${registration_fee}
                ${rules}
                ${judging_criterion}
                ${general_guidelines}
            </ul>
        </div>


    </div>

</div>`

    document.getElementById('wrapper').innerHTML = container;
}