import { isEmpty, identity, orderBy, sortBy } from "lodash";
import { useMemo, useState } from "react";
import { Alert, Button, Card, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components/macro";

import { useAppSelector } from "../core/hooks";
import { selectors } from "../core/store";
import { User } from "../core/types";
import DeleteButton from "./delete-button";

const StyledRow = styled(Row)`
  align-items: center;
`;

const SortButton = styled(Button).attrs({ variant: "outline-light" })<{
  mode: SortMode;
}>`
  margin-left: 8px;
  padding: 0 2px;
  color: ${({ mode }) => sorting.colors[mode]};
`;

const SORT_MODES = ["none", "asc", "desc"] as const;

type SortMode = typeof SORT_MODES[number];

interface SortingUtils {
  symbols: Record<SortMode, string>;
  colors: Record<SortMode, string>;
  functions: Record<SortMode, (users: User[]) => User[]>;
  next: (sort: SortMode) => SortMode;
}

const sorting: SortingUtils = {
  symbols: {
    none: "--",
    asc: "\u25B2",
    desc: "\u25BC",
  },
  colors: {
    none: "gray",
    asc: "black",
    desc: "black",
  },
  functions: {
    none: identity,
    asc: (users) => orderBy(users, "username", ["asc"]),
    desc: (users) => orderBy(users, "username", ["desc"]),
  },
  next: (sort) => {
    const next = SORT_MODES.indexOf(sort) + 1;
    const index = next % SORT_MODES.length;
    return SORT_MODES[index];
  },
};

const UsersList = () => {
  const rawUsers = useAppSelector(selectors.users.selectAll);

  const [sort, setSort] = useState<SortMode>("none");
  const onSort = () => setSort(sorting.next);

  const users = useMemo(
    () => sorting.functions[sort](rawUsers),
    [rawUsers, sort]
  );

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
                <td>
                  Username
                  <SortButton mode={sort} onClick={onSort}>
                    {sorting.symbols[sort]}
                  </SortButton>
                </td>
                <td>Email</td>
                <td>City</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id!}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address?.city}</td>
                  <td>
                    <LinkContainer to={`/edit/${user.id!}`}>
                      <Button variant="warning">edit</Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <DeleteButton id={user.id!} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">There are no users</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default UsersList;
