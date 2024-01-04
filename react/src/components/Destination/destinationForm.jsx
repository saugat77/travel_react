import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import axiosClient from '../../axios-client';

const destinationForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [file, setTempImage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [destination, setDestinations] = useState({
    id: null,
    title: '',
    fees: '',
    category: '',
    image_src: '',
    location: '',
    is_active: '',
    description: '',

  })
  const onSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('title', destination.title);
    formData.append('fees', destination.fees);
    formData.append('location', destination.location);
    formData.append('category', destination.category);
    formData.append('is_active', destination.is_active);
    formData.append('description', destination.description);
    formData.append('image_src', file ?? null);
    if (destination.id) {
      axiosClient.post(`/destination/update/${destination.id}`, formData).then(({ data }) => {
        setShouldRedirect(true);


      })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        })
    } else {
      axiosClient.post(`/destination/create`, formData).then(({ data }) => {
        setShouldRedirect(true);

      })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        })
    }
  }

  const imageShow = (event) => {
    const file = event.target.files[0];
    setTempImage(file);
    console.log(file);
  }
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {

      try {
        if (id) {
          const { data } = await axiosClient.get(`/destination/show/${id}`);
          setDestinations(data);
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data retrieval or error
      }
    };

    fetchData(); // Invoke the fetchData function

  }, [axiosClient, id]);
  if (shouldRedirect) {
    return <Navigate to="/admin/destinations" />;
  }

  return (
    <>
      {destination.id && <h1>Update User: {destination.title}</h1>}
      {!destination.id && <h1>New Destination</h1>}
      <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>Loading...</div>
        )}
        {
          errors && <div id='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {
          !loading &&
          <form onSubmit={onSubmit}>
            <div className='row'>

              <div className='col-md-6 mb-2'>
                <label>Title</label>
                <input value={destination.title} onChange={ev => setDestinations({ ...destination, title: ev.target.value })} type="text" placeholder='Title' />
              </div>
              <div className='col-md-6 mb-2'>
                <label>Amount</label>
                <input value={destination.fees} onChange={ev => setDestinations({ ...destination, fees: ev.target.value })} type="text" placeholder='Amount(Nrs.)' />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <label>Location</label>

                <input value={destination.location} onChange={ev => setDestinations({ ...destination, location: ev.target.value })} type="text" placeholder='Location' />
              </div>
              <div className='col-md-6 mb-2'>
                <label>Category</label>
                <input value={destination.category} onChange={ev => setDestinations({ ...destination, category: ev.target.value })} type="text" placeholder='Category' />
              </div>

            </div>
            <div className='row'>
              <div className='col-md-6 mb-2'>
                <label>Is Active</label>
                <select className="form-select mb-2" value={destination.is_active} onChange={ev => setDestinations({ ...destination, is_active: ev.target.value })}>
                  <option value=""> Choose One</option>
                  <option value="1" selected={destination.is_active === 1 ? true : false}>Active</option>
                  <option value="0" selected={destination.is_active === 0 ? true : false}>In Active</option>
                </select>
              </div>
            </div>
            <div className='col-md-12 mb-2'>
              <label>Description</label>
              <textarea className='form-control' value={destination.description} cols="30" rows="10" onChange={ev => setDestinations({ ...destination, description: ev.target.value })}></textarea>
            </div>
            <div className='col-md-6 mb-2'>
              <label>Image</label>
              <br />
              {
                file ? (
                  <img src={URL.createObjectURL(file)} alt="" style={{ marginLeft: '15%', maxHeight: '30%', maxWidth: '30%', borderRadius: '10%' }} />
                ) : (
                  <img src={destination.image_src} alt="" style={{ marginLeft: '15%', maxHeight: '30%', maxWidth: '30%', borderRadius: '10%' }} />
                )
              }

              <input onChange={imageShow} type="file" />
            </div>

            <div>
              <button id='btn'> Save
              </button>
            </div>
          </form>
        }
      </div >
    </>
  )

}

export default destinationForm
