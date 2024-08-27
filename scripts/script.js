const delay = ms => new Promise(res => setTimeout(res, ms));
const wait_to_load = async () => {
    await delay(1000);
  };


function scroll_to_top(){
    wait_to_load();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
(function() {
    scroll_to_top();
 
 })();


// Define the correct answers for each question
const answers_of_questions = {
    "0": "3",
    "1": "1",
    "2": "2",
    "3":"3",
    "4": "2",
    "5": "1",
    
};

const answers_of_short_quizes = {
    "0":{
        "0" : `
        <p class="text">
        دقیقا.
        </p>
        <p class="text">
            در هزارتوی قسمت قبل میتوانید مشاهده کنید که فاصله منهتن خانه سمت چپ برابر با ۱۳ و فاصله منهتن خانه سمت راست برابر با ۱۱ است. با توجه به الگوریتم G-BFS باید حالت بعدی کمترین فاصله منهتن را داشته باشد بنابراین خانه سمت راست را به عنوان حالت بعدی انتخاب میکنیم
        </p>
        `,
        "1" : `
        <p class="text">
        درست نیست.
        </p>
        <p class="text">
            در هزارتوی قسمت قبل میتوانید مشاهده کنید که فاصله منهتن خانه سمت چپ برابر با ۱۳ و فاصله منهتن خانه سمت راست برابر با ۱۱ است. با توجه به الگوریتم G-BFS باید حالت بعدی کمترین فاصله منهتن را داشته باشد بنابراین خانه سمت راست را به عنوان حالت بعدی انتخاب میکنیم
        </p>
        `,
    },
    "1":{
        "0": "1",
        "1": "2"
    }
    
}



const current_co_part = document.querySelector(".current-active-part-txt");

function get_course_part_titles(){
    const c_part_titles = new Array();
    c_parts = document.querySelectorAll('[data-section-title]');
    c_parts.forEach(c_part => {
        const sec_title_value = c_part.dataset.sectionTitle;
        
        if (!c_part_titles.includes(sec_title_value)){
            c_part_titles.push(sec_title_value);
        } 
    });
    return c_part_titles;
}
function get_all_course_parts_titles(){
    const c_part_titles = new Array();
    c_parts = document.querySelectorAll('[data-section-title]');
    c_parts.forEach(c_part => {
        const sec_title_value = c_part.dataset.sectionTitle;
        c_part_titles.push(sec_title_value);
    });
    return c_part_titles;
}

const course_parts_titles = get_all_course_parts_titles()

function get_cp_title_count(title){
    const course_parts = document.querySelectorAll(`[data-section-title='${title}']`);
    const course_parts_count = course_parts.length;
    return course_parts_count;

}


function make_course_title_count(c_parts_titles){
    const course_parts_counts = []
    let counter = 0;
    c_parts_titles.forEach((c_part_title, index) => {
        cp_count = get_cp_title_count(c_part_title);
        counter += cp_count;
        course_parts_counts.push(counter);

    });
    return course_parts_counts;
}   

function mark_as_readed_course_part_nav(active_cp, course_part_nav_steps){
    console.log(course_part_nav_steps)
    const course_part_titles = get_course_part_titles();
    const cp_counts_array = make_course_title_count(course_part_titles);
    for (let index = 0; index < cp_counts_array.length; index++) {
        if (active_cp == cp_counts_array[index]){
            course_part_nav_steps[index].classList.add("completed");
        }
        
    }
}

function craete_course_parts_nav(){
    let scroll_wrapper = document.querySelector("#scroll_wrapper");
    const course_part_titles = get_course_part_titles();
    // progress 
    for (let i = 0; i < course_part_titles.length; i++){
        scroll_wrapper.appendChild(document.createElement("div"));
    }
    return scroll_wrapper;
}

let course_part_nav_steps = craete_course_parts_nav().querySelectorAll("div");



// Get all elements with the class name .question and .answer
const questions = document.querySelectorAll('.quiz.quiz-part');
const answers = document.querySelectorAll('.quiz-answer');


//sounds
const correct_sound_effect = document.querySelector("#correct_audio_sound_effect");
const fail_sound_effect = document.querySelector("#failed_audio_sound_effect");


// etc
questions.forEach((question, index) => {
    let answer_correctness = false;
    const options = question.querySelectorAll('input[type="radio"]');
    const showExplanationButton = question.querySelector('.show-explanation-btn');
    const showQuestionButton = answers[index].querySelector('.show_question');
    const question_body = question.querySelector('.body');
    const submit_btn = question.querySelector(".submit-quiz-btn");
    const next_sec_btn = question.parentElement.querySelector(".goto-next-btn");

    showExplanationButton.style.display = 'none';
    submit_btn.disabled = true;

    options.forEach((option) => {
        option.checked = false;
    });

    const options_points = question.querySelectorAll('.checkmark');
    const outer_option_points = question.querySelectorAll(".q_option");
    let play_sound = true;
    next_sec_btn.style.visibility = "hidden";
    submit_btn.addEventListener('click', () => {
        submit_btn.disabled = true;
        next_sec_btn.style.visibility = "visible";
        showExplanationButton.style.display = 'inline-block';

        question_body.style.color = "#888787";

        // Disable options after submit button is clicked
        options.forEach((option, option_index) => {
            option.disabled = true;
            if (option.checked) {
                if (option_index == answers_of_questions[index] - 1) {
                    answer_correctness = true;
                }
            }
            const question_options = question.querySelectorAll('.q_option');
            question_options.forEach((question_option) => {
                question_option.style.cursor = "no-drop";
            });
        });

        const co = question.querySelector(".submit-answer .correct");
        const inco = question.querySelector(".submit-answer .incorrect");
        
        // Check the answer and display corresponding message

        if (answer_correctness == true) {
            const sb_answer = question.querySelector(".submit-answer");
            points = document.createElement("div");
            points.classList.add("points");
            points.innerHTML = "<img src='images/rocket_svg.svg' alt='' ><span>15+ امتیاز</span>";
            sb_answer.appendChild(points);
            co.classList.add("animate");
            // co.style.display = "inline";
            if (play_sound == true) {
                correct_sound_effect.play();


            }
            play_sound = false;


        } else {
            inco.classList.add("animate");
            // inco.style.display = "inline";
            // Make the correct answer green
            options_points[answers_of_questions[index] - 1].style.backgroundColor = "#008200";
            outer_option_points[answers_of_questions[index] - 1].classList.add("correct");
            if (play_sound) {
                fail_sound_effect.play();

            }
            play_sound = false;

        }
    });

    // Add click event listener to options
    options.forEach((option) => {
        option.addEventListener('click', () => {
            submit_btn.disabled = false;
        });
    });

    // Add click event listener to show explanation button
    showExplanationButton.addEventListener('click', () => {
        question.style.display = 'none';
        answers[index].style.display = 'block';
    });

    // Add click event listener to show question button
    showQuestionButton.addEventListener('click', () => {
        answers[index].style.display = 'none';
        question.style.display = 'block';
       
    });
});

const course_parts = document.querySelectorAll(".course-part");
const goto_next_section_btns = document.querySelectorAll(".goto-next-btn");
let active_course_part = 0;
let quiz_answer_submited = 0;


// top progress bar navigation  
course_parts.forEach((course_part, cp_index) =>{
    course_part.style.display = "none"; 

});
course_parts[0].style.display = "block";
// write comment for this code

current_co_part.textContent = course_parts_titles[active_course_part]
function show_text(warped_element, text){
    warped_element.innerHTML = text;
}

function split_text_by_newline(text){
    const lines = text.split(/\n/);
    return lines;
}

function hide_gotonext_btn(btn_el){
    btn_el.style.opacity = 0;
    btn_el.style.display = "none";
}

function display_next_section(next_section, prev_section){
    if(next_section.classList.contains("two-col-container")){
        next_section.style.display = "flex";
    }else{
        next_section.style.display = "block";
    }
    next_section.classList.add("content-to-top");
    prev_section.classList.remove("content-to-top");
}

function scroll_to_pos(element){
    const headerOffset = 85;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
    
}


// grow first element of progress steps
// scroll_wrapper.querySelector("div").classList.add("grow-size");
function grow_last_active_progress_step(active_course_part){
    // scroll_wrapper = document.getElementById("scroll_wrapper");
    // course_part_nav_steps = scroll_wrapper.querySelectorAll("div");
    // alert(active_course_part-1);
    // alert(document.querySelector(".scroll-wrapper"));
    course_part_nav_steps.item(active_course_part).classList.toggle("grow-size");
    const sec = active_course_part-1;
    scroll_wrapper = document.getElementById("scroll_wrapper");
    course_part_nav_steps = scroll_wrapper.childNodes;
    course_part_nav_steps.item(sec).classList.toggle("grow-size");
    
    
    
}


function quiz_btn_clicked(btn){
    return btn.classList.contains("submitted");
}


// goto next section handle buttons
for (let i = 0; i < goto_next_section_btns.length; i++) {
    goto_next_section_btns[i].addEventListener("click", () => {
        goto_next_btn = goto_next_section_btns[i];
        //check that this is quiz-button clicked
         
        
        active_course_part += 1;
        mark_as_readed_course_part_nav(active_course_part, course_part_nav_steps);
        hide_gotonext_btn(goto_next_btn);
        display_next_section(course_parts[active_course_part],course_parts[active_course_part-1]);

        scroll_to_pos(course_parts[active_course_part]);
        current_co_part.textContent = course_parts_titles[active_course_part];
                
                    
        
       
    });
}

// short quizz
// sh_quiz_btns = document.querySelectorAll(".short-quiz-btn");
const sh_answers = document.querySelectorAll(".sh-answer");
sh_answers.forEach((sh_answer, sh_answer_index) =>{
    sh_answer.style.display = "none"; 

});
let sh_quiz_btns;
sh_quizes = document.querySelectorAll(".sh-quiz");
sh_quizes.forEach((sh_quiz , quiz_index) => {
    sh_quiz_btns = sh_quiz.querySelectorAll(".short-quiz-btn");
    for (let i = 0; i < sh_quiz_btns.length; i++) {
        sh_quiz_btns[i].addEventListener("click", () => {
            sh_quiz_btns[i].style.backgroundColor = "#dbdbdb";
            sh_answers[quiz_index].style.display = "block"; 
            course_parts[active_course_part].classList.remove("content-to-top");
            active_course_part +=1;
            course_parts[active_course_part].style.display = "block";
            course_parts[active_course_part].classList.remove("content-to-top");
            course_parts[active_course_part+1].classList.remove("content-to-top");

            // sh_btns_to_diable = sh_quiz_btns[i].parentElement.querySelectorAll(".short-quiz-btn");
            sh_quiz_btns.forEach((sh_btn_to_diable) =>{
                sh_btn_to_diable.disabled = true;
                sh_btn_to_diable.style.cursor = "no-drop";
    
            });
            show_text(sh_answers[quiz_index], answers_of_short_quizes[`${quiz_index}`][`${i}`]);
            scroll_to_pos(sh_quiz);
        });
    }
    
});



const qoutes = document.querySelectorAll(".qoute");
const video_sec = document.querySelectorAll(".video-sec-container");
const video_show_btn= document.querySelectorAll(".qoute-btn");
const video_next_btn= document.querySelectorAll(".goto-next-video");
video_show_btn.forEach((video , index) => {
    video.addEventListener("click", () => {
        qoutes[index].style.display = "none";
        video_show_btn[index].style.display = "none";
        video_sec[index].style.display = "block";
        video_next_btn[index].style.display = "block";
    });
});


document.querySelector(".finish-btn").addEventListener("click", () => {
    window.location.replace("finish.html");
});
full_width_btns = document.querySelectorAll(".iframe_btn");
iframes = document.querySelectorAll(".iframe_element");
full_width_btns.forEach((btn , index) => {
    btn.addEventListener("click", () =>{
        iframes[index].classList.toggle("full-width");
        btn.classList.toggle("btn-full");
    });
});