import { getIn, useFormik } from "formik";
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
    applyType:
      data?.applyType ??
      (data?.applyLink?.toLowerCase()?.includes("walk") ? "walk-in" : "online"),
    title: data?.title ?? "",
    content: data?.content ?? data?.description ?? "",
    location: data?.location ?? "",
    salary: data?.salary ?? "",
    company: data?.company ?? "",
    applyLink: data?.applyLink ?? "",
    details: {
      companyName: data?.details?.companyName ?? data?.company ?? "",
      interviewLocation: data?.details?.interviewLocation ?? data?.location ?? "",
      interviewTimings: data?.details?.interviewTimings ?? "",
      interviewDate: data?.details?.interviewDate ?? "",
      jobRole: data?.details?.jobRole ?? data?.title ?? "",
      salaryInfo: data?.details?.salaryInfo ?? data?.salary ?? "",
      graduation: data?.details?.graduation ?? "",
      yearOfPassout: data?.details?.yearOfPassout ?? "",
      vacancy: data?.details?.vacancy ?? "",
      shift: data?.details?.shift ?? "",
      shiftTimings: data?.details?.shiftTimings ?? "",
      weeklyOff: data?.details?.weeklyOff ?? "",
      note: data?.details?.note ?? "",
      bondAndAgreement: data?.details?.bondAndAgreement ?? "",
      hrName: data?.details?.hrName ?? "",
      hrNumber: data?.details?.hrNumber ?? "",
      rounds: data?.details?.rounds ?? "",
      walkInInfo: data?.details?.walkInInfo ?? "",
    },
  };

  console.log(userdata?.user._id, "userid");
  console.log(data, "data");

  const validationSchema = Yup.object({
    jobtype: Yup.string().required("Job type is required"),
    applyType: Yup.string()
      .oneOf(["walk-in", "online"])
      .required("Apply type is required"),
    title: Yup.string().required("Title is required"),
    content: Yup.string(),
    location: Yup.string().required("Location is required"),
    salary: Yup.string(),
    company: Yup.string().required("Company is required"),
    applyLink: Yup.string().when("applyType", {
      is: "online",
      then: (schema) =>
        schema.url("Enter valid URL").required("Apply link is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    details: Yup.object({
      companyName: Yup.string(),
      interviewLocation: Yup.string(),
      interviewTimings: Yup.string(),
      interviewDate: Yup.string(),
      jobRole: Yup.string(),
      salaryInfo: Yup.string(),
      graduation: Yup.string(),
      yearOfPassout: Yup.string(),
      vacancy: Yup.string(),
      shift: Yup.string(),
      shiftTimings: Yup.string(),
      weeklyOff: Yup.string(),
      note: Yup.string(),
      bondAndAgreement: Yup.string(),
      hrName: Yup.string(),
      hrNumber: Yup.string(),
      rounds: Yup.string(),
      walkInInfo: Yup.string(),
    }),
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
        description: values.content,
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

  const {
    values,
    errors,
    handleSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
  } = formik;

  const getError = (field: string) => {
    const fieldTouched = getIn(touched, field);
    const fieldError = getIn(errors, field);
    return fieldTouched && fieldError ? String(fieldError) : "";
  };

  const detailsFields = [
    { name: "details.companyName", label: "Company Name" },
    { name: "details.interviewLocation", label: "Interview Location" },
    { name: "details.interviewTimings", label: "Interview Timings" },
    { name: "details.interviewDate", label: "Interview Date" },
    { name: "details.jobRole", label: "Job Role" },
    { name: "details.salaryInfo", label: "Salary Info" },
    { name: "details.graduation", label: "Graduation" },
    { name: "details.yearOfPassout", label: "Year Of Passout" },
    { name: "details.vacancy", label: "Vacancy" },
    { name: "details.shift", label: "Shift" },
    { name: "details.shiftTimings", label: "Shift Timings" },
    { name: "details.weeklyOff", label: "Weekly Off" },
    { name: "details.note", label: "Note" },
    { name: "details.bondAndAgreement", label: "Bond And Agreement" },
    { name: "details.hrName", label: "HR Name" },
    { name: "details.hrNumber", label: "HR Number" },
    { name: "details.rounds", label: "Rounds" },
    { name: "details.walkInInfo", label: "Walk-in Info" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Job Type */}
      <CustomDropdown
        label="Job Type"
        value={values.jobtype}
        options={[
          {label:"NON IT",value:"non-it"},
          { label: "IT", value: "it" },
          { label: "Government", value: "government" },
          { label: "Core", value: "core" },
        ]}
        onChange={(val) => setFieldValue("jobtype", val)}
      />

      <CustomDropdown
        label="Apply Type"
        value={values.applyType}
        options={[
          { label: "Walk-in", value: "walk-in" },
          { label: "Online", value: "online" },
        ]}
        onChange={(val) => {
          setFieldValue("applyType", val);
          if (val === "walk-in" && !values.applyLink) {
            setFieldValue("applyLink", "walk-in");
          }
        }}
      />

      {/* Title */}
      <CustomTextField
        name="title"
        labelname="Title"
        value={values.title}
        onChange={handleChange}
        formik={formik}
      />

      {/* Content */}
      <div>
        <label>Content</label>
        <textarea
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid var(--border-soft)",
          }}
        />
        {getError("content") && (
          <p style={{ color: "red" }}>{getError("content")}</p>
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
        type="text"
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
      {values.applyType === "online" ? (
        <CustomTextField
          name="applyLink"
          labelname="Apply Link"
          value={values.applyLink}
          onChange={handleChange}
          formik={formik}
        />
      ) : (
        <CustomTextField
          name="applyLink"
          labelname="Apply Link"
          value={values.applyLink || "walk-in"}
          disabled
          onChange={handleChange}
          formik={formik}
        />
      )}

      <p style={{ marginTop: 8, marginBottom: 10, fontWeight: 600 }}>
        Additional Job Details
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}
      >
        {detailsFields.map((field) => (
          <CustomTextField
            key={field.name}
            name={field.name}
            labelname={field.label}
            value={String(getIn(values, field.name) ?? "")}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(getError(field.name))}
            helperText={getError(field.name)}
          />
        ))}
      </div>

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
