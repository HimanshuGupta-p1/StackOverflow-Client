import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assests/stack-overflow-logo.png'
import search from '../../assests/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import {useSelector, useDispatch} from 'react-redux'
import decode from 'jwt-decode'
// import Button from '../../components/Button/Button'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
const Navbar = () => {
    var user = useSelector((state) => (state.currentUserReducer))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = user?.token
        if (token){
            const decodedToken = decode(token)
            if (decodedToken.exp = 1000 < new Date().getTime()){
                handleLogOut();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch])
    
    return (
        <nav className='main-nav'>
            <div className="navbar">
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo' />
                </Link>
                <Link to='/' className='nav-item nav-btn'> About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>

                <form>
                    <input type='text' placeholder='Seacrh...' />
                    <img src={search} alt='search' width="18" className='search-icon'/>
                </form>
                {user === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
                    : <>
                    <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${user?.result?._id}`} className='' style={{color:"white", textDecoration:"none"}}>{user.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-links' onClick={handleLogOut}> Log Out</button>
                    </>
                }

            </div>
        </nav>
    )
}

export default Navbar
