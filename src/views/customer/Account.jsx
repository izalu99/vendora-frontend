
import {useState, useEffect }from 'react'

import Sidebar from "./Sidebar"
import apiInstance from '../../utils/axios'
import GetUserData from '../plugin/GetUserData'

const Account = () => {
    const [profile, setProfile] = useState({})
    const userData = GetUserData()

    useEffect(() => {
        if (userData){
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
            //console.log(res.data)
            setProfile(res.data)
            
        })
        }
    }, [])

    useEffect(() => {
        console.log('profile: ', profile)
        //console.log(profile.user?.full_name)
        //console.log(profile.user?.username)
    },[profile])
    
    return (
        <main className="mt-5">
        <div className="container">
            <section className="">
            <div className="row">
                <Sidebar />
                <div className="col-lg-9 mt-1">
                    <div className="container px-4">
                    <section className=""></section>
                    <section className="">
                        <div className="row rounded shadow p-3">
                        <h2 className="font-semibold text-xl">{`Hi ${profile?.user?.username} `}</h2>
                        <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                            From your account dashboard. you can easily check &amp;
                            view your <a href="">orders</a>, manage your{" "}
                            <a href="">
                            shipping
                            </a>
                        </div>
                        </div>
                    </section>
                    </div>
                
                </div>
            </div>
            </section>
        </div>
        </main>

    )
}

export default Account