import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.queryByText("Contact Form");
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const nameInput = screen.queryByPlaceholderText("Edd");
  userEvent.type(nameInput, "J");
  const errors = await screen.queryAllByTestId("error");
  expect(errors).toHaveLength(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  const submitButton = screen.queryByRole("button");
  userEvent.click(submitButton);
  const errors = await screen.queryAllByTestId("error");
  expect(errors).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const submitButton = screen.queryByRole("button");
  const nameInput = screen.queryByPlaceholderText("Edd");
  userEvent.type(nameInput, "Jonathan");
  const lastInput = screen.queryByPlaceholderText("Burke");
  userEvent.type(lastInput, "Calderon");
  userEvent.click(submitButton);
  const errors = await screen.queryAllByTestId("error");
  expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(emailInput, "J");
  const alert = await screen.queryByText(
    "Error: email must be a valid email address."
  );
  expect(alert).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const submitButton = screen.queryByRole("button");
  userEvent.click(submitButton);
  const alert = await screen.queryByText(
    "Error: lastName is a required field."
  );
  expect(alert).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const submitButton = screen.queryByRole("button");
  const nameInput = screen.queryByPlaceholderText("Edd");
  userEvent.type(nameInput, "Jonathan");
  const lastInput = screen.queryByPlaceholderText("Burke");
  userEvent.type(lastInput, "Calderon");
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(emailInput, "djgdgobierno@gmail.com");
  userEvent.click(submitButton);
  const name = await screen.queryByTestId("firstnameDisplay");
  const last = await screen.queryByTestId("lastnameDisplay");
  const email = await screen.queryByTestId("emailDisplay");
  expect(name).toBeInTheDocument();
  expect(last).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const submitButton = screen.queryByRole("button");
  const nameInput = screen.queryByPlaceholderText("Edd");
  userEvent.type(nameInput, "Jonathan");
  const lastInput = screen.queryByPlaceholderText("Burke");
  userEvent.type(lastInput, "Calderon");
  const messageInput = screen.getByRole("textbox");
  userEvent.type(messageInput, "My message is:");
  const emailInput = screen.queryByPlaceholderText("bluebill1049@hotmail.com");
  userEvent.type(emailInput, "djgdgobierno@gmail.com");
  userEvent.click(submitButton);
  const name = await screen.queryByTestId("firstnameDisplay");
  const last = await screen.queryByTestId("lastnameDisplay");
  const email = await screen.queryByTestId("emailDisplay");
  const message = await screen.queryByTestId("messageDisplay");
  expect(name).toBeInTheDocument();
  expect(last).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});
