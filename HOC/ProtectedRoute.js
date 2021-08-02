import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

const ProtectedRoute = (ProtectedComponent) => {
   return (props) => {

      if (typeof window !== "undefined") {
         const Router = useRouter()
         const auth = useSelector((state) => state.auth)

         if (auth.loggedIn) {
            return <ProtectedComponent {...props} />
         } else if (auth.loggedIn === null){
            console.log("loooo")
            return <LoadingPgae />
         } else {
            Router.replace("/")
            return null
         }
      }
      return null
   }

   
}

export default ProtectedRoute

const LoadingPgae = () => {
   return <h1>loading...</h1>
}