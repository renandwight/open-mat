import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";



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
        if (!isAuthenticated) navigate("/loginsignup"); //path to login/signup page
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/auth/users/profile",
                    {
                        headers: {
                            Authorization: `Token ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setProfile(res.data);
            } catch (err) {
                console.error('error fetching profile', err);
            }
        };
        fetchProfile();
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "http://127.0.0.1:8000/api/auth/users/profile",
                profile,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );
            setProfile(res.data);
            setIsEditing(false);

        } catch (err) {
            console.error('error updating profile', err);

        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>MY PROFILE</h1>
            <h2>Welcome {user?.email}</h2>


            {!isEditing && (
                <div
                    style={{
                        border: "1px solid #ccc",
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
                    

                    <button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            )}


            {isEditing && (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        border: "1px solid #ccc",
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
                        type="Street"
                        placeholder="Street"
                        value={profile.street ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, street: e.target.value })
                        }
                    />
                    <input
                        type="State"
                        placeholder="State"
                        value={profile.state ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, state: e.target.value })
                        }
                    />
                    <input
                        type="Zip Code"
                        placeholder="Zip Code"
                        value={profile.zip ?? ""}
                        onChange={(e) =>
                            setProfile({ ...profile, zip: e.target.value })
                        }
                    />
                    <p><strong>Owner:</strong> {profile.is_owner ? "Yes" : "No"}</p>
                    <p><strong>Verified:</strong> {profile.is_verified ? "Yes" : "No"}</p>
                    <p><strong>Created:</strong> {profile.created_at}</p>
                    <p><strong>Updated:</strong> {profile.updated_at}</p>




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

    )



}