import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';



const destination = () => {

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDestination();
  }, [])

  const onDelete = (u) => {
    if (!window.confirm('Are You Sure you Want to Delete this?')) {
      return
    }
    axiosClient.delete(`/destination/delete/${u.id}`).then(() => {
      //Todo show notification
      getDestination();
    })
  }

  const getDestination = () => {
    axiosClient.get('/destinations').then(({ data }) => {
      setLoading(false);
      setDestinations(data.data);
    })
      .catch(() => {
        setLoading(false);

      })
  }

  return (
    <>
      <div className="white-bg" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Destination
        < Link className='btn-add' to="/admin/destinations/create" > Create Destinations</Link >
      </div >
      <div className="card animate fadeInDown">
        <table className='table-bordered table-striped border-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Image</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          {
            loading &&
            <tbody>
              <tr>
                <td colSpan={5} className='text-center'>Loading...</td>
              </tr>
            </tbody>

          }

          {
            !loading &&
            <tbody>

              {
                destinations.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td>{u.title}</td>
                    <td>{u.location}</td>
                    <td>{u.fees}</td>
                    <td class="description" style={{ maxWidth: '200px' }}><span>{u.description}</span></td>
                    <td><img src={u.image_src} alt="" style={{ marginLeft: '5%', maxHeight: '100px', maxWidth: '50px', borderRadius: '10%' }} /></td>
                    <td>{u.is_active === 1 ? (<span className='text-success'>Yes</span>) : (<span className='text-danger'>No</span>)}</td>
                    <td>
                      <Link to={'/admin/destinations/edit/' + u.id} className='btn-edit'>  Edit </Link>
                      &nbsp;
                      <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
                    </td>
                  </tr>
                ))
              }
              <tr></tr>
            </tbody>
          }
        </table>
      </div >
    </>

  )
}

export default destination
