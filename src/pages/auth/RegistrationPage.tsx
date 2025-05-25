import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";
import { AuthControllerApi, SignupRequest } from "../../api/apis/AuthControllerApi";
import { Configuration } from "../../api/runtime";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/AppRoutes";

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be between 8 and 16 characters")
    .max(16, "Password must be between 8 and 16 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterPage = () => {
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
        Register
      </Typography>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);
          const { firstName, lastName, email, password } = values;

          const api = new AuthControllerApi();

          const request: SignupRequest = {
            userSignupRequest: {
              firstName,
              lastName,
              email,
              password,
            },
          };

          try {
            const response: any = await api.signup(request);
            setStatus({ success: "Registration successful" });
            setCredentials(email, password, response.id);
            navigate(AppRoutes.MAIN)
            // TODO: redirect or update app state here
          } catch (e: any) {
            console.error(e);
            setStatus({ error: "Registration failed" });
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

            <Field name="firstName">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName ? errors.firstName : ""}
                />
              )}
            </Field>

            <Field name="lastName">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName ? errors.lastName : ""}
                />
              )}
            </Field>

            <Field name="email">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email ? errors.email : ""}
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

            <Field name="confirmPassword">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
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
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account? <Link to={AppRoutes.LOGIN}>Login here</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
