let is_lpu_team = true;


const toggle_indvidual_team_form = () => {
    const team_form = document.getElementById('team_form');
    const individual_form = document.getElementById('individual_form');
    const team_form_btn = document.getElementById('team_button');
    const individual_form_btn = document.getElementById('individual_button');

    team_form_btn.addEventListener('click', () => {
        team_form.style.display = 'flex';
        individual_form.style.display = 'none';
        team_form_btn.style.backgroundColor = '#ff0000';
        individual_form_btn.style.backgroundColor = '#000';
    });


    individual_form_btn.addEventListener('click', () => {
        team_form.style.display = 'none';
        individual_form.style.display = 'flex';
        team_form_btn.style.backgroundColor = '#000';
        individual_form_btn.style.backgroundColor = '#ff0000';
    });
}

const render_members_card = (is_lpu_team) => {
    const ts_selector = document.getElementById('team_size_selector');
    const team_size = ts_selector.value;
    const team_members = document.getElementById('member_container');
    team_members.innerHTML = '';
    for (let i = 1; i < team_size; i++) {
        team_members.innerHTML += `
        <div class="team-member-detail-card" id="memeber_${i+1}">
                    <div class="field-container">
                        <span class="label">Member ${i+1}'s First Name:</span>
                        <input type="text" placeholder="First Name">
                    </div>
                    <div class="field-container">
                        <span class="label">Member ${i+1}'s Last Name:</span>
                        <input type="text" placeholder="Last Name">
                    </div>
                    <div class="field-container">
                        <span class="label">Member ${i+1}'s Email:</span>
                        <input type="email" placeholder="Email">
                    </div>
                    <div class="field-container">
                        <span class="label">Member ${i+1}'s Phone Number:</span>
                        <input type="tel" placeholder="Phone Number">
                    </div>

                    <div class="field-container" style="width: 80%;">
                        <div class="label">Member ${i+1}'s Gender:</div>
                        <div class="radio-container">
                            <div class="radio-option">
                                <input type="radio" class="igender-radio" checked name="Member_${i+1}_Gender" value="Male"
                                    id="Member_${i+1}_Male">
                                <label for="Member_${i+1}_Male">Male</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="gender-radio" name="Member_${i+1}_Gender" value="Female"
                                    id="Member_${i+1}_Female">
                                <label for="Member_${i+1}_Female">Female</label>
                            </div>
                            <div class="radio-option">
                                <input type="radio" class="gender-radio" name="Member_${i+1}_Gender" value="Other"
                                    id="Member_${i+1}_Other">
                                <label for="Member_${i+1}_Other">Other</label>
                            </div>
                        </div>
                </div>
                    ${
                        is_lpu_team ?
                            `
                            <div class="field-container team_members_lpu_id" style="width: 75%;">
                                <span class="label">LPU Registeration No:</span>
                                <input type="number" placeholder="Registeration Number">
                            </div>
                            `:``
                    }

                </div>
        `;
    }
}

/**
 * <div class="field-container" class="team_members_lpu_id"  style="width: 75%;">
                        <span class="label">LPU Registeration No:</span>
                        <input type="number" placeholder="Registeration Number">
                    </div>
 */
