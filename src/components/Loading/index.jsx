import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary m-5" role="status">
      </div>
    </div>
  )
}