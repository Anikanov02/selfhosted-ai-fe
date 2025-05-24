import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { AuthControllerApi, SignInRequest } from "../../api/apis/AuthControllerApi";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/AppRoutes";

// Validation schema
const validationSchema = Yup.object({
  login: Yup.string().required("Login is required"),
  password: Yup.string()
    .min(8, "Min 8 characters")
    .max(16, "Max 16 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const { setCredentials } = useAuth();
  const navigate = useNavigate(); 

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={3} align="center">
        Login
      </Typography>

      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);

          const { login, password } = values;

          const api = new AuthControllerApi();

          const request: SignInRequest = {
            userLoginRequest: {
              login,
              password,
            },
          };

          try {
            await api.signInRaw(request);
            setStatus({ success: "Login successful" });
            setCredentials(login, password);
            navigate(AppRoutes.MAIN)
            // TODO: redirect or update app state here
          } catch (e: any) {
            console.error(e);
            setStatus({ error: "Login failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status, touched, errors }) => (
          <Form noValidate>
            {status?.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {status.error}
              </Alert>
            )}
            {status?.success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status.success}
              </Alert>
            )}

            <Field name="login">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Login"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.login && errors.login)}
                  helperText={touched.login && errors.login ? errors.login : ""}
                />
              )}
            </Field>

            <Field name="password">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password ? errors.password : ""}
                />
              )}
            </Field>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 3 }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link to={AppRoutes.REGISTER}>Register here</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
