import { isEmpty } from "lodash";
import { useEffect } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components/macro";

import { useAppDispatch, useAppSelector } from "../core/hooks";
import { actions, selectors } from "../core/store";

const StyledRow = styled(Row)`
  align-items: center;
`;

const UsersList = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectors.users.selectAll);

  useEffect(() => {
    if (isEmpty(users)) dispatch(actions.users.fetchAll());
  }, []);

  return (
    <Card>
      <Card.Header>
        <StyledRow xs="auto">
          <Col>
            <Card.Title>User list</Card.Title>
          </Col>
          <Col className="ms-auto">
            <LinkContainer to="/new">
              <Button variant="primary">Add new</Button>
            </LinkContainer>
          </Col>
        </StyledRow>
      </Card.Header>

      <Card.Body>
        {!isEmpty(users) ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Username</td>
                <td>Email</td>
                <td>City</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address?.city}</td>
                  <td>
                    <Button variant="warning">edit</Button>
                  </td>
                  <td>
                    <Button variant="danger">delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default UsersList;
