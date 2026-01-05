import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";



export default function ProfilePage() {
    const { isAuthenticated, user} = useAuth();
    const navigate = useNavigate();
    
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        street: "",
        zip: "",
        // is_owner: "",
        is_verified: "",
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
                console.error('error fetching profile',err);
            }
        };
        fetchProfile();
    }, [isAuthenticated]);

    

}