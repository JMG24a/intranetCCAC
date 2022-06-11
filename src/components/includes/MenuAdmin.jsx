function MenuAdmin({logout, setIsMenu}) {

  const handleLogout = () => {
    setIsMenu(false)
    logout()
  }

  return (
    <div className="p-1 text-center bg-secondary cursor">
      <p
        className="text-white  bg-secondary cursor"
        onClick={handleLogout}
      >
        Logout
      </p>
    </div>
  )
}

export {MenuAdmin}
