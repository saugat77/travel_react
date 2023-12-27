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
        <table className='table-striped border-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
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
                destinations.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.title}</td>
                    <td>{u.description}</td>
                    <td>{u.image_src}</td>
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
