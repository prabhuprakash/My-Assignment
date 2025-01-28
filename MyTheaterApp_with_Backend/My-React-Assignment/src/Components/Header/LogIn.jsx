import { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputFields = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  background-color: ${(props) => (props.$bgstatus ? "#e0f7fa" : "#f94848")};
  border: 1px solid #00796b;
  padding: 5px;
  border-radius: 4px;
  color: #004d40;
  &:focus {
    outline: none;
    border-color: #004d40;
    background-color: #ffffff;
  }
`;

const P = styled.p`
  color: ${(props) => (props.error ? "red" : "inherit")};
`;

const Button = styled.button`
  background-color: #00796b;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    background-color: #00564d;
  }
`;

const AuthForm = ({ onLogIn }) => {
  const [validInput, setValidInput] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Mutation to handle API calls
  const mutation = useMutation({
    mutationFn: async ({ username, password }) => {
      const endpoint = isSignUp
        ? "http://localhost:8080/signup"
        : "http://localhost:8080/signin";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      if (!response.ok) {
        throw new Error(data);
      }
      return data;
    },
    onSuccess: (data) => {
      setSuccessMessage(data); // Display success message for both sign-in and sign-up
      if (!isSignUp) onLogIn(user); // Pass API response to parent for login
    },
    onError: (error) => {
      setSuccessMessage(""); // Clear success message on error
      console.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "" || password === "") {
      setValidInput(false);
      return;
    }

    setValidInput(true);
    mutation.mutate({ username: user, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputFields>
        <label htmlFor="userName">User Name:</label>
        <Input
          type="text"
          placeholder="User Name"
          onChange={(e) => {
            setUser(e.target.value);
            setValidInput(true);
          }}
          $bgstatus={validInput}
          id="userName"
        />
        <label htmlFor="password">Password:</label>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          $bgstatus={validInput}
          id="password"
        />
      </InputFields>
      {!validInput && <P error>Both fields are required!</P>}
      {mutation.isError && <P error>{mutation.error.message}</P>}
      {successMessage && <P>{successMessage}</P>}

      <Button type="submit" disabled={mutation.isLoading}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Button>
      <P>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Button
          type="button"
          onClick={() => {
            setIsSignUp((prev) => !prev);
            setSuccessMessage(""); // Clear success message when toggling between sign-up and sign-in
          }}
          style={{ background: "none", color: "#00796b", textDecoration: "underline", padding: 0 }}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </P>
    </Form>
  );
};

export default AuthForm;
