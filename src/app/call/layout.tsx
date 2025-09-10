
interface Props {
    children: React.ReactNode
}

const Layout = ({children}:Props) =>{
    return (
        <div className="h-screen w-screen bg-black">
            {children}
        </div>
    )
}

export default Layout