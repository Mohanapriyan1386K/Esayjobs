import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../Service/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); 
  // loading | success | error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
    }
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      
      {/* 🔄 Loading */}
      {status === "loading" && (
        <>
          <h2>🔄 Verifying your email...</h2>
          <p>Please wait...</p>
        </>
      )}

      {/* ✅ Success */}
      {status === "success" && (
        <>
          <h2>✅ Email Verified Successfully!</h2>
          <p>You can now login.</p>
          <button onClick={() => window.location.href = "/login"}>
            Go to Login
          </button>
        </>
      )}

      {/* ❌ Error */}
      {status === "error" && (
        <>
          <h2>❌ Invalid or Expired Link</h2>
          <p>Please request a new verification email.</p>
        </>
      )}

    </div>
  );
};

export default VerifyEmail;