import Header from "./Header"

const Layout = ({children}) => {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      {children}
    </div>
  )
}

export default Layout