import { Wrapper } from "../components/Wrapper/Wrapper";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <Wrapper type="login">
        <LoginForm />
      </Wrapper>
    </>
  );
};
