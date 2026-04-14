import { useFormik } from "formik";
import * as Yup from "yup";
import CustomDropdown from "../Component/CustomDropdown";
import CustomTextField from "../Component/CustomTextField";
import CustomButton from "../Component/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { CreatePost, UpdatePost } from "../Service/Service";
import toast from "react-hot-toast";
import { closeModal } from "../Redux/Slice/ModalSlice";

function JobFormamodal({ mode, onok, data }: any) {
  const { userdata } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const initialValues = {
    jobtype: data?.jobtype ?? "",
    title: data?.title ?? "",
    description: data?.description ?? "",
    location: data?.location ?? "",
    salary: data?.salary ?? "",
    company: data?.company ?? "",
    applyLink: data?.applyLink ?? "",
  };

  console.log(userdata?.user._id, "userid");
  console.log(data, "data");

  const validationSchema = Yup.object({
    jobtype: Yup.string().required("Job type is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),

    salary: Yup.number()
      .transform((_value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue),
      )
      .typeError("Salary must be a number")
      .required("Salary is required"),

    company: Yup.string().required("Company is required"),
    applyLink: Yup.string().url("Invalid URL").required("Link is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const userId = userdata?.user?._id;

      if (!userId) {
        toast.error("Please Login first");
        return;
      }

      const payload = {
        userId,
        ...values,
      };

      if (mode === "Edit") {
        // UPDATE API
        UpdatePost(data._id, payload)
          .then((res: any) => {
            toast.success(res.data.message || "Post updated");
            resetForm();
            onok();
            dispatch(closeModal());
          })
          .catch((err: any) => {
            const message =
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong";
            toast.error(message);
          });
      } else {
        // CREATE API
        CreatePost(payload)
          .then((res) => {
            toast.success(res.data.message || "Post created");
            resetForm();
            onok?.();
            dispatch(closeModal());
          })
          .catch((err) => {
            const message =
              err?.response?.data?.message ||
              err?.message ||
              "Something went wrong";
            toast.error(message);
          });
      }
    },
  });

  const { values, errors, handleSubmit, setFieldValue, handleChange, touched } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      {/* Job Type */}
      <CustomDropdown
        label="Job Type"
        value={values.jobtype}
        options={[
          { label: "IT", value: "it" },
          { label: "Government", value: "government" },
          { label: "Core", value: "core" },
        ]}
        onChange={(val) => setFieldValue("jobtype", val)}
      />

      {/* Title */}
      <CustomTextField
        name="title"
        labelname="Title"
        value={values.title}
        onChange={handleChange}
        formik={formik}
      />

      {/* Description */}
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid var(--border-soft)",
          }}
        />
        {touched.description && errors.description && (
          //@ts-ignore
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      {/* Location */}
      <CustomTextField
        name="location"
        labelname="Location"
        value={values.location}
        onChange={handleChange}
        formik={formik}
      />

      {/* Salary */}
      <CustomTextField
        name="salary"
        labelname="Salary"
        value={values.salary}
        type="number"
        onChange={handleChange}
        formik={formik}
      />

      {/* Company */}
      <CustomTextField
        name="company"
        labelname="Company"
        value={values.company}
        onChange={handleChange}
        formik={formik}
      />

      {/* Link */}
      <CustomTextField
        name="applyLink"
        labelname="Apply Link"
        value={values.applyLink}
        onChange={handleChange}
        formik={formik}
      />

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          type="submit"
          label={mode == "Add" ? "Create Job" : "Edit Job"}
        />
      </div>
    </form>
  );
}

export default JobFormamodal;
