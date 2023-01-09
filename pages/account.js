import { useAuth } from "../context/AuthContext"

const Account = () => {

  const {user, userData} = useAuth();

  return (
    <div>
      {userData? <p>{userData.email}</p> : <p>Not signed in</p> }

    </div>
  )
}

export default Account