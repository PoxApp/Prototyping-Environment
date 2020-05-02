import { Questionnaire, QuestionType } from "covquestions-js/models/Questionnaire.generated";

const testQuestionnaire: Questionnaire = {
  id: "simpleTextQuestion",
  schemaVersion: "1",
  version: 1,
  language: "en",
  title: "Simple text question",
  meta: {
    author: "Someone",
    availableLanguages: ["en"],
    creationDate: "2020-04-13T14:48:48+0000",
  },
  questions: [
    {
      id: "q1_text",
      text: "Geben Sie bitte 'test' ein um ein Resultat zu sehen.",
      type: "text",
      optional: true,
    },
  ],
  variables: [],
  resultCategories: [
    {
      id: "rc_text",
      description: "Text",
      results: [
        {
          id: "TEXT",
          text: "Sie können simple Anweisungen befolgen.",
          expression: {
            "==": [{ var: "q1_text.value" }, "test"],
          },
        },
      ],
    },
  ],
};

export default testQuestionnaire;
