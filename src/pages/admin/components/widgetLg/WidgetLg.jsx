import Button from './button/Button'
import './widgetLg.scss'

const WidgetLg = ({ usersData, ordersData }) => {
  return (
    <div className='widgetLgComponent'>
      <h3 className="title">Latest Transactions</h3>
      <table>
        <tr className='firstTr'>
          <th>Customer</th>
          {/* <th>Date</th> */}
          <th>Amount</th>
          <th>Status</th>
        </tr>
        {ordersData.map((order) => {
          return (
            <tr key={order._id} className='secondTr'>
              <td className='user'>
                <img src={order.user?.avatar} alt={order.user?.name} />
                <span>{order.user?.name}</span>
              </td>
              {/* <td className='date'>2 Jun 2021</td> */}
              <td className='amount'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total_price)}</td>
              <td className='status'>
                {order.status ?
                  (<Button type='Approved' />)
                  :
                  (<Button type='Pending' />)
                }
              </td>
            </tr>
          )
        })}

      </table>
    </div>
  )
}

export default WidgetLg