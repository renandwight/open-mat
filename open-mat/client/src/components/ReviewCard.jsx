import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { api } from "../api/api";

export default function ReviewCard({ reviewData, onUpdated, onDeleted }) {
  const { id, rating, comment, created_at, gym, gym_name } = reviewData;

  const gymId = gym;
  const gymName = gym_name;

  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(rating);
  const [editComment, setEditComment] = useState(comment);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const cancelEdit = () => {
    setEditRating(rating);
    setEditComment(comment);
    setIsEditing(false);
    setError(null);
  };

  const saveEdit = async () => {
    setError(null);
    try {
      setIsSaving(true);

      const payload = {
        rating: Number(editRating),
        comment: editComment,
      };

      const res = await api.put(`reviews/${id}/`, payload, {
        headers: { Authorization: `Token ${token}` },
      });

      onUpdated?.(res.data);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to update review."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const deleteReview = async () => {
    setError(null);

    const ok = window.confirm("Delete this review? This cannot be undone.");
    if (!ok) return;

    try {
      setIsDeleting(true);

      await api.delete(`reviews/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      onDeleted?.(id);
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to delete review."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Container className="my-3">
      <Card className="w-100">
        <Card.Body>
          <Row className="align-items-center g-3">
            {/* Gym */}
            <Col xs={12} md={3}>
              <Row>
                <center>
                  <strong>Gym:</strong>
                </center>
              </Row>
              <Row>
                <center>
                  {gymId ? (
                    <Link to={`/gyms/${gymId}`}>{gymName || "View Gym"}</Link>
                  ) : (
                    "N/A"
                  )}
                </center>
              </Row>
            </Col>

            {/* Rating */}
            <Col xs={12} md={2}>
              <Row>
                <center>
                  <strong>Rating:</strong>
                </center>
              </Row>
              <Row>
                <center>
                  {!isEditing ? (
                    rating
                  ) : (
                    <Form.Select
                      size="sm"
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                      style={{ maxWidth: 90 }}
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </center>
              </Row>
            </Col>

            {/* Comment */}
            <Col xs={12} md={5}>
              <Row>
                <center>
                  <strong>Comment:</strong>
                </center>
              </Row>
              <Row>
                <center style={{ width: "100%" }}>
                  {!isEditing ? (
                    comment
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                  )}
                </center>
              </Row>
            </Col>

            {/* Created */}
            <Col xs={12} md={2}>
              <Row>
                <center>
                  <strong>Created:</strong>
                </center>
              </Row>
              <Row>
                <center>{created_at}</center>
              </Row>
            </Col>
          </Row>

          {/* Buttons + errors under the row */}
          <Row className="mt-3">
            <Col className="d-flex justify-content-end gap-2">
              {!isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={deleteReview}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={saveEdit} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={cancelEdit}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>

          {error && (
            <Row className="mt-2">
              <Col className="text-danger">{error}</Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
