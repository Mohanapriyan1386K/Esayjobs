import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { CommandPost } from "../Service/Service";
import toast from "react-hot-toast";
import { closeModal } from "../Redux/Slice/ModalSlice";

function CommandModal({ data, onok }: any) {
  const { isAuthenticated, userdata } = useSelector(
    (state: RootState) => state.auth,
  );

  const [commentText, setCommentText] = useState("");

  const dispatch = useDispatch();

  const handleSend = () => {
    if (!isAuthenticated) {
      toast.custom(() => (
        <div
          style={{
            padding: "10px 16px",
            background: "var(--secondary-soft)",
            color: "var(--secondary-dark)",
            borderRadius: "8px",
          }}
        >
          ⚠️ Please login first
        </div>
      ));
      return;
    }

    if (!commentText.trim()) return;

    const payload = {
      userId: userdata?.user._id,
      text: commentText,
    };

    CommandPost(data._id, payload)
      .then((res) => {
        console.log("Comment added", res);

        setCommentText("");

         onok();

        dispatch(closeModal());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* COMMENTS LIST */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          pb: 8, // 👈 important (space for input box)
        }}
      >
        {data?.comments?.length === 0 && (
          <Typography align="center" color="gray">
            No comments yet
          </Typography>
        )}

        {data?.comments?.map((comment: any) => (
          <Box key={comment._id}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: "var(--primary)" }}>
                {comment.username?.charAt(0).toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  backgroundColor: "var(--bg-soft)",
                  p: 1.5,
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {comment.username}
                </Typography>

                <Typography sx={{ fontSize: 13, mt: 0.5 }}>
                  {comment.text}
                </Typography>

                <Typography sx={{ fontSize: 11, color: "gray", mt: 1 }}>
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Stack>

            <Divider />
          </Box>
        ))}
      </Box>

      {/* INPUT BOX (WhatsApp Style) */}
      <Box
        sx={{
          p: 1,
          borderTop: "1px solid var(--border-soft)",
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "var(--bg-surface)",
          position: "sticky",
          bottom: -20,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Type a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "var(--bg-soft)",
            },
          }}
        />

        <IconButton
          onClick={handleSend}
          sx={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            "&:hover": { backgroundColor: "var(--primary-dark)" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CommandModal;
