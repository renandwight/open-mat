import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import { Button } from 'react-bootstrap';

export default function ProfilePage() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        street: "",
        state: "",
        zip: "",
        is_owner: false,
        is_verified: false,
        created_at: "",
        updated_at: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) navigate("/loginsignup");
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/auth/users/profile/",
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setProfile(res.data);
            } catch (err) {
                console.error("error fetching profile", err);
            }
        };

        fetchProfile();
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            first_name: profile.first_name,
            last_name: profile.last_name,
            street: profile.street,
            state: profile.state,
            zip: profile.zip,
        };

        try {
            const res = await axios.put(
                "http://127.0.0.1:8000/api/auth/users/profile/",
                payload,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );
            setProfile(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error("error updating profile:", err.response?.data);
        }
    };
    // adding review card below:
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchReviews = async () => {
            try {
                const res = await axios.get(
                    "http://127.0.0.1:8000/api/reviews/me/",
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setReviews(res.data);
            } catch (err) {
                console.error("Error fetching user reviews", err);
            }
        };

        fetchReviews();
    }, [isAuthenticated]);

    const handleReviewUpdated = (updatedReview) => {
        setReviews((prev) =>
            prev.map((r) => (r.id === updatedReview.id ? updatedReview : r))
        );
    };

    const handleReviewDeleted = (deletedId) => {
        setReviews((prev) => prev.filter((r) => r.id !== deletedId));
    };

    // end of reviewcard code block




    return (
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            <div style={{ padding: "20px" }}>
                <h1>MY PROFILE</h1>
                <h2>Welcome {user?.email}</h2>

                {!isEditing && (
                    <div
                        style={{
                            border: "1px solid #555555",
                            borderRadius: "10px",
                            padding: "20px",
                            maxWidth: "400px",
                            marginTop: "20px",
                        }}
                    >
                        <p><strong>First Name:</strong> {profile.first_name}</p>
                        <p><strong>Last Name:</strong> {profile.last_name}</p>
                        <p><strong>Street:</strong> {profile.street}</p>
                        <p><strong>State:</strong> {profile.state}</p>
                        <p><strong>Zip:</strong> {profile.zip}</p>

                        <Button
                            variant="outline-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </Button>

                    </div>
                )}

                {isEditing && (
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            border: "1px solid #555555",
                            borderRadius: "10px",
                            padding: "20px",
                            maxWidth: "400px",
                            marginTop: "20px",
                        }}
                    >
                        <input
                            placeholder="First name"
                            value={profile.first_name || ""}
                            onChange={(e) =>
                                setProfile({ ...profile, first_name: e.target.value })
                            }
                        />

                        <input
                            placeholder="Last name"
                            value={profile.last_name || ""}
                            onChange={(e) =>
                                setProfile({ ...profile, last_name: e.target.value })
                            }
                        />

                        <input
                            placeholder="Street"
                            value={profile.street ?? ""}
                            onChange={(e) =>
                                setProfile({ ...profile, street: e.target.value })
                            }
                        />

                        <input
                            placeholder="State"
                            value={profile.state ?? ""}
                            onChange={(e) =>
                                setProfile({ ...profile, state: e.target.value })
                            }
                        />

                        <input
                            placeholder="Zip Code"
                            value={profile.zip ?? ""}
                            onChange={(e) =>
                                setProfile({
                                    ...profile,
                                    zip:
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                })
                            }
                        />

                        {/* <p><strong>Owner:</strong> {profile.is_owner ? "Yes" : "No"}</p> */}
                        {/* <p><strong>Verified:</strong> {profile.is_verified ? "Yes" : "No"}</p> */}
                        {/* <p><strong>Created:</strong> {profile.created_at}</p> */}
                        {/* <p><strong>Updated:</strong> {profile.updated_at}</p> */}

                        <div style={{ marginTop: "10px" }}>
                            <button type="submit">Save</button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                style={{ marginLeft: "10px" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <div style={{ flex: 1 }}>
                {/* review card code block below */}
                <hr />

                <h3>My Reviews</h3>

                {reviews.length === 0 && <p>No reviews yet.</p>}

                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        reviewData={review}
                        onUpdated={handleReviewUpdated}
                        onDeleted={handleReviewDeleted}
                    />
                ))}
                {/* end of review card code block */}

            </div>
        </div>


    );
}
