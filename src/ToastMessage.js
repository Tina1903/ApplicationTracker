import React from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";

const ToastMessage = (props) => {
  return (
    <ToastContainer position={props.position} style={{ zIndex: 1 }}>
      <Toast
        show={props.show}
        onClose={props.setToast}
        delay={props.delay}
        autohide={props.autohide}
        bg={props.bg}
        animation={props.animation}
        position={props.position}
      >
        <ToastHeader>
          {" "}
          <strong className="me-auto"> {props.header}</strong>
        </ToastHeader>
        <ToastBody>{props.body}</ToastBody>
      </Toast>
    </ToastContainer>
  );
};

ToastMessage.propTypes = {};

export default ToastMessage;
