import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Applied for Rider Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div className="py-10 max-w-6xl mx-auto">
      <h2 className="text-4xl text-primary">Be a Rider</h2>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4"
      >
        {/* two coloum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*____________________________________________ */}
          {/* sender info */}
          <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-semibold md:font-bold">
              Rider Details
            </h4>
            {/*1.  Rider Name */}
            <fieldset className="fieldset">
              <label className="label">Rider Name</label>
              <input
                type="text"
                {...register("riderName")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Rider Name"
              />
            </fieldset>
            {/*2. Email */}
            <fieldset className="fieldset">
              <label className="label">Rider Email</label>
              <input
                type="email"
                {...register("riderEmail")}
                className="input w-full"
                defaultValue={user?.email}
                placeholder="Rider Email"
                readOnly
              />
            </fieldset>
            {/* 2.  Sender address
            <fieldset className="fieldset">
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderaddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset> */}
            {/*3.  Rider phone number */}
            <fieldset className="fieldset">
              <label className="label">Rider Phone no</label>
              <input
                type="number"
                {...register("riderPhoneNo")}
                className="input w-full"
                placeholder="Rider phone no"
              />
            </fieldset>
            {/* 4. Rider Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Rider Regions</legend>
              <select
                {...register("riderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a browser</option>
                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/*5.  Rider district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Rider District</legend>
              <select
                {...register("riderDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a Sender District</option>
                {districtsByRegion(senderRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          {/*____________________________________________ */}
          {/* More info */}
          <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-semibold md:font-bold">
              More Details
            </h4>
            {/*1. Driving Liscense */}
            <fieldset className="fieldset">
              <label className="label">Driving License Number</label>
              <input
                type="number"
                {...register("drivingLicenseNumber")}
                className="input w-full"
                placeholder="Driving License Number"
              />
            </fieldset>
            {/*2  NID Number */}
            <fieldset className="fieldset">
              <label className="label">NID No</label>
              <input
                type="number"
                {...register("nidNo")}
                className="input w-full"
                placeholder="NID No"
              />
            </fieldset>
            {/*3.  Bike Model */}
            <fieldset className="fieldset">
              <label className="label">Bike Model</label>
              <input
                type="text"
                {...register("bikeModel")}
                className="input w-full"
                placeholder="Bike Model"
              />
            </fieldset>
            {/*4.  Bike Registration Number */}
            <fieldset className="fieldset">
              <label className="label">Bike Registration Number</label>
              <input
                type="number"
                {...register("bikeRegiNum")}
                className="input w-full"
                placeholder="Bike Registration Number"
              />
            </fieldset>
            {/*5.  Tell us About your self */}
            <fieldset className="fieldset">
              <label className="label">Tell us About your self</label>
              <input
                type="text"
                {...register("aboutRider")}
                className="input w-full"
                placeholder="Tell us About your self"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          value={"submit"}
          className="btn btn-primary text-secondary"
        />
      </form>
    </div>
  );
};

export default Rider;
