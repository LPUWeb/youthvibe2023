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
    }
    else {
        document.getElementById('other_college_indvidual').style.display = 'flex';
        document.getElementById('lpu_reg_no').style.display = 'none';

    }
}
const render_college_field_if_not_lpu_team = () => {
    // console.log('render_college_field_if_not_lpu');
    const is_lpu = document.querySelector('input[name="is_lpu_team"]:checked').value;
    if (is_lpu === 'true') {
        is_lpu_team = true;
        document.getElementById('other_college_team').style.display = 'none';
        document.getElementById('lpu_reg_no_team').style.display = 'flex';
        document.querySelectorAll('.team_members_lpu_id').forEach((el) => {
            console.log(el);
            el.style.display = 'flex';
        }
        );
    }
    else {
        is_lpu_team = false;
        document.getElementById('other_college_team').style.display = 'flex';
        document.getElementById('lpu_reg_no_team').style.display = 'none';
        document.querySelectorAll('.team_members_lpu_id').forEach((el) => {
            console.log(el);
            el.style.display = 'none';
        }
        );
    }
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

    // console.log(document.querySelectorAll('.is_lpu'));
   

}