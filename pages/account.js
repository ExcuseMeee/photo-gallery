import { useAuth } from "../context/AuthContext"

const Account = () => {

  const {user} = useAuth();

  return (
    <div>
      {user? <p>{user.email}</p> : <p>Not signed in</p> }

    </div>
  )
}

export default Account