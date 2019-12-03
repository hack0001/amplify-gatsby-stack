import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import styles from "../../styles/SignIn";

const NewPass = ({
  classes,
  error,
  header,
  direction,
  handleSignIn,
  handleUpdate,
  newPassRequired,
  handlePasswordChange,
  newPassword1,
  newPassword2
}) => {
  return (
    <Fragment>
      <Slide direction={direction} in={newPassRequired}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {header}
            </Typography>
            <form className={classes.form} onSubmit={handlePasswordChange}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">New Password</InputLabel>
                <Input
                  name="newPassword1"
                  value={newPassword1}
                  type="password"
                  id="password1"
                  autoComplete="current-password"
                  onChange={handleUpdate}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm New Password</InputLabel>
                <Input
                  name="newPassword2"
                  value={newPassword2}
                  type="password"
                  id="password2"
                  autoComplete="current-password"
                  onChange={handleUpdate}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change Password
              </Button>
            </form>
          </Paper>
        </main>
      </Slide>
      <Typography component="h5" variant="h5" className={classes.error}>
        {error}
      </Typography>
    </Fragment>
  );
};

NewPass.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NewPass);
