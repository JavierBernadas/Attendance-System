import { useForm } from "react-hook-form";

export default function TestPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(
    {
    defaultValues: {
      fruit: "Select", // 👈 default value here
    }}
  );

  const onSubmit1 = (data) => console.log(data);

  // console.log(watch("example"))

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit1)} className=" p-20">
      {/* register your input into the hook by invoking the "register" function */}
      <input
        className=" border-2 mx-2"
        defaultValue="test"
        {...register("example")}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <input
        className=" border-2"
        type="email"
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />

      {errors.mail && <span role="alert">{errors.mail.message}</span>}

      <select
        defaultValue="select"
        className=" border-2"
        {...register("gender", { required: "Please Select Your Gender ! " })}
        aria-invalid={errors.gender ? "true" : "false"}
      >
        <option value="select">Select</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>

      {errors.gender && <span role="alert">{errors.gender.message}</span>}

      <label>
        Choose a fruit:
        <select
          {...register("fruit", {
            validate: (value) => value !== "Select"// true
              || "Please select a fruit" // false,
            // validate: (value) => value !== "Select" ? true : "Please select a fruit",

          })}
        >
          <option value="Select">Select</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>

      {errors.fruit && <p role="alert">{errors.fruit.message}</p>}

      <button
        className="broder-2 bg-pink-500 mx-10 p-3 rounded-2xl"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
