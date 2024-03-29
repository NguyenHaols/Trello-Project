import AppBar from '~/components/AppBar/AppBar'

function AppBarOnlyLayout({ children }) {
  return (
    <div>
      <AppBar />
      <div className='container'>
        <div className='content'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AppBarOnlyLayout