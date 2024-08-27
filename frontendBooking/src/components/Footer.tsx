
const Footer:React.FC=()=>{
  return (
    <footer className="bg-gray-800 flex bottom-0 container  p-4 ">
    <div className="container mx-auto text-center text-white">
      <p>&copy; 2024 My Website. All rights reserved.</p>
      <p className="mt-2">
        <a href="https://twitter.com" className="hover:text-gray-400 mx-2">Twitter</a> |
        <a href="https://facebook.com" className="hover:text-gray-400 mx-2">Facebook</a> |
        <a href="https://instagram.com" className="hover:text-gray-400 mx-2">Instagram</a>
      </p>
    </div>
  </footer>

  )
}

export default Footer