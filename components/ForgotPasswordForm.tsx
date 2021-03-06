import { Button, Form } from "antd";
import { Field, Formik } from "formik";
import Router from "next/router";
import * as React from "react";
import { InjectedIntl } from "react-intl";
import { ForgotPasswordComponent } from "../generated/apolloComponents";
import withIntl from "../lib/withIntl";
import InputField from "./field/InputField";

export interface IForgotPasswordFormProps {
  intl: InjectedIntl;
}

class ForgotPasswordForm extends React.Component<IForgotPasswordFormProps, {}> {
  public render() {
    const { intl } = this.props;
    return (
      <ForgotPasswordComponent>
        {forgotPassword => (
          <Formik
            onSubmit={async values => {
              await forgotPassword({
                variables: values
              });
              Router.push("/check-email");
            }}
            initialValues={{
              email: ""
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  type="email"
                  placeholder=""
                  value={values.email}
                  component={InputField}
                  required
                  id="emailField"
                  label={intl.formatMessage({
                    id: "email",
                    defaultMessage: "E-email"
                  })}
                />
                <Button type="primary" htmlType="submit">
                  {intl.formatMessage({
                    id: "reset_password",
                    defaultMessage: "Reset password"
                  })}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    );
  }
}

export default withIntl(ForgotPasswordForm);
