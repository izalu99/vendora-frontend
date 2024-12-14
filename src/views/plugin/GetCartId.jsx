


const GetCartId = () => {
    // Generate a random string and store it in local storage to be used as a cart id
    const generateRandomString = () => {
        const length = 30;
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString ='';
        for (let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * chars.length); 
            randomString += chars[randomIndex]; 
        }

        localStorage.setItem('randomString', randomString);
    }

    const existingRandomString = localStorage.getItem('randomString');
    if (!existingRandomString) {
        generateRandomString();
    } else{
        //
    }

  return existingRandomString;
}

export default GetCartId