const render_college_field_if_not_lpu_individual = () => {
    // console.log('render_college_field_if_not_lpu');
    const is_lpu = document.querySelector('input[name="is_lpu"]:checked').value;
    if (is_lpu === 'true') {
        document.getElementById('other_college_indvidual').style.display = 'none';
        document.getElementById('lpu_reg_no').style.display = 'flex';
        document.getElementById('accomodation_container_ind').style.display = 'none';
        document.getElementById('accomodation_select_container_ind').style.display = 'none';

    }
    else {
        document.getElementById('other_college_indvidual').style.display = 'flex';
        document.getElementById('lpu_reg_no').style.display = 'none';
        document.getElementById('accomodation_container_ind').style.display = 'flex';
        document.getElementById('accomodation_select_container_ind').style.display = 'flex';



    }
}
const render_college_field_if_not_lpu_team = () => {
    // console.log('render_college_field_if_not_lpu');
    const is_lpu = document.querySelector('input[name="is_lpu_team"]:checked').value;
    if (is_lpu === 'true') {
        is_lpu_team = true;
        document.getElementById('other_college_team').style.display = 'none';
        document.getElementById('lpu_reg_no_team').style.display = 'flex';
        document.getElementById('accomodation_container_team').style.display = 'none';
        document.getElementById('accomodation_select_container_team').style.display = 'none';


        document.querySelectorAll('.team_members_lpu_id').forEach((el) => {
            el.style.display = 'flex';
        }
        );
    }
    else {
        is_lpu_team = false;
        document.getElementById('other_college_team').style.display = 'flex';
        document.getElementById('lpu_reg_no_team').style.display = 'none';
        document.getElementById('accomodation_container_team').style.display = 'flex';
        document.getElementById('accomodation_select_container_team').style.display = 'flex';
        document.querySelectorAll('.team_members_lpu_id').forEach((el) => {
            console.log(el);
            el.style.display = 'none';
        }
        );
    }
}


const render_accomodation_ind_container = () => {
    const accomodation_container = document.getElementById('accomodation_container_ind');
    const accomodation = document.getElementById('accomodation_select_ind').value;
    if (accomodation === 'yes') {
        accomodation_container.style.display = 'flex';
    }
    else {
        accomodation_container.style.display = 'none';
    }
}

const calculate_total_cost_individual = () => {
    const event_cost_for_lpu = 500;
    const event_cost_for_non_lpu = 800;

    let event_cost = 0;

    const is_lpu = document.querySelector('input[name="is_lpu"]:checked').value;

    if (is_lpu === 'true') {
        event_cost = event_cost_for_lpu;
    }
    else {
        event_cost = event_cost_for_non_lpu;
    }

    
    const events = $('.event-option>input[type="checkbox"]').slice(0,9);
    let no_of_checked_events = 0;
    events.each((i, el) => {
        if (el.checked) {
            no_of_checked_events++;
        }
    });

    const is_accomodation_slected = document.getElementById('accomodation_select_ind').value;
    let accomodation_cost = 0;
    if (is_accomodation_slected === 'yes' && is_lpu === 'false') {
        accomodation_cost = document.getElementById('total_accomodation_price_ind').innerText;
    }

    const total_cost = no_of_checked_events * event_cost + parseInt(accomodation_cost);

    return total_cost;
    // const accomodation = document.getElementById('total_accomodation_price_ind').value;
    // let total_cost = 0;
}

const render_accomodation_team_container = () => {
    const accomodation_container = document.getElementById('accomodation_container_team');
    const accomodation = document.getElementById('accomodation_select_team').value;
    if (accomodation === 'yes') {
        accomodation_container.style.display = 'flex';
    }
    else {
        accomodation_container.style.display = 'none';
    }
}
const calculate_team_accomodation_cost = (start,end) => {
    const participant_rate = 800;
    const staff_rate = 1000;
    const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
    
    let total_male_participants = parseInt(document.getElementById('male_participant_number_accomodation').value) || 0;
    let total_female_participants = parseInt(document.getElementById('female_participant_number_accomodation').value) || 0;


    let total_male_staff = parseInt(document.getElementById('male_staff_number_accomodation').value ) || 0;
    let total_female_staff = parseInt(document.getElementById('female_staff_number_accomodation').value ) || 0;


    let total_participants = total_female_participants + total_male_participants;
    let total_staff = total_female_staff + total_male_staff;
    
    
    total_participants = total_participants || 0;
    total_staff = total_staff || 0;


    const total_cost = (total_participants*days*participant_rate) + (total_staff*days*staff_rate);

    return total_cost;

}

