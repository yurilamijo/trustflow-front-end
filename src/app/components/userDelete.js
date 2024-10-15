import { useRouter } from "next/navigation";
import { getUserIdFromJwtToken } from "../util/helper";
import { APIPaths, Token } from "../util/constants";

function UserDelete() {
  const router = useRouter();

  const deleteUser = async () => {
    try {
      var userId = getUserIdFromJwtToken();
      const accessToken = localStorage.getItem(Token.accessToken);
      const sessionToken = localStorage.getItem(Token.sessionToken);

      const response = await fetch(`${APIPaths.userDelete}/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
			      "trustflow_session": sessionToken,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem(Token.accessToken);
        localStorage.removeItem(Token.sessionToken);
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
