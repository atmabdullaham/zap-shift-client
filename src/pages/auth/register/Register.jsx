import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password).then((result) => {
      //   store the image and get the photo url
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
        import.meta.env.VITE_image_host_key
      }`;
      axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };

        // create user in the daabase
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user created in the database");
          }
        });

        // update user profile to firebase
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("User profile updated done");
            navigate(location.state || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
      //   update user profile
    });
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl h-full">
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          {/* Photo */}
          <div>
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full"
              placeholder="Upload your photo"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 12,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be atleast 6 charecter
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must be atleast one uppercase, oneLowercase, one
                number, one Special Cherecter
              </p>
            )}
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
      <p>
        Already have an account ?
        <Link state={location.state} to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
