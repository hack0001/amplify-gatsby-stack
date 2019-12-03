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

const ForgotPass = ({
  classes,
  error,
  email,
  header,
  direction,
  handleSignIn,
  handleUpdate,
  forgotPassword,
  handleForgotPasswordReset,
  forgotPasswordCode,
  forgotPasswordReset,
  forgotPasswordResetConfirm
}) => {
  return (
    <Fragment>
      <Slide direction={direction} in={forgotPassword}>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {header}
            </Typography>
            <form className={classes.form} onSubmit={handleForgotPasswordReset}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  value={email}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleUpdate}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="forgotPasswordCode">Code</InputLabel>
                <Input
                  id="forgotPasswordCode"
                  value={forgotPasswordCode}
                  name="forgotPasswordCode"
                  autoComplete="forgotPasswordCode"
                  autoFocus
                  onChange={handleUpdate}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="forgotPasswordReset">
                  New Password
                </InputLabel>
                <Input
                  id="forgotPasswordReset"
                  value={forgotPasswordReset}
                  type="password"
                  name="forgotPasswordReset"
                  autoComplete="forgotPasswordReset"
                  autoFocus
                  onChange={handleUpdate}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="forgotPasswordResetConfirm">
                  Confirm New Password
                </InputLabel>
                <Input
                  id="forgotPasswordResetConfirm"
                  value={forgotPasswordResetConfirm}
                  type="password"
                  name="forgotPasswordResetConfirm"
                  autoComplete="forgotPasswordResetConfirm"
                  autoFocus
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
                SUBMIT
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

ForgotPass.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ForgotPass);
