export const state = () => ({
    user_questions: [],
    current_question: {
        "id": "",
        "question_data": {
            "question": "",
            "tags": [],
            "id": "",
            "advice": "",
            "marks": 0
        },
        "user_data": {
            "rich_text": [],
            "datetime": ""
        },
        "raw_user_data": {}
    },
    general_advice: "",
    editor: undefined,
    saving_interval: undefined,
    checking_interval: undefined
})

export const mutations = {
    set_saving_interval(state, interval) {
        state.saving_interval = interval;
    },
    set_checking_interval(state, interval) {
        state.checking_interval = interval;
    },
    clear_intervals(state) {
        clearInterval(state.saving_interval);
        clearInterval(state.checking_interval);
    },
    modify_editor(state, editor) {
        state.editor = editor;
    },
    modify_user_questions(state, uq) {
        state.user_questions = uq;
    },
    modify_current_question(state, question) {
        state.current_question = question;
    },
    change_one_user_question(state, new_question) {
        for (i = 0; i < state.user_questions.length; i++) {
            if (state.user_questions[i].id === new_question.id) {
                state.user_questions[i] = new_question;
                break
            }
        }
    },
    upload_general_advice(state, advice) {
        state.general_advice = advice;
    },
    change_richtext_and_datetime(state, obj) {
        let i;
        for (i = 0; i < state.user_questions.length; i++) {
            if (state.user_questions[i].id === obj.id && state.current_question.id === obj.id) {
                state.user_questions[i].user_data.rich_text = obj.rich_text;
                state.user_questions[i].user_data.datetime = obj.new_date;
                state.current_question.user_data.rich_text = obj.rich_text;
                state.current_question.user_data.datetime = obj.new_date;
                state.current_question.raw_user_data = obj.raw;
                break;
            }
        }
    } // obj : {id, rich_text, new_date, raw} 
};

export const actions = {
    async get_user_questions(context) {
        /* console.log("THIS HAS RUN"); */
        if (context.state.user_questions.length === 0) {
            let raw_questions = await this.$http.$get(
                "https://z-dot.github.io/stable/questions%20v1.json"
            );
            context.commit("upload_general_advice", raw_questions.general_advice)
            let output_questions = [];
            let question;
            for (question of raw_questions.questions) {
                let i;
                let temp_tags = [];
                for (i = 0; i < question.tags.length; i++) {
                    temp_tags.push({ key: i, text: question.tags[i] });
                }
                output_questions.push({
                    question: question.question,
                    tags: temp_tags,
                    id: question.id,
                    advice: question.advice,
                    marks: question.marks,
                });
            }
            let out = [];
            let temp_question = {};
            let user_temp = {};
            for (question of output_questions) {
                temp_question = {};
                temp_question.question_data = question;
                temp_question.id = question.id;
                if (localStorage.getItem(question.id)) {
                    user_temp = JSON.parse(localStorage.getItem(question.id));
                    temp_question.raw_user_data = user_temp;
                    temp_question.user_data = {
                        rich_text: user_temp.blocks,
                        datetime: new Date(user_temp.time).toDateString(),
                    };
                } else {
                    temp_question.user_data = {
                        rich_text: {},
                        datetime: "Never edited",
                    };
                }
                out.push(temp_question);
            }
            /* console.log(out); */
            context.commit("modify_user_questions", out)
        }
    }
}