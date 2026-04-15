import { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import { getPost, likePost } from "../Service/Service";
import type { Post } from "./type";
import useResponsive from "../Hooks/CustomHooks";
import { UseLoader } from "../Hooks/UseLoder";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Favorite,
  FavoriteBorder,
  FilterList,
} from "@mui/icons-material";
import FilterContent from "../Component/FilterContent";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import toast from "react-hot-toast";
import { openModal } from "../Redux/Slice/ModalSlice";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);

function Job() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    title: "",
    companyname: "",
    fromdate: "",
    todate: "",
  });

  const pageSize = 10;

  const { isAuthenticated, userdata } = useSelector(
    (state: RootState) => state.auth,
  );

  const isWalkIn = (post: Post) =>
    post.applyType === "walk-in" ||
    (!!post.applyLink && post.applyLink.trim().toLowerCase().includes("walk"));


  const handleLike = (postId: string) => {
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

    //@ts-ignore
    likePost(postId, userdata?.user?._id)
      .then((res) => {
        const { likes } = res.data;

        // update UI without reload
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, likes: likes } : post,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlecommand = (data: any) => {
    dispatch(
      openModal({
        modalname: "COMMANDMODAL",
        data: {
          size: "md",
          title: "Comments",
          data,
          onok: () => handlegetpostdata(true),
        },
      }),
    );
  };

  const { startLoading, stopLoading } = UseLoader();
  const { isMobile } = useResponsive();
  const [openFilter, setOpenFilter] = useState(false);

  const handlegetpostdata = useCallback(
    (
      isInitial = false,
      titleParam?: string,
      companyParam?: string,
      dateParam?: string,
      todate?: string,
    ) => {
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
      const fromdate = dateParam ?? filter.fromdate;
      const toDate = todate ?? filter.todate;

      getPost({
        limit: pageSize,
        page: currentPage,
        title: title || undefined,
        // type: "job",
        company: company || undefined,
        fromDate: fromdate || undefined,
        toDate: toDate || undefined,
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
    [hasMore, loadingMore, page, pageSize, filter, startLoading, stopLoading],
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
        handlegetpostdata(
          false,
          filter.title.trim(),
          filter.companyname.trim(),
        );
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [handlegetpostdata, hasMore, loadingMore, filter.title, filter.fromdate]);

  const handleSearch = () => {
    const title = filter.title.trim();
    setPosts([]);
    setOpenFilter(false);
    setPage(1);
    setHasMore(true);
    handlegetpostdata(true, title, filter.companyname.trim());
  };

  const handleClear = () => {
    setFilter({
      title: "",
      companyname: "",
      fromdate: "",
      todate: "",
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
        mx: "auto",
        mt: !isMobile ? 0 : "",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, mb: 2, color: "var(--text-main)" }}
        >
          Latest Jobs
        </Typography>

        {/* <CustomButton
          label="Add Job"
          startIcon={<Add />}
          onClick={() => handleAddJob()}
        /> */}
      </Box>

      {isMobile ? (
        <>
          {/* Filter Button */}
          <IconButton onClick={() => setOpenFilter(true)}>
            <FilterList />
          </IconButton>

          {/* Bottom Drawer */}
          <Drawer
            anchor="bottom"
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            //@ts-ignore
            PaperProps={{
              sx: {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            }}
          >
            <FilterContent
              filter={filter}
              setFilter={setFilter}
              handleSearch={handleSearch}
              handleClear={handleClear}
            />
          </Drawer>
        </>
      ) : (
        <FilterContent
          filter={filter}
          setFilter={setFilter}
          handleSearch={handleSearch}
          handleClear={handleClear}
        />
      )}

      {posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        <Grid container spacing={isMobile ? 1 : 3}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post._id}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-soft)",
                  transition: "transform .25s ease, box-shadow .25s ease",
                  height: !isMobile ? "340px" : "360px",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 16px 30px rgba(15, 23, 42, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background:
                      "linear-gradient(90deg, var(--primary), var(--secondary))",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "var(--secondary-soft)",
                        color: "var(--secondary)",
                        fontWeight: 700,
                      }}
                    >
                      {post.title?.charAt(0)}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--text-muted)" }}
                    >
                      {dayjs(post.createdAt).fromNow()}
                    </Typography>
                    <Chip
                      label={(post.type || "job").toUpperCase()}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        color: "var(--primary)",
                        backgroundColor: "#e8efff",
                        border: "1px solid #c8d8ff",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{ mt: 1.5, fontWeight: 700, color: "var(--text-main)" }}
                  >
                    {post.title}
                  </Typography>

                  <Box sx={{ mt: 1.5, display: "grid", gap: 0.7 }}>
                    <Typography
                      sx={{ fontSize: 12, color: "var(--text-muted)" }}
                    >
                      Company: {post.company || post.details?.companyName || "-"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, color: "var(--text-muted)" }}
                    >
                      Location:{" "}
                      {post.location || post.details?.interviewLocation || "-"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, color: "var(--text-muted)" }}
                    >
                      Salary: {post.salary || post.details?.salaryInfo || "-"}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label={isWalkIn(post) ? "Walk-in" : "Apply Online"}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: isWalkIn(post)
                          ? "#e9f9ee"
                          : "var(--secondary-soft)",
                        color: isWalkIn(post)
                          ? "#146c2e"
                          : "var(--secondary)",
                      }}
                    />
                    {post.jobtype && (
                      <Chip
                        label={post.jobtype.toUpperCase()}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          color: "var(--primary)",
                          backgroundColor: "#e8efff",
                          border: "1px solid #c8d8ff",
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2.5,
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      onClick={() => handleLike(post._id)}
                      sx={{
                        gap: 1,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        color: "var(--text-main)",
                        fontWeight: 600,
                      }}
                    >
                      {
                        //@ts-ignore
                        post.likes?.includes(userdata?.user?._id) ? (
                          <Favorite
                            sx={{ fontSize: isMobile ? 16 : 20, color: "red" }}
                          />
                        ) : (
                          <FavoriteBorder
                            sx={{ fontSize: isMobile ? 16 : 20 }}
                          />
                        )
                      }

                      {post.likes?.length ?? 0}
                    </Typography>
                    <Typography
                      onClick={() => handlecommand(post)}
                      variant="caption"
                      sx={{
                        cursor: "pointer",
                        color: "var(--secondary)",
                        fontWeight: 600,
                      }}
                    >
                      Comments: {post.comments?.length ?? 0}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
                    {post?.applyLink && !isWalkIn(post) && (
                      <Button
                        component="a"
                        href={post.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}
                      >
                        Apply Now
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/jobs/${post._id}`, { state: { post } })}
                      sx={{ textTransform: "none", borderRadius: 2, flex: 1 }}
                    >
                      View More
                    </Button>
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

export default Job;
