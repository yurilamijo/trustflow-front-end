import { useRouter } from "next/navigation";
import { getUserIdFromJwtToken } from "../util/helper";

function UserDelete() {
  const router = useRouter();

  const deleteUser = async () => {
    try {
      var userId = getUserIdFromJwtToken();
      console.log(userId);

      const response = await fetch(
        `http://127.0.0.1:8080/user/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
			      "trustflow_session": localStorage.getItem("sessionToken"),
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("sessionToken");
        router.push("/"); 
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button
      onClick={deleteUser}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
    >
      Delete Account
    </button>
  );
}

export default UserDelete;
