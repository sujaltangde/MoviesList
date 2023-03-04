import { useEffect, useState } from "react"
import "../components/style.css"
import { db } from "../config/firebase"
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'


export const Movies = () => {

    const [movieList, setMovLis] = useState([])

    const [newMovieTit, setNewMovTit] = useState([])
    const [newMovieDate, setMovDate] = useState([])
    const [isNewMovOsc, setisNewMovOsc] = useState([])

    const [updatedTit, setUpdTit] = useState()


    const movieCollectionsRef = collection(db, "movies")


   


   
   
    //    CREATE the new movie document
    const onSubmitMov = async () => {
        try {
            await addDoc(movieCollectionsRef, {
                title: newMovieTit,
                releaseDate: newMovieDate,
                Oscar: isNewMovOsc,
            })
            getMovieList();
        }
        catch (err) {
            console.error(err)
        }
    }


    //    READ or get or retrive the movie document
     const getMovieList = async () => {
        // READ THE DATA
        // SET THE MOVIE LIST       
        try {
            const data = await getDocs(movieCollectionsRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            console.log(filteredData)
            setMovLis(filteredData)
        }
        catch (err) {
            console.error(err)
        }

    }

    //   UPDATE the title in movie document
    const updateMovieTitle = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id)
            await updateDoc(movieDoc, { title: updatedTit })
            getMovieList();
            console.log(id)
        }
        catch (err) {
            console.error(err)
        }
    }

    //    DELETE the movie document
     const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id)
            await deleteDoc(movieDoc)
            getMovieList()

        }
        catch (err) {
            console.error(err)
        }
    }



    useEffect(() => {

        getMovieList()

    }, [])


    return (
        <>
         <div className="flex items-center flex-col   " >

           <div className="border border-black flex items-center flex-col px-8 min-h-[104vh] w-96 bg-gray-700" >
           <div className="createMov flex flex-col items-center " >
                <h1 className="text-4xl py-3 font-bold text-white" >Movies</h1>
                <input className="border h-11 w-64 border-black  px-2 py-2 focus:outline-none" type="text" onChange={(e) => setNewMovTit(e.target.value)} placeholder="Movie Title..." />
                <input className="border h-11 w-64 border-black px-2 py-2 focus:outline-none" type="number" onChange={(e) => setMovDate(Number(e.target.value))} placeholder="Released Year" />
                
                <label className=" h-11 w-64 text-lg font-semibold text-white">Received a Oscar : <input type="checkbox" checked={isNewMovOsc} onChange={(e) => setisNewMovOsc(e.target.checked)} /></label>
                

                <button className=" h-11 w-64  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onSubmitMov} >Add Movie</button>
            </div>

            <div>
                {movieList.map((m) => (
                    <div className="flex flex-col items-center  rounded-2xl  px-10 py-4 mb-5 bg-gray-500 " >
                        <p className="text-2xl font-semibold py-1 text-white " >{m.title}</p>
                        <p className="text-2xl font-semibold py-1 text-white " >Date : {m.releaseDate}</p>
                        <p className="text-2xl font-semibold py-1 text-white " >{(m.Oscar) ? "Won the Oscar" : "Not Won the Oscar"}</p>
                        <input  className="  px-2 py-1 focus:outline-none " type="text" placeholder="New Title" onChange={(e) => setUpdTit(e.target.value)} />
                        <button className="my-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={() => updateMovieTitle(m.id)} >Update Title</button>
                        <button className="my-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={() => deleteMovie(m.id)} >Delete Movie</button>

                    </div>
                ))}
            </div>
           </div>


            

            </div>
        </>
    )
}
