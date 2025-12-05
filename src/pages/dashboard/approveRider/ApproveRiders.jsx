import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const handleRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${status} Successfully`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const handleDeleteApplication = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Application Deleted Successfully`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="py-10 max-w-6xl mx-auto">
      <h2 className="text-5xl text-secondary">
        {" "}
        Rider Pending Approval:{riders.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Appilication Status</th>
              <th>Wrok Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.riderRegion}</td>
                <td>{rider.riderDistrict}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-500"
                        : "text-yellow-300"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <button
                    onClick={() => handleRiderStatus(rider, "approved")}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleRiderStatus(rider, "rejected")}
                    className="btn btn-square hover:bg-yellow-300"
                  >
                    <IoPersonRemove></IoPersonRemove>
                  </button>
                  <button
                    onClick={() => handleDeleteApplication(rider._id)}
                    className="btn btn-square hover:bg-red-500"
                  >
                    <FaTrashCan></FaTrashCan>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
