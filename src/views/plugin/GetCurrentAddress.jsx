import {useState, useEffect} from 'react';



const GetCurrentAddress = () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords ;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.address)})
      
    }, (error) => {
      console.log('Error getting location: ', error);
    });
  }, []);

  return address
}

export default GetCurrentAddress
