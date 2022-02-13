import { superstructResolver } from "@hookform/resolvers/superstruct";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { nonempty, object, pattern, string } from "superstruct";
import { useAppDispatch } from "../core/hooks";
import { actions } from "../core/store";
import { User } from "../core/types";

interface FormValue {
  name: string;
  email: string;
}

const LABEL_COLS = 3;

// Extracted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const schema = object({
  name: nonempty(string()),
  email: nonempty(pattern(string(), EMAIL_REGEX)),
});

const UsersPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onSubmit",
    resolver: superstructResolver(schema),
  });

  const onSubmit = async (form: FormValue) => {
    const user: User = form;

    await dispatch(actions.users.addOne(user));
    navigate("/");
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Form</Card.Title>
      </Card.Header>

      <Card.Body>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} controlId="name">
            <Form.Label className="text-center" column xs={LABEL_COLS}>
              Name
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                Valid name is required.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group className="mt-4" as={Row} controlId="email">
            <Form.Label className="text-center" column xs={LABEL_COLS}>
              Email
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="Email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                Valid email is required.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Row className="mt-4">
            <Col className="ms-auto" xs="auto">
              <LinkContainer to="/">
                <Button type="button" variant="outline-danger">
                  Cancel
                </Button>
              </LinkContainer>
            </Col>
            <Col xs="auto">
              <Button type="submit" variant="success">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UsersPost;
