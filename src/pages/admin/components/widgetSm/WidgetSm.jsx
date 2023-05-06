import { Visibility } from '@mui/icons-material'


import './widgetSm.scss'

const WidgetSm = ({ usersData }) => {

  const NewJoinUsersData = [...usersData].reverse();

  return (
    <div className='widgetSmComponent'>
      <span className='title'>New Join Members</span>
      <ul>
        {NewJoinUsersData.map((user) => {
          return (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <div>
                <span className='username'>{user.name}</span>
                <span className='userTitle'>{user.email}</span>
              </div>
              <button>
                <Visibility className='icon' />
                Display
              </button>
            </li>
          )
        })}


      </ul>
    </div>
  )
}

export default WidgetSm