const calculate_total_cost_team = () => {
    const event_cost_for_lpu = 500;
    const event_cost_for_non_lpu = 800;

    let event_cost = 0;

    const is_lpu = document.querySelector('input[name="is_lpu_team"]:checked').value;

    if (is_lpu === 'true') {
        event_cost = event_cost_for_lpu;
    }
    else {
        event_cost = event_cost_for_non_lpu;
    }

    const events = $('.event-option>input[type="checkbox"]').slice(9);
    let no_of_checked_events = 0;
    events.each((i, el) => {
        if (el.checked) {
            no_of_checked_events++;
        }
    }
    );

    const is_accomodation_slected = document.getElementById('accomodation_select_team').value;
    let accomodation_cost = 0;
    if (is_accomodation_slected === 'yes' && is_lpu === 'false') {
        accomodation_cost = document.getElementById('total_accomodation_price_team').innerText;
    }

    const team_size = document.getElementById('team_size_selector').value;
    const total_cost = no_of_checked_events * event_cost * team_size + parseInt(accomodation_cost);

    return total_cost;

}

window.onload = function () {
    document.getElementById('burger_menu_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });

    document.getElementById('burger_menu_close_btn').addEventListener('click', function () {
        document.getElementById('burger_menu').classList.toggle('nav-slide-active');
    });

    toggle_indvidual_team_form();

    document.querySelectorAll('.is_lpu').forEach((el) => {
        el.addEventListener('change', render_college_field_if_not_lpu_individual);
    });
    document.querySelectorAll('.is_lpu_team').forEach((el) => {
        el.addEventListener('change', render_college_field_if_not_lpu_team);
    });
    
    render_members_card(is_lpu_team);




    const team_size_selector = document.getElementById('team_size_selector');
    team_size_selector.addEventListener('change',  render_members_card);


    const accomodation_select = document.getElementById('accomodation_select_ind');
    accomodation_select.addEventListener('change', render_accomodation_ind_container);
    // console.log(document.querySelectorAll('.is_lpu'));
     

    const accomodation_select_team = document.getElementById('accomodation_select_team');
    accomodation_select_team.addEventListener('change', render_accomodation_team_container);


    $('#check_in_check_out_ind_range').daterangepicker({
        "showDropdowns": true,
        "autoApply": true, 
        "startDate": new Date(2023, 3, 29),
        "endDate": new Date(2023, 4, 4),
        "minDate": new Date(2023, 3, 29),
        "maxDate": new Date(2023, 4, 4),
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
        }
    }, function (start, end, label) {
        //calculate days
        const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
        document.getElementById('total_accomodation_price_ind').innerHTML = days*800;

    }
    );
    $('#check_in_check_out_team_range').daterangepicker({
        "showDropdowns": true,
        "autoApply": true,
        "startDate": new Date(2023, 3, 29),
        "endDate": new Date(2023, 4, 4),
        "minDate": new Date(2023, 3, 29),
        "maxDate": new Date(2023, 4, 4),
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
        }
    }, function (start, end, label) {
        //calculate days
        document.getElementById('total_accomodation_price_team').innerText = calculate_team_accomodation_cost(start, end);

    }
    );


    document.getElementById('individual_form').addEventListener('change', function (e) {
        const total_cost = calculate_total_cost_individual();
        document.getElementById('total_cost_ind').innerHTML = total_cost;
    });

    document.getElementById('team_form').addEventListener('change', function (e) {
        const total_cost = calculate_total_cost_team();
        document.getElementById('total_cost_team').innerHTML = total_cost;
    });
    


    $('.accomodation-field-container>input[type="number"]').each((i, el) => {
        el.addEventListener('change', function (e) {
            const start = $('#check_in_check_out_team_range').data('daterangepicker').startDate;
            const end =  $('#check_in_check_out_team_range').data('daterangepicker').endDate;
            document.getElementById('total_accomodation_price_team').innerText = calculate_team_accomodation_cost(start, end);
        });
    });

    
    /*.on('change', function (e) {
        const start = $('#check_in_check_out_team_range').data('daterangepicker').startDate;
        const end =  $('#check_in_check_out_team_range').data('daterangepicker').endDate;
        document.getElementById('total_accomodation_price_team').innerText = calculate_team_accomodation_cost(start, end);
    });*/
}