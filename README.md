Quicklinks: [Documents](https://drive.google.com/drive/folders/1YpAaD8_mvSkpHuIvbIJmsb08GLVQt8iE?usp=sharing) | [OpenAPI Spec](https://covopen.github.io/CovQuestions/swagger/index.html)

# PoxApp Prototyping Enviroment

This project provides a way to maintain and quickly adapt complex surveys and their evaluation in mutliple languages and versions. It also provides a javascript engine to run those Questionnaires in any environment, e.g. on a website, telephone-hotline or chatbot.

## Structure

### [Questionnaire Editor](/covquestions-editor-app/README.md) 

The Editor allows a quick adaption of any Questionnaire, it allows do define, try and test them via a WebApp.
You can define questions and logic to display specfic Questions depending on answers from others or a scoring logic.
At the end the Questionnaire can give a first Evaluation based on it logic.
All of this can be tested manually and automatically in the editor.

### [Questionnaire Engine](./covquestions-js/README.md) ([Docu](https://covopen.github.io/CovQuestions/))

The Engine allows you to run any specified questionnaire interactively.

#### [Script Language](./covscript/README.md)

A custom parser to make it easier to work with `json-logic` which we use under the hood for the questionnaire logic.

### [Questionnaire API](/api/README.md) ([Live Documentation](https://covopen.github.io/CovQuestions/swagger/index.html))

The API supplies all questionnaires in a static way, versioned and in multiple languages.

# Contribute

Have a look at our [CONTRIBUTING.md](/CONTRIBUTING.md) to get started.
