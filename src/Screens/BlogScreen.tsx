import { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { getPost } from "../Service/Service";
import type { Post } from "./type";
import useResponsive from "../Hooks/CustomHooks";
import { UseLoader } from "../Hooks/UseLoder";
import CustomTextField from "../Component/CustomTextField";
import CustomButton from "../Component/CustomButton";

function BlogScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState({
    title: "",
    companyname: "",
  });

  const pageSize = 10;

  const { startLoading, stopLoading } = UseLoader();
  const { isMobile } = useResponsive();

  const handlegetpostdata = useCallback(
    (isInitial = false, titleParam?: string, companyParam?: string) => {
      if (loadingMore) return;
      if (!isInitial && !hasMore) return;

      if (isInitial) {
        setHasMore(true);
        startLoading();
      } else {
        setLoadingMore(true);
      }

      const title = titleParam ?? filter.title;
      const company = companyParam ?? filter.companyname;
      const currentPage = isInitial ? 1 : page;

      getPost({
        limit: pageSize,
        page: currentPage,
        title: title || undefined,
        type:"Blog",
        company: company || undefined,
      })
        .then((res) => {
          const data = res?.data;
          const newPosts: Post[] = data?.posts ?? [];

          if (isInitial) {
            setPosts(newPosts);
            setPage(2);
          } else {
            setPosts((prev) => [...prev, ...newPosts]);
            setPage((prev) => prev + 1);
          }
          if (data?.pagination) {
            const { currentPage, totalPages } = data.pagination;
            if (currentPage >= totalPages) {
              setHasMore(false);
            }
          } else {
            if (newPosts.length < pageSize) {
              setHasMore(false);
            }
          }
        })
        .catch((err) => {
          console.log("ERROR 👉", err);
          if (isInitial) setPosts([]);
        })
        .finally(() => {
          if (isInitial) stopLoading();
          else setLoadingMore(false);
        });
    },
    [
      hasMore,
      loadingMore,
      page,
      pageSize,
      filter,
      startLoading,
      stopLoading,
    ],
  );


  useEffect(() => {
    handlegetpostdata(true);
  }, []);


  useEffect(() => {
    const onScroll = () => {
      if (loadingMore || !hasMore) return;

      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (nearBottom) {
        handlegetpostdata(false, filter.title.trim(), filter.companyname.trim());
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handlegetpostdata, hasMore, loadingMore, filter.title]);

  const handleSearch = () => {
    const title = filter.title.trim();
    setPage(1);
    setHasMore(true);
    handlegetpostdata(true, title, filter.companyname.trim());
  };

  const handleClear = () => {
    setFilter({
      title: "",
      companyname: "",
    });
    setPage(1);
    setHasMore(true);
    handlegetpostdata(true, "", "");
  };

  return (
    <Box
      sx={{
        p: isMobile ? 1.5 : 3,
        background: "transparent",
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Latest Posts
      </Typography>

      {/* 🔍 SEARCH */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <CustomTextField
          name="title"
          placeholder="Search by Job title"
          value={filter.title}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          labelname=" Job Title"
        />
        <CustomTextField
          labelname="Company Name"
          name="companyname"
          placeholder="Company Name"
          value={filter.companyname}
          onChange={(e) =>
            setFilter((prev) => ({
              ...prev,
              companyname: e.target.value,
            }))
          }
        />
        <CustomButton
          label="Search"
          variant="contained"
          onClick={handleSearch}
        />
        <CustomButton variant="outlined" label="Clear" onClick={handleClear} />
      </Box>

      {posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        <Grid container spacing={isMobile?1:3}>
          {posts.map((post) => (
            <Grid size={{ xs: 6, sm: 6, md: 4 }} key={post._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  height: !isMobile?"250px":"300px",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ bgcolor: "var(--secondary-soft)", color: "var(--primary)" }}>
                      {post.title?.charAt(0)}
                    </Avatar>

                    <Chip
                      label={(post.type || "post").toUpperCase()}
                      size="small"
                      color={post.type === "job" ? "primary" : "secondary"}
                    />
                  </Box>

                  <Typography sx={{ mt: 1, fontWeight: 600 }}>
                    {post.title}
                  </Typography>

                  <Typography sx={{ mt: 1, color: "text.secondary" }}>
                    {post.description}
                  </Typography>

                  {post.type === "job" && (
                    <Box sx={{ mt: 1}}>
                      <Typography  sx={{fontSize:12}} >Company:{post.company || "-"}</Typography>
                      <Typography  sx={{fontSize:12}}>Location: {post.location || "-"}</Typography>
                      <Typography  sx={{fontSize:12}}>Salary: Rs. {post.salary || "-"}</Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography onClick={()=>alert("Mohan")} sx={{backgroundColor:"var(--primary)",color:"white",paddingX:2,borderRadius:5,fontSize:isMobile?10:15,display:"flex",alignItems:"center"  }} >
                      Likes: {post.likes?.length ?? 0}
                    </Typography>
                    <Typography variant="caption">
                      Comments: {post.comments?.length ?? 0}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BlogScreen;
