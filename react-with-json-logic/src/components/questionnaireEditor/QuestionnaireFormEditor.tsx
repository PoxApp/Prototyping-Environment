import {
  Button,
  Grid,
  ListItemText,
  Divider,
  ListItem,
  List,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IQuestionnaire, IQuestionnaireMeta, IQuestion, IResultCategory, IVariable } from "../../logic/schema";
import { ElementEditor } from "./ElementEditor";

type QuestionnaireFormEditorProps = {
  value: IQuestionnaire | undefined;
  onChange: (value: IQuestionnaire) => void;
  formHeight: string;
};

type Selection = {
  type: string;
  index?: number;
};

export function QuestionnaireFormEditor(props: QuestionnaireFormEditorProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      selectionList: {
        width: "100%",
      },
      selectionListDivider: {
        width: "100%",
      },

      selection: {
        height: props.formHeight,
        overflowY: "auto",
        overflowX: "hidden",
      },
      listItem: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: "2px",
        paddingBottom: "2px",
      },
      formContainer: {
        paddingLeft: "10px",
        height: props.formHeight,
      },
    })
  );

  const classes = useStyles();

  const [activeSelection, setActiveSelection] = useState<Selection>({ type: "meta" });
  const [questionnaire, setQuestionnaire] = useState<IQuestionnaire>({} as IQuestionnaire);

  const style = `
    .MuiTabs-root, .MuiTabs-scroller, .MuiTabs-flexContainer {
      margin: 0;
    }
    .rjsf > .MuiFormControl-root {
      height: ${props.formHeight};
      overflow-x: hidden !important;
      overflow-x: auto;
    }
    .rjsf .MuiBox-root {
      padding: 0;
    }
    .rjsf .MuiGrid-item {
      padding: 0px 8px 0px 8px;
    }
    .rjsf .form-group, .rjsf .panel-body {
      margin: 0;
    }
    `;

  const handleQuestionnaireMetaChanged = (value: IQuestionnaireMeta) => {
    questionnaire.meta = value;
    props.onChange(questionnaire);
  };

  const handleQuestionChanged = (index: number, value: IQuestion) => {
    questionnaire.questions[index] = value;
    props.onChange(questionnaire);
  };

  const handleResultCategoryChanged = (index: number, value: IResultCategory) => {
    questionnaire.resultCategories[index] = value;
    props.onChange(questionnaire);
  };

  const handleVariableChanged = (index: number, value: IVariable) => {
    questionnaire.variables[index] = value;
    props.onChange(questionnaire);
  };

  useEffect(() => {
    if (props.value === undefined) {
      setQuestionnaire({} as IQuestionnaire);
    } else {
      setQuestionnaire(props.value);
    }
  }, [props.value]);

  return (
    <Grid container direction="column">
      <style>{style}</style>
      <Grid container>
        <Grid container item xs={3} className={classes.selection}>
          <List className={classes.selectionList}>
            <ListItem
              className={classes.listItem}
              button
              selected={activeSelection.type === "meta"}
              onClick={() => setActiveSelection({ type: "meta", index: 0 })}
            >
              <ListItemText primary="Meta" />
            </ListItem>
          </List>
          <Divider className={classes.selectionListDivider} />
          <List className={classes.selectionList}>
            {questionnaire.questions !== undefined
              ? questionnaire.questions.map((item, index) => (
                  <ListItem
                    button
                    className={classes.listItem}
                    selected={activeSelection.type === "question" && activeSelection.index === index}
                    onClick={() => setActiveSelection({ type: "question", index })}
                    key={index}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))
              : null}
            <ListItem className={classes.listItem}>
              <Button variant="contained" color="secondary">
                Add Question
              </Button>
            </ListItem>
          </List>
          <Divider className={classes.selectionListDivider} />
          <List className={classes.selectionList}>
            {questionnaire.resultCategories !== undefined
              ? questionnaire.resultCategories.map((item, index) => (
                  <ListItem
                    button
                    className={classes.listItem}
                    selected={activeSelection.type === "resultCategory" && activeSelection.index === index}
                    onClick={() => setActiveSelection({ type: "resultCategory", index })}
                    key={index}
                  >
                    <ListItemText primary={item.id} />
                  </ListItem>
                ))
              : null}
            <ListItem className={classes.listItem}>
              <Button variant="contained" color="secondary">
                Add Result
              </Button>
            </ListItem>
          </List>
          <Divider className={classes.selectionListDivider} />
          <List className={classes.selectionList}>
            {questionnaire.variables !== undefined
              ? questionnaire.variables.map((item, index) => (
                  <ListItem
                    button
                    className={classes.listItem}
                    selected={activeSelection.type === "variable" && activeSelection.index === index}
                    onClick={() => setActiveSelection({ type: "variable", index })}
                    key={index}
                  >
                    <ListItemText primary={item.id} />
                  </ListItem>
                ))
              : null}
            <ListItem className={classes.listItem}>
              <Button variant="contained" color="secondary">
                Add Variable
              </Button>
            </ListItem>
          </List>
        </Grid>
        <Grid container item xs={9} className={classes.formContainer}>
          {activeSelection.type === "meta" ? (
            <ElementEditor
              schemaUrl="api/schema/questionnaireMeta.json"
              value={questionnaire.meta || ({} as IQuestionnaireMeta)}
              onChange={(value) => handleQuestionnaireMetaChanged(value as IQuestionnaireMeta)}
            />
          ) : null}
          {activeSelection.type === "question" &&
          activeSelection.index !== undefined &&
          questionnaire.questions !== undefined ? (
            <ElementEditor
              schemaUrl="api/schema/question.json"
              value={questionnaire.questions[activeSelection.index]}
              onChange={(value) =>
                handleQuestionChanged(
                  activeSelection.index !== undefined ? activeSelection.index : -1,
                  value as IQuestion
                )
              }
            />
          ) : null}
          {activeSelection.type === "resultCategory" &&
          activeSelection.index !== undefined &&
          questionnaire.resultCategories !== undefined ? (
            <ElementEditor
              schemaUrl="api/schema/resultCategory.json"
              value={questionnaire.resultCategories[activeSelection.index]}
              onChange={(value) =>
                handleResultCategoryChanged(
                  activeSelection.index !== undefined ? activeSelection.index : -1,
                  value as IResultCategory
                )
              }
            />
          ) : null}
          {activeSelection.type === "variable" &&
          activeSelection.index !== undefined &&
          questionnaire.variables !== undefined ? (
            <ElementEditor
              schemaUrl="api/schema/variable.json"
              value={questionnaire.variables[activeSelection.index]}
              onChange={(value) =>
                handleVariableChanged(
                  activeSelection.index !== undefined ? activeSelection.index : -1,
                  value as IVariable
                )
              }
            />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
