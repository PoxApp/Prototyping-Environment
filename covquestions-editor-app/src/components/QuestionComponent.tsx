import React, { useState } from "react";
import { Primitive, Question } from "@covopen/covquestions-js";
import { Button, createStyles, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { QuestionFormComponent } from "./questionComponents/QuestionFormComponent";

type QuestionComponentProps = {
  currentQuestion: Question;
  handleNextClick: (value: Primitive | Array<Primitive> | undefined) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: "#F7FAFC",
      border: "1.5px solid #CBD5E0",
      borderRadius: 6,
      boxSizing: "border-box",
      boxShadow: "none",
      padding: 20,
    },
  })
);

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ currentQuestion, handleNextClick }) => {
  const [currentValue, setCurrentValue] = useState<Primitive | Array<Primitive> | undefined>(undefined);

  const classes = useStyles();

  const next = () => {
    handleNextClick(currentValue);
    setCurrentValue(undefined);
  };

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" alignItems="stretch">
        <Grid item xs={12}>
          <QuestionFormComponent currentQuestion={currentQuestion} onChange={setCurrentValue} value={currentValue} />
        </Grid>
        {currentQuestion.details ? (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography>Hint:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{currentQuestion.details}</Typography>
            </Grid>
          </Grid>
        ) : undefined}
        <Grid container item xs={12} justify="flex-end">
          <Grid item>
            <Button
              onClick={next}
              variant="contained"
              color="primary"
              disabled={!currentQuestion.optional && currentValue === undefined}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
