import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import axiosClient from '../../axios-client';

const destinationForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [file, setTempImage] = useState('');

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
    if (destination.id) {
      axiosClient.post(`/destination/update/${destination.id}`, destination).then(({ data }) => {
        console.log(data);
      })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        })
    } else {
      axiosClient.post(`/destination/create`, destination).then(({ data }) => {
        console.log(data);
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
    setDestinations({ ...destination, image_src: event.target.files[0] })
    if (id) {

      axiosClient.get(`/destination/replace/image/${id}`, file).then(({ data }) => {
        console.log(data);
      })
    }
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
              {
                file ? (
                  <img src={URL.createObjectURL(file)} alt="" />
                ) : (
                  <img src="" alt="" />
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
