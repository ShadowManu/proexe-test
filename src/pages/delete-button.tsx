import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useAppDispatch } from "../core/hooks";
import { actions } from "../core/store";

interface Props {
  id: number;
}

const DeleteButton: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const onDelete = async () => {
    await dispatch(actions.users.removeOne(id));
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={onOpen}>
        delete
      </Button>

      <Modal show={show} onHide={onClose}>
        <Modal.Header>Delete</Modal.Header>
        <Modal.Body>Do you really want to delete the user?</Modal.Body>
        <Modal.Footer>
          <Row className="mt-4">
            <Col className="ms-auto" xs="auto">
              <Button type="button" variant="dark" onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col xs="auto">
              <Button type="submit" variant="danger" onClick={onDelete}>
                Delete
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
