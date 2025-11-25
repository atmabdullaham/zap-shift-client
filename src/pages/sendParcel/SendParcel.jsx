import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    console.log("cost", cost);
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, take it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel Created, please pay",
              showConfirmButton: false,
              timer: 2500,
            });
            navigate("/dashboard/my-parcels");
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl text-secondary font-bold">Send a parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4">
        {/* parcel type */}
        <div>
          <label className="label mr-4">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value="document"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              className="radio"
              value="non-document"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info: name: weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight(kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two coloum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/*____________________________________________ */}
          {/* sender info */}
          <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-semibold md:font-bold">
              Sender Details
            </h4>
            {/*1.  Sender Name */}
            <fieldset className="fieldset">
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
            </fieldset>
            {/*.  Sender Email */}
            <fieldset className="fieldset">
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full"
                defaultValue={user?.email}
                placeholder="Sender Email"
                readOnly
              />
            </fieldset>
            {/*2.  Sender address */}
            <fieldset className="fieldset">
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderaddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
            {/*3.  Sender phone number */}
            <fieldset className="fieldset">
              <label className="label">Sender Phone no</label>
              <input
                type="number"
                {...register("senderPhoneNo")}
                className="input w-full"
                placeholder="Sender phone no"
              />
            </fieldset>
            {/* Sender Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
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
            {/*4.  Sender district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender District</legend>
              <select
                {...register("senderDistrict")}
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
            {/*5.  Picup Instruction */}
            <fieldset className="fieldset">
              <label className="label">Picup Instruction</label>
              <input
                type="text"
                {...register("picupInstruction")}
                className="input w-full"
                placeholder="Picup Instruction"
              />
            </fieldset>
          </div>
          {/*____________________________________________ */}
          {/* reciver info */}
          <div className="space-y-2">
            <h4 className="text-xl md:text-2xl font-semibold md:font-bold">
              Receiver Details
            </h4>
            {/*1.  receiver Name */}
            <fieldset className="fieldset">
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
            </fieldset>
            {/*.  Receiver Email */}
            <fieldset className="fieldset">
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Email"
              />
            </fieldset>
            {/*2.  Receiver address */}
            <fieldset className="fieldset">
              <label className="label">Receiver Address</label>
              <input
                type="text"
                {...register("receiveraddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
            {/*3.  Receiver address */}
            <fieldset className="fieldset">
              <label className="label">Receiver Phone no</label>
              <input
                type="number"
                {...register("receiverPhoneNo")}
                className="input w-full"
                placeholder="Receiver phone no"
              />
            </fieldset>
            {/* Receiver Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Region</legend>
              <select
                {...register("receiverRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/*4.  Receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver District</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a district"
                className="select"
              >
                <option disabled={true}>Pick a Sender District</option>
                {districtsByRegion(receiverRegion).map((r, i) => (
                  <option value={r} key={i}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/*5.  Delivery Instruction */}
            <fieldset className="fieldset">
              <label className="label">Delivery Instruction</label>
              <input
                type="text"
                {...register("deliveryInstruction")}
                className="input w-full"
                placeholder="Delivery Instruction"
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

export default SendParcel;
